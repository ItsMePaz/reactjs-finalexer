import React, { createContext, useEffect } from "react";
import { useState, useContext } from "react";
import { LocallyPersistedProductCart } from "../shop/cart";
import ModalProductDetails from "./ModalProductDetails";
import productServices from "../services/productServices";

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
  ////////
  function increment() {
    setQuantity((previousQuantity) => previousQuantity + 1);
    const existingListOfProductQuantity = localStorage.getItem("priceTotal");
    if (existingListOfProductQuantity) {
      /*  const parsedListOfProductQuantity =
        JSON.parse(existingListOfProductQuantity) || []; //import */
      const combinedData = [
        ...new Set([
          ...[
            productServices.getAndParseArrayDataFromLocalStorage("priceTotal"),
          ],
          product,
        ]),
      ];

      const uniqueProducts = [];
      combinedData.forEach((product) => {
        uniqueProducts.push(product);
      });
      /*   localStorage.setItem("priceTotal", JSON.stringify(uniqueProducts)); */ //import
      productServices.setItemToLocalStorage("priceTotal", uniqueProducts);
    }
  }

  function decrement() {
    setQuantity((previousQuantity) => previousQuantity - 1);
    /*  const existingListOfProductQuantity =
      localStorage.getItem("priceTotal") || []; //import
    const parsedListOfProductQuantity = JSON.parse(
      existingListOfProductQuantity
    );
    parsedListOfProductQuantity.pop();
    localStorage.setItem(
      "priceTotal",
      JSON.stringify(parsedListOfProductQuantity) //import
    ); */

    const existingArray =
      productServices.getAndParseArrayDataFromLocalStorage("priceTotal");
    existingArray.pop();

    productServices.setItemToLocalStorage("priceTotal", existingArray);
  }

  /* function removeFromCartLocalStorage(id) {
    
    const existingData = localStorage.getItem("addedToCart");
    const parsedData = JSON.parse(existingData);
    const updatedData = parsedData.filter((product) => product.id !== id);
    localStorage.setItem("addedToCart", JSON.stringify([...updatedData]));
  } */ //import

  useEffect(() => {
    if (quantity === 0) {
      productServices.removeFromLocalStorage(product.id, "addedToCart"); //
      setViewOnlyModal(false);
      window.location.reload();
    }
  }, [decrement]);

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
            <ModalProductDetails product={product} />
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
