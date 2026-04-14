// src/pages/EmployeeForm.jsx — версия с бэкендом (SQLite)
// Бэкенд ожидает snake_case: hire_date (не hireDate)
import { useState } from "react";
import { createEmployee, updateEmployee } from "../api/api";
import { DEPARTMENTS } from "../data/employees";

const EMPTY = {
  name: "", position: "", department: DEPARTMENTS[0],
  email: "", phone: "", hire_date: "",
  salary: "", status: "active", notes: "",
};

// Преобразуем объект сотрудника из БД в форму
// (БД отдаёт hire_date в формате "2021-03-15" — это уже правильный формат для <input type="date">)
function toForm(emp) {
  return {
    name:       emp.name       ?? "",
    position:   emp.position   ?? "",
    department: emp.department ?? DEPARTMENTS[0],
    email:      emp.email      ?? "",
    phone:      emp.phone      ?? "",
    hire_date:  emp.hire_date  ? emp.hire_date.slice(0, 10) : "",
    salary:     emp.salary     ?? "",
    status:     emp.status     ?? "active",
    notes:      emp.notes      ?? "",
  };
}

export default function EmployeeForm({ navigate, employee }) {
  const isEdit = !!employee;
  const [form,    setForm   ] = useState(isEdit ? toForm(employee) : { ...EMPTY });
  const [errors,  setErrors ] = useState({});
  const [saved,   setSaved  ] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())      e.name      = "Введите ФИО";
    if (!form.position.trim())  e.position  = "Введите должность";
    if (!form.email.trim())     e.email     = "Введите email";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Некорректный email";
    if (!form.hire_date)        e.hire_date = "Укажите дату приёма";
    if (!form.salary)           e.salary    = "Укажите оклад";
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    try {
      const payload = { ...form, salary: Number(form.salary) };
      if (isEdit) {
        await updateEmployee(employee.id, payload);
      } else {
        await createEmployee(payload);
      }
      setSaved(true);
      setTimeout(() => navigate("employees"), 800);
    } catch (e) {
      alert("Ошибка сохранения: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const field = (label, key, type = "text", placeholder = "") => (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        value={form[key]}
        placeholder={placeholder}
        onChange={(e) => set(key, e.target.value)}
        style={errors[key] ? { borderColor: "var(--accent)" } : {}}
      />
      {errors[key] && <span style={{ fontSize: 12, color: "var(--accent)" }}>{errors[key]}</span>}
    </div>
  );

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1>{isEdit ? "Редактирование сотрудника" : "Новый сотрудник"}</h1>
          <p>{isEdit ? `Изменение данных: ${employee.name}` : "Заполните данные для добавления в систему"}</p>
        </div>
      </div>

      <div className="form-card">
        <div className="form-divider">Личные данные</div>
        <div className="form-grid">
          <div className="form-group full">
            <label>ФИО</label>
            <input
              type="text" value={form.name} placeholder="Иванова Мария Сергеевна"
              onChange={(e) => set("name", e.target.value)}
              style={errors.name ? { borderColor: "var(--accent)" } : {}}
            />
            {errors.name && <span style={{ fontSize: 12, color: "var(--accent)" }}>{errors.name}</span>}
          </div>
          {field("Email",   "email", "email", "email@company.ru")}
          {field("Телефон", "phone", "text",  "+7 900 000-00-00")}
        </div>

        <div className="form-divider">Трудовые данные</div>
        <div className="form-grid">
          {field("Должность", "position", "text", "Frontend-разработчик")}

          <div className="form-group">
            <label>Отдел</label>
            <select value={form.department} onChange={(e) => set("department", e.target.value)}>
              {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>

          {/* hire_date — snake_case, как в БД */}
          <div className="form-group">
            <label>Дата приёма</label>
            <input
              type="date" value={form.hire_date}
              onChange={(e) => set("hire_date", e.target.value)}
              style={errors.hire_date ? { borderColor: "var(--accent)" } : {}}
            />
            {errors.hire_date && <span style={{ fontSize: 12, color: "var(--accent)" }}>{errors.hire_date}</span>}
          </div>

          {field("Оклад (₽)", "salary", "number", "100000")}

          <div className="form-group">
            <label>Статус</label>
            <select value={form.status} onChange={(e) => set("status", e.target.value)}>
              <option value="active">Работает</option>
              <option value="probation">Испытательный срок</option>
              <option value="inactive">Уволен</option>
            </select>
          </div>

          <div className="form-group full">
            <label>Примечания</label>
            <textarea
              value={form.notes} placeholder="Дополнительная информация о сотруднике..."
              onChange={(e) => set("notes", e.target.value)}
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            className="btn btn-primary" onClick={handleSubmit} disabled={loading}
            style={saved ? { background: "var(--accent-green)" } : {}}
          >
            {loading ? "Сохранение…" : saved ? "✓ Сохранено!" : isEdit ? "Сохранить изменения" : "Добавить сотрудника"}
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("employees")}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
