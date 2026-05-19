import { useState, useCallback } from "react";
import { mockSongs, type Song } from "@/data/mock";

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  isShuffle: boolean;
  isRepeat: boolean;
  playlist: Song[];
  currentIndex: number;
}

const initialState: PlayerState = {
  currentSong: mockSongs[0],
  isPlaying: false,
  currentTime: 0,
  volume: 80,
  isShuffle: false,
  isRepeat: false,
  playlist: mockSongs,
  currentIndex: 0,
};

export function usePlayerStore() {
  const [state, setState] = useState<PlayerState>(initialState);

  const play = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: true }));
  }, []);

  const pause = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: false }));
  }, []);

  const togglePlay = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const playNext = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.isShuffle
        ? Math.floor(Math.random() * prev.playlist.length)
        : (prev.currentIndex + 1) % prev.playlist.length;
      return {
        ...prev,
        currentIndex: nextIndex,
        currentSong: prev.playlist[nextIndex],
        currentTime: 0,
      };
    });
  }, []);

  const playPrev = useCallback(() => {
    setState((prev) => {
      const prevIndex = prev.isShuffle
        ? Math.floor(Math.random() * prev.playlist.length)
        : (prev.currentIndex - 1 + prev.playlist.length) % prev.playlist.length;
      return {
        ...prev,
        currentIndex: prevIndex,
        currentSong: prev.playlist[prevIndex],
        currentTime: 0,
      };
    });
  }, []);

  const playSong = useCallback((song: Song, index?: number) => {
    setState((prev) => ({
      ...prev,
      currentSong: song,
      currentIndex: index ?? prev.playlist.findIndex((s) => s.id === song.id),
      currentTime: 0,
      isPlaying: true,
    }));
  }, []);

  const setCurrentTime = useCallback((time: number) => {
    setState((prev) => ({ ...prev, currentTime: time }));
  }, []);

  const toggleShuffle = useCallback(() => {
    setState((prev) => ({ ...prev, isShuffle: !prev.isShuffle }));
  }, []);

  const toggleRepeat = useCallback(() => {
    setState((prev) => ({ ...prev, isRepeat: !prev.isRepeat }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    setState((prev) => ({ ...prev, volume }));
  }, []);

  return {
    ...state,
    play,
    pause,
    togglePlay,
    playNext,
    playPrev,
    playSong,
    setCurrentTime,
    toggleShuffle,
    toggleRepeat,
    setVolume,
  };
}

export type PlayerStore = ReturnType<typeof usePlayerStore>;
