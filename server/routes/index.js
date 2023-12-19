const express = require("express");
const router = express.Router();

// import all routes
const userRoutes = require("./userRoutes");

// use route
router.use("/users", userRoutes);

// export
module.exports = router;
