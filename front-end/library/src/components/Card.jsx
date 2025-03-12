import React, { act } from "react";
import actualizar from "../assets/img/actualizar.png";
import eliminar from "../assets/img/eliminar.png";
// Se recibe la data como prop
// Se recorre la data y se muestra en pantalla
const Card = ({ data }) => {
  return (
    <div className="w-64  bg-[#F2B78D] rounded-lg shadow-md">
      <div className="p-4 mb-4">
        {/* Recorre dinámicamente los datos sin nombres quemados */}
        {/*el object.entries(data) recorre el objeto y lo convierte en un array de pares [clave, valor]
        luego se recorre con map y se desestructura cada array en key y value
        se muestra la key y el value en pantalla*/}
        {Object.entries(data).map(([key, value]) => (
          <p key={key} className="text-lg font-bold">
            {key}: <span className="font-normal">{value}</span>
          </p>
        ))}
      </div>

      {/* Sección de botones */}
      <div className="flex border-t border-black">
        <button className="flex items-center justify-center w-32  py-2 text-white rounded-bl-lg bg-[#CB6546] border-r border-black">
          <img
            src={eliminar}
            alt="eliminar"
            className="block w-12 h-12 cursor-pointer sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-8 lg:h-8 " // Clases responsivas
          />
        </button>
        <button className="flex items-center justify-center w-32 py-2 text-white bg-[#CB6546] rounded-br-lg">
          <img
            src={actualizar}
            alt="actualizar"
            className="block w-12 h-12 cursor-pointer sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-8 lg:h-8 " // Clases responsivas
          />
        </button>
      </div>
    </div>
  );
};

export default Card;
