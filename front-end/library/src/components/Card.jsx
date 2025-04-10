import React, { useState } from "react";
import actualizar from "../assets/img/actualizar.png";
import eliminar from "../assets/img/eliminar.png";

const Card = ({ data }) => {
  const hasImage = !!data.url;
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // 🔠 Convierte snake_case o camelCase en títulos legibles
  const formatKey = (key) => {
    return key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div
      className="w-64 h-90 [perspective:1000px] cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={handleFlip}
    >
      <div
        className={`relative w-full h-full duration-700 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Cara frontal */}
        {hasImage && (
          <div className="absolute w-full h-full [backface-visibility:hidden] rounded-lg overflow-hidden shadow-md">
            <img
              src={data.url}
              alt="book cover"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Cara trasera */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#F2B78D] rounded-lg overflow-hidden shadow-md flex flex-col justify-between">
          <div className="p-4 overflow-y-auto">
            {Object.entries(data).map(([key, value]) =>
              // Oculta los campos que empiecen con 'id'
              key.toLowerCase().startsWith("id") || key === "url" ? null : (
                <p key={key} className="text-sm font-bold text-black mb-1">
                  {formatKey(key)}: <span className="font-normal">{value}</span>
                </p>
              )
            )}
          </div>
          <div className="flex border-t border-black">
            <button className="flex items-center justify-center w-1/2 py-2 text-white bg-[#CB6546] border-r border-black">
              <img
                src={eliminar}
                alt="eliminar"
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
            </button>
            <button className="flex items-center justify-center w-1/2 py-2 text-white bg-[#CB6546]">
              <img
                src={actualizar}
                alt="actualizar"
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
