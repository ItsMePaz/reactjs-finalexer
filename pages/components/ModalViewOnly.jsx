import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LocallyPersistedProduct } from "../shop";

function ModalViewOnly({ setViewOnlyModal }) {
  const product = useContext(LocallyPersistedProduct);
  const router = useRouter();
  function handleCloseModal() {
    setViewOnlyModal(false);
  }

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
        console.log(combinedProducts);
        alert("Successfully added " + product.name + " to cart.");
        setViewOnlyModal(false);
      }
    }

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
        console.log(localStorage.getItem("priceTotal"));
      }
    }
  }

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

  return (
    <article>
      <button onClick={handleCloseModal}>X</button>
      <div>Product Name: {product.name}</div>
      <div>Description: {product.description}</div>
      <div>Price: {product.price}</div>
      <button onClick={goToLink}>Go to link</button>
      <button onClick={addToLocalCart}>Add to Cart</button>
      <button onClick={checkOut}>Buy Now</button>
    </article>
  );
}

export default ModalViewOnly;
