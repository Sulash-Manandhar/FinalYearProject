const db = require("../DB");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //match user
      SQLquery = `SELECT * FROM USERS WHERE email = ? `;
      db.query(SQLquery, [email], (err, user) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
        if (user.length == 0) {
          return done(null, false, { msg: "Email is not registered." });
        }

        if (user[0].ban === 1) {
          return done(null, false, {
            msg: `Sorry, '${user[0].email}' is banned.`,
          });
        }

        //match password
        bcrypt.compare(password, user[0].password, (error, isMatch) => {
          if (error) {
            console.log(error);
            return error;
          }

          if (isMatch) {
            return done(null, user[0]);
          } else {
            return done(null, false, { msg: "Password is incorrect. " });
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    console.log("Serializing the user..");
    console.log(user.id);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log(id);
    SQLquery = "Select * from users where id = ?";
    db.query(SQLquery, [id], (err, user) => {
      const userInformation = {
        id: user[0].id,
        fname: user[0].fname,
        lname: user[0].lname,
        email: user[0].email,
        phone: user[0].phone,
        province: user[0].province,
        district: user[0].district,
        location: user[0].location,
      };
      return done(err, userInformation);
    });
  });

  // passport.deserializeUser((user, done) => {
  //   // console.log(user);
  //   done(null, user);
  // });
};
