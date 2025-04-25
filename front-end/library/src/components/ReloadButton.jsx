// src/components/ReloadButton.js
import React from 'react';

const ReloadButton = ({ onReload }) => {
  return (
    <button
      className="bg-amber-400  px-6 py-2 rounded-lg hover:bg-amber-300 "
      onClick={onReload}
    >
      Recargar
    </button>
  );
};

export default ReloadButton;
