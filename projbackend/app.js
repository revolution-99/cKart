require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// A single slash (/) is used to go back to the previous folder. You can name it "auth" also since the whole enviroment is og javaScript, but "auth.js" is my preferable and ya it's good. It's just like the img src="" in CSS.

const authRoutes = require("./routes/auth.js");

// DATABASE Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch( () => {
    console.log("Check the spelling. You are wrong here.")
  })
// Just like "myFunc().run().then().catch()" . It's just like a try and catch block. The then portion runs if there is a success in run() otherwise catch() portion runs.

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// MY ROUTES
// After using the "/api", whennever we have to access the websites, we have to put "/api" before it. Because it's the medium through which all the routes will pass.

app.use("/api", authRoutes);

// PORT
const port = process.env.PORT || 3000;
// STARTING A SERVER
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
