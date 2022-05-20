import React, { useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import CartProductItem from "./CartProductItem";

export default function Cart() {
  const { openCart, setOpenCart, cartProducts, summaryPrice } = useCart();

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
                <div className="sum-price">{summaryPrice}грн</div>
              </div>
              <button className="btn-primary">Замовити</button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
