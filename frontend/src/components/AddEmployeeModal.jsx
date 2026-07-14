import { useState } from "react";
import api from "../services/api";

export default function AddEmployeeModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    employee_code: "",
    name: "",
    email: "",
    department: "",
    role: "",
    joining_date: "",
    status: "Active",
    project_id: 1,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveEmployee = () => {
    api
      .post("/employees/", form)
      .then(() => {
        alert("Employee Added Successfully");
        onSuccess();
        onClose();
      })
      .catch((err) => {
        console.log(err);
        alert("Unable to add employee");
      });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-xl p-6 w-[500px]">

        <h2 className="text-2xl font-bold mb-5">
          Add Employee
        </h2>

        <div className="space-y-3">

          <input
            className="border p-2 w-full rounded"
            placeholder="Employee Code"
            name="employee_code"
            onChange={handleChange}
          />

          <input
            className="border p-2 w-full rounded"
            placeholder="Name"
            name="name"
            onChange={handleChange}
          />

          <input
            className="border p-2 w-full rounded"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />

          <input
            className="border p-2 w-full rounded"
            placeholder="Department"
            name="department"
            onChange={handleChange}
          />

          <input
            className="border p-2 w-full rounded"
            placeholder="Role"
            name="role"
            onChange={handleChange}
          />

          <input
            type="date"
            className="border p-2 w-full rounded"
            name="joining_date"
            onChange={handleChange}
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={saveEmployee}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
}