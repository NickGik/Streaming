// src/components/Header.tsx - Компонент заголовка приложения

// Импорт необходимых модулей
import React, { useContext } from 'react';
import { SearchContext } from '../../contexts/SearchContext'; // Контекст для поиска
import logo from '../../../public/logo.png'; // Логотип приложения
import './Header.css'; // Стили компонента

// Функциональный компонент Header
export const Header: React.FC = () => {
  // Получение функции setSearchText из контекста поиска
  const { setSearchText } = useContext(SearchContext);

  // Обработчик изменения текста в поле поиска
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value); // Обновление текста поиска в контексте
  };

  // JSX разметка компонента
  return (
    <header className="header flex">
      {/* Контейнер для логотипа */}
      <div className="header__logo">
        <img src={logo} alt="logo" /> {/* Отображение логотипа */}
      </div>
      {/* Контейнер для поля поиска */}
      <div className="header__search">
        <input
          className="header__search__field"
          type="search"
          placeholder="ЧТО БУДЕМ ИСКАТЬ?" // Placeholder для поля поиска
          onChange={handleSearchInputChange} // Обработчик изменения текста
        />
      </div>
      {/* Кнопка пользователя */}
      <button className="header__user">
        <img className="header__user__img" src="img/user.jpg" alt="Изображение пользователя" /> {/* Аватар пользователя */}
        <span className="header__user__text">Tatiana L.</span> {/* Имя пользователя */}
        {/* SVG иконка (стрелка вниз) */}
        <svg className="header__user__svg" width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M0.528636 1.02859C0.788986 0.768245 1.2111 0.768245 1.47145 1.02859L5.47145 5.02859C5.73179 5.28894 5.73179 5.71105 5.47145 5.9714L1.47145 9.9714C1.2111 10.2318 0.788986 10.2318 0.528636 9.9714C0.268287 9.71105 0.268287 9.28894 0.528636 9.02859L4.05723 5.5L0.528636 1.9714C0.268287 1.71105 0.268287 1.28894 0.528636 1.02859Z" fill="#FC6D3E"/>
        </svg>
      </button>
    </header>
  );
};

// Экспорт компонента по умолчанию
export default Header;