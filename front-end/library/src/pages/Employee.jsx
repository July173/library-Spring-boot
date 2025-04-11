import React, { useEffect, useState } from "react";
import buscar from "../assets/img/buscar.png";
import Table from "../components/Table";
import AddButton from "../components/AddButton";
import ModalDelete from "../components/ModalDelete";

export const Employee = ({ apiUrl }) => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");


  apiUrl = "http://localhost:8080/api/v1/employee/";

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error al obtener datos:", error));
  }, [apiUrl]);

  const handleDeleteClick = (item) => {
    console.log("Item recibido para eliminar:", item); // 👈 Esto te ayuda a ver si llega bien
    setItemToDelete(item);
    setShowModal(true);
  };


  const confirmDelete = () => {
    console.log("Eliminando ID:", itemToDelete.id_employee);
    console.log("URL DELETE:", `${apiUrl}${itemToDelete.id_employee}`);
  
    fetch(`${apiUrl}${itemToDelete.id_employee}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setData(data.filter((d) => d.id_employee !== itemToDelete.id_employee)); 
          setSuccessMessage("Employee successfully deleted.");
          setTimeout(() => setSuccessMessage(""), 3000); // Oculta el mensaje después de 3s
        } else {
          console.error("Error al eliminar.");
        }
        setShowModal(false);
        setItemToDelete(null);
      })
      .catch((error) => {
        console.error("Error en la eliminación:", error);
        setShowModal(false);
        setItemToDelete(null);
      });
  };
  
  

  return (
    <div>
      <div className="text-5xl sm:text-7xl font-jacques text-white bg-[#883429] p-4 max-w-3xl w-full rounded-2xl text-center mx-auto">
        Employees
      </div>

      <div className="mx-auto mt-5 rounded-lg max-w-[35rem] w-full bg-amber-50 h-8">
        <img src={buscar} alt="buscar" className="w-8 h-8 cursor-pointer" />
      </div>

      <div className="flex justify-center mt-4">
        <AddButton onClick={""} text="Add Employee" />
      </div>
      {successMessage && (
        <p className=" font-semibold text-center mb-4 text-3xl">
          {successMessage}
        </p>
      )}

      <div className="w-[97vw] p-2 mt-6">
        <Table data={data} onDelete={handleDeleteClick} />
      </div>

      {/* Modal */}
      <ModalDelete
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        item={itemToDelete}
      />
    </div>
  );
};
