import { useState } from "react";
import { EMPLOYEES as INIT, DEPARTMENTS } from "../data/mock";

const STATUS_COLORS = { active: "#00d4aa", vacation: "#ffb347", sick: "#ff4d6d" };
const STATUS_LABEL  = { active: "Работает", vacation: "Отпуск", sick: "Больничный" };

const AVATAR_COLORS = ["#4f7cff","#00d4aa","#ff6b8a","#ffb347","#a78bfa","#34d399","#f472b6","#60a5fa","#fb923c","#e879f9"];

const EMPTY = { name: "", dept: "", role: "", salary: "", status: "active", hired: "" };

export default function Employees() {
  const [employees, setEmployees] = useState(INIT);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [modal, setModal] = useState(null); // null | {mode, data}
  const [form, setForm] = useState(EMPTY);

  const filtered = employees.filter((e) => {
    const q = search.toLowerCase();
    const matchQ = e.name.toLowerCase().includes(q) || e.role.toLowerCase().includes(q);
    const matchD = filterDept === "all" || e.dept === filterDept;
    return matchQ && matchD;
  });

  function openAdd() {
    setForm(EMPTY);
    setModal({ mode: "add" });
  }
  function openEdit(emp) {
    setForm({ ...emp, salary: String(emp.salary) });
    setModal({ mode: "edit", id: emp.id });
  }
  function closeModal() { setModal(null); }

  function handleSave() {
    if (!form.name || !form.dept || !form.role) return;
    if (modal.mode === "add") {
      const newEmp = {
        ...form,
        id: Date.now(),
        salary: Number(form.salary) || 0,
        color: AVATAR_COLORS[employees.length % AVATAR_COLORS.length],
      };
      setEmployees([...employees, newEmp]);
    } else {
      setEmployees(employees.map((e) =>
        e.id === modal.id ? { ...e, ...form, salary: Number(form.salary) || e.salary } : e
      ));
    }
    closeModal();
  }

  function handleDelete(id) {
    setEmployees(employees.filter((e) => e.id !== id));
  }

  return (
    <div>
      <div className="page-header">
        <h1>Сотрудники</h1>
        <p>Управление кадровым составом организации</p>
      </div>

      <div className="toolbar">
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <div className="search-bar">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/>
            </svg>
            <input
              placeholder="Поиск по имени, должности..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            style={{
              background: "var(--surface2)", border: "1px solid var(--border)",
              borderRadius: 10, color: "var(--text)", padding: "8px 14px",
              fontFamily: "Geologica", fontSize: "0.875rem", outline: "none",
            }}
          >
            <option value="all">Все отделы</option>
            {DEPARTMENTS.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
          </svg>
          Добавить сотрудника
        </button>
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Сотрудник</th>
              <th>Должность</th>
              <th>Отдел</th>
              <th>Дата найма</th>
              <th>Зарплата</th>
              <th>Статус</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", color: "var(--muted)", padding: "40px 0" }}>
                  Ничего не найдено
                </td>
              </tr>
            ) : (
              filtered.map((e) => (
                <tr key={e.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="avatar" style={{ background: e.color + "22", color: e.color }}>
                        {e.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <span style={{ fontWeight: 500 }}>{e.name}</span>
                    </div>
                  </td>
                  <td style={{ color: "var(--muted)" }}>{e.role}</td>
                  <td>{e.dept}</td>
                  <td style={{ fontFamily: "JetBrains Mono", fontSize: "0.8rem", color: "var(--muted)" }}>
                    {new Date(e.hired).toLocaleDateString("ru-RU")}
                  </td>
                  <td style={{ fontFamily: "JetBrains Mono", fontSize: "0.85rem" }}>
                    {Number(e.salary).toLocaleString("ru-RU")} ₽
                  </td>
                  <td>
                    <span className="tag" style={{ background: STATUS_COLORS[e.status] + "18", color: STATUS_COLORS[e.status] }}>
                      {STATUS_LABEL[e.status]}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: "0.8rem" }} onClick={() => openEdit(e)}>
                        Ред.
                      </button>
                      <button
                        onClick={() => handleDelete(e.id)}
                        style={{
                          background: "rgba(255,77,109,0.1)", border: "none", borderRadius: 8,
                          color: "var(--danger)", padding: "6px 10px", cursor: "pointer", fontSize: "0.85rem",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{modal.mode === "add" ? "Добавить сотрудника" : "Редактировать сотрудника"}</h2>
            <div className="form-group">
              <label>ФИО *</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Иванов Иван Иванович"/>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="form-group">
                <label>Отдел *</label>
                <select value={form.dept} onChange={(e) => setForm({ ...form, dept: e.target.value })}>
                  <option value="">Выберите отдел</option>
                  {DEPARTMENTS.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Статус</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option value="active">Работает</option>
                  <option value="vacation">Отпуск</option>
                  <option value="sick">Больничный</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Должность *</label>
              <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Senior Developer"/>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="form-group">
                <label>Зарплата (₽)</label>
                <input type="number" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} placeholder="120000"/>
              </div>
              <div className="form-group">
                <label>Дата найма</label>
                <input type="date" value={form.hired} onChange={(e) => setForm({ ...form, hired: e.target.value })}/>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={closeModal}>Отмена</button>
              <button className="btn btn-primary" onClick={handleSave}>
                {modal.mode === "add" ? "Добавить" : "Сохранить"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
