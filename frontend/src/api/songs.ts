// src/api/songs.ts
import { getRequest, postRequest } from './index'; // Используйте getRequest для всех запросов
import { Song, LikedData } from '../models/interfaces';

export const getSongs = (): Promise<Song[]> => getRequest<Song[]>('/api/songs');
export const getSong = (songId: string): Promise<Song> => getRequest<Song>(`/api/songs/${songId}`);

export const getLikedSongs = async (): Promise<LikedData> => {
  const data = await getRequest<LikedData>('/api/users/likes');
  return {
    artistLikes: data.artistLikes,
    albumLikes: data.albumLikes,
    songLikes: data.songLikes,
  };
};

// Правильное имя функции и путь к API
export const getSongById = async (songId: number): Promise<Song> => {
  return getRequest<Song>(`/api/songs/${songId}`); 
};

export const likeSong = async (songId: number) => { 
  await postRequest(`/api/songs/${songId}/like`, {});
};

export const unlikeSong = async (songId: number) => { 
  await postRequest(`/api/songs/${songId}/unlike`, {});
};
