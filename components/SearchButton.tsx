import { Search } from "lucide-react";

interface SearchButtonProps {
  onClick: () => void;
}

export default function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-16 right-4 w-12 h-12 rounded-full bg-primary shadow-lg flex items-center justify-center hover:bg-primaryDark transition-all duration-200 hover:scale-110 z-50"
    >
      <Search size={24} className="text-white" />
    </button>
  );
}
