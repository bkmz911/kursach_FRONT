import { useState } from "react";
import { VACANCIES as INIT } from "../data/mock";
import { DEPARTMENTS } from "../data/employees";

const STATUS = {
  open:   { label: "Открыта",   cls: "green"  },
  closed: { label: "Закрыта",   cls: "red"    },
  hold:   { label: "На паузе",  cls: "yellow" },
};

const EMPTY = { title: "", dept: DEPARTMENTS[0], salary: "", status: "open", candidates: 0, created: new Date().toISOString().slice(0, 10) };

export default function Vacancies() {
  // Map mock departments to actual departments to keep UX consistent
  const mappedInit = INIT.map(v => {
    let dept = v.dept;
    if (dept === "Разработка ПО") dept = "ИТ-отдел";
    else if (dept === "HR") dept = "HR-отдел";
    else if (dept === "Бухгалтерия") dept = "Финансы";
    else if (dept === "Отдел продаж" || dept === "Юридический") dept = "Операции";
    return { ...v, dept };
  });

  const [vacancies, setVacancies] = useState(mappedInit);
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
    <div className="fade-in">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Вакансии</h1>
          <p>Управление подбором персонала</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          ＋ &nbsp;Создать вакансию
        </button>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", justifyContent: "space-between", width: "100%" }}>
            <div style={{ display: "flex", gap: 8 }}>
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
                    padding: "8px 14px", borderRadius: "10px", border: "1.5px solid",
                    borderColor: filter === f.key ? "var(--accent)" : "var(--border)",
                    background: filter === f.key ? "var(--accent-dim)" : "var(--surface2)",
                    color: filter === f.key ? "var(--accent)" : "var(--muted)",
                    cursor: "pointer", fontFamily: "Geologica, sans-serif", fontSize: "0.85rem", fontWeight: 500,
                    display: "flex", alignItems: "center", gap: 6,
                  }}
                >
                  {f.label}
                  <span style={{
                    background: filter === f.key ? "var(--accent)" : "var(--border)",
                    color: filter === f.key ? "#fff" : "var(--muted)",
                    borderRadius: 99, padding: "1px 7px", fontSize: "0.72rem", fontWeight: 700,
                  }}>{counts[f.key]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Вакансия</th>
              <th>Отдел</th>
              <th>Зарплата</th>
              <th>Кандидаты</th>
              <th>Создана</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: "center", color: "var(--muted)", padding: "40px 0" }}>Нет вакансий</td></tr>
            ) : filtered.map((v) => (
              <tr key={v.id}>
                <td style={{ fontWeight: 600, color: "var(--text)" }}>{v.title}</td>
                <td style={{ color: "var(--text-secondary)" }}>{v.dept}</td>
                <td style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.85rem" }}>{v.salary}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{
                      background: "var(--accent-dim)", color: "var(--accent)",
                      borderRadius: 8, padding: "2px 10px", fontWeight: 700,
                      fontFamily: "JetBrains Mono, monospace", fontSize: "0.85rem",
                    }}>{v.candidates}</div>
                  </div>
                </td>
                <td style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.8rem", color: "var(--muted)" }}>
                  {new Date(v.created).toLocaleDateString("ru-RU")}
                </td>
                <td><span className={`tag ${STATUS[v.status].cls}`}>{STATUS[v.status].label}</span></td>
                <td>
                  <div className="action-btns">
                    <button className="icon-btn" title="Редактировать" onClick={() => openEdit(v)}>✏️</button>
                    <button
                      className="icon-btn danger"
                      title="Удалить"
                      onClick={() => {
                        if (confirm("Удалить вакансию?")) {
                          setVacancies(vacancies.filter((x) => x.id !== v.id));
                        }
                      }}
                    >🗑️</button>
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
                  {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
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
              <button className="btn btn-secondary" onClick={close}>Отмена</button>
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
