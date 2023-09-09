const express = require("express");
const router = express.Router();
const db = require("../DB");

//Apparels
//getApparels
router.get("/getApparels", (req, res) => {
  const getApparels = "SELECT * FROM apparels";
  db.query(getApparels, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.send(result);
  });
});

router.get("/getApparels/:id", (req, res) => {
  const id = req.params.id;
  const getApparels = `SELECT * FROM apparels where id = ?`;
  db.query(getApparels, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.send(result?.[0] || result);
  });
});

//addApparels
router.post("/addApparels", (req, res) => {
  const {
    name,
    category,
    description,
    color,
    small_size: smallSize,
    medium_size: mediumSize,
    large_size: largeSize,
    price,
    imagePath,
  } = req.body;

  const addApparels = `INSERT INTO apparels (
          name,
          category,
          description,
          color,
          small_size,
          medium_size,
          large_size,
          price,
          imagePath
          ) VALUE (?,?,?,?,?,?, ?,?,?);`;
  db.query(
    addApparels,
    [
      name,
      category,
      description,
      color,
      smallSize,
      mediumSize,
      largeSize,
      price,
      imagePath,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.send(result);
    }
  );
});

//edit apparels
router.put("/editApparels", (req, res) => {
  const {
    id,
    name,
    category,
    description,
    color,
    small_size: smallSize,
    medium_size: mediumSize,
    large_size: largeSize,
    price,
    imagePath,
  } = req.body;

  const updateApparel = `Update apparels SET 
      name = ?,
      category = ?,
      description = ?,
      color = ?,
      small_size = ?,
      medium_size = ?,
      large_size = ?,
      price = ?,
      imagePath = ?
      WHERE
          id = ?;`;

  db.query(
    updateApparel,
    [
      name,
      category,
      description,
      color,
      smallSize,
      mediumSize,
      largeSize,
      price,
      imagePath,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      return res.send(result);
    }
  );
});

//deleteApparels
router.delete("/deleteApparels/:apparelId", (req, res) => {
  const apparelId = req.params.apparelId;
  //res.send(apparelId);
  const sqlDelete = `DELETE FROM apparels WHERE id = ?;`;
  db.query(sqlDelete, [apparelId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.send(result);
  });
});

router.put("/updateFeature", (req, res) => {
  const id = req.body.id;
  const is_featured = req.body.is_featured;
  const changeFeature = `Update apparels SET is_featured = ? WHERE id = ?;`;
  db.query(changeFeature, [is_featured, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    if (id === null && is_featured === null) {
      console.log("Id is null");
      return res.status(500).send("Null value");
    }
    res.send(result);
  });
});

module.exports = router;
