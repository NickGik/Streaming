// src/api/albums.ts

import { getRequest, postRequest } from './index';
import { Album, Song } from '../models/interfaces';

export const getAlbum = (albumId: string): Promise<Album> => getRequest<Album>(`/api/albums/${albumId}`);
export const getAlbumSongs = (albumId: string): Promise<Song[]> => getRequest<Song[]>(`/api/albums/${albumId}/songs`);
export const likeAlbum = (albumId: string) => postRequest<void>(`/api/albums/${albumId}/like`, {});
export const unlikeAlbum = (albumId: string) => postRequest<void>(`/api/albums/${albumId}/unlike`, {});
