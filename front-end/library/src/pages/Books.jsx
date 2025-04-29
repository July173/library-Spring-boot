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
  const [loading, setLoading] = useState(false); // Estado de carga

  const fields = [
    { name: "title", label: "Title", required: true },
    { name: "author", label: "Author", required: true },
    { name: "publisher", label: "Publisher", required: true },
    { name: "description", label: "Description", required: true },
    { name: "isbn", label: "ISBN", type: "number", required: true },
    { name: "stock", label: "Stock", type: "number", required: true },
    { name: "url", label: "URL imagen", required: true },
  ];
data
  const fetchData = () => {
    setLoading(true); // Empieza la carga
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setMergedData(data);
        setLoading(false); // Termina la carga
      })
      .catch((error) => {
        console.error("Error getting data:", error);
        setLoading(false); // Termina la carga incluso si hay error
      });
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
    if (itemToDelete && itemToDelete.id_book) {
      fetch(`${apiUrl}${itemToDelete.id_book}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            setMergedData((prev) =>
              prev.filter((d) => d.id_book !== itemToDelete.id_book)
            );
            setSuccessMessage("Book successfully deleted.");
            setTimeout(() => setSuccessMessage(""), 3000);
          } else {
            console.error(" Error deleting.");
          }
          setShowModal(false);
          setItemToDelete(null);
        })
        .catch((error) => {
          console.error("Error in deletion: ", error);
          setShowModal(false);
          setItemToDelete(null);
        });
    } else {
      console.error("ID not found in the book..");
    }
  };

  const handleEditClick = (item) => {
    setItemToUpdate(item);
    setShowUpdateForm(true);
  };

  // Función para manejar el filtro
  const handleFilter = (filteredData) => {
    setMergedData(filteredData);
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
              setSuccessMessage("Book added successfully.");
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

      {/* Mostrar indicador de carga */}
      {loading && (
        <div className="flex justify-center mt-4">
        </div>
      )}

      <div className="flex flex-wrap ml-16 gap-4 p-2 mt-6">
        {mergedData.length === 0 ? (
          <p className="text-center text-gray-500 text-lg w-full">
            There are no books available.
          </p>
        ) : (
          mergedData.map((item) => {
            const { id_book, title, author, publisher, description, isbn, stock, url } = item;

            return (
              <Card
                key={id_book}
                data={{ id_book, title, author, publisher, description, isbn, stock, url }}
                onDelete={handleDeleteClick}
                onEdit={handleEditClick}
              />
            );
          })
        )}
      </div>

      <ModalDelete
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        item={itemToDelete}
      />

{showUpdateForm && (
  <div>
    <UpdateForm
      apiUrl={apiUrl}
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "author", label: "Author", required: true },
        { name: "publisher", label: "Publisher", required: true },
        { name: "description", label: "Description", required: true },
        { name: "url", label: "Img (URL)", required: true },
      ]}
      item={{ ...itemToUpdate, status: 1 }}
      idKey="id_book"
      onSuccess={() => {
        fetchData();
        setSuccessMessage("Update successfully.");
        setTimeout(() => setSuccessMessage(""), 3000); // El mensaje desaparecerá después de 3 segundos.
        setShowUpdateForm(false);
        setItemToUpdate(null);
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
