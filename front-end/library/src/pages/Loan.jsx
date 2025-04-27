import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import AddButton from "../components/AddButton";
import ModalDelete from "../components/ModalDelete";
import LoanUserForm from "../components/AddLoanForm";
import SearchFilter from "../components/SearchFilterLoan";
import ReloadButton from "../components/ReloadButton";  // Importamos el ReloadButton

const apiUrl = "http://localhost:8080/api/v1/loan/";

export const Loan = () => {
  const [mergedData, setMergedData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Función para recargar los datos
  const reloadData = () => {
    fetch("http://localhost:8080/api/v1/user_loan/")
      .then((res) => res.json())
      .then((userLoanData) => {
        const combined = userLoanData.map((entry) => {
          const loan = entry.loan;
          const user = entry.user;

          return {
            id_loan: loan.id_loan,
            bookTitle: loan.id_book?.title || "N/A",
            author: loan.id_book?.author || "N/A",
            employeeName: loan.id_employee?.name || "N/A",
            employeeRole: loan.id_employee?.position || "N/A",
            userFullName: `${user?.name || "N/A"} ${user?.last_name || ""}`.trim(),
            observations: entry.observations || "Sin observaciones",
            dateLoan: loan.date_loan,
            dateReturn: loan.date_return,
            state: loan.state_loan,
          };
        });

        combined.sort((a, b) => a.id_loan - b.id_loan);
        setMergedData(combined);
      })
      .catch((err) => console.error("Error cargando datos:", err));
  };

  // Cargar los datos al montar el componente
  useEffect(() => {
    reloadData();
  }, []);

  // Manejar los resultados del filtro
  const handleFilter = (filteredData) => {
    setMergedData(filteredData); // Actualiza la tabla con los datos filtrados
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  const confirmDelete = () => {
    fetch(`${apiUrl}${itemToDelete.id_loan}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setMergedData(mergedData.filter((d) => d.id_loan !== itemToDelete.id_loan));
          setSuccessMessage("Loan successfully deleted.");
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

  const handleFormSuccess = (newLoan) => {
    setMergedData((prev) => [...prev, {
      ...newLoan,
      bookTitle: "Nuevo libro",
      author: "Desconocido",
      employeeName: "Nuevo empleado",
      employeeRole: "Cargo desconocido",
      userFullName: "Asignar",
      observations: "Sin observaciones",
      dateLoan: newLoan.date_loan,
      dateReturn: newLoan.date_return,
      state: newLoan.state_loan
    }]);
    setSuccessMessage("Loan agregado correctamente.");
    setTimeout(() => setSuccessMessage(""), 3000);
    setShowForm(false);
  };

  return (
    <div>
      <div className="text-5xl sm:text-7xl font-jacques text-white bg-[#883429] p-4 max-w-3xl w-full rounded-2xl text-center mx-auto">
        Loans
      </div>

      <SearchFilter
        apiUrl="http://localhost:8080/api/v1/loan/"
        onFilter={handleFilter} // Pasamos la función para manejar el filtro
      />

      <div className="flex justify-center mt-4 mb-4">
        <AddButton onClick={() => setShowForm(true)} text="Add Loan" />
      </div>

      <div className="flex justify-center mt-4 mb-4">
        <ReloadButton onReload={reloadData} />
      </div>

      {successMessage && (
        <p className="font-semibold text-center mb-4 text-3xl">
          {successMessage}
        </p>
      )}

      {showForm && (
        <div className="flex justify-center mt-4">
          <LoanUserForm
            onSuccess={handleFormSuccess}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}
      <Table data={mergedData} onDelete={handleDeleteClick} />

      <ModalDelete
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        item={itemToDelete}
      />
    </div>
  );
};
