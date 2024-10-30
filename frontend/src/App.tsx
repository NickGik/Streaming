// App.tsx
// Импорт необходимых модулей
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import Aside from './components/Aside';
import Main from './components/Main';
import FooterPlayer from './components/FooterPlayer';
import { SearchProvider } from './contexts/SearchContext';
import { AuthProvider } from './contexts/AuthContext';
import { PlayerPresenter } from './presenters/PlayerPresenter'; // Импортируем PlayerPresenter

// Создание экземпляра QueryClient для управления запросами
const queryClient = new QueryClient();

// Функциональный компонент App
const App: React.FC = () => {
  // Создаем экземпляр PlayerPresenter
  const playerPresenter = new PlayerPresenter();

  // JSX разметка компонента
  return (
    // Провайдер QueryClient для управления запросами
    <QueryClientProvider client={queryClient}>
      {/* BrowserRouter для маршрутизации */}
      <BrowserRouter>
        {/* AuthProvider для управления аутентификацией */}
        <AuthProvider>
          {/* SearchProvider для управления поиском */}
          <SearchProvider>
            <div className="container">
              <div className="over-wrapper"> {/* Общий контейнер */}
                <Header /> {/* Компонент заголовка */}
                <div className="content-wrap flex"> {/* Контейнер для основного содержимого */}
                  <Aside /> {/* Компонент боковой панели */}
                  <Main /> {/* Компонент основного содержимого */}
                </div>
                {/* Передаем playerPresenter в FooterPlayer */}
                <FooterPlayer presenter={playerPresenter} /> {/* Компонент плеера в футере */}
              </div>
            </div>
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

// Экспорт компонента App по умолчанию
export default App;