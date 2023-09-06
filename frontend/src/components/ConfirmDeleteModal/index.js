import React from "react";
import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ onDelete, onCancel }) {
  return (
    <div className="delete-confirmation-modal">
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this review?</p>
      <div className="delete-confirmation-buttons">
        <button onClick={onDelete} className="delete-button-review">
          Yes (Delete)
        </button>
        <button onClick={onCancel} className="cancel-button-review">
          No (Keep)
        </button>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
