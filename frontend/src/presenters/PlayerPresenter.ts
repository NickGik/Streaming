// PlayerPresenter.ts

import { getSong, getSongs } from '../api/songs';
import { Song } from '../models/interfaces';

export class PlayerPresenter {
  private currentSongId: string | null = null;
  private currentSong: Song | null = null;

  private audioContext: AudioContext | null = null;
  private trackSource: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;
  private volume: number = 1;
  private isShuffling: boolean = false;
  private isRepeating: boolean = false;
  private pauseTime: number = 0;
  private pauseStartTime: number | null = null;
  private allSongs: Song[] = [];
  private currentTimeUpdateInterval: number | null = null;

  onSongChange: (() => void) | null = null;
  onPlayPauseChange: (() => void) | null = null;
  onVolumeChange: (() => void) | null = null;
  onTimeUpdate: (() => void) | null = null;

  constructor() {
    this.fetchFirstSong();
    this.fetchAllSongs();
  }

  async play() {
    if (this.currentSongId) {
      try {
        const songData = await getSong(this.currentSongId);
        songData.path = `http://localhost:3000${songData.path}`;
        this.currentSong = songData;

        if (!this.audioContext) {
          this.audioContext = new AudioContext();
        }

        const audioBuffer = await fetch(songData.path)
          .then((res) => res.arrayBuffer())
          .then((arrayBuffer) => this.audioContext!.decodeAudioData(arrayBuffer));

        this.trackSource = this.audioContext.createBufferSource();
        this.trackSource.buffer = audioBuffer;

        this.gainNode = this.audioContext.createGain();
        this.gainNode.gain.value = this.volume;

        this.trackSource.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);

        this.trackSource.onended = () => {
          this.isPlaying = false;
          this.notifyPlayPauseChange();

          if (!this.pauseTime) {
            if (this.isRepeating) {
              this.play();
            } else if (this.isShuffling) {
              this.playRandomTrack();
            } else {
              this.nextTrack();
            }
          }
        };

        this.pauseStartTime = null;

        if (this.pauseTime > 0) {
          this.trackSource.start(0, this.pauseTime);
          this.pauseTime = 0;
        } else {
          this.trackSource.start();
        }

        this.isPlaying = true;
        this.notifySongChange();
        this.notifyPlayPauseChange();
        this.startUpdatingCurrentTime();
      } catch (error) {
        // Обработка ошибок (без console.log)
      }
    }
  }

  pause() {
    if (this.trackSource && this.isPlaying) {
      this.pauseTime = this.getCurrentTime();
      this.pauseStartTime = this.audioContext!.currentTime;
      this.trackSource.stop();
      this.isPlaying = false;
      this.notifyPlayPauseChange();
      this.stopUpdatingCurrentTime();
    }
  }

  private shuffleSongs() {
    for (let i = this.allSongs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.allSongs[i], this.allSongs[j]] = [this.allSongs[j], this.allSongs[i]];
    }
  }

  async playRandomTrack() {
    if (this.isShuffling) {
      if (!this.isShuffling) {
        this.shuffleSongs();
        this.isShuffling = true;
      }

      const randomIndex = Math.floor(Math.random() * this.allSongs.length);
      const nextSongId = this.allSongs[randomIndex].id;

      this.stopPlayback();

      this.currentSongId = nextSongId.toString();

      this.currentSong = await getSong(this.currentSongId);

      this.play();

      this.notifySongChange();
    } else {
      this.nextTrack();
    }
  }

  async nextTrack() {
    if (this.currentSongId) {
      try {
        let nextSongIndex: number;

        if (this.isShuffling) {
          nextSongIndex = Math.floor(Math.random() * this.allSongs.length);
        } else {
          const currentSongIndex = this.allSongs.findIndex(
            (song) => song.id === parseInt(this.currentSongId!)
          );
          nextSongIndex = (currentSongIndex + 1) % this.allSongs.length;
        }

        const nextSongId = this.allSongs[nextSongIndex].id;

        this.stopPlayback();

        const nextSongData = await getSong(nextSongId.toString());

        this.currentSongId = nextSongData.id.toString();

        this.currentSong = nextSongData;

        this.play();

        this.notifySongChange();
      } catch (error) {
        // Обработка ошибок (без console.log)
      }
    }
  }

  async prevTrack() {
    if (this.currentSongId) {
      try {
        let prevSongIndex: number;

        if (this.isShuffling) {
          prevSongIndex = Math.floor(Math.random() * this.allSongs.length);
        } else {
          const currentSongIndex = this.allSongs.findIndex(
            (song) => song.id === parseInt(this.currentSongId!)
          );
          prevSongIndex =
            (currentSongIndex - 1 + this.allSongs.length) % this.allSongs.length;
        }

        const prevSongId = this.allSongs[prevSongIndex].id;

        this.stopPlayback();

        const prevSongData = await getSong(prevSongId.toString());

        this.currentSongId = prevSongData.id.toString();

        this.currentSong = prevSongData;

        this.play();

        this.notifySongChange();
      } catch (error) {
        // Обработка ошибок (без console.log)
      }
    }
  }

  stopPlayback() {
    if (this.trackSource) {
      this.trackSource.stop();
      this.trackSource.disconnect();
      this.trackSource = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    this.isPlaying = false;
    this.pauseTime = 0;
    this.notifyPlayPauseChange();
  }

  async seek(time: number) {
    if (this.audioContext && this.currentSong) {
      if (this.trackSource) {
        this.trackSource.stop();
        this.trackSource.disconnect();
      }

      this.trackSource = this.audioContext.createBufferSource();

      try {
        const arrayBuffer = await fetch(this.currentSong.path).then((res) =>
          res.arrayBuffer()
        );
        const audioBuffer = await this.audioContext.decodeAudioData(
          arrayBuffer
        );
        this.trackSource.buffer = audioBuffer;
      } catch (error) {
        // Обработка ошибок (без console.log)
        return;
      }

      this.trackSource.connect(this.gainNode!);
      this.gainNode!.connect(this.audioContext.destination);

      this.trackSource.onended = () => {
        this.isPlaying = false;
        this.notifyPlayPauseChange();

        if (!this.pauseTime) {
          if (this.isRepeating) {
            this.play();
          } else {
            this.nextTrack();
          }
        }
      };

      this.trackSource.start(0, time);

      this.isPlaying = true;
      this.pauseTime = 0;
      this.pauseStartTime = this.audioContext.currentTime - time;

      this.notifyPlayPauseChange();
      this.startUpdatingCurrentTime();
    }
  }

  setVolume(volume: number) {
    this.volume = volume;
    if (this.gainNode) {
      this.gainNode.gain.value = volume;
      this.notifyVolumeChange();
    }
  }

  async fetchFirstSong() {
    try {
      const firstSongId = '1';
      const songData = await getSong(firstSongId);
      this.currentSong = songData;
      this.currentSongId = firstSongId;

      this.notifySongChange();
    } catch (error) {
      // Обработка ошибок (без console.log)
    }
  }

  getCurrentSong(): Song | null {
    return this.currentSong;
  }

  getCurrentSongId(): string | null {
    return this.currentSongId;
  }

  setCurrentSongId(songId: string) {
    this.currentSongId = songId;
    this.notifySongChange();
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  getVolume(): number {
    return this.volume;
  }

  toggleShuffle() {
    this.isShuffling = !this.isShuffling;
  }

  toggleRepeat() {
    this.isRepeating = !this.isRepeating;
  }

  getIsShuffling(): boolean {
    return this.isShuffling;
  }

  getIsRepeating(): boolean {
    return this.isRepeating;
  }

  getCurrentTime(): number {
    if (this.audioContext && this.trackSource) {
      if (this.isPlaying) {
        return (
          this.audioContext.currentTime - (this.pauseStartTime || 0) + this.pauseTime
        );
      } else {
        return this.pauseTime;
      }
    }
    return 0;
  }

  getDuration(): number {
    return this.currentSong ? this.currentSong.duration / 1000 : 0; // Делим на 1000, чтобы получить секунды
  }

  private notifySongChange() {
    if (this.onSongChange) {
      this.onSongChange();
    }
  }

  private notifyPlayPauseChange() {
    if (this.onPlayPauseChange) {
      this.onPlayPauseChange();
    }
  }

  private notifyVolumeChange() {
    if (this.onVolumeChange) {
      this.onVolumeChange();
    }
  }

  private startUpdatingCurrentTime() {
    if (this.currentTimeUpdateInterval === null) {
      this.currentTimeUpdateInterval = window.setInterval(() => {
        this.notifyTimeUpdate();
      }, 100); // Обновляем чаще для более плавного отображения
    }
  }

  private stopUpdatingCurrentTime() {
    if (this.currentTimeUpdateInterval !== null) {
      window.clearInterval(this.currentTimeUpdateInterval);
      this.currentTimeUpdateInterval = null;
    }
  }

  private notifyTimeUpdate() {
    if (this.onTimeUpdate) {
      this.onTimeUpdate();
    }
  }

  resetPauseTime() {
    this.pauseTime = 0;
  }

  private async fetchAllSongs() {
    try {
      this.allSongs = await getSongs();
    } catch (error) {
      console.error('PlayerPresenter.fetchAllSongs() - ошибка:', error);
    }
  }
}