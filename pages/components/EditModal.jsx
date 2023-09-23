import { useContext, useState } from "react";
import { LocallyPersistedProducts, ProductDispatch } from "../manage";

function EditModal({ setEditModal, productId }) {
  const [updateName, setUpdateName] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updatePrice, setUpdatePrice] = useState();
  const dispatch = useContext(ProductDispatch);
  const products = useContext(LocallyPersistedProducts);

  function handleCloseEditModal() {
    setEditModal(false);
  }

  function updateFromLocalStorage(id) {
    const indexOfProductToUpdate = products.findIndex(
      (product) => product.id === id
    );
    if (indexOfProductToUpdate !== -1) {
      const updatedProducts = [...products];
      updatedProducts[indexOfProductToUpdate] = {
        ...updatedProducts[indexOfProductToUpdate],
        name: updateName,
        description: updateDescription,
        price: updatePrice, // Update the value here
      };

      const newData = updatedProducts;
      const combinedData = [...newData];
      localStorage.setItem("myData", JSON.stringify(combinedData));

      console.log(localStorage);
      console.log(updatedProducts);

      setUpdateName("");
      setUpdateDescription("");
      setUpdatePrice("");
    }
  }
  return (
    <div>
      <button onClick={handleCloseEditModal}>X</button>
      <form
        onSubmit={() => {
          updateFromLocalStorage(productId);
        }}
      >
        <div>
          <label>Product Name: </label>
          <input
            required
            type="text"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            required
            type="text"
            value={updateDescription}
            onChange={(e) => setUpdateDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Price: </label>
          <input
            required
            type="number"
            value={updatePrice}
            onChange={(e) => setUpdatePrice(e.target.value)}
          />
        </div>

        <button>Save</button>
      </form>
    </div>
  );
}

export default EditModal;
