// src/api/artists.ts

import { getRequest, postRequest } from './index';
import { Artist, Album, Song } from '../types/interfaces';

export const getArtist = (artistId: string): Promise<Artist> => getRequest<Artist>(`/api/artists/${artistId}`);
export const getArtistAlbums = (artistId: string): Promise<Album[]> => getRequest<Album[]>(`/api/artists/${artistId}/albums`);
export const getArtistSongs = (artistId: string): Promise<Song[]> => getRequest<Song[]>(`/api/artists/${artistId}/songs`);
export const likeArtist = (artistId: string) => postRequest<void>(`/api/artists/${artistId}/like`, {});
export const unlikeArtist = (artistId: string) => postRequest<void>(`/api/artists/${artistId}/unlike`, {});
