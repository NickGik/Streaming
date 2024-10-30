// TrackListPresenter.ts - Презентер для управления списком треков

// Импорт необходимых модулей
import { Song, User } from '../models/interfaces'; // Интерфейсы для песни и пользователя
import { getAuthUser } from '../api/auth'; // Функция для получения данных аутентифицированного пользователя
import { likeSong, unlikeSong } from '../api/songs'; // Функции для лайка/дизлайка песни

// Класс TrackListPresenter
class TrackListPresenter {
  // Приватные свойства
  private tracks: Song[]; // Список треков
  private listeners: Array<() => void> = []; // Список слушателей (для обновления компонентов при изменении данных)

  // Конструктор
  constructor(tracks: Song[]) {
    this.tracks = tracks; // Инициализация списка треков
  }

  // Метод для получения списка треков
  getTracks(): Song[] {
    return this.tracks;
  }

  // Метод для добавления слушателя
  addListener(listener: () => void): void {
    this.listeners.push(listener);
  }

  // Метод для уведомления слушателей об изменениях
  notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  // Метод для переключения лайка/дизлайка песни
  async toggleLike(songId: number): Promise<void> {
    // Поиск трека в списке по ID
    const trackIndex = this.tracks.findIndex(track => track.id === songId);
    if (trackIndex !== -1) {
      const track = this.tracks[trackIndex];
      try {
        // Получение данных аутентифицированного пользователя
        const user: User = await getAuthUser();
        const currentUsername = user.username;

        // Проверка, поставил ли пользователь лайк этой песне
        const existingLikeIndex = track.likes.findIndex(like => like.username === currentUsername);
        if (existingLikeIndex !== -1) {
          // Удаление лайка
          track.likes.splice(existingLikeIndex, 1); // Удаление лайка из списка
          await unlikeSong(songId.toString()); // Вызов API для удаления лайка
        } else {
          // Добавление лайка
          // Создание объекта лайка
          const newLike: { username: string } = {
            username: currentUsername,
          };
          track.likes.push(newLike); // Добавление лайка в список лайков трека
          await likeSong(songId.toString()); // Вызов API для добавления лайка
        }

        // Уведомление слушателей об изменениях
        this.notifyListeners();
      } catch (error) {
        console.error('Ошибка при обработке лайка:', error);
      }
    }
  }
}

// Экспорт класса TrackListPresenter по умолчанию
export default TrackListPresenter;
