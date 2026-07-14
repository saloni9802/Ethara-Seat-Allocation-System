import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "20px", flex: 1 }}>
          <h1>Dashboard</h1>

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            <StatCard title="Total Employees" value="5000" />
            <StatCard title="Total Seats" value="5500" />
            <StatCard title="Occupied Seats" value="4900" />
            <StatCard title="Available Seats" value="500" />
            <StatCard title="Reserved Seats" value="100" />
            <StatCard title="Pending Allocation" value="50" />
          </div>
        </div>
      </div>
    </>
  );
}