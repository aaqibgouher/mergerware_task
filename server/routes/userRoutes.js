const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

// USER ROUTES (register, login & logout)
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", authMiddleware.isAuthenticated, userController.logout);
router.get("/me", authMiddleware.isAuthenticated, userController.getMe);
router.get(
  "/borrowers",
  authMiddleware.isAuthenticated,
  userController.getBorrowers
);
router.get(
  "/lenders",
  authMiddleware.isAuthenticated,
  userController.getLenders
);
router.post(
  "/request-loan",
  authMiddleware.isAuthenticated,
  userController.requestLoan
);
router.get(
  "/request-loan",
  authMiddleware.isAuthenticated,
  userController.getRequestLoan
);
router.patch(
  "/request-loan",
  authMiddleware.isAuthenticated,
  userController.updateLoanStatus
);

module.exports = router;
