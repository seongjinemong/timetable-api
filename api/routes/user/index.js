const express = require("express");
const router = express.Router();
const ctrl = require("./user.ctrl");

router.post("/login", ctrl.login);
router.get("/checkSessionData", ctrl.checkSessionData);

module.exports = router;
