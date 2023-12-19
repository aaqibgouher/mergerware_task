const { UserModel, TokenModel, LoanModel } = require("../model");
const Constant = require("../utils/constant");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const register = async (payload) => {
  // validate
  if (!payload || !payload.name || !payload.name.trim())
    throw "Name is required";
  if (!payload || !payload.email || !payload.email.trim())
    throw "Email is required";
  if (!payload || !payload.password || !payload.password.trim())
    throw "Password is required";
  if (!payload || !payload.role || !payload.role.trim())
    throw "Role is required";

  // taking value
  const { name, email, password, role } = payload;

  // role can only be borrower, lender & admin
  if (!(await isValidRole(role)))
    throw "Role can only be Admin/Borrower/Lender";

  // if not valid email
  if (!isEmail(email)) throw "Email is not valid";

  // check if user exist by that email, if exists throw error
  let user = await getUserByEmail(email);

  //   if user already exists
  if (user)
    throw "User already exist with this email, please use another email";

  // if not, create user
  user = new UserModel({
    name,
    email,
    password: await encodePassword(password),
    role,
  });

  //   saving
  await user.save();

  //   return
  return {
    name,
    email,
  };
};

const login = async (payload) => {
  // validate
  if (!payload || !payload.email || !payload.email.trim())
    throw "Email is required";
  if (!payload || !payload.password || !payload.password.trim())
    throw "Password is required";

  // taking value
  const { email, password } = payload;

  //   if not valid email
  if (!isEmail(email)) throw "Email invalid";

  // check if user exist by that email, if exists throw error
  let user = await getUserByEmail(email, true);

  //   if user not exists
  if (!user) throw "Invalid email";

  //   check for password
  if (!(await isPasswordCorrect(password, user.password)))
    throw "Email/Password is invalid";

  //   generate the token
  const token = await generateToken({ userId: user._id });

  // save on tokens table
  await TokenModel.create({
    user: user._id,
    token,
  });

  //   returning
  return {
    email,
    token,
    userId: user._id,
  };
};

const logout = async (payload) => {
  // taking value
  const { userId, token } = payload;

  //   remove token from db
  return TokenModel.deleteOne({ user: userId, token });
};

// check if role is valid or not
const isValidRole = async (role) => {
  return await Constant.roles.includes(role.toUpperCase());
};

// check if email is valid or not
const isEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// get user by email, default not fetch password else do
const getUserByEmail = async (email, password = false) => {
  return password
    ? await UserModel.findOne({ email })
    : await UserModel.findOne({ email }).select("-password");
};

// encoding password using bcrypt
const encodePassword = async (password) => {
  const saltRounds = process.env.SALT_ROUNDS;
  return await bcrypt.hash(password, +saltRounds);
};

// check hased password with user input password using bcrypt
const isPasswordCorrect = async (password, correctPassword) => {
  return await bcrypt.compare(password, correctPassword);
};

// generates token
const generateToken = async (payload) => {
  return await jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" });
};

// verify token
const verifyToken = async (payload) => {
  return await jwt.verify(payload.token, process.env.TOKEN_SECRET);
};

// get user token by user & token
const getUserTokenByUserIdAndToken = async (userId, token) => {
  return await TokenModel.findOne({ user: userId, token });
};

// get user by id, default password hidden else do
const getUserById = async (id, password = false) => {
  return password
    ? await UserModel.findOne({ _id: id })
    : await UserModel.findOne({ _id: id }).select("-password");
};

const getBorrowers = async () => {
  return await UserModel.find({ role: Constant.rolesObj.BORROWER }).select(
    "-password"
  );
};

const getLenders = async () => {
  return await UserModel.find({ role: Constant.rolesObj.LENDER }).select(
    "-password"
  );
};

const getLenderById = async (id) => {
  return await UserModel.findOne({
    _id: id,
    role: Constant.rolesObj.LENDER,
  }).select("-password");
};

const requestLoan = async (payload) => {
  // validation
  if (!payload || !payload.borrowerId) throw "Borrower id is required";
  if (!payload || !payload.lenderId) throw "Lender id is required";
  if (!payload || !payload.amount) throw "Amount is required";
  if (!payload || !payload.date) throw "Date is required";

  let { borrowerId, lenderId, amount, date } = payload;
  lenderId = await toMongooseId(lenderId);

  // lender should exists
  const lender = await getLenderById(lenderId);

  //   if not found
  if (!lender) throw "Lender not found";

  // once exists, add data in loans collection
  const loan = new LoanModel({
    borrower: borrowerId,
    lender: lenderId,
    amount,
    submission_date: date,
  });

  // save request
  return await loan.save();
};

const getRequestLoan = async (payload) => {
  //   validations
  if (!payload || !payload.userId) throw "User id is required";
  if (!payload || !payload.role) throw "Role is required";

  // take logged in user id & role
  const { userId, role } = payload;
  let results = [];

  // if admin, fetch all loans
  // else if borrower, fetch only its loan
  // else if lender, fetch only those loans given by him
  if (role === Constant.rolesObj.ADMIN) {
    results = await getLoans();
  } else if (role === Constant.rolesObj.BORROWER) {
    results = await getLoansForBorrower(userId);
  } else if (role === Constant.rolesObj.LENDER) {
    results = await getLoansForLender(userId);
  }

  return results;
};

const toMongooseId = async (id) => {
  return await new mongoose.Types.ObjectId(id);
};

const getLoans = async () => {
  return await LoanModel.find()
    .populate({ path: "borrower", select: "_id name" })
    .populate({ path: "lender", select: "_id name" });
};

const getLoansForBorrower = async (userId) => {
  return await LoanModel.find({ borrower: userId })
    .populate({ path: "borrower", select: "_id name" })
    .populate({ path: "lender", select: "_id name" });
};

const getLoansForLender = async (userId) => {
  return await LoanModel.find({ lender: userId })
    .populate({ path: "borrower", select: "_id name" })
    .populate({ path: "lender", select: "_id name" });
};

const updateLoanStatus = async (payload) => {
  //   validations
  if (!payload || !payload.userId) throw "User id is required";
  if (!payload || !payload.loanId) throw "Loan id is required";
  if (!payload || !payload.borrowerId) throw "Borrower id is required";
  if (!payload || !payload.status) throw "Status is required";
  if (!payload || !payload.role) throw "Role is required";

  let { userId, loanId, borrowerId, status, role } = payload;
  loanId = await toMongooseId(loanId);
  borrowerId = await toMongooseId(borrowerId);

  //   if valid status
  if (!Constant.status.includes(status))
    throw "Status can be Approved/Pending/Rejected";

  // allow only admin/lender to update loan status
  if (role === Constant.rolesObj.BORROWER)
    throw "Only Admin/Lender are allowed to update status";

  // get loan by id, check if it matches with the correct borrower & lender
  const loan = await getLoanById(loanId);

  if (!loan) throw "Loan not found";

  //   borrower should be same for the loan
  if (!loan.borrower.equals(borrowerId))
    throw "Borrower not matched for the loan";

  //   lender should be same for the loan
  if (!loan.lender.equals(userId)) throw "Lender not matched for the loan";

  //   once all validated, update
  loan.status = status;

  return await loan.save();
};

const getLoanById = async (id) => {
  return await LoanModel.findOne({ _id: id });
};

module.exports = {
  register,
  isValidRole,
  isEmail,
  getUserByEmail,
  encodePassword,
  login,
  isPasswordCorrect,
  generateToken,
  verifyToken,
  getUserTokenByUserIdAndToken,
  getUserById,
  logout,
  getBorrowers,
  getLenders,
  requestLoan,
  toMongooseId,
  getLoans,
  getLoansForBorrower,
  getLoansForLender,
  getRequestLoan,
  updateLoanStatus,
  getLoanById,
};
