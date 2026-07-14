import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-6">

      <h2 className="text-2xl font-bold mb-8">
        ETHARA
      </h2>

      <ul className="space-y-4">

        <li>
          <Link to="/">Dashboard</Link>
        </li>

        <li>
          <Link to="/employees">Employees</Link>
        </li>

        <li>
          <Link to="/projects">Projects</Link>
        </li>

        <li>
          <Link to="/seats">Seats</Link>
        </li>

        <li>
          <Link to="/ai">AI Assistant</Link>
        </li>

      </ul>

    </div>
  );
}