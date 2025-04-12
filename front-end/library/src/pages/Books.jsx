import React, { useEffect, useState } from "react";
import buscar from "../assets/img/buscar.png";
import Card from "../components/Card";
import AddButton from "../components/AddButton";
import ModalDelete from "../components/ModalDelete"; // Asegúrate de tener este componente

export const Books = ({ apiUrl }) => {
  const [data, setData] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    data
    
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setMergedData(data); // <- Asegura que mergedData tenga datos iniciales
      })
      .catch((error) => console.error("Error al obtener datos:", error));
  }, [apiUrl]);
apiUrl = "http://localhost:8080/api/v1/book/"
  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  const confirmDelete = () => {
    fetch(`http://localhost:8080/api/v1/book/${itemToDelete.id}`, {
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
  };

  return (
    <div>
      <div className="text-5xl sm:text-7xl font-jacques text-white bg-[#883429] p-4 max-w-3xl w-full rounded-2xl text-center mx-auto">
        Books
      </div>

      <div className="mx-auto mt-5 rounded-lg max-w-[35rem] w-full bg-amber-50 h-8">
        <img
          src={buscar}
          alt="buscar"
          className="w-8 h-8 cursor-pointer"
        />
      </div>

      <div className="flex justify-center mt-4">
        <AddButton onClick={() => {}} text="Add book" />
      </div>

      {successMessage && (
        <div className="text-green-600 text-center mt-4">{successMessage}</div>
      )}

      <div className="flex flex-wrap ml-16 gap-4 p-2 mt-6">
        {mergedData.map((item) => (
          <Card key={item.id} data={item} onDelete={handleDeleteClick} />
        ))}
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <ModalDelete
          message="¿Estás seguro de eliminar este libro?"
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
