import React, { useContext } from "react";
import { CartProductDetails } from "./ProductViewCart";

export default function ModalProductDetails() {
  const product = useContext(CartProductDetails);
  return (
    <article>
      <div>Product Name: {product.name}</div>
      <div>Description: {product.description}</div>
      <div>Price: {product.price}</div>
    </article>
  );
}
