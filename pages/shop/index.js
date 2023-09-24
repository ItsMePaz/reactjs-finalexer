import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductViewOnly from "../components/for-shop-page/ProductViewOnly";
import productServices from "../services/productServices";

export const LocallyPersistedProduct = createContext();

export default function Shop() {
  const [productList, setProductList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setProductList(
      productServices.getAndParseArrayDataFromLocalStorage("myData")
    );
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
                <li key={product.id}>
                  <LocallyPersistedProduct.Provider value={product}>
                    <ProductViewOnly />
                  </LocallyPersistedProduct.Provider>
                </li>
              );
            })
          : null}
      </ul>
    </section>
  );
}
