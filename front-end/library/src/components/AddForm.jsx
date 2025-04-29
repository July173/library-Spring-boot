import React, { useState } from "react";

const AddForm = ({ apiUrl, fields, onSuccess, onClose }) => {
  const initialFormState = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Validación personalizada para ISBN
    if ("isbn" in formData) {
      const isbnValue = formData.isbn.toString(); // Aseguramos que sea string
      if (isbnValue.length !== 13) {
        setError("The ISBN must have exactly 13 digits.");
        setLoading(false);
        return; // Detener el envío
      }
    }
    console.log("formData", formData);
    if("phone_number" in formData){
      const phoneValue = formData.phone_number.toString(); // Aseguramos que sea string
      if (phoneValue.length !== 10) {
        setError("The phone number must have exactly 10 digits.");
        setLoading(false);
        return; // Detener el envío
      }
    }
    if ("email" in formData) {
      const emailValue = formData.email.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!emailRegex.test(emailValue)) {
        setError("Invalid email format.");
        setLoading(false);
        return; // Detener el envío
        // Aquí puedes lanzar un error, mostrar un mensaje o lo que necesites
      }
    }
    
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error sending form");
      }

      const result = await response.json();
      onSuccess(result);
      setFormData(initialFormState);
    } catch (err) {
      setError(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-center font-bold text-2xl p-4">Registration Form</h1>

        {fields.map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block text-sm font-bold mb-1" htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type={field.type || "text"}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required={field.required}
            />
          </div>
        ))}

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
