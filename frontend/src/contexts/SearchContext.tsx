// SearchContext.tsx - Контекст для управления поиском

// Импорт необходимых модулей
import React, { createContext, useState } from 'react';
import SearchModel from '../models/SearchModel'; // Модель для поиска

// Интерфейс для типа контекста поиска
interface SearchContextType {
  searchModel: SearchModel; // Модель поиска
  setSearchText: (text: string) => void; // Функция для установки текста поиска
}

// Создание контекста поиска
export const SearchContext = createContext<SearchContextType>({
  searchModel: new SearchModel(), // Инициализация модели поиска по умолчанию
  setSearchText: () => {}, // Пустая функция по умолчанию
});

// Компонент SearchProvider - провайдер контекста поиска
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Состояние модели поиска
  const [searchModel, setSearchModel] = useState(new SearchModel());

  // Обработчик установки текста поиска
  const handleSetSearchText = (text: string) => {
    // Создание новой модели поиска с заданным текстом
    setSearchModel(new SearchModel(text)); 
  };

  // JSX разметка компонента
  return (
    // Провайдер контекста поиска
    <SearchContext.Provider value={{ searchModel, setSearchText: handleSetSearchText }}>
      {children} {/* Дочерние компоненты */}
    </SearchContext.Provider>
  );
};