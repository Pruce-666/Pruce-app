import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PPMusic - 发现音乐的力量",
  description: "百万高品质曲库，与好友共享每一个心动旋律",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="bg-dark-900 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
