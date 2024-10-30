// Импортируем необходимые компоненты и хуки из React и React Router
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Импортируем хук useQuery для выполнения запросов
import { useQuery } from '@tanstack/react-query';

// Импортируем функцию getPlaylists для получения плейлистов из API
import { getPlaylists } from '../../api/playlists'; 

// Импортируем контекст аутентификации
import { AuthContext } from '../../contexts/AuthContext'; 

// Импортируем интерфейс Playlist
import { Playlist } from '../../models/interfaces'; 

// Импортируем стили
import './Aside.css';

// Определяем функциональный компонент Aside
export const Aside: React.FC = () => {
  // Получаем токен из контекста аутентификации
  const { token } = useContext(AuthContext);

   // Function to determine active button
   const isActive = (path: string) => {
    return location.pathname === path;
  };
  const navigate = useNavigate();

  // Используем useQuery для получения плейлистов из API
  const { data: playlists = [], isLoading, error } = useQuery<Playlist[], Error>({
    // Устанавливаем ключ запроса
    queryKey: ['playlists'],
    // Устанавливаем функцию запроса
    queryFn: getPlaylists,
    // Выполняем запрос только если есть токен
    enabled: !!token,
  });

  // Отображаем сообщение загрузки, если данные загружаются
  if (isLoading) {
    return <div>Loading playlists...</div>;
  }

  // Отображаем сообщение об ошибке, если произошла ошибка
  if (error) {
    return <div>Error loading playlists: {error.message}</div>;
  }

  // Проверяем, что playlists является массивом
  if (!Array.isArray(playlists)) {
    console.error('Expected playlists to be an array:', playlists);
    return <div>Error: playlists data is not an array</div>;
  }

  // Обработчик клика по вкладке
  const handleTabClick = (path: string) => {
    // Переходим по указанному пути
    navigate(path);
  };

  // Возвращаем JSX для боковой панели
  return (
    <aside className="aside">
      {/* Заголовок для доступности */}
      <ul className="aside__list">
        {/* Вкладка "Треки" */}
        <li className="aside__item">
          <button
            className={`aside__btn aside__tabs-btn ${isActive('/') ? 'aside__btn-active' : ''}`}
            onClick={() => handleTabClick('/')}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28.5185 15.1467L10.5215 4.14816C10.3699 4.05552 10.1963 4.00494 10.0187 4.00161C9.8411 3.99828 9.6658 4.04234 9.51085 4.12924C9.3559 4.21613 9.2269 4.34274 9.13711 4.49604C9.04733 4.64933 9 4.82378 9 5.00143V26.9986C9 27.1762 9.04733 27.3507 9.13711 27.504C9.2269 27.6573 9.3559 27.7839 9.51085 27.8708C9.6658 27.9577 9.8411 28.0017 10.0187 27.9984C10.1963 27.9951 10.3699 27.9445 10.5215 27.8519L28.5185 16.8533C28.6647 16.764 28.7855 16.6386 28.8693 16.4892C28.9531 16.3398 28.9971 16.1713 28.9971 16C28.9971 15.8287 28.9531 15.6603 28.8693 15.5109C28.7855 15.3615 28.6647 15.2361 28.5185 15.1467Z" stroke="#FC6D3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="aside__btn__text">Треки</span>
          </button>
        </li>
        {/* Вкладка "Плейлисты" */}
        <li className="aside__item">
          <button
            className={`aside__btn aside__tabs-btn ${isActive('/playlists') ? 'aside__btn-active' : ''}`}
            onClick={() => handleTabClick('/playlists')}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.5 25C24.433 25 26 23.433 26 21.5C26 19.567 24.433 18 22.5 18C20.567 18 19 19.567 19 21.5C19 23.433 20.567 25 22.5 25Z" stroke="#FC6D3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.5 29C8.433 29 10 27.433 10 25.5C10 23.567 8.433 22 6.5 22C4.567 22 3 23.567 3 25.5C3 27.433 4.567 29 6.5 29Z" stroke="#FC6D3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M26 10L10 14" stroke="#FC6D3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 25.5V8L26 4V21.5" stroke="#FC6D3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="aside__btn__text">Плейлисты</span>
          </button>
        </li>
        {/* Кнопка "Любимые песни" */}
        <li className="aside__item">
          <button
            className={`aside__btn aside__tabs-btn ${isActive('/favorite') ? 'aside__btn-active' : ''}`}
            onClick={() => handleTabClick('/favorite')}
          >
            <svg width="28" height="28" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier"> 
                <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#FC6D3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
              </g>
            </svg>
            <span className="aside__btn__text">Любимые песни</span>
          </button>
        </li>
      </ul>
      <ul className='aside-playlist'>
        {/* Отображаем список плейлистов */}
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <li key={playlist.id} className="aside__item">
              <Link to={`/playlists/${playlist.id}`} className="aside__btn">
                {playlist.name}
              </Link>
            </li>
          ))
        ) : (
          // Отображаем сообщение, если нет плейлистов
          <li className="aside__item">Нет плейлистов</li>
        )}
      </ul>
    </aside>
  );
};

// Экспортируем компонент по умолчанию
export default Aside;