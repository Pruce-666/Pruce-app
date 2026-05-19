export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: string;
  lyrics: string[];
}

export interface Playlist {
  id: string;
  name: string;
  cover: string;
  songCount: number;
  creator?: string;
}

export interface Artist {
  id: string;
  name: string;
  avatar: string;
  songCount: number;
}

export const mockSongs: Song[] = [
  {
    id: "1",
    title: "晴天",
    artist: "周杰伦",
    album: "叶惠美",
    cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=sunny%20day%20ocean%20wave%20surfing%20beautiful%20sunset&image_size=landscape_16_9",
    duration: "4:59",
    lyrics: [
      "故事的小黄花",
      "从出生那年就飘着",
      "童年的荡秋千",
      "随记忆一直晃到现在",
      "Re So So Si Do Si La",
      "So La Si Si Si Si La Si La So",
    ],
  },
  {
    id: "2",
    title: "反方向的钟",
    artist: "周杰伦",
    album: "Jay",
    cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=clock%20reverse%20time%20abstract%20dark%20mysterious&image_size=square",
    duration: "4:29",
    lyrics: ["迷迷糊糊", "全都是你", "在我心中"],
  },
  {
    id: "3",
    title: "那个女孩",
    artist: "张柏芝",
    album: "精选集",
    cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=beautiful%20girl%20portrait%20soft%20light%20elegant&image_size=square",
    duration: "3:56",
    lyrics: ["那个女孩", "曾经爱过", "深深记得"],
  },
  {
    id: "4",
    title: "如愿",
    artist: "王菲",
    album: "如愿",
    cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=wish%20fulfilled%20dreamy%20clouds%20soft%20light&image_size=square",
    duration: "4:45",
    lyrics: ["你是岁月长河", "星火燃起的天空"],
  },
  {
    id: "5",
    title: "星辰大海",
    artist: "张杰",
    album: "星辰大海",
    cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=starry%20night%20ocean%20waves%20fantasy%20dream&image_size=square",
    duration: "4:16",
    lyrics: ["我看见夜空的星辰", "照亮了整片大海"],
  },
  {
    id: "6",
    title: "万物生",
    artist: "萨顶顶",
    album: "万物生",
    cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=nature%20flowers%20garden%20mystical%20colorful&image_size=square",
    duration: "4:30",
    lyrics: ["从前冬天冷呀", "夏天雨呀水呀"],
  },
  {
    id: "7",
    title: "光年之外",
    artist: "邓紫棋",
    album: "光年之外",
    cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=space%20stars%20galaxy%20universe%20beautiful&image_size=square",
    duration: "3:55",
    lyrics: ["缘分让我们相遇乱世以外", "命运却要我们危难中相爱"],
  },
  {
    id: "8",
    title: "青花",
    artist: "周传雄",
    album: "青花",
    cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=blue%20porcelain%20chinese%20traditional%20art&image_size=square",
    duration: "4:21",
    lyrics: ["紧紧握着青花信物", "信守着承诺"],
  },
];

export const mockPlaylists: Playlist[] = [
  {
    id: "1",
    name: "最爱红心",
    cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=red%20heart%20music%20abstract%20love&image_size=square",
    songCount: 17,
  },
  {
    id: "2",
    name: "健身动力",
    cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=fitness%20energy%20workout%20dynamic%20motion&image_size=square",
    songCount: 29,
  },
  {
    id: "3",
    name: "2024年度最爱",
    cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=colorful%20abstract%20music%20notes%202024&image_size=square",
    songCount: 48,
  },
  {
    id: "4",
    name: "深夜漫步专属",
    cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=night%20walk%20city%20lights%20peaceful&image_size=square",
    songCount: 32,
  },
  {
    id: "5",
    name: "工作专注BGM",
    cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=work%20focus%20minimalist%20calm%20office&image_size=square",
    songCount: 125,
  },
];

export const recommendedPlaylists: Playlist[] = [
  {
    id: "r1",
    name: "华语流行经典 Vol.1",
    cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20pop%20music%20classic%20colorful%20swirl&image_size=square",
    songCount: 50,
    creator: "PPMusic 精选",
  },
  {
    id: "r2",
    name: "华语流行经典 Vol.2",
    cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=abstract%20colorful%20music%20art%20pastel&image_size=square",
    songCount: 45,
    creator: "PPMusic 精选",
  },
  {
    id: "r3",
    name: "华语流行经典",
    cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=geometric%20art%20music%20orange%20blue&image_size=square",
    songCount: 60,
    creator: "PPMusic 精选",
  },
];

export const hotChart = mockSongs.slice(0, 4);

export const categories = [
  { id: "1", name: "每日推荐", icon: "Music", color: "bg-purple-500" },
  { id: "2", name: "私人漫游", icon: "Headphones", color: "bg-cyan-500" },
  { id: "3", name: "排行榜", icon: "Trophy", color: "bg-yellow-500" },
  { id: "4", name: "热门电台", icon: "Radio", color: "bg-blue-500" },
];
