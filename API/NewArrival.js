const express = require("express");
const router = express.Router();
const db = require("../DB");

router.get("/getNewArrival", (req, res) => {
  const sqlSelect = "SELECT * FROM new_arrival";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    return res.send(result);
  });
});

//get 1 particular product
router.get("/getNewArrival/:id", (req, res) => {
  const id = req.params.id;
  const sqlSelect = `SELECT * FROM new_arrival where id = ?`;
  db.query(sqlSelect, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    return res.send(result);
  });
});

//addApparels
router.post("/addNewArrival", (req, res) => {
  const name = req.body.name;
  const category = req.body.category;
  const description = req.body.description;
  const color = req.body.color;
  const smallSize = req.body.smallSize;
  const mediumSize = req.body.mediumSize;
  const largeSize = req.body.largeSize;
  const price = req.body.price;
  const imagePath = req.body.imagePath;

  const sqlInsert = `INSERT INTO new_arrival (
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
    sqlInsert,
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

//edit newArrival
router.put("/editNewArrival", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const category = req.body.category;
  const description = req.body.description;
  const color = req.body.color;
  const smallSize = req.body.smallSize;
  const mediumSize = req.body.mediumSize;
  const largeSize = req.body.largeSize;
  const price = req.body.price;
  const imagePath = req.body.imagePath;

  const sqlUpdate = `Update new_arrival SET 
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
    sqlUpdate,
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
router.delete("/newArrival/:id", (req, res) => {
  const id = req.params.id;

  const sqlDelete = `DELETE FROM new_arrival WHERE id = ?;`;
  db.query(sqlDelete, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.send(result);
  });
});

module.exports = router;
