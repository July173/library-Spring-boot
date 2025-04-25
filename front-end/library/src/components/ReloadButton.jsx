// src/components/ReloadButton.js
import React from 'react';

const ReloadButton = ({ onReload }) => {
  return (
    <button
      className="bg-blue-500 text-white px-6 py-2 rounded-lg"
      onClick={onReload}
    >
      Recargar
    </button>
  );
};

export default ReloadButton;
