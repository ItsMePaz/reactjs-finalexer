import React, { createContext, useEffect } from "react";
import { useState, useContext } from "react";
import { LocallyPersistedProductCart } from "../shop/cart";
import ModalProductDetails from "./ModalProductDetails";

export const CartProductDetails = createContext();

function ProductViewCart() {
  const [viewOnlyModal, setViewOnlyModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = useContext(LocallyPersistedProductCart);

  function handleViewOnlyModal() {
    if (viewOnlyModal === true) {
      alert("Modal already open");
    } else {
      setViewOnlyModal(true);
    }
  }

  function handleCloseModal() {
    setViewOnlyModal(false);
  }

  function increment() {
    setQuantity((previousQuantity) => previousQuantity + 1);
    const existingListOfProductQuantity = localStorage.getItem("priceTotal");
    if (existingListOfProductQuantity) {
      const parsedListOfProductQuantity =
        JSON.parse(existingListOfProductQuantity) || [];
      const combinedData = [
        ...new Set([...parsedListOfProductQuantity, product]),
      ];

      const uniqueProducts = [];
      combinedData.forEach((product) => {
        uniqueProducts.push(product);
      });
      localStorage.setItem("priceTotal", JSON.stringify(uniqueProducts));
      console.log(localStorage.getItem("priceTotal"));
    }
  }

  function decrement() {
    setQuantity((previousQuantity) => previousQuantity - 1);
    const existingListOfProductQuantity =
      localStorage.getItem("priceTotal") || [];
    const parsedListOfProductQuantity = JSON.parse(
      existingListOfProductQuantity
    );
    parsedListOfProductQuantity.pop();
    localStorage.setItem(
      "priceTotal",
      JSON.stringify(parsedListOfProductQuantity)
    );
    console.log(localStorage.getItem("priceTotal"));
  }

  function removeFromCartLocalStorage(id) {
    const existingData = localStorage.getItem("addedToCart");
    const parsedData = JSON.parse(existingData);
    const updatedData = parsedData.filter((product) => product.id !== id);
    localStorage.setItem("addedToCart", JSON.stringify([...updatedData]));
  }

  useEffect(() => {
    if (quantity === 0) {
      removeFromCartLocalStorage(product.id);
      setViewOnlyModal(false);
      window.location.reload();
    }
  }, [increment]);

  return (
    <article>
      <div>
        {" "}
        <div>{product.name}</div>
        <button onClick={handleViewOnlyModal}>VIEW</button>
      </div>

      {viewOnlyModal ? (
        <div className="modal-position">
          <button onClick={handleCloseModal}>X</button>
          <CartProductDetails.Provider value={product}>
            <ModalProductDetails />
          </CartProductDetails.Provider>
          <span>Qty :</span>
          <span>{quantity}</span>
          <button onClick={decrement}>-</button>
          <button onClick={increment}>+</button>
        </div>
      ) : null}
    </article>
  );
}

export default ProductViewCart;
