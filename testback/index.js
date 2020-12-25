const express = require("express");

const app = express();
const port = 3000;
app.get('/login' , (req,res) => res.send("Hello Chand. You are logged in now."))
app.get('/signup' , (req,res) => res.send("Hello Chand. You can signup now."))
app.get('/signout' , (req,res) => res.send("Hello Chand. You are logged out now."))
app.get('/contact' , (req,res) => res.send("Hello Chand. You can contact us here."))

const admin = (req, res) => {
    res.send("You are in admin dashboard now.")
}

const isAdmin = (req, res, next) =>{
    console.log(" isAdmin is running");
    next();
}
app.get('/admin', isAdmin, admin)

app.get('/admin', (req, res) => {
    res.send("You are in admin page now.")
})

app.listen(port, () => (console.log("Server is running now....")))


