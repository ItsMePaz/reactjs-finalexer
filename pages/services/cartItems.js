export default function getAllAddedItems() {
  try {
    const existingCartItems = localStorage.getItem("addedToCart");
    const parsedExistingItems = JSON.parse(existingCartItems);

    return parsedExistingItems;
  } catch (error) {
    alert("No data");
  }
}
