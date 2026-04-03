export const DEPARTMENTS = [
  { id: 1, name: "Разработка ПО", head: "Михаил Соколов", count: 18, budget: 4200000 },
  { id: 2, name: "Отдел продаж", head: "Елена Захарова", count: 12, budget: 2800000 },
  { id: 3, name: "Маркетинг", head: "Артём Козлов", count: 8, budget: 1900000 },
  { id: 4, name: "Бухгалтерия", head: "Ольга Петрова", count: 5, budget: 1100000 },
  { id: 5, name: "HR", head: "Наталья Иванова", count: 4, budget: 900000 },
  { id: 6, name: "Юридический", head: "Дмитрий Волков", count: 3, budget: 850000 },
];

export const EMPLOYEES = [
  { id: 1, name: "Михаил Соколов",   dept: "Разработка ПО", role: "Руководитель отдела", salary: 185000, status: "active",  hired: "2019-03-12", color: "#4f7cff" },
  { id: 2, name: "Анна Кириллова",   dept: "Разработка ПО", role: "Senior Frontend Dev",  salary: 160000, status: "active",  hired: "2020-07-01", color: "#00d4aa" },
  { id: 3, name: "Игорь Семёнов",    dept: "Разработка ПО", role: "Backend Developer",    salary: 145000, status: "active",  hired: "2021-01-15", color: "#ff6b8a" },
  { id: 4, name: "Елена Захарова",   dept: "Отдел продаж",  role: "Руководитель отдела", salary: 155000, status: "active",  hired: "2018-11-20", color: "#ffb347" },
  { id: 5, name: "Пётр Фролов",      dept: "Отдел продаж",  role: "Менеджер по продажам", salary: 95000, status: "active",  hired: "2022-04-05", color: "#a78bfa" },
  { id: 6, name: "Артём Козлов",     dept: "Маркетинг",     role: "Руководитель отдела", salary: 148000, status: "vacation",hired: "2019-09-10", color: "#34d399" },
  { id: 7, name: "Светлана Новикова",dept: "Маркетинг",     role: "SMM-специалист",       salary: 88000,  status: "active",  hired: "2023-02-28", color: "#f472b6" },
  { id: 8, name: "Ольга Петрова",    dept: "Бухгалтерия",   role: "Главный бухгалтер",    salary: 140000, status: "active",  hired: "2017-06-14", color: "#60a5fa" },
  { id: 9, name: "Дмитрий Волков",   dept: "Юридический",   role: "Ведущий юрист",        salary: 165000, status: "sick",   hired: "2020-03-22", color: "#fb923c" },
  { id: 10, name: "Наталья Иванова", dept: "HR",            role: "HR-директор",          salary: 138000, status: "active",  hired: "2018-08-01", color: "#e879f9" },
];

export const VACANCIES = [
  { id: 1, title: "Senior React Developer", dept: "Разработка ПО", salary: "140 000–180 000 ₽", status: "open",   candidates: 12, created: "2024-03-01" },
  { id: 2, title: "DevOps Engineer",         dept: "Разработка ПО", salary: "160 000–200 000 ₽", status: "open",   candidates: 7,  created: "2024-03-10" },
  { id: 3, title: "Менеджер по продажам",   dept: "Отдел продаж",  salary: "80 000–120 000 ₽",  status: "open",   candidates: 24, created: "2024-02-20" },
  { id: 4, title: "Контент-маркетолог",     dept: "Маркетинг",     salary: "75 000–95 000 ₽",   status: "closed", candidates: 18, created: "2024-01-15" },
  { id: 5, title: "Junior Backend Developer",dept: "Разработка ПО", salary: "90 000–120 000 ₽",  status: "open",   candidates: 31, created: "2024-03-18" },
  { id: 6, title: "Юрист-консультант",      dept: "Юридический",   salary: "120 000–145 000 ₽", status: "hold",   candidates: 5,  created: "2024-02-28" },
];

export const STATS = {
  total: 50,
  active: 44,
  onVacation: 3,
  onSick: 3,
  newThisMonth: 4,
  turnover: 8.2,
  avgSalary: 132400,
  openVacancies: 4,
};
