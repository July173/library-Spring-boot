import React, { useEffect, useState } from "react";

const UpdateForm = ({ apiUrl, fields, item, idKey = "id", onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(item || {});
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = item?.[idKey];
    if (!id) {
      console.error(`ID '${idKey}' no encontrado en el item`, item);
      return;
    }

    fetch(`${apiUrl}${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        onSuccess();
      })
      .catch((err) => console.error("Error al actualizar:", err));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium mb-1">{field.label}</label>
          <input
            type={field.type || "text"}
            name={field.name}
            required={field.required}
            value={formData[field.name] || ""}
            onChange={handleChange}
            disabled={field.disabled}
            className="w-full p-2 border border-gray-300 rounded bg-white disabled:opacity-70"
          />

        </div>
      ))}
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
          Cancelar
        </button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Actualizar
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
