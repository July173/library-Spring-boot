import React from "react";
import actualizar from "../assets/img/actualizar.png";
import eliminar from "../assets/img/eliminar.png";

// Convierte camelCase y snake_case a texto legible
const formatHeader = (key) =>
  key
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const Table = ({ data, onEdit, onDelete }) => {
  if (!data || data.length === 0) return <p>No hay datos para mostrar.</p>;

  const headers = Object.keys(data[0]).filter(
    (key) => !key.toLowerCase().includes("id") && key !== "url"
  );

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="table-auto w-full border-collapse border border-gray-400 bg-white hidden sm:table">
        <thead className="bg-[#F2B78D]">
          <tr>
            <th className="border border-gray-400 px-4 py-2 font-bold text-black text-left">#</th>
            {headers.map((key) => (
              <th key={key} className="border border-gray-400 px-4 py-2 font-bold text-black text-left">
                {formatHeader(key)}
              </th>
            ))}
            <th className="border border-gray-400 px-4 py-2 font-bold text-black text-left">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{idx + 1}</td>
              {headers.map((key) => (
                <td key={key} className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                  {item[key]}
                </td>
              ))}
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex gap-2">
                  <button onClick={() => onDelete && onDelete(item)}>
                    <img src={eliminar} alt="eliminar" className="w-6 h-6 hover:scale-110 transition-transform" />
                  </button>
                  <button onClick={() => onEdit && onEdit(item)}>
                    <img src={actualizar} alt="actualizar" className="w-6 h-6 hover:scale-110 transition-transform" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Vista tipo tarjeta para móviles */}
      <div className="sm:hidden flex flex-col gap-4">
        {data.map((item, idx) => (
          <div key={idx} className="bg-white shadow rounded-lg p-4 border border-gray-300">
            <div className="text-sm font-bold mb-2">#{idx + 1}</div>
            {headers.map((key) => (
              <div key={key} className="text-sm mb-1">
                <span className="font-semibold">{formatHeader(key)}:</span> {item[key]}
              </div>
            ))}
            <div className="flex gap-2 mt-2">
              <button onClick={() => onDelete && onDelete(item)}>
                <img src={eliminar} alt="eliminar" className="w-6 h-6 hover:scale-110 transition-transform" />
              </button>
              <button onClick={() => onEdit && onEdit(item)}>
                <img src={actualizar} alt="actualizar" className="w-6 h-6 hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
