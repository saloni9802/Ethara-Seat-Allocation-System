import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Seats() {
  const [employees, setEmployees] = useState([]);
  const [seats, setSeats] = useState([]);
  const [projects, setProjects] = useState([]);
  const [allocations, setAllocations] = useState([]);

  const [employeeId, setEmployeeId] = useState("");
  const [seatId, setSeatId] = useState("");
  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    api.get("/employees?limit=5000")
      .then((res) => setEmployees(res.data.data))
      .catch(console.log);

    api.get("/seats/available")
      .then((res) => setSeats(res.data))
      .catch(console.log);

    api.get("/projects")
      .then((res) => setProjects(res.data))
      .catch(console.log);

    api.get("/seats/allocations")
      .then((res) => setAllocations(res.data))
      .catch(console.log);
  };

  const allocateSeat = () => {
    if (!employeeId || !seatId || !projectId) {
      alert("Please select Employee, Project and Seat");
      return;
    }

    api.post("/seats/allocate", {
      employee_id: Number(employeeId),
      seat_id: Number(seatId),
      project_id: Number(projectId),
    })
      .then(() => {
        alert("✅ Seat Allocated Successfully");

        setEmployeeId("");
        setSeatId("");
        setProjectId("");

        loadData();
      })
      .catch((err) => {
        alert(err.response?.data?.detail || "Allocation Failed");
      });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-8">
            Seat Allocation
          </h1>

          <div className="bg-white rounded-xl shadow p-6">

            <div className="grid grid-cols-3 gap-5">

              <div>

                <label className="font-semibold">
                  Employee
                </label>

                <select
                  className="border rounded-lg p-3 w-full mt-2"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                >
                  <option value="">Select Employee</option>

                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.employee_code} - {emp.name}
                    </option>
                  ))}

                </select>

              </div>

              <div>

                <label className="font-semibold">
                  Project
                </label>

                <select
                  className="border rounded-lg p-3 w-full mt-2"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                >
                  <option value="">Select Project</option>

                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}

                </select>

              </div>

              <div>

                <label className="font-semibold">
                  Available Seat
                </label>

                <select
                  className="border rounded-lg p-3 w-full mt-2"
                  value={seatId}
                  onChange={(e) => setSeatId(e.target.value)}
                >
                  <option value="">Select Seat</option>

                  {seats.map((seat) => (
                    <option key={seat.id} value={seat.id}>
                      {seat.seat_number} | Floor {seat.floor} | Zone {seat.zone}
                    </option>
                  ))}

                </select>

              </div>

            </div>

            <button
              onClick={allocateSeat}
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
            >
              Allocate Seat
            </button>

          </div>

          <div className="bg-white rounded-xl shadow mt-8 p-6">

            <h2 className="text-xl font-bold mb-5">
              Available Seats
            </h2>

            <div className="grid grid-cols-6 gap-3">

              {seats.slice(0, 60).map((seat) => (

                <div
                  key={seat.id}
                  className="bg-green-500 text-white rounded-lg text-center p-3"
                >
                  {seat.seat_number}
                </div>

              ))}

            </div>

            <p className="text-gray-500 mt-4">
              Showing first 60 available seats.
            </p>

          </div>

          <div className="bg-white rounded-xl shadow mt-8 p-6">

            <h2 className="text-2xl font-bold mb-5">
              Allocation History
            </h2>

            <table className="w-full">

              <thead className="bg-blue-600 text-white">

                <tr>
                  <th className="p-3">Employee</th>
                  <th className="p-3">Code</th>
                  <th className="p-3">Project</th>
                  <th className="p-3">Seat</th>
                  <th className="p-3">Floor</th>
                  <th className="p-3">Zone</th>
                </tr>

              </thead>

              <tbody>

                {allocations.map((a) => (

                  <tr
                    key={a.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3">{a.name}</td>
                    <td className="p-3">{a.employee_code}</td>
                    <td className="p-3">{a.project}</td>
                    <td className="p-3">{a.seat_number}</td>
                    <td className="p-3">{a.floor}</td>
                    <td className="p-3">{a.zone}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}