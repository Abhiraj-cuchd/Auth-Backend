const cookieSession = require('cookie-session');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const passportSetup = require('./passport.js');
const authRoute = require('./routes/auth.route.js');

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_DB).then(() => {
    console.log("Connected to the Database")
}).catch((err) => {
    console.log(err)
})

app.use(cookieSession({
    name: "session",
    keys: ["GLInterview"],
    maxAge: 24 * 60 * 60 * 100
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    credentials: true
}));


app.use("/auth", authRoute);

app.listen("5000", () => {
    console.log("Server is running on port 5000");
});