// src/api/users.ts

import { getRequest } from './index';
import { User, Playlist, UserLikesDto } from '../types/interfaces';

export const getUsers = (): Promise<User[]> => getRequest<User[]>('/api/users');
export const getUserPlaylists = (): Promise<Playlist[]> => getRequest<Playlist[]>('/api/users/playlists');
export const getUserPlaylistsByUsername = (username: string): Promise<Playlist[]> => getRequest<Playlist[]>(`/api/users/${username}/playlists`);
export const getUserLikes = (): Promise<UserLikesDto> => getRequest<UserLikesDto>('/api/users/likes');
export const getUserLikesByUsername = (username: string): Promise<UserLikesDto> => getRequest<UserLikesDto>(`/api/users/${username}/likes`);
