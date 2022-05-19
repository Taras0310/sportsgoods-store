import React from "react";
import ProductItem from "./ProductItem";

export default function ProductsList({ products }) {
  return (
    <div className="product-list">
      {products ? (
        products.map((el) => <ProductItem key={el.id} itemObj={el} />)
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
