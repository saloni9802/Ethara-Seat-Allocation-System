import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width:"220px",
      height:"100vh",
      background:"#0f172a",
      color:"white",
      padding:"20px"
    }}>
      <h2>Menu</h2>

      <p><Link to="/" style={{color:"white"}}>Dashboard</Link></p>

      <p><Link to="/employees" style={{color:"white"}}>Employees</Link></p>

      <p><Link to="/projects" style={{color:"white"}}>Projects</Link></p>

      <p><Link to="/seats" style={{color:"white"}}>Seats</Link></p>

      <p><Link to="/ai" style={{color:"white"}}>AI Assistant</Link></p>
    </div>
  );
}