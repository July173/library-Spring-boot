import React from 'react'
import buscar from "../assets/img/buscar.png";
import Table from '../components/Table';
import { useEffect, useState } from "react";
import AddButton from "../components/AddButton";

export const Employee = ({apiUrl}) => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error al obtener datos:", error));
  }
  , [apiUrl]);
  apiUrl="http://localhost:8080/api/v1/employee/";
  return (
    <div>
      <div className="text-5xl sm:text-7xl font-jacques text-white bg-[#883429] p-4 max-w-3xl w-full rounded-2xl text-center mx-auto">
        Employees
      </div>
      <div className="mx-auto mt-5 rounded-lg max-w-[35rem] w-full bg-amber-50 h-8">
        <img
          src={buscar}
          alt="buscar"
          className="w-8 h-8 cursor-pointer sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-8 lg:h-8" // Clases responsivas
        />
      </div>
      <div className="flex justify-center mt-4">
      <AddButton onClick={""} text="Add Employee" />
      </div>
      <div className="w-[97vw] p-2 mt-6">
        
          <Table data={data} />
        
      </div>
      
    </div>
  );
};
