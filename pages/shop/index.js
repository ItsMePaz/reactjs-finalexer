import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductViewOnly from "../components/ProductViewOnly";

export const LocallyPersistedProduct = createContext();

export default function Shop() {
  const [productList, setProductList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const existingData = localStorage.getItem("myData");
    const parsedData = JSON.parse(existingData);
    setProductList(parsedData);
  }, []);

  return (
    <section>
      <button onClick={() => router.push("/manage")}>Manage Products</button>
      <button onClick={() => router.push("/shop/cart")}>Cart</button>
      <h1>SHOP</h1>
      <ul>
        {productList
          ? productList.map((product) => {
              return (
                <li>
                  <LocallyPersistedProduct.Provider value={product}>
                    <ProductViewOnly key={product.id} />
                  </LocallyPersistedProduct.Provider>
                </li>
              );
            })
          : null}
      </ul>
    </section>
  );
}
