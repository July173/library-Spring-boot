import React from "react";
import actualizar from "../assets/img/actualizar.png";
import eliminar from "../assets/img/eliminar.png";

const Card = ({ data }) => {
  return (
    <div className="w-64 bg-[#F2B78D] rounded-lg shadow-md overflow-hidden">
      {/* Mostrar imagen si existe */}
      {data.url && (
        <img
          src={data.url}
          alt="book cover"
          className="w-full h-48 object-cover" // Imagen ajustada y responsiva
        />
      )}

      <div className="p-4 mb-4">
        {/* Mostrar datos dinámicamente, excluyendo la URL para no repetirla abajo */}
        {Object.entries(data).map(([key, value]) =>
          key !== "url" ? (
            <p key={key} className="text-lg font-bold">
              {key}: <span className="font-normal">{value}</span>
            </p>
          ) : null
        )}
      </div>

      {/* Sección de botones */}
      <div className="flex border-t border-black">
        <button className="flex items-center justify-center w-32 py-2 text-white rounded-bl-lg bg-[#CB6546] border-r border-black">
          <img
            src={eliminar}
            alt="eliminar"
            className="block w-12 h-12 cursor-pointer sm:w-8 sm:h-8"
          />
        </button>
        <button className="flex items-center justify-center w-32 py-2 text-white bg-[#CB6546] rounded-br-lg">
          <img
            src={actualizar}
            alt="actualizar"
            className="block w-12 h-12 cursor-pointer sm:w-8 sm:h-8"
          />
        </button>
      </div>
    </div>
  );
};

export default Card;
  