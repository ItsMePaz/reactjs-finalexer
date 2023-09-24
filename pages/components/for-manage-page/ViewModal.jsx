import React, { useContext, useState } from "react";
import { ProductDetails, ProductDispatch } from "../../manage";
import EditModal from "./EditModal";

function ViewModal({ setViewModal }) {
  const [editModal, setEditModal] = useState(false);
  const product = useContext(ProductDetails);

  function handleCloseModal() {
    setViewModal(false);
  }

  function handleEditModal() {
    if (editModal === true) {
      alert("Edit modal already open");
    } else {
      setEditModal(true);
    }
  }
  return (
    <section>
      <article>
        <button onClick={handleCloseModal}>X</button>
        <div>Product Name: {product.name}</div>
        <div>Description: {product.description}</div>
        <div>Price: {product.price}</div>
        <button onClick={handleEditModal}>EDIT</button>
      </article>
      {editModal ? (
        <article>
          <EditModal setEditModal={setEditModal} productId={product.id} />
        </article>
      ) : null}
    </section>
  );
}

export default ViewModal;
