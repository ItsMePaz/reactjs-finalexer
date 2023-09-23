export default function getAllAddedItems() {
  try {
    const existingCartItems = localStorage.getItem("addedToCart");
    const parsedExistingItems = JSON.parse(existingCartItems);

    return parsedExistingItems;
  } catch (error) {
    alert("No data");
  }
}

/* export default function incrementCartItems(existingListOfProductQuantity, product) {
   
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
    
} */
