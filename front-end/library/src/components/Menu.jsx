import { useState } from "react";
import React from "react";
import { NavLink } from "react-router-dom";
import menuIcon from "../assets/img/menu.png";
import closeIcon from "../assets/img/close.png";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative bg-[#F0DFB1] p-6 ">
      {/* Icono de menú - Siempre visible */}
      <img
        src={menuIcon}
        alt="menu"
        className="block w-12 h-12 cursor-pointer sm:w-14 sm:h-14 md:w-8 md:h-8 lg:w-12 lg:h-12 " // Clases responsivas
        onClick={toggleMenu}
      />
      {/* Menú desplegable */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#BF6559] shadow-lg transform  text-2xl font-jacques
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Icono de cerrar */}
        <div className="flex justify-end p-4 mt-3">
          <img
            src={closeIcon}
            alt="close menu"
            className="w-8 h-8 rotate-180 cursor-pointer"
            onClick={toggleMenu}
          />
        </div>

        {/* Navegación */}
        <nav className="flex flex-col items-start mt-2 ml-8 space-y-6 text-white">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-gray-700 "
                : "hover:text-gray-800 transition-colors"
            }
            onClick={toggleMenu} // Cierra el menú al hacer clic
          >
            Inicio
          </NavLink>
          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive
                ? "border-[#883429] border-b-2"
                : "hover:text-gray-800 transition-colors"
            }
            onClick={toggleMenu} // Cierra el menú al hacer clic
          >
            Books
          </NavLink>
          <NavLink
            to="/user"
            className={({ isActive }) =>
              isActive
                ? "border-[#883429] border-b-2"
                : "hover:text-gray-800 transition-colors"
            }
            onClick={toggleMenu} // Cierra el menú al hacer clic
          >
            Users
          </NavLink>
          <NavLink
            to="/employee"
            className={({ isActive }) =>
              isActive
                ? "border-[#883429] border-b-2"
                : "hover:text-gray-800 transition-colors"
            }
            onClick={toggleMenu} // Cierra el menú al hacer clic
          >
            Employee
          </NavLink>
          <NavLink
            to="/loan"
            className={({ isActive }) =>
              isActive
                ? "border-[#883429] border-b-2"
                : "hover:text-gray-800 transition-colors"
            }
            onClick={toggleMenu} // Cierra el menú al hacer clic
          >
            Loan
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
export default Menu;
