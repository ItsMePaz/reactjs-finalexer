import React, { createContext, useState, useEffect } from "react";
import ProductViewCart from "@/pages/components/ProductViewCart";
import { useRouter } from "next/router";

export const LocallyPersistedProductCart = createContext();

function Cart() {
  const [productCartList, setProductCartList] = useState([]);

  useEffect(() => {
    const existingCartData = localStorage.getItem("addedToCart");
    if (existingCartData) {
      const parsedData = JSON.parse(existingCartData);

      setProductCartList(parsedData);
      console.log("asdas" + parsedData);
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
                <li>
                  <LocallyPersistedProductCart.Provider value={product}>
                    <ProductViewCart key={product.id} />
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
