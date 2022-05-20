import React from "react";
import { BsCart4 } from "react-icons/bs";
import { useCart } from "../contexts/CartContext";

export default function ProductItem({ itemObj }) {
  const { setOpenCart, addToCart } = useCart();

  return (
    <div className="card">
      {itemObj.img ? (
        <div
          className="card-image"
          style={{ backgroundImage: `url(${itemObj.img})` }}
        ></div>
      ) : (
        <div className="card-noimage">no image</div>
      )}
      <div className="card-description">
        <h3 className="brand">{itemObj.brand}</h3>
        <div className="name">{itemObj.description}</div>
        <div className="description-bottom">
          <div className="price">{itemObj.price}грн</div>
          <button
            className="btn-primary"
            onClick={() => {
              setOpenCart(true);
              addToCart(itemObj);
            }}
          >
            в кошик
            <BsCart4 className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
