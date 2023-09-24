import React, { useContext } from "react";
import { useRouter } from "next/router";
import { LocallyPersistedProduct } from "../shop";
import ModalProductDetails from "./ModalProductDetails";
import productServices from "../services/productServices";

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

  //this function navigates the user to the
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

  //this function persists items added to the cart into the local storage
  //and also handles the alert of when an item is succesfully added
  //or not added if item already exists in the cart
  function addToLocalCart() {
    const existingListOfProductQuantity = localStorage.getItem("priceTotal");
    const localCartStorage = localStorage.getItem("addedToCart");
    const parsedExisting = JSON.parse(localCartStorage);

    if (!localCartStorage) {
      const newData = [product];
      productServices.setItemToLocalStorage("addedToCart", newData);
      alert("Successfully added " + product.name + " to cart.");
      setViewOnlyModal(false);
    } else {
      if (
        productServices.checkObjectExistence(parsedExisting, product.id) ===
        true
      ) {
        alert("Product is already added to the cart");
      } else {
        const newData = product;
        const combinedProducts = [
          ...productServices.getAndParseArrayDataFromLocalStorage(
            "addedToCart"
          ),
          newData,
        ];
        productServices.setItemToLocalStorage("addedToCart", combinedProducts);
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
      productServices.setItemToLocalStorage("priceTotal", newData);
    } else if (existingListOfProductQuantity) {
      if (
        productServices.checkObjectExistence(parsedExisting, product.id) ===
        true
      ) {
        null;
      } else {
        const combinedData = [
          ...new Set([
            ...[
              productServices.getAndParseArrayDataFromLocalStorage(
                "priceTotal"
              ),
            ],
            product,
          ]),
        ];
        const uniqueProducts = [];
        combinedData.forEach((product) => {
          uniqueProducts.push(product);
        });
        productServices.setItemToLocalStorage("priceTotal", uniqueProducts);
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
