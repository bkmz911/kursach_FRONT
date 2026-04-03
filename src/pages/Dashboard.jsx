import { STATS, EMPLOYEES, DEPARTMENTS } from "../data/mock";
import "./Dashboard.css";

const KPI = [
  {
    label: "Всего сотрудников",
    value: STATS.total,
    sub: `+${STATS.newThisMonth} в этом месяце`,
    color: "#4f7cff",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="9" cy="7" r="4"/><path d="M2 21v-1a7 7 0 0 1 14 0v1"/><circle cx="19" cy="7" r="3"/>
        <path d="M22 21v-1a5 5 0 0 0-3-4.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Активны сейчас",
    value: STATS.active,
    sub: `${Math.round((STATS.active / STATS.total) * 100)}% от штата`,
    color: "#00d4aa",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Средняя зарплата",
    value: `${(STATS.avgSalary / 1000).toFixed(0)}К ₽`,
    sub: "по организации",
    color: "#ffb347",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="2" y="6" width="20" height="14" rx="2"/>
        <path d="M6 6V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" strokeLinecap="round"/>
        <circle cx="12" cy="13" r="2"/>
      </svg>
    ),
  },
  {
    label: "Открытых вакансий",
    value: STATS.openVacancies,
    sub: `Текучесть: ${STATS.turnover}%`,
    color: "#ff4d6d",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" strokeLinecap="round"/>
        <path d="M12 12v4M10 14h4" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const STATUS_COLORS = { active: "#00d4aa", vacation: "#ffb347", sick: "#ff4d6d" };
const STATUS_LABEL  = { active: "Работает", vacation: "Отпуск", sick: "Больничный" };

export default function Dashboard() {
  const deptData = DEPARTMENTS.map((d) => ({
    ...d,
    pct: Math.round((d.count / STATS.total) * 100),
  }));

  return (
    <div>
      <div className="page-header">
        <h1>Дашборд</h1>
        <p>Общая сводка по кадровому составу организации</p>
      </div>

      {/* KPIs */}
      <div className="kpi-grid">
        {KPI.map((k) => (
          <div className="kpi-card card" key={k.label}>
            <div className="kpi-icon" style={{ color: k.color, background: k.color + "18" }}>
              {k.icon}
            </div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-sub">{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="dash-row">
        {/* Status breakdown */}
        <div className="card status-card">
          <div className="card-title">Статусы сотрудников</div>
          <div className="status-rings">
            <div className="ring-chart">
              <svg viewBox="0 0 120 120" width="120" height="120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border)" strokeWidth="14"/>
                {/* active 88% */}
                <circle cx="60" cy="60" r="50" fill="none" stroke="#00d4aa" strokeWidth="14"
                  strokeDasharray={`${(STATS.active/STATS.total)*314} 314`}
                  strokeLinecap="round" transform="rotate(-90 60 60)"/>
                <text x="60" y="56" textAnchor="middle" fill="var(--text)" fontSize="18" fontWeight="700" fontFamily="Geologica">
                  {STATS.active}
                </text>
                <text x="60" y="70" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="Geologica">
                  активны
                </text>
              </svg>
            </div>
            <div className="status-list">
              {[
                { label: "Работает",   val: STATS.active,     color: "#00d4aa" },
                { label: "В отпуске",  val: STATS.onVacation, color: "#ffb347" },
                { label: "Больничный", val: STATS.onSick,     color: "#ff4d6d" },
              ].map((s) => (
                <div className="status-row" key={s.label}>
                  <span className="status-dot" style={{ background: s.color }}/>
                  <span className="status-label">{s.label}</span>
                  <span className="status-val">{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Department bar chart */}
        <div className="card dept-card">
          <div className="card-title">Численность по отделам</div>
          <div className="bar-list">
            {deptData.map((d, i) => (
              <div className="bar-item" key={d.id}>
                <div className="bar-name">{d.name}</div>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${d.pct}%`,
                      background: `hsl(${220 + i * 20}, 80%, 65%)`,
                      animationDelay: `${i * 0.08}s`,
                    }}
                  />
                </div>
                <div className="bar-count">{d.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent employees */}
      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-title">Последние сотрудники</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Сотрудник</th>
              <th>Должность</th>
              <th>Отдел</th>
              <th>Статус</th>
              <th>Зарплата</th>
            </tr>
          </thead>
          <tbody>
            {EMPLOYEES.slice(0, 6).map((e) => (
              <tr key={e.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="avatar" style={{ background: e.color + "22", color: e.color }}>
                      {e.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    {e.name}
                  </div>
                </td>
                <td style={{ color: "var(--muted)" }}>{e.role}</td>
                <td>{e.dept}</td>
                <td>
                  <span className="tag" style={{
                    background: STATUS_COLORS[e.status] + "18",
                    color: STATUS_COLORS[e.status],
                  }}>
                    {STATUS_LABEL[e.status]}
                  </span>
                </td>
                <td style={{ fontFamily: "JetBrains Mono", fontSize: "0.85rem" }}>
                  {e.salary.toLocaleString("ru-RU")} ₽
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
