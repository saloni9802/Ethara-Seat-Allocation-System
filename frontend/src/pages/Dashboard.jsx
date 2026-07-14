import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import ProjectChart from "../components/ProjectChart";
import FloorChart from "../components/FloorChart";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_employees: 0,
    total_seats: 0,
    occupied_seats: 0,
    available_seats: 0,
    reserved_seats: 0,
    pending_allocation: 0,
  });

  const [projectData, setProjectData] = useState([]);
  const [floorData, setFloorData] = useState([]);

  useEffect(() => {
    api
      .get("/dashboard/summary")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => console.error(err));

    api
      .get("/dashboard/project-utilization")
      .then((res) => {
        setProjectData(res.data);
      })
      .catch((err) => console.error(err));

    api
      .get("/dashboard/floor-utilization")
      .then((res) => {
        setFloorData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">
            Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <StatCard
              title="Total Employees"
              value={stats.total_employees}
            />

            <StatCard
              title="Total Seats"
              value={stats.total_seats}
            />

            <StatCard
              title="Occupied Seats"
              value={stats.occupied_seats}
            />

            <StatCard
              title="Available Seats"
              value={stats.available_seats}
            />

            <StatCard
              title="Reserved Seats"
              value={stats.reserved_seats}
            />

            <StatCard
              title="Pending Allocation"
              value={stats.pending_allocation}
            />

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-4">
                📊 Project Utilization
              </h2>

              <ProjectChart data={projectData} />
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-4">
                🏢 Floor Utilization
              </h2>

              <FloorChart data={floorData} />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}