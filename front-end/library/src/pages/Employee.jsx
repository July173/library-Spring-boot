import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import AddButton from "../components/AddButton";
import ModalDelete from "../components/ModalDelete";
import AddForm from "../components/AddForm";
import ReloadButton from "../components/ReloadButton";
import UpdateForm from "../components/UpdateForm";
import SearchFilter from "../components/SearchFilter";

export const Employee = () => {
  const [data, setData] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToUpdate, setItemToUpdate] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const apiUrl = "http://localhost:8080/api/v1/employee/";
  data
  const fields = [
    { name: "name", label: "Name", required: true },
    { name: "position", label: "Position", required: true },
    { name: "phone_number", label: "Phone Number", type: "number", required: true },
  ];

  const fetchData = async () => {
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setData(data);
      setMergedData(data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReload = async () => {
    await fetchData(); // Ahora es asíncrona
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (itemToDelete && itemToDelete.id_employee) {
      fetch(`${apiUrl}${itemToDelete.id_employee}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            // Actualizar tanto data como mergedData
            setMergedData((prev) =>
              prev.filter((d) => d.id_employee !== itemToDelete.id_employee)
            );
            setData((prev) =>
              prev.filter((d) => d.id_employee !== itemToDelete.id_employee)
            );
            setSuccessMessage("Employee successfully deleted.");
            setTimeout(() => setSuccessMessage(""), 3000);
          } else {
            console.error("Error deleting employee.");
          }
          setShowModal(false);
          setItemToDelete(null);
        })
        .catch((error) => {
          console.error("Error in deletion:", error);
          setShowModal(false);
          setItemToDelete(null);
        });
    } else {
      console.error("ID not found for the employee.");
    }
  };

  const handleFormSuccess = (newEmployee) => {
    const employeeWithStatus = { ...newEmployee, status: 1 };
    fetchData(); // Actualiza los datos después de agregar un nuevo empleado
    setData((prev) => [...prev, employeeWithStatus]);
    setSuccessMessage("Employee added successfully.");
    setTimeout(() => setSuccessMessage(""), 3000);
    setShowForm(false);
  };

  const handleEditClick = (item) => {
    setItemToUpdate(item);
    setShowUpdateForm(true);
  };

  const handleFilter = (filteredData) => {
    setMergedData(filteredData);
  };

  return (
    <div>
      <div className="text-5xl sm:text-7xl font-jacques text-white bg-[#883429] p-4 max-w-3xl w-full rounded-2xl text-center mx-auto">
        Employees
      </div>

      <SearchFilter apiUrl={apiUrl} onFilter={handleFilter} />

      <div className="flex justify-center mt-4">
        <AddButton onClick={() => setShowForm(true)} text="Add Employee" />
      </div>

      {successMessage && (
        <div className="text-green-700 text-center mt-4">{successMessage}</div>
      )}

      {showForm && (
        <div className="flex justify-center mt-4">
          <AddForm
            apiUrl={apiUrl}
            fields={fields}
            onSuccess={handleFormSuccess}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="flex justify-center mt-4">
        <ReloadButton onReload={handleReload} />
      </div>

      <div className="w-[97vw] p-2 mt-6">
        <Table
          data={mergedData}
          onDelete={handleDeleteClick}
          onEdit={handleEditClick}
        />
      </div>

      <ModalDelete
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        item={itemToDelete}
      />

      {showUpdateForm && itemToUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Update Employee</h2>
            <UpdateForm
              apiUrl={apiUrl}
              fields={fields}
              item={{ ...itemToUpdate, status: 1 }}
              idKey="id_employee"
              onSuccess={() => {
                fetchData();
                setShowUpdateForm(false);
                setItemToUpdate(null);
                setSuccessMessage("Employee updated successfully."); // Mensaje de éxito
                setTimeout(() => setSuccessMessage(""), 3000); // Limpiar el mensaje después de 3 segundos
              }}
              onCancel={() => {
                setShowUpdateForm(false);
                setItemToUpdate(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
