import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import AddButton from "../components/AddButton";
import ModalDelete from "../components/ModalDelete";
import LoanUserForm from "../components/AddLoanForm";
import SearchFilter from "../components/SearchFilterLoan";
import ReloadButton from "../components/ReloadButton";
import UpdateForm from "../components/UpdateForm"; // Aquí corregimos a UpdateForm

const apiUrl = "http://localhost:8080/api/v1/loan/";

export const Loan = () => {
  const [mergedData, setMergedData] = useState([]);  // Inicializa como un arreglo vacío
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [itemToUpdate, setItemToUpdate] = useState(null);

  const reloadData = () => {
    fetch("http://localhost:8080/api/v1/user_loan/")
      .then((res) => res.json())
      .then((userLoanData) => {
        if (Array.isArray(userLoanData)) {
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
              id_book: loan.id_book, 
            };
          });
  
          combined.sort((a, b) => a.id_loan - b.id_loan);
          setMergedData(combined);
        } else {
          console.error("Datos no válidos:", userLoanData);
          setMergedData([]);  // Establece un arreglo vacío si los datos no son válidos.
        }
      })
      .catch((err) => console.error("Error cargando datos:", err));
  };
  

  useEffect(() => {
    reloadData();
  }, []);

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

  const handleEditClick = (item) => {
    setItemToUpdate(item);
    setShowUpdateForm(true);
  };

  const handleUpdateSuccess = () => {
    reloadData();
    setShowUpdateForm(false);
    setSuccessMessage("Loan successfully updated.");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div>
      <div className="text-5xl sm:text-7xl font-jacques text-white bg-[#883429] p-4 max-w-3xl w-full rounded-2xl text-center mx-auto">
        Loans
      </div>

      <SearchFilter
        apiUrl="http://localhost:8080/api/v1/loan/"
        onFilter={(filteredData) => setMergedData(filteredData)}
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

      <Table data={mergedData} onDelete={handleDeleteClick} onEdit={handleEditClick} />

      <ModalDelete
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        item={itemToDelete}
      />

      {showUpdateForm && (
        <div className="flex justify-center mt-4">
          <UpdateForm
            apiUrl={apiUrl}
            fields={[
              { name: "date_loan", label: "Fecha de Préstamo", type: "date", required: true },
              { name: "date_return", label: "Fecha de Devolución", type: "date", required: true },
              { 
                name: "state_loan", 
                label: "Estado", 
                type: "select", 
                required: true,
                options: [
                  { value: "En Préstamo", label: "En Préstamo" },
                  { value: "Devuelto", label: "Devuelto" }
                ]
              }
                          ]}
            item={{
              id_loan: itemToUpdate.id_loan,
              date_loan: itemToUpdate.date_loan,
              date_return: itemToUpdate.date_return,
              state_loan: itemToUpdate.state_loan,
              id_book: { id_book: itemToUpdate.id_book?.id_book },
            }}
            idKey="id_loan"
            onSuccess={handleUpdateSuccess}
            onCancel={() => setShowUpdateForm(false)}
          />
        </div>
      )}
    </div>
  );
};
