import React, { useEffect, useState } from "react";
import buscar from "../assets/img/buscar.png";
import Table from "../components/Table";
import AddButton from "../components/AddButton";
import ModalDelete from "../components/ModalDelete";
import AddForm from "../components/AddForm"; // Asegúrate de importar esto

export const Employee = ({ apiUrl }) => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false); // <- Para mostrar formulario

  apiUrl = "http://localhost:8080/api/v1/employee/";

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error al obtener datos:", error));
  }, [apiUrl]);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  const confirmDelete = () => {
    fetch(`${apiUrl}${itemToDelete.id_employee}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setData(data.filter((d) => d.id_employee !== itemToDelete.id_employee));
          setSuccessMessage("Empleado eliminado correctamente.");
          setTimeout(() => setSuccessMessage(""), 3000);
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

  const handleFormSuccess = (newEmployee) => {
    setData([...data, newEmployee]);
    setSuccessMessage("Empleado agregado correctamente.");
    setTimeout(() => setSuccessMessage(""), 3000);
    setShowForm(false);
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
        <AddButton onClick={() => setShowForm(true)} text="Add Employee" />
      </div>

      {successMessage && (
        <p className=" font-semibold text-center mb-4 text-3xl">
          {successMessage}
        </p>
      )}

      {showForm && (
        <div className="flex justify-center mt-4">
          <AddForm
            apiUrl={apiUrl}
            fields={[
              { name: "name", label: "Name", type: "text" },
              { name: "position", label: "Position", type: "text" },
              { name: "phone_number", label: "Phone Number", type: "number" },
              { name: "status", label: "Status", type: "number" },
            ]}
            onSuccess={handleFormSuccess}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="w-[97vw] p-2 mt-6">
        <Table data={data} onDelete={handleDeleteClick} />
      </div>

      <ModalDelete
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        item={itemToDelete}
      />
    </div>
  );
};
