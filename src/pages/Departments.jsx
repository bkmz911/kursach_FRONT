// src/pages/Departments.jsx — версия с бэкендом (SQLite)
// Бэкенд возвращает поля: id, name, description, head_name, budget,
//                          employee_count, total_salary, avg_salary, probation_count
import { useState, useEffect } from "react";
import { fetchDepartments } from "../api/api";
import { DEPT_ICONS } from "../data/employees";

const DEPT_COLORS = {
  "ИТ-отдел":  { bar: "#2e5fa8", bg: "#e0eaf8" },
  "HR-отдел":  { bar: "#7e3fa8", bg: "#f0e8f5" },
  "Финансы":   { bar: "#2e8b57", bg: "#e0f0e8" },
  "Маркетинг": { bar: "#c85a2e", bg: "#fff0e8" },
  "Операции":  { bar: "#b07d2e", bg: "#f5f0e0" },
};

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading,     setLoading    ] = useState(true);
  const [error,       setError      ] = useState(null);

  useEffect(() => {
    fetchDepartments()
      .then(setDepartments)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ color: "var(--text-secondary)", padding: 40 }}>Загрузка…</p>;
  if (error)   return <p style={{ color: "var(--accent)",         padding: 40 }}>Ошибка: {error}</p>;

  const totalStaff = departments.reduce((s, d) => s + (d.employee_count ?? 0), 0);

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1>Отделы</h1>
          <p>Структура организации · {departments.length} подразделений</p>
        </div>
      </div>

      <div className="dept-grid">
        {departments.map((dept) => {
          const pct    = totalStaff > 0 ? Math.round(((dept.employee_count ?? 0) / totalStaff) * 100) : 0;
          const colors = DEPT_COLORS[dept.name] || { bar: "#1a1a2e", bg: "#f0f0f0" };

          return (
            <div className="dept-card" key={dept.id}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: colors.bar }} />

              <div style={{
                background: colors.bg, width: 52, height: 52, borderRadius: 12,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
              }}>
                {DEPT_ICONS[dept.name] || "🏢"}
              </div>

              <h3 style={{ marginTop: 14 }}>{dept.name}</h3>
              <p>{dept.employee_count ?? 0} активных сотрудников</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 4 }}>
                <div style={{ background: "var(--bg)", borderRadius: 8, padding: "10px 14px" }}>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Всего
                  </div>
                  <div style={{ fontFamily: "Fraunces, serif", fontSize: 22, fontWeight: 700 }}>
                    {dept.employee_count ?? 0}
                  </div>
                </div>
                <div style={{ background: "var(--bg)", borderRadius: 8, padding: "10px 14px" }}>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Средний оклад
                  </div>
                  <div style={{ fontFamily: "Fraunces, serif", fontSize: 16, fontWeight: 700 }}>
                    {(dept.avg_salary ?? 0).toLocaleString("ru-RU")} ₽
                  </div>
                </div>
              </div>

              {(dept.probation_count ?? 0) > 0 && (
                <div style={{
                  marginTop: 12, fontSize: 12, color: "#b07d2e", background: "#fef3e0",
                  padding: "5px 10px", borderRadius: 20, display: "inline-block",
                }}>
                  🟡 {dept.probation_count} на испытательном
                </div>
              )}

              <div className="dept-fill" style={{ marginTop: 16 }}>
                <div className="dept-fill-bar" style={{ width: `${pct}%`, background: colors.bar }} />
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6, textAlign: "right" }}>
                {pct}% от штата
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
