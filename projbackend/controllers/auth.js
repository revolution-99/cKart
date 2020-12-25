// File Info:: This is the file where the routes are defined this will tell about the working of the routes


// It is a covention to name this parameter (User) similar to that of the name in user.js
const User = require("../models/user");

const { check, validationResult } = require('express-validator');


// Syntax for accessing the jsonwebtoken
var jwt = require('jsonwebtoken');

// Syntax for accessing the expressjwt
var expressJwt = require('express-jwt');

// Have to use exports here. const signup ="..............." is technically correct, but here we have to send these responses. So exports is used.
// This piece of code is used to save the signup route in the data base
exports.signup = (req, res) =>{
    // // It is generally a covention to put "REQ-BODY" in block letter. So that it is found. The reason of using the "req.body" is to access the body parser
    // console.log("REQ-BODY", req.body);
    // res.json({
    //     message: "User Signup"
    // })

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    // Here "new" is used for creating the object "user" from the class of "User"
    const user = new User(req.body);
    // "user.save()" saves the user in the database
    // "(err, user)" is a normal snippet as "(req,res)"
    // ".status(400)" sens an status(error) code
    // The reason of using json is if json is parsed correctly it is easy for the frontend develoer to craft an error meassge based on this responses.
    user.save( (err, user) => {
        if(err ){
            // console.log(err);
            return res.status(400).json({
                err: "Not able to save user in DB"
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    })
};

// This piece of code is used to save the signin route in the data base
exports.signin = (req,res) =>{

    const errors = validationResult(req);
    // This is called the destructuring i.e. from the user we just pick only email and password
    const {email, password} = req.body;
    

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    // "findOne()" finds excatly one match from the database. If there ara several matchings the very first one will be picked
    // In place of "user" we can use "student" or anything etc
    User.findOne({email}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User email is not registered"
            })
        }

        // We have a password in the user.js and we have named it "planpassword" and we have defined a  method of named "authenticate()" in the user. We have just extracted that authenticate password function/method and if the password that we're going to input matches with the plainpassword (which is in the user) then it will be valid.
        if (!user.authenticate(password)) {

            // Here we use the return so that after the password nothing comes. return is used in this testcases

            return res.status(401).json({
                error: "Email and password do not match"
            })
        }

        // Normal syntax for creating a token. It can be found in the documentation of "jsonwebtoken".
        // It passes a key value pair followed by a string which can be anything. In this line instead of using the string multiple times, we have defined it as a SECRET(any name can be given) which is stored in the .env file.
        const token = jwt.sign({_id: user._id}, process.env.SECRET);

        // Put the token into cookie
        // It is also a key value pair followed by an expire. In real world application this expire should be shrinked.
        res.cookie("token", token, {expire: new Date()+ 9999999})

        // Send response to the frontend part
        const {_id, name, email, role} = user;

        // Send the token so that frontend part can store it in the local storage
        return res.json({token, user:{_id, name, email, role}});
    })
    
}

exports.signout = (req, res) => {
    // When an user signsout all the cookies shoul should be cleared up, hence clearCookie(). Here the cookie i.e. created is token
    res.clearCookie("token");
    res.json({
        message: "User sign out successfully"
    });
};

// protected routes

// 1. issignedin checks the user is signed in or not
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    // userProperty works on the auth
    userProperty: "auth"
})
