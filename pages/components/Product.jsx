import React, { useContext, useState } from "react";
import { ACTIONS, ProductDetails, ProductDispatch } from "../manage";
import ViewModal from "./ViewModal";

function Product() {
  const product = useContext(ProductDetails);
  const dispatch = useContext(ProductDispatch);
  const [viewModal, setViewModal] = useState(false);

  function handleViewModal() {
    if (viewModal === true) {
      alert("Modal already open");
    } else {
      setViewModal(true);
    }
  }

  function removeFromLocalStorage(id) {
    const existingData = localStorage.getItem("myData") || [];
    const parsedData = JSON.parse(existingData);
    const updatedData = parsedData.filter((product) => product.id !== id);
    localStorage.setItem("myData", JSON.stringify(updatedData));
  }

  return (
    <article>
      <div>
        {" "}
        <div>{product.name}</div>
        <button onClick={handleViewModal}>VIEW</button>
        <button
          onClick={() => {
            dispatch({
              type: ACTIONS.DELETE_PRODUCT,
              payload: { id: product.id },
            }),
              removeFromLocalStorage(product.id);
          }}
        >
          DELETE
        </button>
      </div>

      {viewModal ? (
        <div className="modal-position">
          <ViewModal setViewModal={setViewModal} />{" "}
        </div>
      ) : null}
    </article>
  );
}

export default Product;
