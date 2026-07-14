import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AddEmployeeModal from "../components/AddEmployeeModal";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const limit = 20;

  useEffect(() => {
    loadEmployees();
  }, [page, search]);

  const loadEmployees = () => {
    api
      .get(`/employees?search=${search}&page=${page}&limit=${limit}`)
      .then((res) => {
        setEmployees(res.data.data);
        setTotal(res.data.total);
      })
      .catch((err) => console.log(err));
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">

          <div className="flex justify-between items-center mb-6">

            <h1 className="text-3xl font-bold">
              Employees
            </h1>

            <div className="flex gap-3">

              <input
                type="text"
                placeholder="Search employee..."
                className="border rounded-lg px-4 py-2 w-72"
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
              />

              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
              >
                + Add Employee
              </button>

            </div>

          </div>

          <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Code</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Role</th>
                </tr>
              </thead>

              <tbody>

                {employees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">{emp.id}</td>
                    <td className="p-3">{emp.employee_code}</td>
                    <td className="p-3">{emp.name}</td>
                    <td className="p-3">{emp.department}</td>
                    <td className="p-3">{emp.role}</td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          <div className="flex justify-between items-center mt-6">

            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="font-medium">
              Page {page} of {totalPages || 1}
            </span>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages || totalPages === 0}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>

          </div>

        </div>
      </div>

      {showModal && (
        <AddEmployeeModal
          onClose={() => setShowModal(false)}
          onSuccess={loadEmployees}
        />
      )}

    </div>
  );
}