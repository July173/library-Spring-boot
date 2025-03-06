import {BrowserRouter, Routes, Route} from "react-router-dom"
import React from "react";
import { Error404, Inicio, Employee, Books, Loan, User_Loan, Users } from "./pages"
import Menu from "./components/menu" 

function App() {

  return (
    <>
    <BrowserRouter>
    <Menu />
    <div className="bg-[#F0DFB1] min-h-screen font-itim p-1">
      <Routes>
        {/* Página principal de productos */}
        <Route path="/" element={<Inicio />} />

        {/* Detalles de un producto */}
        <Route path="/books" element={<Books />} />
        <Route path="/user" element={<Users />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/userloan" element={<User_Loan />} />

        {/* Página de error 404 */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  </BrowserRouter>
  </>
  )
}

export default App
