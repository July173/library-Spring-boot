import React from "react";

const ModalDelete = ({ isOpen, onClose, onConfirm, item }) => {
  if (!isOpen) return null;
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">¿Are you sure do you want delete this element?</h2>
        <p className="text-gray-600 mb-6">{item?.name || "this elemente"} it will be permanently deleted .</p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={onConfirm}
          >
            Delete 
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
