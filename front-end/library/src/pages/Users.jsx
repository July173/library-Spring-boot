import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import AddButton from "../components/AddButton";
import ModalDelete from "../components/ModalDelete";
import AddForm from "../components/AddForm";
import ReloadButton from "../components/ReloadButton";
import UpdateForm from "../components/UpdateForm";
import SearchFilter from "../components/SearchFilter";

export const Users = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mergedData, setMergedData] = useState([]);
  const [itemToUpdate, setItemToUpdate] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const apiUrl = "http://localhost:8080/api/v1/user/";
data
  const fields = [
    { name: "name", label: "Name", required: true },
    { name: "last_name", label: "Last Name", required: true },
    { name: "address", label: "Address", required: true },
    { name: "phone_number", label: "Phone Number", type: "number", required: true },
    { name: "email", label: "Email", required: true },
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
    if (itemToDelete && itemToDelete.id_user) {
      fetch(`${apiUrl}${itemToDelete.id_user}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            // Actualizar tanto data como mergedData
            setMergedData((prev) =>
              prev.filter((d) => d.id_user !== itemToDelete.id_user)
            );
            setData((prev) =>
              prev.filter((d) => d.id_user !== itemToDelete.id_user)
            );
            setSuccessMessage("User successfully deleted.");
            setTimeout(() => setSuccessMessage(""), 3000);
          } else {
            console.error("Error deleting.");
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
      console.error("ID not found for the user.");
    }
  };
  const handleFormSuccess = (newUser) => {
    const userWithStatus = { ...newUser, status: 1 };
   fetchData(); // Actualiza los datos después de agregar un nuevo usuario
    setData((prev) => [...prev, userWithStatus]);
    setSuccessMessage("User added successfully.");
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
        Users
      </div>

      <SearchFilter apiUrl={apiUrl} onFilter={handleFilter} />

      <div className="flex justify-center mt-4">
        <AddButton onClick={() => setShowForm(true)} text="Add User" />
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
        <div>
          <UpdateForm
            apiUrl={apiUrl}
            fields={fields}
            item={{ ...itemToUpdate, status: 1 }}
            idKey="id_user"
            onSuccess={() => {
              fetchData();
              setShowUpdateForm(false);
              setItemToUpdate(null);
              setSuccessMessage("User updated successfully."); // Mensaje de éxito
              setTimeout(() => setSuccessMessage(""), 3000); // Limpiar el mensaje después de 3 segundos
            }}
            onCancel={() => {
              setShowUpdateForm(false);
              setItemToUpdate(null);
            }}
          />
        </div>
      )}
    </div>
  );
};
