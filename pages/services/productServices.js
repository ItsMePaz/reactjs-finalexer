function getAndParseArrayDataFromLocalStorage(storageKey) {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch (error) {
    return alert(
      "No data retrieved in " + storageKey + "from the local storage"
    );
  }
}

function setItemToLocalStorage(storageKey, arrayToBeSaved) {
  localStorage.setItem(storageKey, JSON.stringify(arrayToBeSaved));
}

function checkObjectExistence(array, objectId) {
  return array.some(
    (item) => JSON.stringify(item.id) === JSON.stringify(objectId)
  );
}

function removeFromLocalStorage(id, storageKey) {
  const existingData = localStorage.getItem(storageKey) || [];
  const parsedData = JSON.parse(existingData);
  const updatedData = parsedData.filter((product) => product.id !== id);
  return localStorage.setItem(storageKey, JSON.stringify(updatedData));
}

function countProductOccuranceInStorage(storageKey, id) {
  const productArray = getAndParseArrayDataFromLocalStorage(storageKey);
  let listEachOccurances = [];
  productArray.forEach((product) => {
    if (product.id === id) {
      listEachOccurances.push(product);
    }
  });

  return listEachOccurances.length;
}

export default {
  getAndParseArrayDataFromLocalStorage,
  setItemToLocalStorage,
  checkObjectExistence,
  removeFromLocalStorage,
  countProductOccuranceInStorage,
};
