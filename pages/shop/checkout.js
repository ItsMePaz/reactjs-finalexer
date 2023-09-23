import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Checkout() {
  const [items, setItems] = useState([]);
  const [prices, setPrices] = useState([]);
  const [total, setTotal] = useState();
  const [showOnlyBuyNow, setShowOnlyBuyNow] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const totalItems = localStorage.getItem("priceTotal");
    if (totalItems) {
      const parsedTotalItems = JSON.parse(totalItems);
      setItems(parsedTotalItems);

      setPrices(parsedTotalItems.map((product) => parseInt(product.price)));
      const priceTotal = prices.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      setTotal(priceTotal);
    }
  }, [total]);

  useEffect(() => {
    if (!router.query.name) {
      setShowOnlyBuyNow(true);
    }
  }, []);

  function handlePurchase() {
    localStorage.removeItem("addedToCart");
    localStorage.removeItem("priceTotal");
    window.location.reload();

    alert("Purchase successful. Thank you!");
  }

  return (
    <section>
      <button onClick={() => router.push({ pathname: "/shop" })}>Shop</button>
      <button onClick={() => router.push({ pathname: "/shop/cart" })}>
        Cart
      </button>
      <h1>Checkout</h1>
      {showOnlyBuyNow ? (
        <div>
          <span>You are about to buy {items.length} items</span>
          <h1>Total Price: {total}</h1>
        </div>
      ) : null}
      <br />
      {!showOnlyBuyNow ? (
        <div>
          {" "}
          <span>You are about to directly buy {router.query.name}</span>
          <h1>Total Price: {router.query.price}</h1>
        </div>
      ) : null}
      <br />
      <button onClick={handlePurchase}>Purchase</button>
    </section>
  );
}
