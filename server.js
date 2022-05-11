const PORT = 4600;
const express = require("express");
const fileUpload = require("express-fileupload");
var cors = require("cors");
const mysql2 = require("mysql2");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passportLocal = require("passport-local").Strategy;

//API
const accessories = require("./API/Accessories");
const users = require("./API/User");
const apparels = require("./API/Apparels");
const drinkware = require("./API/Drinkware");
const wishlist = require("./API/WishList");
const cart = require("./API/AddToCart");
const newArrival = require("./API/NewArrival");
const order = require("./API/Order");
const passport = require("passport");

const app = express();

//mysql connection
const db = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "otaku_db",
});

//app use
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secret"));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
//passport congif
require("./API/Passport")(passport);

//Routes
app.use("/accessories", accessories);
app.use("/users", users);
app.use("/apparels", apparels);
app.use("/drinkware", drinkware);
app.use("/wishlist", wishlist);
app.use("/cart", cart);
app.use("/order", order);
app.use("/newArrival", newArrival);

//welcome screen
const display = `
    <h1>Welcome to express server</h1>
    <hr>
    <span>Server is started...</span>
`;
app.get("/", (req, res) => res.send(display));
app.get("/success", (req, res) => {
  console.log(req.user);
  res.send(true);
});
app.get("/fail", (req, res) => {
  console.log(req.user);
  res.send(false);
});

//UPLOAD ENDPOINT
app.post("/uploads", cors(), (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file upload" });
  }
  const file = req.files.file;
  file.mv(`${__dirname}/otaku-emporium/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  }); //path for file upload
});

//hero slider
app.get("/getSlider", (req, res) => {
  const getSilder = "SELECT * FROM slide_show";
  db.query(getSilder, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.send(result);
    // console.log(result);
  });
});
app.delete("/deleteSlider/:slideId", (req, res) => {
  const slideId = req.params.slideId;
  const sqlDelete = `DELETE FROM slide_show WHERE id = ?;`;
  db.query(sqlDelete, [slideId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

app.post("/addSlider", (req, res) => {
  const title = req.body.title;
  const imagePath = req.body.imagePath;

  const addSlider = `INSERT INTO slide_show(
    title,
    imagePath
    ) VALUE 
    (?, ?);`;
  db.query(addSlider, [title, imagePath], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

//nav_links
app.get("/getNavLinks", (req, res) => {
  const getNavLinks = "SELECT * FROM nav_links";
  db.query(getNavLinks, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.send(result);
    //console.log(result);
  });
});

app.delete("/deleteNavLink/:navId", (req, res) => {
  const navId = req.params.navId;
  const sqlDelete = `DELETE FROM nav_links WHERE id = ?;`;
  db.query(sqlDelete, [navId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

app.post("/addLink", (req, res) => {
  const tab_name = req.body.tab_name;
  const tab_link = req.body.tab_link;

  const addLink = `INSERT INTO nav_links(
    tab_name,
    tab_link
    ) VALUE 
    (?, ?);`;
  db.query(addLink, [tab_name, tab_link], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

//listening express at port 4600
app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
