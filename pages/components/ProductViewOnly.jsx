import React, { useState } from "react";
import { useContext } from "react";
import { LocallyPersistedProduct } from "../shop";
import ModalViewOnly from "./ModalViewOnly";

function ProductViewOnly() {
  const [viewOnlyModal, setViewOnlyModal] = useState(false);
  const product = useContext(LocallyPersistedProduct);

  function handleViewOnlyModal() {
    if (viewOnlyModal === true) {
      alert("Modal already open");
    } else {
      setViewOnlyModal(true);
    }
  }

  return (
    <article>
      <div>
        {" "}
        <div>{product.name}</div>
        <button onClick={handleViewOnlyModal}>VIEW</button>
      </div>

      {viewOnlyModal ? (
        <div className="modal-position">
          <ModalViewOnly setViewOnlyModal={setViewOnlyModal} />
        </div>
      ) : null}
    </article>
  );
}

export default ProductViewOnly;
