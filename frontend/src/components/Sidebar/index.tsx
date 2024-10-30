// src/components/Sidebar.tsx - Компонент боковой панели приложения

// Импорт стилей компонента
import './Sidebar.css';

// Функциональный компонент Sidebar
export const Sidebar = () => {
  // JSX разметка компонента
  return (
    <div className="sidebar">
      {/* Список пунктов меню */}
      <ul className='sidebar__menu'>
        {/* Пункт меню "Плейлисты" */}
        <li>
          <button>
            {/* SVG иконка для плейлистов */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* ... SVG path data ... */}
            </svg>
            <span>Плейлисты</span> {/* Текст пункта меню */}
          </button>
        </li>

        {/* Пункт меню "Треки" */}
        <li>
          <button>
            {/* SVG иконка для треков */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* ... SVG path data ... */}
            </svg>
            <span>Треки</span> {/* Текст пункта меню */}
          </button>
        </li>

        {/* Пункт меню "Любимые песни" */}
        <li>
          <button>
            {/* SVG иконка для любимых песен */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* ... SVG path data ... */}
            </svg>
            <span>Любимые песни</span> {/* Текст пункта меню */}
          </button>
        </li>
      </ul>

      {/* Список плейлистов (пока пустой) */}
      <ul className='sidebar__playlist'>
        <li></li> 
      </ul>
    </div>
  );
}

// Экспорт компонента по умолчанию
export default Sidebar;