const express = require("express");
const router = express.Router();
const ctrl = require("./index.ctrl");

router.use("/user", require("./user"));

router.get("/", ctrl.index);

module.exports = router;