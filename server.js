const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT;
const passport = require("passport");
const users = require("./routes/api/users");
const app = express();

// Body parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({extended: true, limit: '10kb'}));

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize(undefined));

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

app.listen(PORT, () => console.log(`Server up and running on port ${PORT} !`));