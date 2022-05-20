import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../api";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { currentUser } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    Api.getUser(currentUser.uid).then((userResponse) => {
      setUserInfo(userResponse.data());
      Api.getUserOrders(currentUser.uid).then((ordersResponse) => {
        console.log(ordersResponse, "orders");
        setOrders(ordersResponse);
      });
    });
  }, []);

  return (
    <div className="page user-page">
      {userInfo ? (
        <>
          <div className="user-info">
            <div
              className="user-photo"
              style={{
                backgroundImage: `url(${
                  userInfo.photoURL
                    ? userInfo.photoURL
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png"
                })`,
              }}
            ></div>
            <div className="user-details">
              <div className="user-name">{userInfo.name}</div>
              <div className="user-email">{userInfo.email}</div>
            </div>
          </div>
          <div className="user-history">
            <h2 className="user-history-title">Історія замовлень:</h2>

            <div className="orders-list">
              {orders.length === 0 ? (
                <div className="no-orders">
                  користувач ще не робив замовлень
                </div>
              ) : (
                orders.map((order) => {
                  return (
                    <div className="order-list-item" key={order.id}>
                      <div className="order-id">{order.id}</div>
                      <div className="order-price">{order.orderPrice} грн</div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="no-info">No info</div>
      )}
    </div>
  );
}
