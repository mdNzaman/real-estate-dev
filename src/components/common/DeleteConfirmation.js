import React from "react";
import "./DeleteConfirmation.css";

function DeleteConfirmation({ item, onConfirm, onCancel }) {
  return (
    <div className="delete-confirmation-overlay">
      <div className="delete-confirmation-modal">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete {item.name}?</p>
        <p>This action cannot be undone.</p>
        <div className="confirmation-actions">
          <button onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
          <button onClick={onConfirm} className="confirm-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
