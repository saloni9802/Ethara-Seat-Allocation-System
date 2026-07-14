// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Dashboard from "./pages/Dashboard";
// import Employees from "./pages/Employees";
// import Projects from "./pages/Projects";
// import Seats from "./pages/Seats";
// import AIAssistant from "./pages/AIAssistant";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/employees" element={<Employees />} />
//         <Route path="/projects" element={<Projects />} />
//         <Route path="/seats" element={<Seats />} />
//         <Route path="/ai" element={<AIAssistant />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// function App() {
//   return (
//     <div>
//       <h1>Hello Saloni 🚀</h1>
//     </div>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Projects from "./pages/Projects";
import Seats from "./pages/Seats";
import AIAssistant from "./pages/AIAssistant";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/seats" element={<Seats />} />
        <Route path="/ai" element={<AIAssistant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;