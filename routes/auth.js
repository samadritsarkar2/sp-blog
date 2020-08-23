var express = require("express");
var router = express.Router();
const { check, validationResult } = require('express-validator');

const {signout, signup, signin, isSignedin } = require("../controllers/auth");

router.get("/signout", signout);

router.post("/signup",[ 
    check("email").isEmail().withMessage("Not a valid email"),
    check("username").isAlphanumeric().withMessage("username should be alphanumeric"),
    check("password").isLength({min: 3, max : 15}).withMessage("Password should be more than 3 or less than 15 characters"),
], signup);

router.post("/signin",[ 
    check("email").isEmail().withMessage("Not a valid email"),
    check("password").isLength({min: 3, max : 15}).withMessage("Password should be more than 3 or less than 15 characters"),
], signin);

router.get("/test", isSignedin, (req,res)=>{
    res.json(req.auth);
})

module.exports = router;