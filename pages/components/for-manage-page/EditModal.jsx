import { useContext, useState } from "react";
import { LocallyPersistedProducts } from "../../manage";

function EditModal({ setEditModal, productId }) {
  const [updateName, setUpdateName] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updatePrice, setUpdatePrice] = useState();
  const products = useContext(LocallyPersistedProducts);

  function handleCloseEditModal() {
    setEditModal(false);
  }

  //this function merges and persists the new product data
  function updateToLocalStorage(id) {
    const indexOfProductToUpdate = products.findIndex(
      (product) => product.id === id
    );
    if (indexOfProductToUpdate !== -1) {
      const updatedProducts = [...products];
      updatedProducts[indexOfProductToUpdate] = {
        ...updatedProducts[indexOfProductToUpdate],
        name: updateName,
        description: updateDescription,
        price: updatePrice,
      };

      const newData = updatedProducts;
      const combinedData = [...newData];
      localStorage.setItem("myData", JSON.stringify(combinedData));

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
          updateToLocalStorage(productId);
        }}
      >
        <div>
          <label>Product Name: </label>
          <input
            required
            type="text"
            value={updateName ?? ""}
            onChange={(e) => setUpdateName(e.target.value)}
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            required
            type="text"
            value={updateDescription ?? ""}
            onChange={(e) => setUpdateDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Price: </label>
          <input
            required
            type="number"
            min="0"
            value={updatePrice ?? ""}
            onChange={(e) => setUpdatePrice(e.target.value)}
          />
        </div>

        <button>Save</button>
      </form>
    </div>
  );
}

export default EditModal;
