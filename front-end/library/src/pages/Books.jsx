import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import AddButton from "../components/AddButton";
import ModalDelete from "../components/ModalDelete";
import AddForm from "../components/AddForm";
import UpdateForm from "../components/UpdateForm";
import SearchFilter from "../components/SearchFilter";
import ReloadButton from "../components/ReloadButton"; // Importa el botón de recarga

export const Books = () => {
  const apiUrl = "http://localhost:8080/api/v1/book/";
  const [data, setData] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [itemToUpdate, setItemToUpdate] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const fields = [

    { name: "title", label: "Título", required: true },
    { name: "author", label: "Autor", required: true },
    { name: "publisher", label: "Editorial" },
    { name: "description", label: "Descripción" },
    { name: "isbn", label: "ISBN", type: "number" },
    { name: "stock", label: "Stock", type: "number" },
    { name: "url", label: "URL Imagen" },
  ];
  data
  itemToUpdate
  showUpdateForm

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

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };
  // Función para recargar la página y hacer fetch a la API
  const handleReload = () => {
    fetchData(); // Recarga los datos desde la API
  };

  const confirmDelete = () => {
    // Verifica que el id esté siendo recibido correctamente
    console.log("Item to delete:", itemToDelete);

    if (itemToDelete && itemToDelete.id_book) {
      fetch(`${apiUrl}${itemToDelete.id_book}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            setMergedData((prev) =>
              prev.filter((d) => d.id_book !== itemToDelete.id_book)
            );
            setSuccessMessage("Libro eliminado correctamente.");
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
    } else {
      console.error("ID no encontrado en el libro.");
    }
  };
  const handleEditClick = (item) => {
    console.log("Item to edit:", item);  // Verifica si el objeto es el correcto
    setItemToUpdate(item);
    setShowUpdateForm(true);
  };



  // Función para manejar el filtro
  const handleFilter = (filteredData) => {
    setMergedData(filteredData); // Actualizamos los datos con los resultados del filtro

  };

  return (
    <div>
      <div className="text-5xl sm:text-7xl font-jacques text-white bg-[#883429] p-4 max-w-3xl w-full rounded-2xl text-center mx-auto">
        Books
      </div>

      {/* Componente para el filtro de búsqueda */}
      <SearchFilter apiUrl={apiUrl} onFilter={handleFilter} />

      <div className="flex justify-center mt-4">
        <AddButton onClick={() => setShowAddForm(!showAddForm)} text="Add book" />
      </div>

      {showAddForm && (
        <div className="mt-4">
          <AddForm
            apiUrl={apiUrl}
            fields={fields}
            onSuccess={() => {
              fetchData();
              setShowAddForm(false);
              setSuccessMessage("Libro agregado correctamente.");
              setTimeout(() => setSuccessMessage(""), 3000);
            }}
            onClose={() => setShowAddForm(false)}
          />
        </div>
      )}

      {successMessage && (
        <div className="text-green-700 text-center mt-4">{successMessage}</div>
      )}

      {/* Usando el componente ReloadButton */}
      <div className="flex justify-center mt-4">
        <ReloadButton onReload={handleReload} />
      </div>

      
      <div className="flex flex-wrap ml-16 gap-4 p-2 mt-6">
        {mergedData.length === 0 ? (
          <p className="text-center text-gray-500 text-lg w-full">
            No hay libros disponibles.
          </p>
        ) : (
          mergedData.map((item) => (
            <Card
              key={item.id_book}
              data={item}
              onDelete={handleDeleteClick}
              onEdit={handleEditClick}
            />
          ))
        )}
      </div>

      <ModalDelete
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        item={itemToDelete}
      />

      {showUpdateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Actualizar libro</h2>
            <UpdateForm
              apiUrl={apiUrl}
              fields={[
                { name: "title", label: "Título", required: true },
                { name: "author", label: "Autor", required: true },
                { name: "publisher", label: "Editorial", required: true },
                { name: "description", label: "Descripción", required: true },
                { name: "isbn", label: "ISBN", type: "number", required: true, disabled: true },
                { name: "stock", label: "Stock", type: "number", required: true },
                { name: "state_book", label: "Estado del libro", type: "number", required: true },
                { name: "url", label: "Imagen (URL)", required: true },
              ]}
              item={{ ...itemToUpdate, status: 1 }}
              idKey="id_book"
              onSuccess={() => {
                fetchData();
                setShowUpdateForm(false);
                setItemToUpdate(null);
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
