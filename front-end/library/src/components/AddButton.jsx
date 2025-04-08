import React from 'react'

const AddButton = ({ onClick, text = "Agregar"}) => {
  return (
    <button
    className="px-4 py-2 bg-[#F2BC70] rounded cursor-pointer shadow-2xl shadow-gray-300 text-lg sm:text-xl md:text-2xl w-full sm:w-64 md:w-72 lg:w-80 hover:bg-[#FDA62D] transition-all"      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default AddButton;

