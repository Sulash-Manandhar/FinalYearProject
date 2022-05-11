const express = require("express");
const router = express.Router();
const db = require("../DB");
//Accessories
//getAccessories
router.get("/getAccessories", (req, res) => {
  const getAccessories = "SELECT * FROM accessories";
  db.query(getAccessories, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.send(result);
  });
});

router.get("/getAccessories/:id", (req, res) => {
  editId = req.params.id;
  const getAccessories = `SELECT * FROM accessories where id = ?`;
  db.query(getAccessories, [editId], (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.send(result);
  });
});
//add accessories
router.post("/addAccessoires", (req, res) => {
  const name = req.body.name;
  const category = req.body.category;
  const description = req.body.description;
  const color = req.body.color;
  const price = req.body.price;
  const imagePath = req.body.imagePath;

  const addApparels = `INSERT INTO accessories (
          name,
          category,
          description,
          color,
          price,
          imagePath
          )
          VALUE (?,?,?,?,?,?);`;
  db.query(
    addApparels,
    [name, category, description, color, price, imagePath],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.send(result);
    }
  );
});

//editaccessories (editAccessories)
router.put("/editAccessories", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const category = req.body.category;
  const description = req.body.description;
  const color = req.body.color;
  const price = req.body.price;
  const imagePath = req.body.imagePath;

  const updateAccessories = `Update accessories SET 
      name = ?,
      category = ?,
      description = ?,
      color = ?,
      price = ?,
      imagePath = ?
      WHERE
          id = ?;`;

  db.query(
    updateAccessories,
    [name, category, description, color, price, imagePath, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.send(result);
    }
  );
});

//deleteAccessories
router.delete("/deleteAccessories/:accessorieId", (req, res) => {
  const accessorieId = req.params.accessorieId;
  const sqlDelete = `DELETE FROM accessories WHERE id = ?;`;
  db.query(sqlDelete, [accessorieId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});
module.exports = router;
