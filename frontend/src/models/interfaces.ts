export interface Song {
  id: number;
  name: string;
  filename: string;
  path: string;
  image: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
  album: {
    id: number;
    name: string;
    image: string;
    artist: string;
  };
  artist: {
    id: number;
    name: string;
  };
  added: string;
  likes: Array<{ username: string }>;
}

export interface Album {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  songs: Song[];
  artist: Artist[];
  likes: Like[];
}

export interface Artist {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  albums: string[];
  likes: Like[];
}

export interface Playlist {
  id: number;
  name: string;
  createdAt: string;
  user: string;
  songs: string[];
  image: string;
}

export interface Like {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  playlists: Playlist[];
  artistLikes: ArtistLike[];
  albumLikes: AlbumLike[]; // Используем AlbumLike вместо string[]
  songLikes: string[];
}

export interface ArtistLike {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  albums: string[];
  likes: Like[];
}

export interface AlbumLike { // Определение интерфейса AlbumLike
  id: number;
  name: string;
  image: string;
  createdAt: string;
  albums: string[]; // Поля могут отличаться в зависимости от вашей модели
  likes: Like[]; // Поля могут отличаться в зависимости от вашей модели
}

export interface PlayerState {
  currentTrackIndex: number;
  trackList: Song[];
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isShuffling: boolean;
  isRepeating: boolean;
  progress: number;
  audioSource?: AudioBufferSourceNode | null;
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  playlists: Playlist[];
  artistLikes: ArtistLike[];
  albumLikes: AlbumLike[]; // Используем AlbumLike вместо string[]
  songLikes: string[];
}

// Интерфейс для данных, возвращаемых API
export interface LikedData {
  artistLikes: ArtistLike[];
  albumLikes: AlbumLike[];
  songLikes: Song[];
}