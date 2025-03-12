import {BrowserRouter, Routes, Route} from "react-router-dom"
import React from "react";
import { Error404, Inicio, Employee, Books,Users, Loan } from "./pages"
import Menu  from "./components/Menu";

function App() {

  return (
    <>
    <BrowserRouter>
    <Menu />
    <div className="bg-[#F0DFB1] min-h-screen font-itim p-2 pt-0">
      <Routes>
        {/* Página principal de productos */}
        <Route path="/" element={<Inicio />} />
        {/* Detalles de un producto */}
        <Route path="/books" element={<Books />} />
        <Route path="/user" element={<Users />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/employee" element={<Employee />} />
        {/* Página de error 404 */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  </BrowserRouter>
  </>
  )
}

export default App
