import React, { useEffect, useState } from "react";
import buscar from "../assets/img/buscar.png";
import Card from "../components/Card";
import AddButton from "../components/AddButton";
import ModalDelete from "../components/ModalDelete";
import AddForm from "../components/AddForm";

export const Books = () => {
  const apiUrl = "http://localhost:8080/api/v1/book/";
  const [data, setData] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const fields = [
    
    { name: "title", label: "Título", required: true },
    { name: "author", label: "Autor", required: true },
    { name: "publisher", label: "Editorial" },
    { name: "description", label: "Descripción" },
    { name: "isbn", label: "ISBN", type: "number" },
    { name: "stock", label: "Stock", type: "number" },
    { name: "status", label: "Estado", type: "number" },
    { name: "state_book", label: "Estado del libro", type: "number" },
    { name: "url", label: "URL Imagen" },
  ];
data


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

  const confirmDelete = () => {
    // Verifica que el id esté siendo recibido correctamente
    console.log("Item to delete:", itemToDelete);
  
    if (itemToDelete && itemToDelete.id) {
      fetch(`${apiUrl}${itemToDelete.id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            setMergedData((prev) =>
              prev.filter((d) => d.id !== itemToDelete.id)
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
  

  return (
    <div>
      <div className="text-5xl sm:text-7xl font-jacques text-white bg-[#883429] p-4 max-w-3xl w-full rounded-2xl text-center mx-auto">
        Books
      </div>

      <div className="mx-auto mt-5 rounded-lg max-w-[35rem] w-full bg-amber-50 h-8">
        <img src={buscar} alt="buscar" className="w-8 h-8 cursor-pointer" />
      </div>

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
          />
        </div>
      )}

      {successMessage && (
        <div className="text-green-600 text-center mt-4">{successMessage}</div>
      )}

      <div className="flex flex-wrap ml-16 gap-4 p-2 mt-6">
        {mergedData.length === 0 ? (
          <p className="text-center text-gray-500 text-lg w-full">
            No hay libros disponibles.
          </p>
        ) : (
          mergedData.map((item) => (
            <Card key={item.id} data={item} onDelete={handleDeleteClick} />
          ))
        )}
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
