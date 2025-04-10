import React, { useEffect, useState } from "react";
import buscar from "../assets/img/buscar.png";
import Table from "../components/Table";
import AddButton from "../components/AddButton";

// Función para formatear los encabezados de columna
const camelToWords = (text) =>
  text.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

export const Loan = () => {
  const [mergedData, setMergedData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/user_loan/")
      .then((res) => res.json())
      .then((userLoanData) => {
        const combined = userLoanData.map((entry) => {
          const loan = entry.loan;
          const user = entry.user;

          return {
            id: loan.id_loan,
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

        combined.sort((a, b) => a.id - b.id);
        setMergedData(combined);
      })
      .catch((err) => console.error("Error cargando datos:", err));
  }, []);

  return (
    <div>
      <div className="text-5xl sm:text-7xl font-jacques text-white bg-[#883429] p-4 max-w-3xl w-full rounded-2xl text-center mx-auto">
        Loans
      </div>

      <div className="mx-auto mt-5 rounded-lg max-w-[35rem] w-full bg-amber-50 h-8">
        <img src={buscar} alt="buscar" className="w-8 h-8 cursor-pointer" />
      </div>

      <div className="flex justify-center mt-4">
        <AddButton onClick={() => {}} text="Add Loan" />
      </div>

      <div className="w-[97vw] p-2 mt-6">
        <Table data={mergedData} labelFormatter={camelToWords} />
      </div>
    </div>
  );
};
