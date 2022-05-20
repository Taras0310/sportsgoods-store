import React, { useContext, useEffect, useState } from "react";

const CartContext = React.createContext();

export function useCart() {
  return useContext(CartContext);
}

export default function CartProvider({ children }) {
  const [openCart, setOpenCart] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [summaryPrice, setSummaryPrice] = useState(0);

  useEffect(() => {
    countSummaryPrice();
  }, [cartProducts]);

  function checkInCart(id) {
    const product = cartProducts.find((e) => e.id === id);
    return product;
  }

  function addToCart(productData) {
    const isInCart = checkInCart(productData.id);

    if (isInCart) {
      changeItemQuantity(productData.id, isInCart.quantity + 1);
    } else {
      setCartProducts([
        ...cartProducts,
        {
          id: productData.id,
          quantity: 1,
          productData: productData,
          price: productData.price,
        },
      ]);
    }
  }

  function deleteFromCart(id) {
    const newArray = cartProducts.filter((e) => e.id !== id);
    setCartProducts(newArray);
  }

  function changeItemQuantity(id, newValue) {
    const index = cartProducts.findIndex((e) => e.id === id);
    const newArray = cartProducts;
    newArray[index].quantity = newValue;
    setCartProducts(newArray);
  }

  function countSummaryPrice() {
    let sum = 0;
    cartProducts.forEach((e) => {
      sum += e.quantity * e.price;
    });

    setSummaryPrice(sum);
  }

  const value = {
    openCart,
    setOpenCart,
    cartProducts,
    setCartProducts,
    summaryPrice,
    setSummaryPrice,
    addToCart,
    deleteFromCart,
    changeItemQuantity,
    countSummaryPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
