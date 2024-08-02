import React from 'react';

function ConfirmationModal({ onConfirm }) {
  function onCancel() {
    document.getElementById("modal-transact").style.display = "none";
  }

  function handleConfirm() {
    onConfirm();  // Call the onConfirm callback function
    onCancel();   // Optionally, close the modal after confirming
  }

  return (
    <div>
      <div className="modal" id="modal-transact">
        <div className="modal-content">
          <span onClick={onCancel} className="modal-close">
            ×
          </span>
          <h1>Confirm Order</h1>
          <p>Do you want to confirm this order?</p>
          <div className="d-flex align-items-center justify-content-center">
            <a
              onClick={onCancel}
              className="trk-btn trk-btn--outline trk-btn--arrow"
              style={{
                width: "50%",
                color: "black",
                marginRight: 10,
                height: "61.2px",
              }}
            >
              Cancel
            </a>
            <a 
              onClick={handleConfirm}
              className="cmn-btn py-3 px-5 px-md-6 d-block"
            >
              Confirm Order
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
