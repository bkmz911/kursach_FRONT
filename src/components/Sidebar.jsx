import "./Sidebar.css";

const NAV = [
  {
    id: "dashboard",
    label: "Дашборд",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: "employees",
    label: "Сотрудники",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="9" cy="7" r="4" /><path d="M2 21v-1a7 7 0 0 1 14 0v1" />
        <path d="M19 11c1.66 0 3 1.34 3 3v1" strokeLinecap="round" /><circle cx="19" cy="7" r="3" />
      </svg>
    ),
  },
  {
    id: "departments",
    label: "Отделы",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M3 21h18M9 21V7l3-4 3 4v14M9 12h6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "vacancies",
    label: "Вакансии",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" strokeLinecap="round" />
        <path d="M12 12v4M10 14h4" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Sidebar({ current, onChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">К</div>
        <div>
          <div className="logo-title">КадрыПро</div>
          <div className="logo-sub">HR-система</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">Меню</div>
        {NAV.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${current === item.id ? "active" : ""}`}
            onClick={() => onChange(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="avatar" style={{ background: "#4f7cff22", color: "#4f7cff" }}>АД</div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>Администратор</div>
          <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>HR-менеджер</div>
        </div>
      </div>
    </aside>
  );
}
