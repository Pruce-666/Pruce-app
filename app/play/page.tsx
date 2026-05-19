"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, Heart, Share2, MoreHorizontal, Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePlayerStore } from "@/store/playerStore";

export default function PlayPage() {
  const router = useRouter();
  const { currentSong, isPlaying, togglePlay, playNext, playPrev, toggleShuffle, toggleRepeat, isShuffle, isRepeat, setCurrentTime, currentTime } = usePlayerStore();
  const [progress, setProgress] = useState(0);
  const [currentLyric, setCurrentLyric] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && currentSong) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            playNext();
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong?.id, playNext]);

  useEffect(() => {
    const lyricIndex = Math.floor((progress / 100) * (currentSong?.lyrics.length || 1));
    setCurrentLyric(Math.min(lyricIndex, (currentSong?.lyrics.length || 1) - 1));
  }, [progress, currentSong?.lyrics]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleBack = () => {
    router.back();
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    setCurrentTime((newProgress / 100) * 299);
  };

  if (!currentSong) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <p className="text-gray-400">暂无播放歌曲</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      <header className="flex items-center justify-between p-4">
        <button
          onClick={handleBack}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <Share2 size={20} className="text-white" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <MoreHorizontal size={20} className="text-white" />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden mb-8 shadow-2xl">
          <img
            src={currentSong.cover}
            alt={currentSong.title}
            className={`w-full h-full object-cover transition-transform duration-300 ${isPlaying ? "scale-105" : ""}`}
          />
          {isPlaying && (
            <div className="absolute inset-0 bg-black/10" />
          )}
          <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
            <span className="text-white text-xs font-medium">Hi-Res</span>
          </div>
        </div>

        <div className="text-center mb-8 w-full">
          <h1 className="text-white font-bold text-xl mb-1">
            {currentSong.title}
          </h1>
          <p className="text-gray-400 text-sm">
            {currentSong.artist} - {currentSong.album}
          </p>
        </div>

        <div className="w-full max-w-sm mb-8">
          <div className="flex flex-col items-center justify-center h-32">
            {currentSong.lyrics.map((lyric, index) => (
              <p
                key={index}
                className={`text-center transition-all duration-300 ${
                  index === currentLyric
                    ? "text-primary text-lg font-medium scale-105"
                    : "text-gray-500 text-sm"
                }`}
              >
                {lyric}
              </p>
            ))}
          </div>
        </div>

        <div className="w-full max-w-sm">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>{formatTime((currentTime / 299) * 299)}</span>
            <span>{currentSong.duration}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-1 bg-dark-700 rounded-full appearance-none cursor-pointer slider"
            />
            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full pointer-events-none" style={{ left: `${progress}%`, transform: "translate(-50%, -50%)" }} />
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={toggleShuffle}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isShuffle ? "bg-primary text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            <Shuffle size={20} />
          </button>
          <button
            onClick={playPrev}
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <SkipBack size={24} className="text-white" />
          </button>
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-primary flex items-center justify-center hover:bg-primaryDark transition-all duration-200 shadow-lg shadow-primary/30"
          >
            {isPlaying ? (
              <Pause size={28} className="text-white" />
            ) : (
              <Play size={28} className="text-white ml-1" />
            )}
          </button>
          <button
            onClick={playNext}
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <SkipForward size={24} className="text-white" />
          </button>
          <button
            onClick={toggleRepeat}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isRepeat ? "bg-primary text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            <Repeat size={20} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <Heart size={20} />
            <span className="text-sm">收藏</span>
          </button>
          <div className="flex items-center gap-2">
            <Volume2 size={20} className="text-gray-400" />
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="80"
              className="w-20 h-1 bg-dark-700 rounded-full appearance-none cursor-pointer"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
