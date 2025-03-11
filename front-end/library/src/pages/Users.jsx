import React from 'react'
import buscar from "../assets/img/buscar.png";
import Card from "../components/Card";
import { useEffect, useState } from "react";

export const Users = ({apiUrl}) => {
  connst [data, setData] = useState([]);
  
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error al obtener datos:", error));
  }, [apiUrl]);
  apiUrl="http://localhost:5000/users";
  return (
    <div>
      <div className="text-5xl sm:text-7xl font-jacques text-white bg-[#883429] p-4 max-w-3xl w-full rounded-2xl text-center mx-auto">
        Users
      </div>
      <div className="mx-auto mt-5 rounded-lg max-w-[35rem] w-full bg-amber-50 h-8">
        <img
          src={buscar}
          alt="buscar"
          className="w-8 h-8 cursor-pointer sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-8 lg:h-8" // Clases responsivas
        />
      </div>
      <div className="flex flex-wrap justify-center gap-4 p-2 mt-6">
        {data.map((item, index) => (
          <Card key={index} data={item} />
        ))}
      </div>
    </div>
  );
};


