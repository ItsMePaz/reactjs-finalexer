import React, { useContext, useState } from "react";
import { ACTIONS, ProductDetails, ProductDispatch } from "../../manage";
import ViewModal from "./ViewModal";
import productServices from "../../services/productServices";

//this function handles the view and delete button
//in the manage products page
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
              productServices.removeFromLocalStorage(product.id, "myData");
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
