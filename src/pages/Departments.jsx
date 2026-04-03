import { useState } from "react";
import { DEPARTMENTS as INIT } from "../data/mock";

const EMPTY = { name: "", head: "", count: "", budget: "" };
const DEPT_COLORS = ["#4f7cff","#00d4aa","#ffb347","#ff6b8a","#a78bfa","#34d399"];

export default function Departments() {
  const [departments, setDepartments] = useState(INIT);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);

  function openAdd() { setForm(EMPTY); setModal({ mode: "add" }); }
  function openEdit(d) { setForm({ ...d, count: String(d.count), budget: String(d.budget) }); setModal({ mode: "edit", id: d.id }); }
  function close() { setModal(null); }

  function save() {
    if (!form.name || !form.head) return;
    if (modal.mode === "add") {
      setDepartments([...departments, { ...form, id: Date.now(), count: Number(form.count) || 0, budget: Number(form.budget) || 0 }]);
    } else {
      setDepartments(departments.map((d) =>
        d.id === modal.id ? { ...d, ...form, count: Number(form.count), budget: Number(form.budget) } : d
      ));
    }
    close();
  }

  return (
    <div>
      <div className="page-header">
        <h1>Отделы</h1>
        <p>Структура подразделений организации</p>
      </div>

      <div className="toolbar">
        <span style={{ color: "var(--muted)", fontSize: "0.875rem" }}>
          Всего отделов: <strong style={{ color: "var(--text)" }}>{departments.length}</strong>
        </span>
        <button className="btn btn-primary" onClick={openAdd}>
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
          </svg>
          Добавить отдел
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {departments.map((d, i) => {
          const color = DEPT_COLORS[i % DEPT_COLORS.length];
          return (
            <div key={d.id} className="card dept-item">
              <div className="dept-color-bar" style={{ background: color }}/>
              <div className="dept-body">
                <div className="dept-name">{d.name}</div>
                <div className="dept-head">
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="8" r="4"/><path d="M4 20v-1a8 8 0 0 1 16 0v1"/>
                  </svg>
                  {d.head}
                </div>
                <div className="dept-stats">
                  <div className="dept-stat">
                    <div className="dept-stat-val" style={{ color }}>{d.count}</div>
                    <div className="dept-stat-label">сотрудников</div>
                  </div>
                  <div className="dept-stat-divider"/>
                  <div className="dept-stat">
                    <div className="dept-stat-val">{(d.budget / 1000000).toFixed(1)}M</div>
                    <div className="dept-stat-label">бюджет ₽</div>
                  </div>
                  <div className="dept-stat-divider"/>
                  <div className="dept-stat">
                    <div className="dept-stat-val">{d.count ? Math.round(d.budget / d.count / 1000) : 0}К</div>
                    <div className="dept-stat-label">ср. зарплата</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                  <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center", padding: "7px" }} onClick={() => openEdit(d)}>
                    Редактировать
                  </button>
                  <button
                    onClick={() => setDepartments(departments.filter((x) => x.id !== d.id))}
                    style={{ background: "rgba(255,77,109,0.1)", border: "none", borderRadius: 8, color: "var(--danger)", padding: "7px 12px", cursor: "pointer" }}
                  >✕</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {modal && (
        <div className="modal-backdrop" onClick={close}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{modal.mode === "add" ? "Новый отдел" : "Редактировать отдел"}</h2>
            <div className="form-group">
              <label>Название отдела *</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Разработка ПО"/>
            </div>
            <div className="form-group">
              <label>Руководитель *</label>
              <input value={form.head} onChange={(e) => setForm({ ...form, head: e.target.value })} placeholder="Иванов Иван Иванович"/>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="form-group">
                <label>Кол-во сотрудников</label>
                <input type="number" value={form.count} onChange={(e) => setForm({ ...form, count: e.target.value })} placeholder="10"/>
              </div>
              <div className="form-group">
                <label>Бюджет (₽)</label>
                <input type="number" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="2000000"/>
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

      <style>{`
        .dept-item { padding: 0; overflow: hidden; }
        .dept-color-bar { height: 4px; }
        .dept-body { padding: 20px 22px 22px; }
        .dept-name { font-size: 1rem; font-weight: 700; margin-bottom: 6px; }
        .dept-head { display: flex; align-items: center; gap: 6px; color: var(--muted); font-size: 0.82rem; margin-bottom: 18px; }
        .dept-stats { display: flex; align-items: center; gap: 0; background: var(--surface2); border-radius: 10px; overflow: hidden; }
        .dept-stat { flex: 1; padding: 10px 0; text-align: center; }
        .dept-stat-val { font-size: 1.05rem; font-weight: 700; font-family: "JetBrains Mono"; }
        .dept-stat-label { font-size: 0.7rem; color: var(--muted); margin-top: 2px; }
        .dept-stat-divider { width: 1px; height: 36px; background: var(--border); flex-shrink: 0; }
      `}</style>
    </div>
  );
}
