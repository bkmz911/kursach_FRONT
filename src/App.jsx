import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import Vacancies from "./pages/Vacancies";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("dashboard");

  const pages = {
    dashboard: <Dashboard />,
    employees: <Employees />,
    departments: <Departments />,
    vacancies: <Vacancies />,
  };

  return (
    <div className="app-shell">
      <Sidebar current={page} onChange={setPage} />
      <main className="main-content">{pages[page]}</main>
    </div>
  );
}
