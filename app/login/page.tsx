"use client";
import { useState } from "react";
import { Music, Phone, Lock, Eye, EyeOff, ArrowLeft, MessageCircle, Apple, CircleUser } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const [loginType, setLoginType] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuthStore();

  const handleLogin = async () => {
    if (!phone || !password) return;
    if (!agreed) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const success = login(phone, password);
    if (success) {
      router.push("/home");
    }
    
    setIsLoading(false);
  };

  const handleBack = () => {
    router.push("/welcome");
  };

  const handleRegister = () => {
    router.push("/register");
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
        <h1 className="text-lg font-semibold text-gray-900">登录</h1>
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

        <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
          <button
            onClick={() => setLoginType("phone")}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
              loginType === "phone"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            手机号登录
          </button>
          <button
            onClick={() => setLoginType("email")}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
              loginType === "email"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            邮箱登录
          </button>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              {loginType === "phone" ? (
                <Phone size={18} />
              ) : (
                <MessageCircle size={18} />
              )}
            </div>
            <input
              type={loginType === "phone" ? "tel" : "email"}
              placeholder={loginType === "phone" ? "请输入手机号" : "请输入邮箱"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-12 pr-24 py-3.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 placeholder-gray-400"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary text-sm font-medium hover:underline">
              获取验证码
            </button>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={18} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="请输入登录密码"
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
        </div>

        <div className="w-full max-w-sm flex justify-between items-center mt-2 mb-6">
          <button className="text-gray-500 text-xs hover:text-gray-700 hover:underline">
            忘记密码?
          </button>
          <button
            onClick={handleRegister}
            className="text-primary text-xs font-medium hover:underline"
          >
            立即注册 &gt;
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={isLoading || !phone || !password || !agreed}
          className="w-full max-w-sm py-3.5 bg-primary rounded-full text-white font-semibold hover:bg-primaryDark transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "登录中..." : "立即登录"}
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

        <div className="w-full max-w-sm mt-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">其他方式登录</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="flex justify-center gap-8">
            <button className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors">
                <MessageCircle size={24} className="text-white" />
              </div>
              <span className="text-xs text-gray-500">微信</span>
            </button>
            <button className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <CircleUser size={24} className="text-white" />
              </div>
              <span className="text-xs text-gray-500">QQ</span>
            </button>
            <button className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition-colors">
                <Apple size={24} className="text-white" />
              </div>
              <span className="text-xs text-gray-500">Apple</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
