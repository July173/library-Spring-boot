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

  const [loading, setLoading] = useState(false); // Estado de carga

  const reloadData = async () => {
    setLoading(true); // Inicia la carga
    try {
      const res = await fetch("http://localhost:8080/api/v1/user_loan/");
      const userLoanData = await res.json();

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
        console.error("Invalid data:", userLoanData);
        setMergedData([]); // Establece un arreglo vacío si los datos no son válidos
      }
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setLoading(false); // Finaliza la carga
    }
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
          setMergedData((prev) =>
            prev.filter((d) => d.id_loan !== itemToDelete.id_loan)
          );
          setSuccessMessage("Loan successfully deleted."); // Mensaje en inglés
          setTimeout(() => setSuccessMessage(""), 3000); // Limpia el mensaje después de 3 segundos
        } else {
          console.error("Error deleting loan.");
        }
        setShowModal(false);
        setItemToDelete(null);
      })
      .catch((error) => {
        console.error("Error in deletion:", error);
        setShowModal(false);
        setItemToDelete(null);
      });
  };

  const handleFormSuccess = () => {
    reloadData(); // Actualiza los datos después de agregar un nuevo préstamo
    setSuccessMessage("Loan successfully added."); // Mensaje en inglés
    setTimeout(() => setSuccessMessage(""), 3000); // Limpia el mensaje después de 3 segundos
    setShowForm(false);
  };

  const handleEditClick = (item) => {
    setItemToUpdate(item);
    setShowUpdateForm(true);
  };

  const handleUpdateSuccess = () => {
    reloadData(); // Recarga los datos después de la actualización
    setSuccessMessage("Loan successfully updated."); // Mensaje en inglés
    setTimeout(() => setSuccessMessage(""), 3000); // Limpia el mensaje después de 3 segundos
    setShowUpdateForm(false);
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
        <ReloadButton onReload={reloadData} loading={loading} />
      </div>

      {successMessage && (
        <div className="text-green-700 text-center mt-4 font-semibold text-lg">
          {successMessage}
        </div>
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
              { name: "date_loan", label: "Date loan", type: "date", required: true },
              { name: "date_return", label: "Date return", type: "date", required: true },
              {
                name: "state_loan",
                label: "Sate loan",
                type: "select",
                required: true,
                options: [
                  { value: "On Loan", label: "On Loan" },
                  { value: "Return", label: "Return" }
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
