"use client";
import { Search, Music, Radio, Disc3, Mic, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import { mockSongs } from "@/data/mock";
import { usePlayerStore } from "@/store/playerStore";
import BottomNav from "@/components/BottomNav";
import PlayerBar from "@/components/PlayerBar";

export default function ExplorePage() {
  const router = useRouter();
  const { currentSong, isPlaying, togglePlay, playNext, playPrev, playSong } = usePlayerStore();

  const categories = [
    { id: "1", name: "推荐", icon: Music, active: true },
    { id: "2", name: "电台", icon: Radio },
    { id: "3", name: "专辑", icon: Disc3 },
    { id: "4", name: "播客", icon: Mic },
  ];

  const handlePlayBarClick = () => {
    router.push("/play");
  };

  const handleSongClick = (song: typeof mockSongs[0]) => {
    playSong(song);
    router.push("/play");
  };

  return (
    <div className="min-h-screen bg-dark-900 pb-40">
      <header className="sticky top-0 z-30 bg-dark-900/95 backdrop-blur-sm border-b border-dark-700 px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索歌曲、歌手、专辑"
              className="w-full pl-10 pr-4 py-3 bg-dark-800 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center hover:bg-dark-600 transition-colors">
            <Filter size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  category.active
                    ? "bg-primary text-white"
                    : "bg-dark-700 text-gray-300 hover:bg-dark-600"
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>
      </header>

      <main className="px-4 py-6 space-y-8">
        <section>
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=music%20festival%20concert%20stage%20lights%20crowd&image_size=landscape_16_9"
              alt="Banner"
              className="w-full h-40 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white font-bold text-xl mb-2">夏日音乐节</h3>
              <p className="text-gray-300 text-sm">一起来感受音乐的力量</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-white font-bold text-lg mb-4">热门歌曲</h2>
          <div className="space-y-3">
            {mockSongs.map((song, index) => (
              <button
                key={song.id}
                onClick={() => handleSongClick(song)}
                className="flex items-center gap-4 p-3 rounded-xl bg-dark-800/50 hover:bg-dark-800 transition-all duration-200"
              >
                <span className="text-gray-400 text-sm font-medium w-6">{index + 1}</span>
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-sm font-medium truncate">{song.title}</h3>
                  <p className="text-gray-400 text-xs truncate">{song.artist}</p>
                </div>
                <span className="text-gray-500 text-xs">{song.duration}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-white font-bold text-lg mb-4">新歌速递</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
            {mockSongs.slice(0, 5).map((song) => (
              <button
                key={song.id}
                onClick={() => handleSongClick(song)}
                className="flex-shrink-0 w-28"
              >
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2">
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary rounded text-xs text-white">
                    新歌
                  </div>
                </div>
                <h3 className="text-white text-xs font-medium truncate">{song.title}</h3>
                <p className="text-gray-400 text-xs truncate">{song.artist}</p>
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

      <BottomNav activeTab="explore" onTabChange={(tab) => router.push(`/${tab}`)} />
    </div>
  );
}
