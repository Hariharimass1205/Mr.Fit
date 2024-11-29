// components/Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, userName }) => {
  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-xl text-black font-semibold">Confirm Action</h3>
        <p className="mt-4 text-gray-700">
          Are you sure you want to block the user <strong>{userName}</strong>?
        </p>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
