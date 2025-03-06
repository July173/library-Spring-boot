import {useState} from 'react'
import React from "react";
import { NavLink } from "react-router-dom";
import menuIcon from "../assets/img/menu.png";
import closeIcon from "../assets/img/close.png";

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    };

  return (
 <div className="relative m-6">
      {/* Icono de menú - Siempre visible */}
      <img
        src={menuIcon}
        alt="menu"
        className="block w-12 h-12 cursor-pointer sm:w-14 sm:h-14 md:w-8 md:h-8 lg:w-8 lg:h-8" // Clases responsivas
        onClick={toggleMenu}
      />
      {/* Menú desplegable */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#EDBEBE] shadow-lg transform font-itim text-2xl
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Icono de cerrar */}
        <div className="flex justify-start p-4 mt-3">
          <img
            src={closeIcon}
            alt="close menu"
            className="w-10 h-10 rotate-180 cursor-pointer"
            onClick={toggleMenu}
          />
          <p className="ml-6 text-5xl text-white">Inicio</p>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col items-start mt-8 ml-8 space-y-6 text-black">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "border-[#0D1B2A] border-b-2"
                : "hover:text-gray-500 transition-colors"
            }
            onClick={toggleMenu} // Cierra el menú al hacer clic
          >
            Inicio
          </NavLink>
          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive
                ? "border-[#0D1B2A] border-b-2"
                : "hover:text-gray-500 transition-colors"
            }
            onClick={toggleMenu} // Cierra el menú al hacer clic
          >
            Books
          </NavLink>
          <NavLink
            to="/user"
            className={({ isActive }) =>
              isActive
                ? "border-[#0D1B2A] border-b-2"
                : "hover:text-gray-500 transition-colors"
            }
            onClick={toggleMenu} // Cierra el menú al hacer clic
          >
            Users
          </NavLink>
          <NavLink
            to="/employee"
            className={({ isActive }) =>
              isActive
                ? "border-[#0D1B2A] border-b-2"
                : "hover:text-gray-500 transition-colors"
            }
            onClick={toggleMenu} // Cierra el menú al hacer clic
          >
            Employee
          </NavLink>
          <NavLink
            to="/loan"
            className={({ isActive }) =>
              isActive
                ? "border-[#0D1B2A] border-b-2"
                : "hover:text-gray-500 transition-colors"
            }
            onClick={toggleMenu} // Cierra el menú al hacer clic
          >
            Loan
          </NavLink>
          <NavLink
            to="/userloan"
            className={({ isActive }) =>
              isActive
                ? "border-[#0D1B2A] border-b-2"
                : "hover:text-gray-500 transition-colors"
            }
            onClick={toggleMenu} // Cierra el menú al hacer clic
          >
            User loan
          </NavLink>
        </nav>
      </div>

      {/* Fondo oscuro al abrir el menú */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 opacity-50 bg-slate-300"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};
export default Menu
