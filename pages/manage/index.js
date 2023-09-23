import React, { createContext, useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import Product from "../components/Product";

export const ProductDetails = createContext();
export const ProductDispatch = createContext();
export const LocallyPersistedProducts = createContext();

export const ACTIONS = {
  ADD_PRODUCT: "add-product",
  DELETE_PRODUCT: "delete-product",
  UPDATE_PRODUCT: "update-product",
};

function reducer(product, action) {
  switch (action.type) {
    case ACTIONS.ADD_PRODUCT:
      return [
        ...product,
        newProduct(
          action.payload.name,
          action.payload.description,
          action.payload.price
        ),
      ];
    case ACTIONS.DELETE_PRODUCT:
      return product.filter((product) => product.id !== action.payload.id);
  }
}

function newProduct(name, description, price) {
  return { id: Date.now(), name: name, description: description, price: price };
}

export default function Manage() {
  const [products, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [data, setData] = useState(false);
  const [persistedData, setPersistedData] = useState(false);
  const [addedToList, setAddedToList] = useState([]);
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: ACTIONS.ADD_PRODUCT,
      payload: { name: name, description: description, price: price },
    });

    setName("");
    setDescription("");
    setPrice("");
  }

  useEffect(() => {
    if (products.length > 0) {
      setData(true);
    } else if (products.length === 0) {
      setData(false);
    }
  }, [products]);

  useEffect(() => {
    if (addedToList.length > 0) {
      setPersistedData(true);
    } else if (addedToList.length === 0) {
      setPersistedData(false);
    }
  }, [addedToList]);

  useEffect(() => {}, []);

  useEffect(() => {
    const existingData = localStorage.getItem("myData");
    if (existingData) {
      const parsedData = JSON.parse(existingData) || [];
      const combinedData = [...new Set([...parsedData, ...products])];
      const uniqueSet = new Set();
      const uniqueProducts = [];
      combinedData.forEach((product) => {
        const uniqueKey = product.id;
        if (!uniqueSet.has(uniqueKey)) {
          uniqueSet.add(uniqueKey);
          uniqueProducts.push(product);
        }
      });
      localStorage.setItem("myData", JSON.stringify(uniqueProducts));
      setAddedToList([...uniqueProducts]);
    } else if (!existingData) {
      const newData = [...products];
      localStorage.setItem("myData", JSON.stringify(newData));
      setAddedToList(newData);
    }
  }, [products]);

  return (
    <section>
      <button onClick={() => router.push({ pathname: "/shop" })}>Shop</button>
      <h1>MANAGE PRODUCTS</h1>
      {!data && !persistedData ? <div>No product added</div> : null}
      <ul>
        {addedToList
          ? addedToList.map((product) => {
              return (
                <li>
                  <LocallyPersistedProducts.Provider value={addedToList}>
                    <ProductDetails.Provider value={product}>
                      <ProductDispatch.Provider value={dispatch}>
                        <Product key={product.id} />
                      </ProductDispatch.Provider>
                    </ProductDetails.Provider>
                  </LocallyPersistedProducts.Provider>
                </li>
              );
            })
          : null}
      </ul>

      <h2>NEW PRODUCT</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product name</label>
          <span> : </span>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Description</label>
          <span> : </span>
          <input
            required
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Price</label>
          <span> : </span>
          <input
            required
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <button>ADD</button>
        </div>
      </form>
    </section>
  );
}
