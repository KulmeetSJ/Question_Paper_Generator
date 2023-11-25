const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();
const app = express();
const passport = require("passport");
const users = require("./routes/users");

const generateRouter = require('./routes/generate');

const cors = require('cors');
// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(cors());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there



//Passport middleware
app.use(passport.initialize());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});



//Passport config
require("./config/passport")(passport);


app.use("/users", users);
//app.use("/generate", generate);
app.use('/generate', generateRouter);


app.listen(port, () => console.log(`Server up and running on port ${port} !`));

