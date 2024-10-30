import { getRequest, postRequest } from './index';
import { Playlist } from '../models/interfaces';

export const getPlaylists = async (): Promise<Playlist[]> => {
  return getRequest<Playlist[]>('/api/users/playlists');
};

export const getTracksForPlaylist = async (playlistId: number) => {
  return getRequest(`/api/playlists/${playlistId}/songs`);
};

export const addTrackToPlaylist = async (playlistId: number, trackId: number) => {
  await postRequest(`/api/playlists/${playlistId}/add/${trackId}`, {});
};

export const removeTrackFromPlaylist = async (playlistId: number, trackId: number) => {
  await postRequest(`/api/playlists/${playlistId}/remove/${trackId}`, {});
};

export const renamePlaylist = async (playlistId: number, newName: string) => {
  await postRequest(`/api/playlists/${playlistId}`, { name: newName });
};

export const likeTrack = async (trackId: number) => {
  await postRequest(`/api/songs/${trackId}/like`, {});
};

export const unlikeTrack = async (trackId: number) => {
  await postRequest(`/api/songs/${trackId}/unlike`, {});
};

export const getPlaylistById = async (playlistId: number): Promise<Playlist> => {
  return getRequest(`/api/playlists/${playlistId}`);
};
