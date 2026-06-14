// src/pages/Dashboard.jsx — версия с бэкендом (SQLite)
import { useState, useEffect } from "react";
import { fetchStats } from "../api/api";
import { formatSalary } from "../data/employees";

const activities = [
  { text: "Новикова А.П. переведена на должность Senior Backend-разработчика", time: "2 часа назад",  color: "#2e5fa8" },
  { text: "Козлов Д.А. прошёл аттестацию по итогам года",                      time: "Вчера, 14:30",  color: "#2e8b57" },
  { text: "Оформлен приём на работу: Сидорова Е.В.",                            time: "3 дня назад",   color: "#c85a2e" },
  { text: "Обновлён трудовой договор: Иванова М.С.",                            time: "5 дней назад",  color: "#b07d2e" },
];

export default function Dashboard({ navigate }) {
  const [stats,   setStats  ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError  ] = useState(null);

  useEffect(() => {
    fetchStats()
      .then(setStats)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ color: "var(--text-secondary)", padding: 40 }}>Загрузка…</p>;
  if (error)   return <p style={{ color: "var(--accent)",         padding: 40 }}>Ошибка: {error}</p>;

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1>Дашборд</h1>
          <p style={{"padding-top": "10px", "padding-bottom": "10px"}}>Обзор кадрового состава организации</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("employee-form", null)}>
          ＋ &nbsp;Добавить сотрудника
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card orange">
          <div className="stat-icon">👤</div>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Всего сотрудников</div>
          <div className="stat-delta up">↑ актуально</div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{stats.active}</div>
          <div className="stat-label">Работают сейчас</div>
          <div className="stat-delta up">↑ в штате</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-icon">🏢</div>
          <div className="stat-value">{stats.departments.length}</div>
          <div className="stat-label">Отделов</div>
          <div className="stat-delta neutral">структура</div>
        </div>
        <div className="stat-card gold">
          <div className="stat-icon">💼</div>
          <div className="stat-value">{stats.probation}</div>
          <div className="stat-label">На испытательном</div>
          <div className="stat-delta neutral">на контроле</div>
        </div>
      </div>

      <div className="two-col">
        <div className="section-card">
          <h3>Последние события</h3>
          {activities.map((a, i) => (
            <div className="activity-item" key={i}>
              <div className="activity-dot" style={{ background: a.color }} />
              <div>
                <div className="activity-text">{a.text}</div>
                <div className="activity-time">{a.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-card">
          <h3>Сводка по ФОТ</h3>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 6 }}>
              Фонд оплаты труда (в штате)
            </div>
            <div style={{ fontFamily: "Fraunces, serif", fontSize: 32, fontWeight: 700 }}>
              {formatSalary(stats.totalSalary)}
            </div>
          </div>

          {/* stats.departments — массив из SQLite, поля: name, count, total_salary */}
          {stats.departments.map((dept) => {
            const pct = stats.totalSalary > 0
              ? Math.round((dept.total_salary / stats.totalSalary) * 100)
              : 0;
            return (
              <div key={dept.name} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                  <span style={{ color: "var(--text-secondary)" }}>{dept.name}</span>
                  <span style={{ fontWeight: 500 }}>{pct}%</span>
                </div>
                <div className="dept-fill">
                  <div className="dept-fill-bar" style={{ width: `${pct}%`, background: "var(--text-primary)" }} />
                </div>
              </div>
            );
          })}

          <button
            className="btn btn-secondary"
            style={{ width: "100%", justifyContent: "center", marginTop: 20 }}
            onClick={() => navigate("employees")}
          >
            Все сотрудники →
          </button>
        </div>
      </div>
    </div>
  );
}
