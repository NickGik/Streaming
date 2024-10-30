import { useQuery } from '@tanstack/react-query';
import { getLikedSongs } from '../../api/songs';
import { Song, LikedData } from '../../models/interfaces';
import './Favorite.css';
import { format } from 'date-fns'; // Импортируем format из date-fns

// Вспомогательная функция для форматирования длительности (в миллисекундах) в минуты:секунды
const formatDuration = (duration: number) => {
  const totalSeconds = Math.floor(duration / 1000);
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

export const Favorite: React.FC = () => {
  // Использование useQuery для получения данных о понравившихся треках
  const { data: likedData, isLoading, error } = useQuery<LikedData, Error>({
    queryKey: ['artistLikes'], // Уникальный ключ запроса
    queryFn: getLikedSongs,    // Функция для получения данных
  });

  // Отображение состояния загрузки, если данные еще не загружены
  if (isLoading) {
    return <div>Loading liked tracks...</div>;
  }

  // Отображение сообщения об ошибке, если произошла ошибка при загрузке данных
  if (error) {
    return <div>Error loading liked tracks: {error.message}</div>;
  }

  // Получение списка понравившихся треков из данных
  const likedTracks = likedData?.songLikes || [];

  // Отображение компонента с таблицей понравившихся треков
  return (
    <section className="tracks section tabs-content section--active" data-target="favorites">
      <h2>Favorite Tracks</h2>
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
          </tr>
        </thead>
        <tbody>
          {likedTracks.map((track: Song, index: number) => (
            <tr key={track.id}>
              <td>{index + 1}</td>
              <td className="track__image">
                <img src={track.album.image} alt={track.album.name} className="track-album-cover" />
              </td>
              <td>{track.name}</td>
              <td>{track.artist.name}</td>
              <td>{track.album.name}</td>
              <td>{formatTrackDate(track.added, track.createdAt)}</td>
              <td>❤️</td>
              <td>{formatDuration(track.duration)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Favorite;