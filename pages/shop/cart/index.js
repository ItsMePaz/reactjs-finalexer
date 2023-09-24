import React, { createContext, useState, useEffect } from "react";
import ProductViewCart from "@/pages/components/for-cart-page/ProductViewCart";
import { useRouter } from "next/router";

export const LocallyPersistedProductCart = createContext();

function Cart() {
  const [productCartList, setProductCartList] = useState([]);

  useEffect(() => {
    const existingCartData = localStorage.getItem("addedToCart");
    if (existingCartData) {
      const parsedData = JSON.parse(existingCartData);
      setProductCartList(parsedData);
    }
  }, []);

  const router = useRouter();

  return (
    <section>
      <button onClick={() => router.push("/shop")}>Shop</button>
      <button onClick={() => router.push("/shop/checkout")}>Checkout</button>
      <h1>My Cart</h1>
      <ul>
        {productCartList
          ? productCartList.map((product) => {
              return (
                <li key={product.id}>
                  <LocallyPersistedProductCart.Provider value={product}>
                    <ProductViewCart />
                  </LocallyPersistedProductCart.Provider>
                </li>
              );
            })
          : null}
      </ul>
    </section>
  );
}

export default Cart;
