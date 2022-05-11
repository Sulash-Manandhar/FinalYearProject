const express = require("express");
const router = express.Router();
const db = require("../DB");

//check if that item is wishlisted for an user
router.post("/checkIsWished", (req, res) => {
  const { user_id, item_id, category } = req.body;
  console.log("DEbug:", user_id, item_id, category);
  const sqlFind = `Select * from user_wishlist where user_id = ? and item_id = ? and category= ?`;
  db.query(sqlFind, [user_id, item_id, category], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log("check wish list result:", result);
    res.send(result);
  });
});

//add a item to wishlist for an user
router.post("/addWishlist", (req, res) => {
  const {
    user_id,
    item_id,
    category,
    item_name,
    item_price,
    item_imagePath,
    pageLink,
  } = req.body;

  const sqlInsert = `INSERT INTO user_wishlist(
    USER_ID,
    ITEM_ID,
    CATEGORY,
    NAME,
    PRICE,
    imagePath,
    pageLink
) VALUE (
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?
);`;
  db.query(
    sqlInsert,
    [
      user_id,
      item_id,
      category,
      item_name,
      item_price,
      item_imagePath,
      pageLink,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      console.log("Add wishlist:", result);
      return res.send(result);
    }
  );
});

//remove item from wishlist for an user
router.post("/deleteWishlist", (req, res) => {
  const { user_id, item_id, category } = req.body;
  const sqlDelete = `delete from user_wishlist where user_id = ? and item_id = ? and category = ?`;
  db.query(sqlDelete, [user_id, item_id, category], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log("remove wishlist:", result);
    return res.send(result);
  });
});

//remove user all wishlist
router.post("/deleteWishlist/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = `delete from user_wishlist where user_id = ?`;
  db.query(sqlDelete, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log("remove wishlist:", result);
    return res.send(result);
  });
});

router.get("/getAllWishlist/:id", (req, res) => {
  const id = req.params.id;
  const sqlSelect = `Select * from user_wishlist where user_id = ?`;
  db.query(sqlSelect, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log(result);
    res.status(200).send(result);
  });
});

module.exports = router;
