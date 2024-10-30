// src/components/Playlists.tsx - Компонент для отображения и управления плейлистами

// Импорт необходимых модулей
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; // Хук для fetching данных
import { getPlaylists } from '../../api/playlists'; // Функция для получения плейлистов из API
import { Playlist } from '../../models/interfaces'; // Интерфейс для плейлиста
import PlaylistPresenter from '../../presenters/PlaylistPresenter'; // Презентер для логики управления плейлистами
import './Playlist.css'; // Стили компонента

// Функциональный компонент Playlists
export const Playlists: React.FC = () => {
  // Состояния компонента
  const [presenter, setPresenter] = useState<PlaylistPresenter | null>(null); // Презентер плейлистов
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null); // Выбранный плейлист
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false); // Флаг для модального окна переименования
  const [newPlaylistName, setNewPlaylistName] = useState(''); // Новое имя плейлиста
  const [selectedTrackId, setSelectedTrackId] = useState<number | null>(null); // ID выбранного трека для добавления

  // Получение данных плейлистов с помощью useQuery
  const { data: playlists, isLoading, error } = useQuery<Playlist[], Error>({
    queryKey: ['playlists'], // Ключ запроса
    queryFn: getPlaylists, // Функция для получения данных
  });

  // useEffect для инициализации презентера после получения данных плейлистов
  useEffect(() => {
    if (playlists) {
      setPresenter(new PlaylistPresenter(playlists)); // Создание презентера с полученными плейлистами
    }
  }, [playlists]); // Зависимость от playlists

  // Обработчик клика по плейлисту
  const handlePlaylistClick = (playlist: Playlist) => {
    setSelectedPlaylist(playlist); // Установка выбранного плейлиста
  };

  // Обработчик добавления трека в плейлист
  const handleAddTrack = () => {
    if (selectedPlaylist && selectedTrackId) {
      presenter?.addTrackToPlaylist(selectedPlaylist.id, selectedTrackId); // Вызов метода презентера для добавления трека
      setSelectedTrackId(null); // Сброс выбранного трека после добавления
    }
  };

  // Обработчик удаления трека из плейлиста
  const handleRemoveTrack = (trackId: number) => {
    if (selectedPlaylist) {
      presenter?.removeTrackFromPlaylist(selectedPlaylist.id, trackId); // Вызов метода презентера для удаления трека
    }
  };

  // Обработчик переименования плейлиста
  const handleRenamePlaylist = () => {
    if (selectedPlaylist) {
      presenter?.renamePlaylist(selectedPlaylist.id, newPlaylistName); // Вызов метода презентера для переименования плейлиста
      setNewPlaylistName(''); // Очистка поля ввода после переименования
      setIsRenameModalOpen(false); // Закрытие модального окна
    }
  };

  // Отображение состояния загрузки
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Отображение ошибки, если произошла
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Отображение сообщения, если нет плейлистов
  if (!playlists || playlists.length === 0) {
    return <div>No playlists found</div>;
  }

  // JSX разметка компонента
  return (
    <div>
      {/* Отображение сетки плейлистов */}
      <div className="playlist-grid">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="playlist-card"
            onClick={() => handlePlaylistClick(playlist)} // Обработчик клика по плейлисту
          >
            <img
              src={playlist.image}
              alt={playlist.name}
              className="playlist-cover"
            /> {/* Обложка плейлиста */}
            <h3 className="playlist-name">{playlist.name}</h3> {/* Название плейлиста */}
            <p className="playlist-tracks-count">
              {playlist.songs.length} tracks {/* Количество треков в плейлисте */}
            </p>
            {/* Кнопка "Rename" */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Предотвращение клика по плейлисту
                setSelectedPlaylist(playlist); // Установка выбранного плейлиста
                setIsRenameModalOpen(true); // Открытие модального окна переименования
              }}
            >
              Rename
            </button>
          </div>
        ))}
      </div>

      {/* Отображение деталей выбранного плейлиста */}
      {selectedPlaylist && (
        <div>
          <h2>{selectedPlaylist.name}</h2> {/* Название выбранного плейлиста */}
          <ul>
            {selectedPlaylist.songs.map((trackId) => (
              <li key={trackId}>
                {/* Здесь нужно отобразить информацию о треке по trackId */}
                Track {trackId} {/* Заполнитель для информации о треке */}
                {/* Кнопка "Remove" для удаления трека */}
                <button onClick={() => handleRemoveTrack(Number(trackId))}>
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* Добавление трека (заполнитель - требуется логика выбора трека) */}
          <div>
            {/* Выпадающий список для выбора трека */}
            <select
              value={selectedTrackId || ''}
              onChange={(e) =>
                setSelectedTrackId(Number(e.target.value) || null)
              }
            >
              <option value="">Select Track</option>
              {/* Замените это на реальные треки */}
              {[1, 2, 3].map((trackId) => (
                <option key={trackId} value={trackId}>
                  Track {trackId}
                </option>
              ))}
            </select>
            {/* Кнопка "Add Track" */}
            <button onClick={handleAddTrack} disabled={!selectedTrackId}>
              Add Track
            </button>
          </div>
        </div>
      )}

      {/* Модальное окно для переименования плейлиста */}
      {isRenameModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Rename Playlist</h3>
            {/* Поле ввода для нового имени */}
            <input
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
            />
            {/* Кнопка "Save" для сохранения изменений */}
            <button onClick={handleRenamePlaylist}>Save</button>
            {/* Кнопка "Cancel" для отмены */}
            <button onClick={() => setIsRenameModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Экспорт компонента по умолчанию
export default Playlists;
