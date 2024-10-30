// PlaylistPresenter.ts - Презентер для управления плейлистами

// Импорт необходимых модулей
import { Playlist } from '../models/interfaces'; // Интерфейс для плейлиста
import {
  getPlaylists,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
  renamePlaylist,
} from '../api/playlists'; // Функции для взаимодействия с API плейлистов

// Класс PlaylistPresenter
class PlaylistPresenter {
  // Приватные свойства
  private playlists: Playlist[]; // Список плейлистов
  private listeners: (() => void)[] = []; // Список слушателей (для обновления компонентов при изменении данных)

  // Конструктор
  constructor(playlists: Playlist[]) {
    this.playlists = playlists; // Инициализация списка плейлистов
  }

  // Метод для получения списка плейлистов
  getPlaylists(): Playlist[] {
    return this.playlists;
  }

  // Метод для подписки на обновления
  subscribe(listener: () => void): void {
    this.listeners.push(listener);
  }

  // Метод для отписки от обновлений
  unsubscribe(listener: () => void): void {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  // Приватный метод для уведомления слушателей об изменениях
  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }

  // Метод для добавления трека в плейлист
  async addTrackToPlaylist(playlistId: number, trackId: number): Promise<void> {
    try {
      // Вызов API для добавления трека в плейлист
      await addTrackToPlaylist(playlistId, trackId);
      // Обновление списка плейлистов
      await this.updatePlaylists();
    } catch (error) {
      console.error('Ошибка при добавлении трека в плейлист:', error);
      // Обработка ошибки, например, показ сообщения пользователю
    }
  }

  // Метод для удаления трека из плейлиста
  async removeTrackFromPlaylist(
    playlistId: number,
    trackId: number
  ): Promise<void> {
    try {
      // Вызов API для удаления трека из плейлиста
      await removeTrackFromPlaylist(playlistId, trackId);
      // Обновление списка плейлистов
      await this.updatePlaylists();
    } catch (error) {
      console.error('Ошибка при удалении трека из плейлиста:', error);
      // Обработка ошибки, например, показ сообщения пользователю
    }
  }

  // Метод для переименования плейлиста
  async renamePlaylist(playlistId: number, newName: string): Promise<void> {
    try {
      // Вызов API для переименования плейлиста
      await renamePlaylist(playlistId, newName);
      // Обновление списка плейлистов
      await this.updatePlaylists();
    } catch (error) {
      console.error('Ошибка при переименовании плейлиста:', error);
      // Обработка ошибки, например, показ сообщения пользователю
    }
  }

  // Приватный метод для обновления списка плейлистов
  private async updatePlaylists() {
    try {
      // Получение обновленного списка плейлистов
      const updatedPlaylists = await getPlaylists();
      // Обновление списка плейлистов в презентере
      this.playlists = updatedPlaylists;
      // Уведомление слушателей об изменениях
      this.notifyListeners();
    } catch (error) {
      console.error('Ошибка при обновлении плейлистов:', error);
      // Обработка ошибки, например, показ сообщения пользователю
    }
  }
}

// Экспорт класса PlaylistPresenter по умолчанию
export default PlaylistPresenter;