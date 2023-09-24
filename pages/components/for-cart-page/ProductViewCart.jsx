import React, { createContext, useEffect } from "react";
import { useState, useContext } from "react";
import { LocallyPersistedProductCart } from "../../shop/cart";
import ModalProductDetails from "./ModalProductDetails";
import productServices from "../../services/productServices";

export const CartProductDetails = createContext();

//this function handles the increment and decrement of added cart items and updates data
//in the local storage
function ProductViewCart() {
  const [viewOnlyModal, setViewOnlyModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [displayQuantity, setDisplayQuantity] = useState("");
  const [showQuantityButtons, setShowQuantityButtons] = useState(true);

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

    const combinedData = [
      ...productServices.getAndParseArrayDataFromLocalStorage("priceTotal"),
      product,
    ];
    productServices.setItemToLocalStorage("priceTotal", [...combinedData]);
    setDisplayQuantity(
      productServices.countProductOccuranceInStorage("priceTotal", product.id)
    );
  }

  function decrement() {
    setQuantity((previousQuantity) => previousQuantity - 1);
    const existingArray = [
      ...productServices.getAndParseArrayDataFromLocalStorage("priceTotal"),
    ];
    let index = existingArray.indexOf(product);
    if (index !== -1) {
      existingArray.splice(index, 1);
    }
    productServices.setItemToLocalStorage("priceTotal", existingArray);
    setDisplayQuantity(
      productServices.countProductOccuranceInStorage("priceTotal", product.id)
    );
  }

  //this side effect updates the list and removes the item added to the cart
  //if the item quantity is set to zer0
  useEffect(() => {
    if (quantity === 0) {
      productServices.removeFromLocalStorage(product.id, "addedToCart");
      productServices.removeFromLocalStorage(product.id, "priceTotal");
      setViewOnlyModal(false);
      window.location.reload();
    }
  }, [decrement]);

  //this side effect, on page load or re-visit, checks if an item has an increased quantity
  //and if it does, it does not allow for an increase or decrease anymore
  //the only option will be to remove the item.
  //There was a bug I was not able to fix in an attempt to persist the number
  //quanity per product on revisits and have the user still attempt to decrease
  //or increase quantity.
  //Which is why I made use of the problem and turn turned it to a single visit and
  //remove option only on revisit
  useEffect(() => {
    setDisplayQuantity(
      productServices.countProductOccuranceInStorage("priceTotal", product.id)
    );
    1;
    const totalPriceArray = [
      ...productServices.getAndParseArrayDataFromLocalStorage("priceTotal"),
    ];
    const addedToCartArray = [
      ...productServices.getAndParseArrayDataFromLocalStorage("addedToCart"),
    ];

    if (addedToCartArray.length === totalPriceArray.length) {
      setShowQuantityButtons(true);
    } else if (addedToCartArray.length !== totalPriceArray.length) {
      setShowQuantityButtons(false);
    }
  }, []);

  function handleRemoveAllQuantityAndItem() {
    decrement();
  }

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

          {showQuantityButtons ? (
            <div>
              {" "}
              <span>Qty :</span>
              <span>{quantity}</span>
              <button onClick={decrement}>-</button>
              <button onClick={increment}>+</button>
            </div>
          ) : (
            <div>
              <span>Qty :</span>
              <span>{displayQuantity}</span>
              <button onClick={handleRemoveAllQuantityAndItem}>
                Remove All
              </button>
            </div>
          )}
        </div>
      ) : null}
    </article>
  );
}

export default ProductViewCart;
