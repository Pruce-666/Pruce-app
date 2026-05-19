import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import type { Song } from "@/data/mock";

interface PlayerBarProps {
  song: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onClick: () => void;
}

export default function PlayerBar({
  song,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  onClick,
}: PlayerBarProps) {
  if (!song) return null;

  return (
    <div className="fixed bottom-16 left-0 right-0 bg-dark-800 border-t border-dark-700 z-40 px-4 py-3">
      <div className="max-w-md mx-auto">
        <button
          onClick={onClick}
          className="flex items-center gap-3 w-full"
        >
          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={song.cover}
              alt={song.title}
              className="w-full h-full object-cover"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="flex gap-0.5">
                  <div className="w-0.5 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
                  <div className="w-0.5 h-6 bg-primary rounded-full animate-pulse" style={{ animationDelay: "100ms" }} />
                  <div className="w-0.5 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: "200ms" }} />
                  <div className="w-0.5 h-5 bg-primary rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">
              {song.title}
            </p>
            <p className="text-gray-400 text-xs truncate">{song.artist}</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <SkipBack size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPlayPause();
              }}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primaryDark transition-colors"
            >
              {isPlaying ? (
                <Pause size={20} className="text-white" />
              ) : (
                <Play size={20} className="text-white ml-0.5" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <SkipForward size={20} />
            </button>
          </div>
        </button>
      </div>
    </div>
  );
}
