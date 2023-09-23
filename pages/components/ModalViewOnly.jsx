import React, { useContext } from "react";
import { useRouter } from "next/router";
import { LocallyPersistedProduct } from "../shop";
import ModalProductDetails from "./ModalProductDetails";

function ModalViewOnly({ setViewOnlyModal }) {
  const product = useContext(LocallyPersistedProduct);
  const router = useRouter();

  function checkOut() {
    router.push({
      pathname: "/shop/checkout",
      query: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
      },
    });
  }

  function handleCloseModal() {
    setViewOnlyModal(false);
  }

  //this function navigates the user to the shareable
  //url of the specific product
  function goToLink() {
    router.push(
      {
        pathname: "/shop/cart/product",
        query: {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  }

  //this function persists items added to the cart to the local storage
  function addToLocalCart() {
    const existingListOfProductQuantity = localStorage.getItem("priceTotal");
    const localCartStorage = localStorage.getItem("addedToCart");
    const parsedExisting = JSON.parse(localCartStorage);

    if (!localCartStorage) {
      const newData = product;
      localStorage.setItem("addedToCart", JSON.stringify([newData]));
      alert("Successfully added " + product.name + " to cart.");
      setViewOnlyModal(false);
    } else if (localCartStorage) {
      const isCartAdded = parsedExisting.some(
        (item) => JSON.stringify(item.id) === JSON.stringify(product.id)
      );
      if (isCartAdded === true) {
        alert("Product is already added to the cart");
      } else if (isCartAdded === false) {
        const parsedExistingProduct = JSON.parse(localCartStorage) || [];
        const newData = product;
        const combinedProducts = [...parsedExistingProduct, newData];
        localStorage.setItem("addedToCart", JSON.stringify(combinedProducts));
        alert("Successfully added " + product.name + " to cart.");
        setViewOnlyModal(false);
      }
    }

    //merge and persist products added to the cart
    //allowing multiple duplicates which was
    //intended to sum up the total number of items
    //and total cost
    if (!existingListOfProductQuantity) {
      const newData = [product];
      localStorage.setItem("priceTotal", JSON.stringify(newData));
    } else if (existingListOfProductQuantity) {
      const isCartAdded = parsedExisting.some(
        (item) => JSON.stringify(item.id) === JSON.stringify(product.id)
      );
      if (isCartAdded === true) {
        null;
      } else {
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
      }
    }
  }

  return (
    <article>
      <button onClick={handleCloseModal}>X</button>
      <ModalProductDetails product={product} />
      <button onClick={goToLink}>Go to link</button>
      <button onClick={addToLocalCart}>Add to Cart</button>
      <button onClick={checkOut}>Buy Now</button>
    </article>
  );
}

export default ModalViewOnly;
