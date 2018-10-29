const express = require("express"),
  app = express(),
  bp = require("body-parser"),
  mon = require("mongoose"),
  User = require("./models/user.js"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override");
mon.connect("mongodb://localhost:27017/Dinesh",{ useNewUrlParser: true });
app.use(bp.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(
  require("express-session")({
    secret: "Dinesh",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.get("/", function(req, res) {});
function isHelogedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.send({
    success: false,
    message: "login needed"
  });
}
//Home Route
app.get("/home", function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      return res.send({
        success: false,
        message: "Something went wrong"
      });
    }
    return res.send({
      success: true,
      message: users
    });
  });
});

//Register routes
app.post("/register", function(req, res) {
  const newUser = new User({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  });
  User.register(newUser, req.body.password, function(err) {
    if (err) {
      return res.send({
        success: false,
        message: err.message
      });
    } else {
      // console.log("success");
      return res.send({
        success: true,
        message: "SignedUp succesfully"
      });
    }
  });
});

//login Routes
app.get("/login", function(req, res) {
  return res.send({
    success: false,
    message: "Cannot signIn"
  });
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failiureRedirect: "/login"
  })
);
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/home");
});
const port = 3001 || process.env.port;
app.listen(port, function() {
  console.log(`server started ${port}`);
});
