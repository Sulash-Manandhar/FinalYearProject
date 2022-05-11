const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const db = require("../DB");

router.post("/add_to_cart", (req, res) => {
  const {
    item_id,
    user_id,
    name,
    description,
    imagePath,
    quantity,
    price,
    color,
    size,
    pageLink,
    date,
    time,
  } = req.body;
  sqlInsert = `Insert into user_cart(
    item_id,
    user_id,
    name,
    description,
    imagePath,
    quantity,
    price,
    color,
    size,
    pageLink,
    date,
    time
   ) VALUE (
       ?,
       ?,
       ?,
       ?,
       ?,
       ?,
       ?,
       ?,
       ?,
       ?,
       ?,
       ?
   )`;

  db.query(
    sqlInsert,
    [
      item_id,
      user_id,
      name,
      description,
      imagePath,
      quantity,
      price,
      color,
      size,
      pageLink,
      date,
      time,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      console.log(result);
      res.status(200).send(result);
    }
  );
});

//get all item of an user
router.post("/getUserCart/:id", (req, res) => {
  const id = req.params.id;
  sqlSelect = `Select * from user_cart where user_id = ?`;
  db.query(sqlSelect, id, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log(res);
    return res.status(200).send(result);
  });
});

//remove item from the cart
router.post("/removeItem/:id", (req, res) => {
  const id = req.params.id;

  sqlDelete = `DELETE FROM user_cart WHERE id= ?`;

  db.query(sqlDelete, id, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log(result);
    return res.status(200).json({
      id,
      success: true,
    });
  });
});

//remove all item from the cart
router.post("/removeAllItem/:id", (req, res) => {
  const id = req.params.id;

  sqlDelete = `DELETE FROM user_cart WHERE user_id= ?`;

  db.query(sqlDelete, id, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log(result);
    return res.status(200).json({
      id,
      success: true,
    });
  });
});

module.exports = router;
