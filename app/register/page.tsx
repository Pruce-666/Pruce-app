"use client";
import { useState } from "react";
import { Music, Phone, Lock, Eye, EyeOff, ArrowLeft, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function RegisterPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuthStore();

  const handleRegister = async () => {
    if (!phone || !password || !confirmPassword || !name) return;
    if (password !== confirmPassword) return;
    if (!agreed) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const success = register(phone, password, name);
    if (success) {
      router.push("/home");
    }
    
    setIsLoading(false);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center gap-4 p-4 border-b border-gray-100">
        <button
          onClick={handleBack}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">注册</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center">
            <Music size={36} className="text-white" />
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-8">
          发现音乐的力量 · 开启视听盛宴
        </p>

        <div className="w-full max-w-sm space-y-4">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <User size={18} />
            </div>
            <input
              type="text"
              placeholder="请输入昵称"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 placeholder-gray-400"
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Phone size={18} />
            </div>
            <input
              type="tel"
              placeholder="请输入手机号"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 placeholder-gray-400"
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={18} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="请设置登录密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 placeholder-gray-400"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={18} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="请确认密码"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>

        <button
          onClick={handleRegister}
          disabled={isLoading || !phone || !password || !confirmPassword || !name || password !== confirmPassword || !agreed}
          className="w-full max-w-sm py-3.5 bg-primary rounded-full text-white font-semibold mt-6 hover:bg-primaryDark transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "注册中..." : "立即注册"}
        </button>

        <div className="w-full max-w-sm mt-4 flex items-start gap-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <p className="text-xs text-gray-500">
            我已阅读并同意
            <span className="text-primary hover:underline">《用户协议》</span>、
            <span className="text-primary hover:underline">《隐私政策》</span> 以及
            <span className="text-primary hover:underline">《儿童隐私保护声明》</span>
          </p>
        </div>

        <button
          onClick={handleBack}
          className="mt-6 text-gray-500 text-sm hover:text-gray-700 hover:underline"
        >
          已有账号？立即登录
        </button>
      </main>
    </div>
  );
}
