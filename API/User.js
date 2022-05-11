const express = require("express");
const router = express.Router();
const db = require("../DB");
const bcrypt = require("bcrypt");
const passport = require("passport");
const nodemailer = require("nodemailer");

//Users
//fetch user data
router.get("/getUsers", (req, res) => {
  const getUsers = "SELECT * FROM users";
  db.query(getUsers, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.send(result);
  });
});

//ban users
router.put("/banUser", (req, res) => {
  const userId = req.body.userId;
  const banValue = req.body.banValue;

  const sqlUpdate = `UPDATE users SET ban = ? WHERE id = ?;`;
  db.query(sqlUpdate, [banValue, userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    res.send(result);
  });
});

//verify user
router.get("/isuserVerified/:id", (req, res) => {
  const id = req.params.id;
  sqlSelect = `Select * from users where id = ?`;
  db.query(sqlSelect, id, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log(result);
    const user = {
      fname: result[0].fname,
      lname: result[0].lname,
      email: result[0].email,

      verified: result[0].verified,
    };
    return res.status(200).send(user);
  });
});

//generate random number
function generateRandom(min = 1109, max = 9989) {
  // find diff
  let difference = max - min;

  // generate random number
  let rand = Math.random();

  // multiply with difference
  rand = Math.floor(rand * difference);

  // add with min value
  rand = rand + min;

  return rand;
}

//email verification code
router.post("/sendEmailVerificationCode", (req, res) => {
  const { fname, email } = req.body;
  randomNumber = generateRandom();
  const output = `
  <div>
  <h1>Otaku Emporium</h1>
  <h4>Hi ${fname},</h4>
  <p>
    We are happy that you signed up for Otaku Emporium. TO start
    exploring the Otaku Emporium, Please confirm your email address.
  </p>
  <h1>${randomNumber}</h1>
  <p>Paste the above code to verify your Account.</p>
</div>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "suyash.manandhar@outlook.com",
    service: "hotmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "suyash.manandhar@outlook.com", // generated ethereal user
      pass: "Sula$h123", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = transporter.sendMail(
    {
      from: '"Otaku Emporium-get your order now!" <suyash.manandhar@outlook.com>', // sender address
      to: email, // list of receivers
      subject: "Otaku Emporium - Verify your Account", // Subject line
      text: "Email verification ", // plain text body
      html: output, // html body
    },
    (err, success) => {
      if (err) {
        console.log(err);
      } else {
        console.log(success);
        res.json({
          success: true,
          verificationCode: randomNumber,
        });
      }
    }
  );

  // console.log("Message sent: %s", info.messageId);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
});

router.post("/resetUserPassword", (req, res) => {
  let errors = [];
  const { id, password, confirmPassword } = req.body;
  if (password.length < 6) {
    errors.push({ msg: "Password should be atleast 6 characters." });
  }
  if (password !== confirmPassword) {
    errors.push({ msg: "Passwords do not match" });
  }
  if (errors.length > 0) {
    console.log(errors);
    return res.status(500).json({
      success: false,
      errors,
    });
  } else {
    let userNewPassword = password;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(userNewPassword, salt, (err1, hash) => {
        if (err1) {
          console.log(err);
        }
        userNewPassword = hash;
        const update = `Update users SET password = ? WHERE id = ?`;
        db.query(update, [userNewPassword, id], (e, r) => {
          if (e) {
            console.log(e);
            return res.status(500).send(e);
          }
          return res.send({ success: true });
        });
      });
    });
  }
});

//change password verification code
router.post("/sendChangePasswordVerificationCode", (req, res) => {
  const { fname, email } = req.body;
  randomNumber = generateRandom();
  const output = `
  <div>
  <h1>Otaku Emporium</h1>
  <h4>Hi ${fname},</h4>
  <p>
    Forgot Password?
    We received a request to reset the password for your account.
    <br/>
    To reset your password, copy the below code and paste in the webite.
  </p>
  <h1>${randomNumber}</h1>
  <p>Paste the above code to change your Account password.</p>
</div>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "suyash.manandhar@outlook.com",
    service: "hotmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "suyash.manandhar@outlook.com", // generated ethereal user
      pass: "Sula$h123", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = transporter.sendMail(
    {
      from: '"Otaku Emporium-get your order now!" <suyash.manandhar@outlook.com>', // sender address
      to: email, // list of receivers
      subject: "Otaku Emporium - Reset your password", // Subject line
      text: "Reset Password ", // plain text body
      html: output, // html body
    },
    (err, success) => {
      if (err) {
        console.log(err);
      } else {
        console.log(success);
        res.json({
          success: true,
          verificationCode: randomNumber,
        });
      }
    }
  );

  // console.log("Message sent: %s", info.messageId);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
});

//change user verification to true
router.post("/setUserVerificationTrue/:id", (req, res) => {
  const id = req.params.id;
  sqlUpdate = `update users set verified = 1 where id = ? `;
  db.query(sqlUpdate, id, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send(error);
    }

    res.status(200).send(result);
  });
});

//toggle verification (admin)
router.post("/toggleUserVerification", (req, res) => {
  const { id, verifyValue } = req.body;
  sqlUpdate = `update users set verified = ? where id = ? `;
  db.query(sqlUpdate, [verifyValue, id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        error,
      });
    }
    console.log(result);
    return res.status(200).send(result);
  });
});

//verifyEmailAddress; check if email address exits
router.post("/verifyEmailAddress", (req, res) => {
  const email = req.body.email;
  sqlSelect = `Select * from users where email = ?`;
  db.query(sqlSelect, email, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log(result);
    if (!result.length) {
      return res.status(500).json({
        success: false,
        msg: "Email address is not registered.",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: result[0].id,
        fname: result[0].fname,
        lname: result[0].lname,
        email: result[0].email,
        phone: result[0].phone,
        province: result[0].province,
        district: result[0].district,
        location: result[0].location,
        profile_image: result[0].profile_image,
      },
    });
  });
});

//delete users
router.delete("/deleteUser/:userId", (req, res) => {
  const userId = req.params.userId;
  //res.send(userId);
  const sqlDelete = `DELETE FROM users WHERE id = ?;`;
  db.query(sqlDelete, [userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.json({
      success: true,
      msg: "You are loggeed successfully.",
    });
  });
});

//handle user registration
// verify and add a new user
router.post("/addUser", (req, res) => {
  let errors = [];

  const {
    fname,
    lname,
    email,
    password,
    RePassword,
    phone,
    district,
    location,
    province,
  } = req.body;

  if (fname == "" || lname == "" || email == "" || location == "") {
    errors.push({ msg: "Details are missing." });
  }

  //check phone number length
  if (phone.length !== 10) {
    errors.push({ msg: "Enter a valid phone number" });
  }

  //check if passwords match.
  if (password !== RePassword) {
    errors.push({ msg: "Passwords do not match." });
  }

  //check password length
  if (password.length < 6) {
    errors.push({ msg: "Passwords should be at least 6 characters." });
  }
  if (errors.length > 0) {
    console.log(errors);
    res.send(errors);
  } else {
    //validating the email address
    SQLquery = `SELECT * FROM USERS WHERE email = ? `;
    db.query(SQLquery, [email], (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      if (!result.length == 0) {
        errors.push({ msg: "Email adress is already registered." });
        res.send(errors);
      } else {
        //creating new uer object
        let newUser = {
          fname: fname,
          lname: lname,
          mail: email,
          password: password,
          phone: phone,
          district: district,
          location: location,
          province: province,
          ban: 0,
        };

        //hasded password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              console.log(err);
            }
            //set password to hash
            newUser.password = hash;

            //add user to the database;
            const insert = `INSERT INTO USERS (
              fname,
              lname,
              email,
              password,
              phone,
              district,
              location,
              province,
              ban
            ) value(
              ?,?,?,?,?,?,?,?,?
            )`;
            db.query(
              insert,
              [
                newUser.fname,
                newUser.lname,
                newUser.mail,
                newUser.password,
                newUser.phone,
                newUser.district,
                newUser.location,
                newUser.province,
                newUser.ban,
              ],
              (e, r) => {
                if (e) {
                  console.log(e);
                  res.send(e);
                }
                res.send(true);
              }
            );
          });
        });
      }
    });
  }
});

//handle user login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info) {
      console.log(info);
    }
    if (!user) {
      return res.status(403).json({
        info,
        success: false,
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      } else {
        console.log(user);
        return res.json({
          msg: "logged in",
          success: true,
          user: {
            id: user.id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            phone: user.phone,
            province: user.province,
            district: user.district,
            location: user.location,
            profile_image: user.profile_image,
          },
        });
      }
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  return res.json({
    success: true,
    msg: "You are loggeed out successfully.",
  });
});

router.get("/loggedInUser", (req, res) => {
  console.log("user:" + req.user);
  return res.json({ user: req.user });
});

router.post("/change-password", (req, res) => {
  let errors = [];
  const { id, oldPassword, newPassword1, newPassword2 } = req.body;
  if (newPassword1.length < 6) {
    errors.push({ msg: "Password should be atleast 6 characters." });
  }
  if (newPassword1 !== newPassword2) {
    errors.push({ msg: "Passwords do not match" });
  }
  if (errors.length > 0) {
    console.log(errors);
    res.send(errors);
  } else {
    //validating the old password
    SQLquery = `SELECT * FROM USERS WHERE id = ? `;
    db.query(SQLquery, [id], (err, user) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        let userNewPassword = newPassword1;

        //check the old password
        bcrypt.compare(oldPassword, user[0].password, (error, isMatch) => {
          if (error) {
            console.log(error);
            return error;
          }
          //if password is matched
          if (isMatch) {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(userNewPassword, salt, (err1, hash) => {
                if (err1) {
                  console.log(err);
                }
                userNewPassword = hash;
                const update = `Update users SET password = ? WHERE id = ?`;
                db.query(update, [userNewPassword, id], (e, r) => {
                  if (e) {
                    console.log(e);
                    res.send(e);
                  }
                  res.send({ success: true });
                });
              });
            });
          } else {
            //if password does not match
            errors.push({ msg: "Password is incorrect." });
            return res.send(errors);
          }
        });
      }
    });
  }
});

router.post("/updateUser", (req, res) => {
  const { id, fname, lname, phone } = req.body;
  const errors = [];

  //check for null values
  if (fname === "" || lname === "" || phone === "") {
    errors.push({ msg: "Fields should not be empty." });
  }

  //check if phone number is valid
  if (phone.length != 10) {
    errors.push({ msg: "Enter a valid phone number." });
  }

  //check if there is any errors
  if (errors.length > 0) {
    console.log(errors);
    return res.status(400).json(errors);
  } else {
    console.log(errors);
    //update data
    updateSQL = `Update users SET fname = ?, lname = ?, phone =? WHERE id = ?`;
    db.query(updateSQL, [fname, lname, phone, id], (err, result) => {
      if (err) {
        res.status(400).json(err);
      }
      db.query("Select * from users where id = ?", [id], (e, r) => {
        if (e) {
          console.log(e);
        }
        res.status(200).json({
          user: {
            id: r[0].id,
            fname: r[0].fname,
            lname: r[0].lname,
            email: r[0].email,
            phone: r[0].phone,
            province: r[0].province,
            district: r[0].district,
            location: r[0].location,
          },
        });
      });
    });
  }
});

router.post("/updateUserProfile", (req, res) => {
  const { id, profile_image } = req.body;
  sqlUpdate = `update users set profile_image = ? where id = ?;`;
  db.query(sqlUpdate, [profile_image, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log(res);
    return res.status(200).json({
      profile_image,
      success: true,
    });
  });
});

router.post("/userSubscription", (req, res) => {
  const email = req.body.email;
  sqlSelect = `Select * from subscribed_user where user_email =?`;
  db.query(sqlSelect, email, (err1, result1) => {
    if (err1) {
      console.log(err1);
      return res.status(500).json({
        success: false,
        err,
      });
    }
    if (result1.length) {
      return res.json({
        success: true,
        msg: "User all ready subscribed",
      });
    } else {
      sqlInsert = `Insert into subscribed_user (user_email) value (?)`;
      db.query(sqlInsert, [email], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            msg: "Error",
          });
        }
        console.log(res);
        return res.status(200).json({
          success: true,
          msg: "User is now subscribed",
        });
      });
    }
  });
});

module.exports = router;
