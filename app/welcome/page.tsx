"use client";
import { Music } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/login");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 via-dark-800 to-gray-50 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-purple-500 blur-3xl" />
        <div className="absolute bottom-40 right-10 w-40 h-40 rounded-full bg-blue-500 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-green-500 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center animate-fade-in">
        <div className="relative mb-8">
          <div className="w-28 h-28 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center shadow-2xl">
            <Music size={56} className="text-primary" />
          </div>
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-slow" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          发现音乐的无限可能
        </h1>
        
        <p className="text-gray-400 text-sm text-center mb-8 max-w-xs">
          百万高品质曲库，与好友共享每一个心动旋律，实时歌词互动体验。
        </p>

        <div className="flex gap-3 mb-12">
          <span className="px-4 py-2 bg-gray-100/10 backdrop-blur-sm rounded-full text-xs text-gray-300">
            高保真音质
          </span>
          <span className="px-4 py-2 bg-gray-100/10 backdrop-blur-sm rounded-full text-xs text-gray-300">
            社交分享
          </span>
        </div>

        <button
          onClick={handleStart}
          className="w-full max-w-xs py-4 bg-primary rounded-full text-white font-semibold text-lg hover:bg-primaryDark transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 mb-6"
        >
          开启音乐之旅 →
        </button>

        <button
          onClick={handleLogin}
          className="text-primary text-sm font-medium hover:underline"
        >
          已有账号？立即登录
        </button>

        <div className="mt-12 flex items-center gap-2 text-xs text-gray-500">
          <div className="w-4 h-4 rounded-full border border-gray-500 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          </div>
          <span>PPMusic 安全加密保护</span>
        </div>

        <p className="mt-4 text-xs text-gray-600">
          © 2024 PPMUSIC ENTERTAINMENT. ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  );
}
