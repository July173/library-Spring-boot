import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import AddButton from "../components/AddButton";
import ModalDelete from "../components/ModalDelete";
import AddForm from "../components/AddForm";
import ReloadButton from "../components/ReloadButton";
import UpdateForm from "../components/UpdateForm"; // Importa el formulario de actualización
import SearchFilter from "../components/SearchFilter"; 

export const Users = ({ apiUrl }) => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mergedData, setMergedData] = useState([]);
  const [itemToUpdate, setItemToUpdate] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  apiUrl = "http://localhost:8080/api/v1/user/";

  // Función para obtener datos de la API
  const fetchData = () => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setMergedData(data);
      })
      .catch((error) => console.error("Error al obtener datos:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

   // Función para recargar la página y hacer fetch a la API
   const handleReload = () => {
    fetchData(); // Recarga los datos desde la API
  };

  // Función para eliminar un usuario
  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  const confirmDelete = () => {
    fetch(`${apiUrl}${itemToDelete.id_user}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setData(data.filter((d) => d.id_user !== itemToDelete.id_user));
          setSuccessMessage("Usuario eliminado correctamente.");
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

  // Función para manejar el formulario de éxito
  const handleFormSuccess = (newUser) => {
    // Asegura que status sea 1
    const userWithStatus = { ...newUser, status: 1 };
    
    // Agregar el nuevo usuario con el status predefinido
    setData([...data, userWithStatus]);
    setSuccessMessage("Usuario agregado correctamente.");
    setTimeout(() => setSuccessMessage(""), 3000);
    setShowForm(false);
  };
  
  // Función para manejar el formulario de edición
  const handleEditClick = (item) => {
    console.log("Item to edit:", item);  // Verifica si el objeto es el correcto
    setItemToUpdate(item);
    setShowUpdateForm(true);
  };

  // Función para manejar el formulario de actualización
  const handleEditSubmit = (updated) => {
    fetch(`${apiUrl}${updated.id_user}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    })
      .then((response) => response.json())
      .then(() => {
        setShowUpdateForm(false);  // Cierra el formulario de edición
        fetchData();  // Refresca la lista de usuarios
        setSuccessMessage("Usuario actualizado correctamente.");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Error al actualizar usuario:", error);
        setShowUpdateForm(false);
      });
  };

  // Función para manejar el filtro
  const handleFilter = (filteredData) => {
    setMergedData(filteredData); // Actualizamos los datos con los resultados del filtro
  };

  return (
    <div>
      <div className="text-5xl sm:text-7xl font-jacques text-white bg-[#883429] p-4 max-w-3xl w-full rounded-2xl text-center mx-auto">
        Users
      </div>

      {/* Componente para el filtro de búsqueda */}
      <SearchFilter apiUrl={apiUrl} onFilter={handleFilter} />

      <div className="flex justify-center mt-4">
        <AddButton onClick={() => setShowForm(true)} text="Add User" />
      </div>

      {successMessage && (
        <p className="font-semibold text-center mb-4 text-3xl">
          {successMessage}
        </p>
      )}

      {showForm && (
        <div className="flex justify-center mt-4">
          <AddForm
            apiUrl={apiUrl}
            fields={[
              { name: "name", label: "Name", type: "text" },
              { name: "last_name", label: "Last Name", type: "text" },
              { name: "address", label: "Address", type: "text" },
              { name: "phone_number", label: "Phone Number", type: "number" },
              { name: "email", label: "Email", type: "email" },
            ]}
            onSuccess={handleFormSuccess}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}
  {/* Usando el componente ReloadButton */}
      <div className="flex justify-center mt-4">
        <ReloadButton onReload={handleReload} />
      </div>
      {/* Tabla de usuarios */}
      <div className="w-[97vw] p-2 mt-6">
        <Table
          data={mergedData}
          onDelete={handleDeleteClick}
          onEdit={handleEditClick}
        />
      </div>

      {/* Modal de confirmación de eliminación */}
      <ModalDelete
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        item={itemToDelete}
      />

      {/* Modal de actualización */}
      {showUpdateForm && itemToUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Actualizar Usuario</h2>
            <UpdateForm
              apiUrl={apiUrl}
              fields={[
                { name: "name", label: "Name", required: true },
                { name: "last_name", label: "Last Name", required: true },
                { name: "address", label: "Address", required: true },
                { name: "phone_number", label: "Phone Number", type: "number", required: true },
                { name: "email", label: "Email", required: true },
                // No incluir `id` ni `status` en el formulario
              ]}
              item={{...itemToUpdate, status: 1} }
              idKey="id_user"
              onSuccess={handleEditSubmit} // Llama a la función para actualizar
              onCancel={() => setShowUpdateForm(false)} // Cierra el formulario sin cambios
            />
          </div>
        </div>
      )}
    </div>
  );
};
