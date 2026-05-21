import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import Vacancies from "./pages/Vacancies";
import EmployeeForm from "./pages/EmployeeForm";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [editingEmployee, setEditingEmployee] = useState(null);

  const navigate = (pageName, employeeData = null) => {
    setEditingEmployee(employeeData);
    setPage(pageName);
  };

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard navigate={navigate} />;
      case "employees":
        return <Employees navigate={navigate} />;
      case "departments":
        return <Departments />;
      case "vacancies":
        return <Vacancies />;
      case "employee-form":
        return <EmployeeForm navigate={navigate} employee={editingEmployee} />;
      default:
        return <Dashboard navigate={navigate} />;
    }
  };

  return (
    <div className="app-shell">
      <Sidebar current={page} onChange={(p) => navigate(p, null)} />
      <main className="main-content">{renderPage()}</main>
    </div>
  );
}

