const express = require("express");
const session = require('express-session');
const passport = require("passport");
const cors = require("cors");
const { initAPI } = require("./src/API/initAPI.js");
require('dotenv').config({path: `./${process.env.APP_ENV}.env`});

const app = express();

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false}
}));

app.use(cors({
    origin: "http://localhost:8081",
    optionsSuccessStatus: 200,
    credentials: true
}));

app.use(passport.initialize());
app.use(passport.session());

const authRouter = require('./src/routes/auth/auth.js');
const mobileAuthRouter = require('./src/routes/auth/mobileAuth.js');
const usersRouter = require('./src/routes/users/users.js');
const areasRouter = require('./src/routes/areas/areas.js');
const servicesRouter = require('./src/routes/services/services.js');
const aboutRouter = require('./src/routes/about.js');

app.use('/api/auth', authRouter);
app.use('/api/auth/mobile', mobileAuthRouter);
app.use('/api/users', usersRouter);
app.use('/api/areas', areasRouter);
app.use('/api/services', servicesRouter);
app.use('/', aboutRouter);

app.listen(8080, () => {
    console.log(`AREA server launched on http://localhost:8080/`);
    initAPI();
});