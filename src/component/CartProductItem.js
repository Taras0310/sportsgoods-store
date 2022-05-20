import React, { useEffect, useState } from "react";
import { VscRemove } from "react-icons/vsc";
import { useCart } from "../contexts/CartContext";

export default function CartProductItem({ cartItem }) {
  const { deleteFromCart, changeItemQuantity, countSummaryPrice } = useCart();
  const { id, quantity, productData } = cartItem;
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const quantityHandler = (e) => {
    if (e.currentTarget.value > productData.quantity) {
      setItemQuantity(productData.quantity);
    } else {
      setItemQuantity(e.currentTarget.value);
    }
  };

  useEffect(() => {
    changeItemQuantity(id, parseInt(itemQuantity));
    countSummaryPrice();
  }, [itemQuantity]);

  return (
    <div className="cart-products-item">
      <div
        className="cart-item-photo"
        style={{
          backgroundImage: `url(
          ${
            productData.img
              ? productData.img
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
          }
      )`,
        }}
      ></div>
      <div className="cart-item-info">
        <div className="item-info-brand">{productData.brand}</div>
        <div className="item-info-name">{productData.name}</div>
        <div className="item-info-price">{productData.price}грн</div>
      </div>
      <div className="cart-item-quantity">
        <input
          type={"number"}
          value={itemQuantity}
          className="inp-quantity"
          min={1}
          onChange={quantityHandler}
        />
      </div>
      <div className="cart-item-remove" onClick={() => deleteFromCart(id)}>
        <VscRemove />
      </div>
    </div>
  );
}
