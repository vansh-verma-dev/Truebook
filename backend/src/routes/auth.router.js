const { SignUp } = require("../controllers/auth.controller");
const express = require("express");

const router = express.Router();

router.post("/signUp" , SignUp);

module.exports = router ;