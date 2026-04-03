import { useState } from "react";
import { VACANCIES as INIT, DEPARTMENTS } from "../data/mock";

const STATUS = {
  open:   { label: "Открыта",   cls: "green"  },
  closed: { label: "Закрыта",   cls: "red"    },
  hold:   { label: "На паузе",  cls: "yellow" },
};

const EMPTY = { title: "", dept: "", salary: "", status: "open", candidates: 0, created: new Date().toISOString().slice(0,10) };

export default function Vacancies() {
  const [vacancies, setVacancies] = useState(INIT);
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const filtered = filter === "all" ? vacancies : vacancies.filter((v) => v.status === filter);

  function openAdd() { setForm(EMPTY); setModal({ mode: "add" }); }
  function openEdit(v) { setForm({ ...v, candidates: String(v.candidates) }); setModal({ mode: "edit", id: v.id }); }
  function close() { setModal(null); }
  function save() {
    if (!form.title || !form.dept) return;
    if (modal.mode === "add") {
      setVacancies([...vacancies, { ...form, id: Date.now(), candidates: Number(form.candidates) || 0 }]);
    } else {
      setVacancies(vacancies.map((v) => v.id === modal.id ? { ...v, ...form, candidates: Number(form.candidates) } : v));
    }
    close();
  }

  const counts = { all: vacancies.length, open: 0, closed: 0, hold: 0 };
  vacancies.forEach((v) => { counts[v.status]++; });

  return (
    <div>
      <div className="page-header">
        <h1>Вакансии</h1>
        <p>Управление подбором персонала</p>
      </div>

      <div className="toolbar">
        <div style={{ display: "flex", gap: 6 }}>
          {[
            { key: "all",    label: "Все" },
            { key: "open",   label: "Открытые" },
            { key: "hold",   label: "На паузе" },
            { key: "closed", label: "Закрытые" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: "7px 16px", borderRadius: 9, border: "1px solid",
                borderColor: filter === f.key ? "var(--accent)" : "var(--border)",
                background: filter === f.key ? "var(--accent-dim)" : "var(--surface2)",
                color: filter === f.key ? "var(--accent)" : "var(--muted)",
                cursor: "pointer", fontFamily: "Geologica", fontSize: "0.85rem", fontWeight: 500,
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              {f.label}
              <span style={{
                background: filter === f.key ? "var(--accent)" : "var(--surface)",
                color: filter === f.key ? "#fff" : "var(--muted)",
                borderRadius: 99, padding: "1px 7px", fontSize: "0.72rem", fontWeight: 700,
              }}>{counts[f.key]}</span>
            </button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
          </svg>
          Создать вакансию
        </button>
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Вакансия</th>
              <th>Отдел</th>
              <th>Зарплата</th>
              <th>Кандидаты</th>
              <th>Создана</th>
              <th>Статус</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: "center", color: "var(--muted)", padding: "40px 0" }}>Нет вакансий</td></tr>
            ) : filtered.map((v) => (
              <tr key={v.id}>
                <td style={{ fontWeight: 600 }}>{v.title}</td>
                <td style={{ color: "var(--muted)" }}>{v.dept}</td>
                <td style={{ fontFamily: "JetBrains Mono", fontSize: "0.82rem" }}>{v.salary}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{
                      background: "var(--accent-dim)", color: "var(--accent)",
                      borderRadius: 8, padding: "2px 10px", fontWeight: 700,
                      fontFamily: "JetBrains Mono", fontSize: "0.85rem",
                    }}>{v.candidates}</div>
                  </div>
                </td>
                <td style={{ fontFamily: "JetBrains Mono", fontSize: "0.8rem", color: "var(--muted)" }}>
                  {new Date(v.created).toLocaleDateString("ru-RU")}
                </td>
                <td><span className={`tag ${STATUS[v.status].cls}`}>{STATUS[v.status].label}</span></td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: "0.8rem" }} onClick={() => openEdit(v)}>Ред.</button>
                    <button
                      onClick={() => setVacancies(vacancies.filter((x) => x.id !== v.id))}
                      style={{ background: "rgba(255,77,109,0.1)", border: "none", borderRadius: 8, color: "var(--danger)", padding: "6px 10px", cursor: "pointer" }}
                    >✕</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="modal-backdrop" onClick={close}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{modal.mode === "add" ? "Новая вакансия" : "Редактировать вакансию"}</h2>
            <div className="form-group">
              <label>Название вакансии *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Senior React Developer"/>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="form-group">
                <label>Отдел *</label>
                <select value={form.dept} onChange={(e) => setForm({ ...form, dept: e.target.value })}>
                  <option value="">Выберите</option>
                  {DEPARTMENTS.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Статус</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option value="open">Открыта</option>
                  <option value="hold">На паузе</option>
                  <option value="closed">Закрыта</option>
                </select>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="form-group">
                <label>Зарплатная вилка</label>
                <input value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} placeholder="100 000–150 000 ₽"/>
              </div>
              <div className="form-group">
                <label>Кандидатов</label>
                <input type="number" value={form.candidates} onChange={(e) => setForm({ ...form, candidates: e.target.value })} placeholder="0"/>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={close}>Отмена</button>
              <button className="btn btn-primary" onClick={save}>
                {modal.mode === "add" ? "Создать" : "Сохранить"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
