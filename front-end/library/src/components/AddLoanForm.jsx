import React, { useEffect, useState } from "react";

const AddLoanUserForm = ({ onSuccess, onClose }) => {
    const [employees, setEmployees] = useState([]);
    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        date_return: "",
        state_loan: "",
        id_employee: "",
        id_book: "",
        id_user: "",
        observations: "",
    });

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/employee/")
            .then(res => res.json())
            .then(data => setEmployees(data));

        fetch("http://localhost:8080/api/v1/book/")
            .then(res => res.json())
            .then(data => setBooks(data));

        fetch("http://localhost:8080/api/v1/user/")
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Crear el loan
        const loanResponse = await fetch("http://localhost:8080/api/v1/loan/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              
                date_return: formData.date_return,
                state_loan: "En préstamo",
                status: 1, // automático
                id_employee: { id_employee: parseInt(formData.id_employee) },
                id_book: { id_book: parseInt(formData.id_book) }
            })
        });

        if (!loanResponse.ok) {
            alert("Error creando loan");
            return;
        }


        const response = await loanResponse.json();
        const newLoan = response ["loan"];
        console.log("Nuevo préstamo creado:", newLoan);

        // 2. Crear la relación con el usuario
        const userLoanResponse = await fetch("http://localhost:8080/api/v1/user_loan/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user: { id_user: parseInt(formData.id_user) },   // 👈 correcto ahora
                loan: { id_loan: newLoan.id_loan },              // 👈 correcto ahora
                state: "Activo",
                status: 1,
                observations: formData.observations || "Sin observaciones"
              })
              
        });


        if (!userLoanResponse.ok) {
            alert("Error creando user_loan");
            return;
        }

        onSuccess(newLoan); // Puedes mejorar esto si quieres datos combinados
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-md w-full max-w-xl">
            <h2 className="text-2xl font-bold mb-4">Add Loan</h2>


            <label className="block mb-2">Date Return</label>
            <input type="date" name="date_return" required className="w-full mb-4 border p-2 rounded"
                value={formData.date_return} onChange={handleChange} />

            

            <label className="block mb-2">Employee</label>
            <select name="id_employee" required className="w-full mb-4 border p-2 rounded"
                value={formData.id_employee} onChange={handleChange}>
                <option value="">Select employee</option>
                {employees.map(emp => (
                    <option key={emp.id_employee} value={emp.id_employee}>{emp.name} - {emp.position}</option>
                ))}
            </select>

            <label className="block mb-2">Book</label>
            <select name="id_book" required className="w-full mb-4 border p-2 rounded"
                value={formData.id_book} onChange={handleChange}>
                <option value="">Select book</option>
                {books.map(book => (
                    <option key={book.id_book} value={book.id_book}>{book.title} - {book.author}</option>
                ))}
            </select>

            <label className="block mb-2">User</label>
            <select name="id_user" required className="w-full mb-4 border p-2 rounded"
                value={formData.id_user} onChange={handleChange}>
                <option value="">Select user</option>
                {users.map(user => (
                    <option key={user.id_user} value={user.id_user}>{user.name} {user.last_name}</option>
                ))}
            </select>

            <label className="block mb-2">Observations</label>
            <textarea name="observations" className="w-full mb-4 border p-2 rounded"
                value={formData.observations} onChange={handleChange} placeholder="Optional..." />

            <div className="flex justify-end gap-2">
                <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
            </div>
        </form>
    );
};

export default AddLoanUserForm;
