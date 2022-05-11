const express = require("express");
const router = express.Router();
const db = require("../DB");

//adding user order
router.post("/addUserOrder", (req, res) => {
  const {
    user_id,
    item_id,
    name,
    imagePath,
    quantity,
    price,
    size,
    date,
    status,
    payment,
    isPaid,
  } = req.body;

  const sqlInsert = `INSERT INTO user_order (
    user_id,
    item_id,
    name,
    imagePath,
    quantity,
    price,
    size,
    date,
    status,
    payment,
    isPaid
  ) Value (
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
      user_id,
      item_id,
      name,
      imagePath,
      quantity,
      price,
      size,
      date,
      status,
      payment,
      isPaid,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          err,
        });
      }
      console.log(result);
      return res.json({
        success: true,
      });
    }
  );
});

//remove all item from the cart
router.post("/removeAllOrders/:id", (req, res) => {
  const id = req.params.id;

  sqlDelete = `DELETE FROM user_order WHERE user_id= ?`;

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

//get all order of an user
router.post("/getUserOrder/:id", (req, res) => {
  const id = req.params.id;
  sqlSelect = `Select * from user_order where user_id = ?`;
  db.query(sqlSelect, id, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log(res);
    return res.status(200).send(result);
  });
});

// get all order of every user
router.get("/getAllUsersOrders", (req, res) => {
  const newUserOrderData = [];
  const sqlSelect = `Select user_order.id,
            user_order.user_id, 
            user_order.item_id,
            user_order.name,
            user_order.quantity, 
            user_order.price, 
            user_order.size, 
            user_order.status, 
            user_order.payment, 
            user_order.isPaid,
            users.fname,
            users.lname,
            users.email
            from user_order inner join users on user_order.user_id = users.id`;
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    console.log(result);
    result.map((item) => {
      const data = {
        id: item.id,
        user_id: item.user_id,
        item_id: item.item_id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
        status: item.status,
        payment: item.payment,
        isPaid: item.isPaid,
        fname: item.fname,
        lname: item.lname,
        email: item.email,
      };
      newUserOrderData.push(data);
    });
    // console.log(newUserOrderData);
    return res.send(newUserOrderData);
  });
});

//get order
router.post("/getOrder/:id", (req, res) => {
  const id = req.params.id;
  sqlSelect = `SELECT * FROM user_order where id = ?`;
  db.query(sqlSelect, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        err,
      });
    }
    console.log(result);
    return res.json({
      success: true,
      result,
    });
  });
});

router.post("/updateOrder", (req, res) => {
  const { id, status, payment, isPaid } = req.body;
  sqlUpdateAll = `Update user_order set status = ?, payment= ?, isPaid =? where id = ? `;
  sqlUpdateStatus = `Update user_order set status = ? where id = ? `;
  sqlUpdatePayment = `Update user_order set payment = ? where id = ? `;
  sqlUpdateIsPaid = `Update user_order set isPaid = ? where id = ? `;

  if (status !== "" && payment !== "" && isPaid !== "") {
    db.query(sqlUpdateAll, [status, payment, isPaid, id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          err,
        });
      }
      console.log("Updating order");
      console.log(id, status, payment, isPaid);
      return res.json({
        success: true,
        result,
      });
    });
  }
});

router.post("/cancelOrder/:id", (req, res) => {
  const id = req.params.id;
  sqlUpdate = `Update user_order set status = "Canceled" where id = ?`;
  db.query(sqlUpdate, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
      });
    }
    console.log(result);
    return res.json({
      success: true,
      result,
    });
  });
});

module.exports = router;
