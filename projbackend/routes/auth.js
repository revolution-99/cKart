// This ia the file where all the routes are declared mainly used for naming purposes

var express = require('express')
// The 'R' in this 'Router' should be capital.
var router = express.Router();

// Syntax for accessing the express validator
const { check } = require("express-validator");

// It is the defalut syntax like the object
const {signout, signup, signin, isSignedIn} = require("../controllers/auth");

// The validator should be placed after the route ("/signup" here) and before the controller(signup here)

// This is the signup router
router.post("/signup", [
    check('name', 'name must be at least 3 charachters long').isLength({ min: 5 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 })

], signup);

// This is the signin router
router.post("/signin", [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({ min: 5 })

], signin);

router.get("/signout", signout);

router.get("/testroute",  (req, res)=>{
    res.send("A Protected isSignedIn route")
})
module.exports = router;