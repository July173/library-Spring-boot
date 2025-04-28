// src/components/ReloadButton.js
import React, { useState } from 'react';

const ReloadButton = ({ onReload }) => {
  const [loading, setLoading] = useState(false);

  const handleReload = async () => {
    setLoading(true);
    try {
      await onReload(); // Llama la función asíncrona
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className={`bg-amber-400 px-6 py-2 rounded-lg hover:bg-amber-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleReload}
        disabled={loading} // Deshabilitar el botón mientras carga
      >
        {loading ? "Reloading..." : "Reload"}
      </button>
      {loading && <p className="text-sm text-gray-500 mt-2">Reloading data...</p>} {/* Mensaje visual */}
    </div>
  );
};

export default ReloadButton;
