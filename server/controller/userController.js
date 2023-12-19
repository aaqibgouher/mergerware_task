const userService = require("../service/userService");

const register = async (req, res) => {
  try {
    // take value
    const { name, email, password, role } = req.body;

    // calling service
    const data = await userService.register({ name, email, password, role });

    // returnig response
    return res.json({
      status: 200,
      message: "Successfully register",
      data,
    });
  } catch (err) {
    // returning error
    console.log(err, "from register controller");
    return res.json({ status: 400, error: err });
  }
};

const login = async (req, res) => {
  try {
    // take value
    const { email, password } = req.body;

    // calling service
    const data = await userService.login({ email, password });

    // returnig res
    return res.json({
      status: 200,
      message: "Successfully login",
      data,
    });
  } catch (err) {
    // returnnig error
    console.log(err, "from login controller");
    return res.json({ status: 400, error: err });
  }
};

const logout = async (req, res) => {
  try {
    // calling service
    const data = await userService.logout({
      userId: req.user._id,
      token: req.token,
    });

    // returning res
    return res.json({
      status: 200,
      message: "Successfully logout",
      data,
    });
  } catch (error) {
    // returning error
    console.log(error, "from logout controller");
    return res.json({ status: 400, error });
  }
};

const getMe = async (req, res) => {
  try {
    // taking logged in user value from req, since we already pushed the value in req in middleware
    const data = req.user;

    // returnig res
    return res.json({
      status: 200,
      message: "Successfully get me",
      data,
    });
  } catch (error) {
    // returning error
    console.log(error, "from get me controller");
    return res.json({ status: 400, error });
  }
};

const getBorrowers = async (req, res) => {
  try {
    const data = await userService.getBorrowers();

    // returnig res
    return res.json({
      status: 200,
      message: "Successfully get borrowers",
      data,
    });
  } catch (error) {
    // returning error
    console.log(error, "from get borrowers controller");
    return res.json({ status: 400, error });
  }
};

const getLenders = async (req, res) => {
  try {
    const data = await userService.getLenders();

    // returnig res
    return res.json({
      status: 200,
      message: "Successfully get lenders",
      data,
    });
  } catch (error) {
    // returning error
    console.log(error, "from get lenders controller");
    return res.json({ status: 400, error });
  }
};

const requestLoan = async (req, res) => {
  try {
    const { lenderId, amount, date } = req.body;
    const borrowerId = req.user._id;

    const data = await userService.requestLoan({
      borrowerId,
      lenderId,
      amount,
      date,
    });

    // returnig res
    return res.json({
      status: 200,
      message: "Successfully requested loan",
      data,
    });
  } catch (error) {
    // returning error
    console.log(error, "from request loan controller");
    return res.json({ status: 400, error });
  }
};

const getRequestLoan = async (req, res) => {
  try {
    const { _id, role } = req.user;

    const data = await userService.getRequestLoan({ userId: _id, role });

    // returnig res
    return res.json({
      status: 200,
      message: "Successfully get requested loan",
      data,
    });
  } catch (error) {
    // returning error
    console.log(error, "from get requested loan controller");
    return res.json({ status: 400, error });
  }
};

const updateLoanStatus = async (req, res) => {
  try {
    const { _id, role } = req.user;
    const { loanId, borrowerId, status } = req.body;

    const data = await userService.updateLoanStatus({
      userId: _id,
      loanId,
      borrowerId,
      status,
      role,
    });

    // returnig res
    return res.json({
      status: 200,
      message: "Successfully updated the status",
      data,
    });
  } catch (error) {
    // returning error
    console.log(error, "from get requested loan controller");
    return res.json({ status: 400, error });
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  getBorrowers,
  getLenders,
  requestLoan,
  getRequestLoan,
  updateLoanStatus,
};
