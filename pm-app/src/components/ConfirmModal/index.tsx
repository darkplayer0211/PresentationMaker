import React from "react";
import "./styles.css";

interface ConfirmModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className="confirmModal">
            <div className="confirmModal_content">
                <h1>Confirm Modal</h1>
                <button onClick={onConfirm}>Confirm</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    )
}