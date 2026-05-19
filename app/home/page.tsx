"use client";
import { Music, Headphones, Trophy, Radio, Search, Play, Share2, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { categories, mockPlaylists, recommendedPlaylists, hotChart } from "@/data/mock";
import { usePlayerStore } from "@/store/playerStore";
import BottomNav from "@/components/BottomNav";
import PlayerBar from "@/components/PlayerBar";
import SearchButton from "@/components/SearchButton";

export default function HomePage() {
  const router = useRouter();
  const { currentSong, isPlaying, togglePlay, playNext, playPrev, playSong } = usePlayerStore();

  const handleCategoryClick = (categoryId: string) => {
    console.log("Category clicked:", categoryId);
  };

  const handlePlaylistClick = () => {
    console.log("Playlist clicked");
  };

  const handleSongClick = (song: typeof hotChart[0]) => {
    playSong(song);
    router.push("/play");
  };

  const handlePlayBarClick = () => {
    router.push("/play");
  };

  const handleSearch = () => {
    console.log("Search clicked");
  };

  const iconMap: Record<string, typeof Music> = {
    Music,
    Headphones,
    Trophy,
    Radio,
  };

  return (
    <div className="min-h-screen bg-dark-900 pb-40">
      <header className="sticky top-0 z-30 bg-dark-900/95 backdrop-blur-sm border-b border-dark-700 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Music size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">PPMusic</h1>
              <p className="text-gray-400 text-xs">发现音乐</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center hover:bg-dark-600 transition-colors">
              <Search size={20} className="text-gray-300" />
            </button>
            <button className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=user%20avatar%20portrait%20minimal%20professional&image_size=square"
                alt="User"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-8">
        <section className="grid grid-cols-4 gap-3">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Music;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-dark-800 hover:bg-dark-700 transition-all duration-200 hover:scale-105"
              >
                <div className={`w-14 h-14 rounded-full ${category.color} flex items-center justify-center`}>
                  <Icon size={28} className="text-white" />
                </div>
                <span className="text-gray-300 text-xs font-medium">{category.name}</span>
              </button>
            );
          })}
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold text-lg">为你推荐</h2>
            <button className="text-primary text-sm font-medium hover:underline">查看全部</button>
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
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                      <Play size={24} className="text-white ml-1" />
                    </div>
                  </div>
                </div>
                <h3 className="text-white text-sm font-medium truncate">{playlist.name}</h3>
                <p className="text-gray-400 text-xs">{playlist.creator}</p>
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold text-lg">热门榜单</h2>
            <span className="text-primary text-xs font-medium">实时更新</span>
          </div>
          <div className="space-y-3">
            {hotChart.map((song, index) => (
              <button
                key={song.id}
                onClick={() => handleSongClick(song)}
                className="flex items-center gap-4 p-3 rounded-xl bg-dark-800/50 hover:bg-dark-800 transition-all duration-200"
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  index === 0 ? "bg-yellow-500 text-black" :
                  index === 1 ? "bg-gray-400 text-black" :
                  index === 2 ? "bg-amber-600 text-white" :
                  "bg-dark-600 text-gray-400"
                }`}>
                  {index + 1}
                </span>
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-sm font-medium truncate">{song.title}</h3>
                  <p className="text-gray-400 text-xs truncate">{song.artist}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-gray-400 hover:text-primary transition-colors">
                    <Share2 size={18} />
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=music%20notes%20night%20healing%20relaxing%20abstract%20blue%20purple&image_size=landscape_16_9"
              alt="Banner"
              className="w-full h-32 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20 flex flex-col justify-end p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-primary/80 rounded-full text-xs text-white">新歌速递</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-1">深夜治愈系：那些温柔的声线</h3>
              <p className="text-gray-300 text-sm">在这个夜晚，让音乐拥抱你的灵魂</p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold text-lg">我的收藏</h2>
            <button className="text-primary text-sm font-medium hover:underline">查看全部</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {mockPlaylists.slice(0, 2).map((playlist) => (
              <button
                key={playlist.id}
                onClick={handlePlaylistClick}
                className="flex items-center gap-3 p-3 rounded-xl bg-dark-800 hover:bg-dark-700 transition-all duration-200"
              >
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-dark-800">
                    <img src={playlist.cover} alt={playlist.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-dark-800">
                    <img src={playlist.cover} alt={playlist.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-sm font-medium truncate">{playlist.name}</h3>
                  <p className="text-gray-400 text-xs">共 {playlist.songCount} 首歌曲</p>
                </div>
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

      <SearchButton onClick={handleSearch} />

      <BottomNav activeTab="home" onTabChange={(tab) => router.push(`/${tab}`)} />
    </div>
  );
}
