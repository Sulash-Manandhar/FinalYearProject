import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "../stylesheets/users.module.css";

export const Dashboard = () => {
  //useState
  const [orderData, setOrderData] = useState([]);

  const [orderStatus, setOrderStatus] = useState("");
  const [orderPayment, setOrderPayment] = useState("");
  const [orderIsPaid, setOrderIsPaid] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4600/order/getAllUsersOrders`)
      .then((res) => {
        //set data
        setOrderData(res.data);

        console.log(res.data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, []);

  const updateUserOrderData = (id) => {
    const newUserOrderData = {
      id,
      status: orderStatus,
      payment: orderPayment,
      isPaid: orderIsPaid,
    };
    const tempOrderData = orderData.filter((item) => item.id === id);
    if (orderStatus === "") {
      newUserOrderData.status = tempOrderData[0].status;
    }
    if (orderPayment === "") {
      newUserOrderData.payment = tempOrderData[0].payment;
    }
    if (orderIsPaid === "") {
      newUserOrderData.isPaid = tempOrderData[0].isPaid;
    }

    console.log(newUserOrderData);
    axios
      .post("http://localhost:4600/order/updateOrder", newUserOrderData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    console.log(id);
  };

  return (
    <div className={style.main}>
      {/* Header  */}
      <div className={style.header}>
        <span>Manage Users Orders</span>
      </div>

      {/* Clearfix  */}
      <div className={style.clearfix}> </div>
      <hr />

      {/* Table Data  */}
      <table className={style.table}>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>User Name</th>
            <th>Product Id</th>
            <th>Price</th>
            <th>Quantity</th>

            <th>Payment</th>
            <th>Status</th>
            <th>isPaid</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>
                {item.fname} {item.lname}
              </td>
              <td>{item.item_id}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>

              {/* Payment Method  */}
              <td>
                <select
                  id="payment"
                  className="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  onChange={(e) => {
                    e.preventDefault();
                    setOrderPayment(e.target.value);
                  }}
                >
                  <option defaultValue={item.payment}>{item.payment}</option>
                  {/* Cash on Delivery  */}
                  {item.payment !== "Cash On Delivery" ? (
                    <option value="Cash On Delivery">Cash On Delivery</option>
                  ) : null}
                  {/* E-Payment  */}
                  {item.payment !== "E-payment" ? (
                    <option value="E-Payment">E-Payment</option>
                  ) : null}
                </select>
              </td>

              {/* status  */}
              <td>
                <select
                  id="status"
                  className="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  onChange={(e) => {
                    e.preventDefault();
                    setOrderStatus(e.target.value);
                  }}
                >
                  <option defaultValue={item.status}>{item.status}</option>
                  {/* Pending  */}
                  {item.status !== "Pending" ? (
                    <option value="Pending">Pending</option>
                  ) : null}
                  {/* Packaged */}
                  {item.status !== "Packaged" ? (
                    <option value="Packaged">Packaged</option>
                  ) : null}
                  {/* On The Way */}
                  {item.status !== "On The Way" ? (
                    <option value="On The Way">On The Way</option>
                  ) : null}
                  {/* Delivered */}
                  {item.status !== "Delivered" ? (
                    <option value="Delivered">Delivered</option>
                  ) : null}
                  {/* Canceled */}
                  {item.status !== "Canceled" ? (
                    <option value="Canceled">Canceled</option>
                  ) : null}
                </select>
              </td>
              {/* isPaid  */}
              <td>
                <select
                  id="is-paid"
                  className="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  onChange={(e) => {
                    e.preventDefault();
                    setOrderIsPaid(e.target.value);
                  }}
                >
                  <option defaultValue={item.isPaid}>{item.isPaid}</option>
                  {/* IsPaid = 1  */}
                  {item.isPaid !== "1" ? <option value="1">1</option> : null}
                  {/* IsPaid = 0 */}
                  {item.isPaid !== "0" ? <option value="0">0</option> : null}
                </select>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    updateUserOrderData(item.id);
                  }}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
