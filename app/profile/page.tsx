"use client";
import { Heart, Settings, HelpCircle, LogOut, User, Music, Calendar, MapPin, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { mockPlaylists } from "@/data/mock";
import BottomNav from "@/components/BottomNav";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const menuItems = [
    { icon: Heart, label: "我的收藏", value: "128 首" },
    { icon: Music, label: "我的下载", value: "85 首" },
    { icon: Calendar, label: "听歌记录", value: "1.2万首" },
    { icon: MapPin, label: "附近的人", value: "" },
    { icon: Settings, label: "设置", value: "" },
    { icon: HelpCircle, label: "帮助与反馈", value: "" },
  ];

  const handleLogout = () => {
    logout();
    router.push("/welcome");
  };

  const handleMenuItemClick = (label: string) => {
    console.log("Menu clicked:", label);
  };

  return (
    <div className="min-h-screen bg-dark-900 pb-24">
      <main className="px-4 py-6 space-y-6">
        <section className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-dark-800">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/30">
              <img
                src={user?.avatar || "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=user%20avatar%20portrait%20minimal%20professional&image_size=square"}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-500 border-2 border-dark-900 flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          </div>
          <h2 className="text-white font-bold text-xl mb-1">{user?.name || "用户"}</h2>
          <p className="text-gray-400 text-sm mb-4">PPMusic VIP会员</p>
          <div className="flex gap-8">
            <div className="text-center">
              <span className="text-white font-bold text-lg">128</span>
              <p className="text-gray-400 text-xs">收藏</p>
            </div>
            <div className="w-px bg-dark-600" />
            <div className="text-center">
              <span className="text-white font-bold text-lg">85</span>
              <p className="text-gray-400 text-xs">下载</p>
            </div>
            <div className="w-px bg-dark-600" />
            <div className="text-center">
              <span className="text-white font-bold text-lg">520</span>
              <p className="text-gray-400 text-xs">粉丝</p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold text-lg">我的歌单</h2>
            <button className="text-primary text-sm font-medium hover:underline">查看全部</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {mockPlaylists.slice(0, 4).map((playlist) => (
              <button
                key={playlist.id}
                className="flex flex-col items-center p-3 rounded-xl bg-dark-800 hover:bg-dark-700 transition-all duration-200"
              >
                <div className="w-full aspect-square rounded-lg overflow-hidden mb-2">
                  <img
                    src={playlist.cover}
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-white text-sm font-medium truncate w-full">{playlist.name}</h3>
                <p className="text-gray-400 text-xs">{playlist.songCount} 首</p>
              </button>
            ))}
          </div>
        </section>

        <section className="bg-dark-800 rounded-xl overflow-hidden">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => handleMenuItemClick(item.label)}
                className="w-full flex items-center gap-4 p-4 hover:bg-dark-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center">
                  <Icon size={20} className="text-gray-400" />
                </div>
                <span className="flex-1 text-white text-sm font-medium">{item.label}</span>
                {item.value && (
                  <span className="text-gray-400 text-sm">{item.value}</span>
                )}
                <ChevronRight size={20} className="text-gray-500" />
              </button>
            );
          })}
        </section>

        <section className="bg-dark-800 rounded-xl overflow-hidden">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 hover:bg-dark-700 transition-colors text-red-400"
          >
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <LogOut size={20} className="text-red-400" />
            </div>
            <span className="flex-1 text-sm font-medium">退出登录</span>
          </button>
        </section>

        <p className="text-center text-gray-500 text-xs">
          PPMusic v2.0.0 | © 2024 PPMUSIC ENTERTAINMENT
        </p>
      </main>

      <BottomNav activeTab="profile" onTabChange={(tab) => router.push(`/${tab}`)} />
    </div>
  );
}
