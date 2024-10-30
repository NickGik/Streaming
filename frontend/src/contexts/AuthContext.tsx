// src/contexts/AuthContext.tsx - Контекст для управления аутентификацией

// Импорт необходимых модулей
import React, { createContext, useState, useEffect } from 'react';
import { User } from '../models/interfaces'; // Интерфейс для пользователя
import { getAuthUser } from '../api/auth'; // Функция для получения данных аутентифицированного пользователя

// Интерфейс для состояния аутентификации
interface AuthState {
  user: User | null; // Пользователь (null, если не аутентифицирован)
  token: string | null; // Токен аутентификации (null, если не аутентифицирован)
}

// Интерфейс для значения контекста аутентификации
interface AuthContextValue extends AuthState {
  setUser: (user: User | null) => void; // Функция для установки пользователя
  setToken: (token: string | null) => void; // Функция для установки токена
}

// Создание контекста аутентификации
export const AuthContext = createContext<AuthContextValue>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

// Интерфейс для пропсов компонента AuthProvider
interface AuthProviderProps {
  children: React.ReactNode; // Дочерние компоненты
}

// Компонент AuthProvider - провайдер контекста аутентификации
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Состояние аутентификации
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('token') || null, // Получение токена из localStorage
  });

  // useEffect для получения данных пользователя при монтировании компонента
  useEffect(() => {
    // Асинхронная функция для получения данных пользователя
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Получение токена из localStorage

      if (token) { // Если токен есть
        try {
          const user = await getAuthUser(); // Получение данных пользователя
          setAuthState(prevAuthState => ({ ...prevAuthState, user })); // Обновление состояния с полученным пользователем
        } catch (error) {
          console.error('Ошибка при получении данных пользователя:', error);
          // Дополнительная обработка ошибки, например, выход из системы
          setAuthState(prevAuthState => ({ ...prevAuthState, token: null, user: null })); // Сброс аутентификации
        }
      }
    };

    fetchUserData(); // Вызов функции для получения данных пользователя
  }, []); // Пустой массив зависимостей, useEffect выполнится только один раз при монтировании

  // Функция для установки пользователя
  const setUser = (user: User | null) => {
    setAuthState(prevAuthState => ({ ...prevAuthState, user }));
  };

  // Функция для установки токена
  const setToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('token', token); // Сохранение токена в localStorage
    } else {
      localStorage.removeItem('token'); // Удаление токена из localStorage
    }
    setAuthState(prevAuthState => ({ ...prevAuthState, token })); // Обновление состояния с новым токеном
  };

  // JSX разметка компонента
  return (
    // Провайдер контекста аутентификации
    <AuthContext.Provider value={{ ...authState, setUser, setToken }}>
      {children} {/* Дочерние компоненты */}
    </AuthContext.Provider>
  );
};