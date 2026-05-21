export const DEPARTMENTS = [
  "ИТ-отдел",
  "HR-отдел",
  "Финансы",
  "Маркетинг",
  "Операции",
];

export const STATUS_LABELS = {
  active: "Работает",
  probation: "Испытательный",
  inactive: "Уволен",
};

export const DEPT_CLASSES = {
  "ИТ-отдел": "dept-it",
  "HR-отдел": "dept-hr",
  "Финансы": "dept-finance",
  "Маркетинг": "dept-marketing",
  "Операции": "dept-ops",
};

export const DEPT_ICONS = {
  "ИТ-отдел": "💻",
  "HR-отдел": "👥",
  "Финансы": "💵",
  "Маркетинг": "📢",
  "Операции": "⚙️",
};

export function getInitials(name) {
  if (!name) return "";
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

export function getAvatarColor(index) {
  const colors = ["#4f7cff", "#00d4aa", "#ffb347", "#ff4d6d", "#a78bfa", "#fb923c"];
  return colors[Math.abs(index) % colors.length];
}

export function formatSalary(salary) {
  if (salary === undefined || salary === null) return "0 ₽";
  return Number(salary).toLocaleString("ru-RU") + " ₽";
}

export function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("ru-RU");
}
