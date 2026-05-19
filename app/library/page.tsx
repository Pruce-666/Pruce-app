"use client";
import { Heart, Download, Clock, Plus, Share2, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { mockPlaylists, recommendedPlaylists } from "@/data/mock";
import { usePlayerStore } from "@/store/playerStore";
import BottomNav from "@/components/BottomNav";
import PlayerBar from "@/components/PlayerBar";

export default function LibraryPage() {
  const router = useRouter();
  const { currentSong, isPlaying, togglePlay, playNext, playPrev } = usePlayerStore();

  const stats = [
    { icon: Heart, label: "我喜欢", count: 128, color: "text-red-500" },
    { icon: Download, label: "已下载", count: 85, color: "text-blue-500" },
    { icon: Clock, label: "最近", count: 50, color: "text-green-500" },
  ];

  const handlePlayBarClick = () => {
    router.push("/play");
  };

  const handlePlaylistClick = () => {
    console.log("Playlist clicked");
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-900 font-bold text-lg">我的音乐</h1>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <Plus size={20} className="text-gray-600" />
          </button>
        </div>
      </header>

      <main className="px-4 py-6 space-y-8">
        <section className="grid grid-cols-3 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <button
                key={stat.label}
                className="flex flex-col items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200"
              >
                <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <span className="text-gray-900 font-bold text-xl">{stat.count}</span>
                <span className="text-gray-500 text-xs">{stat.label}</span>
              </button>
            );
          })}
        </section>

        <section>
          <div className="flex border-b border-gray-100 mb-4">
            <button className="pb-3 px-1 border-b-2 border-primary text-primary font-medium">
              我的歌单
            </button>
            <button className="pb-3 px-4 text-gray-400 hover:text-gray-600 transition-colors">
              与我共享
            </button>
          </div>

          <div className="space-y-3">
            <button className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Plus size={32} className="text-primary" />
              </div>
              <div>
                <h3 className="text-gray-900 font-medium">创建新歌单</h3>
                <p className="text-gray-400 text-sm">记录你的音乐心情</p>
              </div>
            </button>

            {mockPlaylists.map((playlist) => (
              <button
                key={playlist.id}
                onClick={handlePlaylistClick}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={playlist.cover}
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 font-medium truncate">{playlist.name}</h3>
                  <p className="text-gray-400 text-sm">{playlist.songCount} 首歌曲</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Share2 size={18} />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900 font-bold text-lg">为你推荐</h2>
            <button className="text-primary text-sm font-medium hover:underline">查看更多</button>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
            {recommendedPlaylists.map((playlist) => (
              <button
                key={playlist.id}
                onClick={handlePlaylistClick}
                className="flex-shrink-0 w-32"
              >
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3">
                  <img
                    src={playlist.cover}
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-gray-900 text-sm font-medium truncate">{playlist.name}</h3>
                <p className="text-gray-400 text-xs">{playlist.creator}</p>
              </button>
            ))}
          </div>
        </section>
      </main>

      <PlayerBar
        song={currentSong}
        isPlaying={isPlaying}
        onPlayPause={togglePlay}
        onNext={playNext}
        onPrev={playPrev}
        onClick={handlePlayBarClick}
      />

      <BottomNav activeTab="library" onTabChange={(tab) => router.push(`/${tab}`)} />
    </div>
  );
}
