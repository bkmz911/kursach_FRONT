# 📚 **Kursach Frontend** – HR Management System

![GitHub License](https://img.shields.io/github/license/yourusername/kursach_FRONT?color=blue)  
![GitHub Stars](https://img.shields.io/github/stars/yourusername/kursach_FRONT?style=social)  
![Node.js](https://img.shields.io/badge/Node.js-20.x-green)  
![React](https://img.shields.io/badge/React-18.x-61DAFB)  
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF)

---

## 🎯 Проект
`Kursach Frontend` – это современный клиент‑части HR‑системы, разработанный с **React**, **Vite** и **Tailwind CSS** (или Vanilla CSS, если уже используется). Приложение демонстрирует UI‑компоненты для управления отделами и сотрудниками, плавную анимацию скроллинга с помощью **Lenis** и стильный дизайн в духе glassmorphism.

> **Важно:** бекенд находится в отдельном репозитории `kursach_BACK`. Он обслуживает API‑эндпоинты, к которым подключается фронтенд.

---

## 🛠️ Технологический стек
| Категория | Технология |
|-----------|------------|
| **Framework** | React 18 (hooks) |
| **Bundler** | Vite 5 |
| **Styling** | Vanilla CSS (см. `src/App.css`) – использованы современные CSS‑переменные, градиенты и микросхемы |
| **Animations** | Lenis smooth scrolling |
| **Icons** | React‑Icons |
| **State** | Local component state / Context API |
| **Testing** | Jest + React Testing Library |

---

## 📦 Предварительные требования
- **Node.js** ≥ 20.x (рекомендовано установить через [nvm-windows](https://github.com/coreybutler/nvm-windows))
- **npm** ≥ 10.x (будет установлен автоматически вместе с Node)
- Доступ к интернету для установки зависимостей
- Запущенный бекенд‑сервер **kursach_BACK** (см. его `README.md` для инструкций) — по умолчанию API ожидает запросы на `http://localhost:5000`.

---

## ⚡ Быстрый старт
```bash
# 1️⃣ Клонируйте репозиторий
git clone https://github.com/yourusername/kursach_FRONT.git
cd kursach_FRONT

# 2️⃣ Установите зависимости
npm install

# 3️⃣ Запустите приложение в режиме разработки
npm run dev
```
Откройте браузер и перейдите по адресу, указанному в консоли (обычно <http://localhost:5173>). Приложение автоматически подхватит изменения в коде.

---

## 📂 Структура проекта
```
├─ public/                 # Статические файлы (favicon, robots.txt)
├─ src/                    # Исходный код
│  ├─ assets/              # Изображения, SVG‑иконки
│  ├─ components/          # Переиспользуемые UI‑компоненты
│  ├─ pages/               # Страницы роутера (Departments.jsx, Employees.jsx)
│  ├─ data/                # Мок‑данные (employees.js и т.п.)
│  ├─ App.jsx              # Корневой компонент
│  └─ main.jsx             # Точка входа, инициализация Lenis
├─ index.html               # Шаблон HTML
└─ vite.config.ts          # Конфигурация Vite
```

---

## 🔧 Скрипты npm
| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev‑сервера с hot‑reload |
| `npm run build` | Сборка оптимизированного продакшн‑бандла |
| `npm run preview` | Локальный просмотр собранного приложения |
| `npm test` | Запуск тестов (Jest) |

---

## 🌐 Интеграция с бекендом
Фронтенд использует базовый URL **`/api`**, проксируемый Vite к бекенд‑серверу. В файле `vite.config.ts` уже настроен прокси:
```js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
```
Если бекенд работает на другом порту/хосте, отредактируйте значение `target`.

---

## 📸 Превью интерфейса
![Frontend preview](file:///C:/Users/User/.gemini/antigravity/artifacts/frontend_preview.png)

---

## 🧩 Что дальше?
- Добавьте аутентификацию (JWT) и защиту роутов.
- Реализуйте глобальное состояние с Redux Toolkit или Zustand.
- Напишите e2e‑тесты с Cypress.
- Подключите CI/CD (GitHub Actions) для автоматической проверки сборки.

---

## 📄 Лицензия
Проект распространяется под лицензией MIT. Подробнее в файле `LICENSE`.

---

*Создано в рамках курсовой работы – фронтенд‑часть HR‑системы.*
