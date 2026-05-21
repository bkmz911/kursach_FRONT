// src/pages/Employees.jsx — версия с бэкендом (SQLite)
// Поля от бэкенда: id, name, position, department, email, phone,
//                  hire_date, salary, status, notes, created_at, updated_at
import { useState, useEffect, useCallback } from "react";
import { fetchEmployees, deleteEmployee } from "../api/api";
import {
  getInitials, getAvatarColor,
  formatSalary, formatDate,
  DEPT_CLASSES, STATUS_LABELS,
} from "../data/employees";

export default function Employees({ navigate }) {
  const [employees,    setEmployees   ] = useState([]);
  const [total,        setTotal       ] = useState(0);
  const [loading,      setLoading     ] = useState(true);
  const [error,        setError       ] = useState(null);
  const [search,       setSearch      ] = useState("");
  const [filterDept,   setFilterDept  ] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    fetchEmployees({ search, department: filterDept, status: filterStatus })
      .then(({ employees: list, total: t }) => {
        setEmployees(list);
        setTotal(t);
        setError(null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [search, filterDept, filterStatus]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id) => {
    if (!confirm("Удалить сотрудника из системы?")) return;
    try   { await deleteEmployee(id); load(); }
    catch (e) { alert("Ошибка удаления: " + e.message); }
  };

  const statusBadge = (status) => {
    const cls = status === "active" ? "badge-active" : status === "probation" ? "badge-probation" : "badge-inactive";
    const dot = status === "active" ? "🟢" : status === "probation" ? "🟡" : "⚪";
    return <span className={`badge ${cls}`}>{dot} {STATUS_LABELS[status]}</span>;
  };

  // Цвет аватара детерминирован по первому символу id (число)
  const avatarColor = (id) => getAvatarColor(id % 6);

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1>Сотрудники</h1>
          <p>{loading ? "Загрузка…" : `${employees.length} из ${total} записей`}</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("employee-form", null)}>
          ＋ &nbsp;Добавить
        </button>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <label className="search-box">
              🔍
              <input
                placeholder="Поиск по имени, должности..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <select
              style={{ padding: "9px 14px", borderRadius: "var(--radius-sm)", border: "1.5px solid var(--border)", background: "var(--bg)", fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "var(--text-primary)", cursor: "pointer" }}
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
            >
              <option value="">Все отделы</option>
              {["ИТ-отдел", "HR-отдел", "Финансы", "Маркетинг", "Операции"].map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <select
              style={{ padding: "9px 14px", borderRadius: "var(--radius-sm)", border: "1.5px solid var(--border)", background: "var(--bg)", fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "var(--text-primary)", cursor: "pointer" }}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Все статусы</option>
              <option value="active">Работает</option>
              <option value="probation">Испытательный</option>
              <option value="inactive">Уволен</option>
            </select>
          </div>
        </div>

        {error && (
          <div style={{ padding: 24, color: "var(--accent)", fontSize: 14 }}>Ошибка: {error}</div>
        )}

        {!error && !loading && employees.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>Сотрудники не найдены</h3>
            <p>Попробуйте изменить параметры поиска</p>
          </div>
        )}

        {!error && employees.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Сотрудник</th>
                <th>Должность</th>
                <th>Отдел</th>
                <th>Оклад</th>
                <th>Дата приёма</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>
                    <div className="employee-cell">
                      <div className="emp-avatar" style={{ background: avatarColor(emp.id) + "22", color: avatarColor(emp.id) }}>
                        {getInitials(emp.name)}
                      </div>
                      <div>
                        <div className="emp-name">{emp.name}</div>
                        <div className="emp-id">{emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>{emp.position}</td>
                  <td>
                    <span className={`badge ${DEPT_CLASSES[emp.department] || ""}`}>
                      {emp.department}
                    </span>
                  </td>
                  <td style={{ fontWeight: 500 }}>{formatSalary(emp.salary)}</td>
                  {/* SQLite возвращает hire_date, не hireDate */}
                  <td style={{ color: "var(--text-secondary)" }}>{formatDate(emp.hire_date)}</td>
                  <td>{statusBadge(emp.status)}</td>
                  <td>
                    <div className="action-btns">
                      <button className="icon-btn" title="Редактировать"
                        onClick={() => navigate("employee-form", emp)}>✏️</button>
                      <button className="icon-btn danger" title="Удалить"
                        onClick={() => handleDelete(emp.id)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
