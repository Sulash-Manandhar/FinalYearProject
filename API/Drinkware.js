const express = require("express");
const router = express.Router();
const db = require("../DB");

//drinkware
//getDrinkware
router.get("/getDrinkware", (req, res) => {
  const getDrinkware = "SELECT * FROM drinkware";
  db.query(getDrinkware, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.send(result);
  });
});

router.get("/getDrinkware/:id", (req, res) => {
  const id = req.params.id;
  const getDrinkware = "SELECT * FROM drinkware where id = ?";
  db.query(getDrinkware, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.send(result);
  });
});

//addDrinkware
router.post("/addDrinkware", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const color = req.body.color;
  const price = req.body.price;
  const imagePath = req.body.imagePath;

  const addDrinkware = `INSERT INTO drinkware (
          name,
          description,
          color,
          price,
          imagePath
          )
          VALUE (?,?,?,?,?);`;
  db.query(
    addDrinkware,
    [name, description, color, price, imagePath],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.send(result);
    }
  );
});

//editDrinkware
router.put("/updateDrinkware", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  const color = req.body.color;
  const price = req.body.price;
  const imagePath = req.body.imagePath;

  const updateDrinkware = `Update drinkware SET 
      name = ?,
      description = ?,
      color = ?,
      price = ?,
      imagePath = ?
      WHERE
          id = ?;`;

  db.query(
    updateDrinkware,
    [name, description, color, price, imagePath, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.send(result);
    }
  );
});

//deleteDrinkware
router.delete("/deleteDrinkware/:drinkwareId", (req, res) => {
  const drinkwareId = req.params.drinkwareId;
  const sqlDelete = `DELETE FROM drinkware WHERE id = ?;`;
  db.query(sqlDelete, [drinkwareId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

module.exports = router;
