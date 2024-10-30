// src/components/Tracks.tsx

import React, { useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns'; // Импорт для форматирования даты
import { getSongs, likeSong, unlikeSong } from '../../api/songs';
import { SearchContext } from '../../contexts/SearchContext';
import { Song } from '../../models/interfaces';
import './Tracks.css'; 

// Вспомогательная функция для форматирования длительности (в миллисекундах) в минуты:секунды
const formatDuration = (duration: number) => {
  const totalSeconds = Math.floor(duration / 1000); // Перевод миллисекунд в секунды
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = ('0' + (totalSeconds % 60)).slice(-2); 
  return `${minutes}:${seconds}`;
};

// Вспомогательная функция для форматирования строк даты с обработкой невалидных дат и резервной датой создания
const formatTrackDate = (dateString: string, creationDate?: string | Date) => { 
  try {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return format(date, 'dd.MM.yyyy'); 
    } 
  } catch (error) {
    // Игнорировать ошибку, если dateString не является валидной датой
  }

  // Попробовать отформатировать creationDate, если она доступна и является валидной датой
  if (creationDate) {
    try {
      const creationDateObj = typeof creationDate === 'string' ? new Date(creationDate) : creationDate; 
      if (!isNaN(creationDateObj.getTime())) {
        return format(creationDateObj, 'dd.MM.yyyy');
      }
    } catch (error) {
      // Игнорировать ошибку, если creationDate не является валидной датой
    }
  }

  return 'Invalid Date'; 
};

export const Tracks: React.FC = () => {
  // Доступ к клиенту запросов для инвалидации запросов
  const queryClient = useQueryClient();

  // Получение модели поиска из SearchContext
  const { searchModel } = useContext(SearchContext);

  // Переменные состояния для управления удалением, добавлением треков и выбором меню
  const [trackToRemove, setTrackToRemove] = useState<Song | null>(null);
  const [trackToAdd, setTrackToAdd] = useState<Song | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);

  // Заполнитель для плейлистов (замените на реальные данные)
  const playlists = ['Playlist 1', 'Playlist 2'];

  // Получение данных песен с помощью хука useQuery из React Query
  const { data: tracks, isLoading, error } = useQuery<Song[], Error>({
    queryKey: ['songs'], // Уникальный ключ для этого запроса
    queryFn: getSongs,    // Функция для получения песен
  });

  // Мутация для лайка песни
  const likeMutation = useMutation({
    mutationFn: (songId: number) => likeSong(songId),
    onSuccess: () => {
      // Инвалидация запроса 'songs' для повторного получения обновленных данных
      queryClient.invalidateQueries({ queryKey: ['songs'] }); 
    },
  });

  // Мутация для отмены лайка песни
  const unlikeMutation = useMutation({
    mutationFn: (songId: number) => unlikeSong(songId),
    onSuccess: () => {
      // Инвалидация запроса 'songs' для повторного получения обновленных данных
      queryClient.invalidateQueries({ queryKey: ['songs'] }); 
    },
  });

  // Отображение состояния загрузки при получении песен
  if (isLoading) {
    return <div>Loading tracks...</div>;
  }

  // Отображение сообщения об ошибке, если не удалось получить песни
  if (error) {
    return <div>Error loading tracks: {error.message}</div>;
  }

  // Фильтрация треков на основе текста поиска
  const filteredTracks = tracks?.filter(track => {
    const searchText = searchModel.getSearchText().toLowerCase();
    return (
      track.name.toLowerCase().includes(searchText) ||
      track.artist.name.toLowerCase().includes(searchText) ||
      track.album.name.toLowerCase().includes(searchText)
    );
  }) || [];

  // Обработка переключения состояния лайка трека
  const handleToggleLike = async (trackId: number, isLiked: boolean) => {
    try {
      if (isLiked) {
        await unlikeMutation.mutateAsync(trackId);
      } else {
        await likeMutation.mutateAsync(trackId);
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  // Открытие модального окна для удаления трека
  const openRemoveModal = (track: Song) => {
    setTrackToRemove(track);
  };

  // Обработка удаления трека
  const handleRemoveTrack = () => {
    console.log(`Removing track: ${trackToRemove?.id}`);
    setTrackToRemove(null); 
  };

  // Открытие модального окна для добавления трека в плейлист
  const openAddToPlaylistModal = (track: Song) => {
    setTrackToAdd(track);
  };

  // Обработка добавления трека в плейлист
  const handleAddToPlaylist = (playlist: string) => {
    console.log(`Adding track ${trackToAdd?.id} to playlist ${playlist}`);
    setTrackToAdd(null); 
  };

  // Переключение меню трека
  const toggleMenu = (index: number) => {
    setSelectedTrack(selectedTrack === index ? null : index);
  };

  // Рендеринг JSX компонента
  return (
    <section className="tracks section tabs-content section--active" data-target="tracks">
      <h2>Треки</h2>
      <table className="tracks__table">
        <thead>
          <tr>
            <th>#</th>
            <th>НАИМЕНОВАНИЕ</th>
            <th>ИСПОЛНИТЕЛЬ</th>
            <th>АЛЬБОМ</th>
            <th><i className="fa fa-calendar"></i></th>
            <th><i className="fa fa-heart"></i></th>
            <th><i className="fa fa-clock"></i></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredTracks.map((track, index) => (
            <tr key={track.id}>
              <td>{index + 1}</td>
              <td className="track__image">
                <img src={track.album.image} alt={track.album.name} className="track-album-cover" />
              </td>
              <td>{track.name}</td>
              <td>{track.artist.name}</td>
              <td>{track.album.name}</td>
              <td>{formatTrackDate(track.added, track.createdAt)}</td>
              <td>
                <button
                  onClick={() => handleToggleLike(track.id, track.likes.some(like => like.username === 'currentUserUsername'))}
                  className="like-button"
                  style={{ color: track.likes.some(like => like.username === 'currentUserUsername') ? 'red' : 'inherit' }}
                >
                  {track.likes.some(like => like.username === 'currentUserUsername') ? '❤️' : '♡'}
                </button>
              </td>
              <td>{formatDuration(track.duration)}</td>
              <td>
                <button onClick={() => toggleMenu(index)} className="menu-button">...</button>
                {selectedTrack === index && (
                  <div className="modal modal-menu" onClick={() => setSelectedTrack(null)}>
                    <div className="modal-content track-menu-modal" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => openRemoveModal(filteredTracks[selectedTrack])} className="track-menu-button">
                        Удалить
                      </button>
                      <button onClick={() => openAddToPlaylistModal(filteredTracks[selectedTrack])} className="track-menu-button">
                        Добавить в плейлист
                      </button>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      {/* Модальное окно для удаления трека */}
      {trackToRemove && (
        <div className="modal modal-remove" onClick={() => setTrackToRemove(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>Вы уверены, что хотите удалить трек {trackToRemove.name} из плейлиста?</p>
            <button onClick={handleRemoveTrack}>Удалить</button>
            <button onClick={() => setTrackToRemove(null)}>Отмена</button>
          </div>
        </div>
      )}
  
      {/* Модальное окно для добавления трека в плейлист */}
      {trackToAdd && (
        <div className="modal modal-add" onClick={() => setTrackToAdd(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>Выберите плейлист для добавления трека {trackToAdd.name}:</p>
            <ul>
              {playlists.map((playlist) => (
                <li key={playlist}>
                  <button onClick={() => handleAddToPlaylist(playlist)}>{playlist}</button>
                </li>
              ))}
            </ul>
            <button onClick={() => setTrackToAdd(null)}>Отмена</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Tracks; 