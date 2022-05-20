import React, { useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import CartProductItem from "./CartProductItem";
import { useAuth } from "../contexts/AuthContext";
import Api from "../api";

export default function Cart() {
  const { currentUser } = useAuth();
  const { openCart, setOpenCart, cartProducts, setCartProducts, summaryPrice } =
    useCart();

  const createOrder = async () => {
    const orderDetails = {
      products: cartProducts,
      orderPrice: summaryPrice,
    };

    if (cartProducts.length === 0) {
      alert("Ваш кошик пустий");
      return;
    }

    await Api.createOrder(currentUser.uid, orderDetails);
    setCartProducts([]);
    setOpenCart(false);
    alert("Ваша заявка прийнята. Очікуйте смс повідомлення");
  };

  const handleOrderClick = () => {
    if (!currentUser) {
      alert("Ви не авторизовані. Щоб зробити змовлення увійдіть в акаунт");
    } else {
      createOrder();
    }
  };

  return (
    openCart && (
      <div
        className="modal-background"
        onClick={(e) => {
          if (e.target.className === "modal-background") {
            setOpenCart(false);
          }
        }}
      >
        <div className="cart">
          <div className="cart-content">
            <h1>Кошик</h1>
            <div className="cart-products-list">
              {cartProducts.length === 0 ? (
                <div className="empty-cart">Кошик порожній</div>
              ) : (
                cartProducts.map((cartItem) => {
                  return (
                    <CartProductItem cartItem={cartItem} key={cartItem.id} />
                  );
                })
              )}
            </div>
            <div className="cart-bottom">
              <div>
                <div>Сумма:</div>
                <div className="sum-price">{summaryPrice} грн</div>
              </div>
              <button className="btn-primary" onClick={handleOrderClick}>
                Замовити
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
