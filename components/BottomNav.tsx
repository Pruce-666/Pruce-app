import { Home, Music, Library, User } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home", icon: Home, label: "首页" },
    { id: "explore", icon: Music, label: "曲库" },
    { id: "library", icon: Library, label: "音乐库" },
    { id: "profile", icon: User, label: "我的" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dark-800 border-t border-dark-700 z-50 px-4 pb-safe">
      <div className="flex items-center justify-around py-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 py-1 transition-all duration-200 ${
                isActive ? "text-primary" : "text-gray-400"
              }`}
            >
              <Icon
                size={24}
                className={`transition-transform duration-200 ${
                  isActive ? "scale-110" : ""
                }`}
              />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
