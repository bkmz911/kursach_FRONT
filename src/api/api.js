// src/api/api.js
// Единая точка взаимодействия с бэкендом.
// Замените localStorage-вызовы на эти функции.

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const res  = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Ошибка запроса");
  return data;
}

// ── Employees ────────────────────────────────────────────────────────────────

/** @param {{ search?, department?, status?, page?, limit? }} params */
export const fetchEmployees = (params = {}) => {
  const qs = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v !== "" && v !== undefined))
  ).toString();
  return request(`/employees${qs ? "?" + qs : ""}`);
};

/** { total, active, probation, inactive, totalSalary, avgSalary, departments[] } */
export const fetchStats = () => request("/employees/stats");

export const fetchEmployee = (id)        => request(`/employees/${id}`);
export const createEmployee = (body)     => request("/employees",       { method: "POST",   body: JSON.stringify(body) });
export const updateEmployee = (id, body) => request(`/employees/${id}`, { method: "PUT",    body: JSON.stringify(body) });
export const deleteEmployee = (id)       => request(`/employees/${id}`, { method: "DELETE" });

// ── Departments ───────────────────────────────────────────────────────────────

export const fetchDepartments  = ()           => request("/departments");
export const fetchDepartment   = (id)         => request(`/departments/${id}`);
export const createDepartment  = (body)       => request("/departments",       { method: "POST",   body: JSON.stringify(body) });
export const updateDepartment  = (id, body)   => request(`/departments/${id}`, { method: "PUT",    body: JSON.stringify(body) });
export const deleteDepartment  = (id)         => request(`/departments/${id}`, { method: "DELETE" });
