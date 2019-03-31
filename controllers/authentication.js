const jwt = require("jwt-simple");
const config = require("../config");

const User = require("../models/user");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}
exports.signIn = function(req, res, next) {
  res.send({ token: tokenForUser(req.user) });
};

exports.signUp = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "you must provide email and password" });
  }
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(422).send({ error: "email is in use" });
    }
  });

  const user = new User({
    email: email,
    password: password
  });

  user.save(err => {
    if (err) {
      return next(err);
    }

    res.json({ token: tokenForUser(user) });
  });
};

// adding comment in authentication.js
