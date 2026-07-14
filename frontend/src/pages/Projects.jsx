import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    api.get("/projects")
      .then((res) => setProjects(res.data))
      .catch(console.log);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-8">
            Projects
          </h1>

          <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-blue-600 text-white">

                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Project Name</th>
                  <th className="p-3">Description</th>
                </tr>

              </thead>

              <tbody>

                {projects.map((project) => (

                  <tr
                    key={project.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3">{project.id}</td>

                    <td className="p-3 font-semibold">
                      {project.name}
                    </td>

                    <td className="p-3">
                      {project.description}
                    </td>

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