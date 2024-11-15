Проект Музыкальный стриминговый сервис.

Этот проект представляет собой базовый Vite-сеттинг с React и TypeScript. Он включает в себя предварительно настроенную среду разработки и набор общих зависимостей для начала работы.
Содержание:

index.html: Основной HTML-файл проекта.
src: Директория исходного кода.
src/main.tsx: Главная точка входа для React-приложения.
vite.config.ts: Файл конфигурации Vite.
tsconfig.json: Файл конфигурации TypeScript.
package.json: Зависимости проекта и скрипты.

Скрипты:
dev: Запускает сервер разработки с горячей перезагрузкой модулей.
build: Сборка пакета для продакшена.
lint: Запускает ESLint для проверки качества кода.
preview: Запускает локальный сервер для просмотра сборки для продакшена.

Зависимости:
@tanstack/react-query: Мощная библиотека для извлечения и кэширования данных.
axios: Популярный HTTP-клиент.
date-fns: Современная и модульная библиотека утилит для работы с датами.
howler: JavaScript-библиотека для работы со звуком.
react: Библиотека React.
react-dom: Библиотека ReactDOM для рендеринга компонентов React.
react-router-dom: Библиотека маршрутизации для React.
standardized-audio-context: Обеспечивает единый способ создания и использования AudioContext в разных браузерах.
Зависимости для разработки:
@types/node: Определения типов TypeScript для Node.js.
@types/react: Определения типов TypeScript для React.
@types/react-dom: Определения типов TypeScript для ReactDOM.
@typescript-eslint/eslint-plugin: Плагин ESLint для TypeScript.
@typescript-eslint/parser: Парсер ESLint для TypeScript.
@vitejs/plugin-react: Плагин Vite для React.
eslint: Линтер для JavaScript.
eslint-plugin-react-hooks: Плагин ESLint для React-хуков.
eslint-plugin-react-refresh: Плагин ESLint для React Fast Refresh.
typescript: Компилятор TypeScript.
vite: Инструмент сборки Vite.

Начало работы:
Установка зависимостей:
npm install

Запуск сервера разработки:
npm run dev

Сборка для продакшена:
npm run build

Просмотр сборки для продакшена:
npm run preview
---------------SWAGGER-----------------------------------------------------------------------
Прежде чем попробовать выполнить запрос, необходимо указать в swagger токен
авторизации. Для этого нажмите кнопку Authorize и укажите токен авторизации. Вы
можете указать любой, Пример токена:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0cmluZyIsImlkIjoxLCJ
pYXQiOjE2NDgyMzgyOTQsImV4cCI6MTY0ODg0MzA5NH0.j85Ls9RmF7Lne43kESZMk
Xh5yCQtnggWk9zL4wFVnV0.
После этого вы можете раскрыть любой из запросов и пробовать их отправлять. Как
только вы это сделаете, ниже покажется ответ от сервера.
Это поможет вам пробовать обращаться к API без необходимости что-то
программировать.
Обратите внимание, бекенд принимает любые токены и создаёт для них
пользователя. Отправляйте новый access token, если вы хотите создать
нового пользователя. Это сделано, чтобы упростить взаимодействие с
бэкэндом.
