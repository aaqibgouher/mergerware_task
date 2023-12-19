const express = require("express");
require("dotenv").config();
const router = require("./routes");
const cors = require("cors");
// db
require("./database/config");
const models = require("./model");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/api", router);

// listen
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
