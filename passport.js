var localStrategy = require("passport-local").Strategy;
var User = require("./routes/userSchema");

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(
    new localStrategy(function (username, password, done) {

      User.find({ name: username }, function (err, doc) {
        if (err) return console.error(err);
        else {
          if (doc[0].password == password) {

            done(null, doc);
          } else {
            done(null, false);
          }
        }
      });
    })
  );
};
