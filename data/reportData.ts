
export interface Badge {
  id: string;
  icon: string;
  label: string;
  color: string;
}

export interface Subtitle {
  id: string;
  text: string;
  highlight: boolean;
  startTime: number;
  endTime: number;
}

export interface RadarMetric {
  subject: string;
  student: number; // Student Score
  average: number; // Global Average
  fullMark: number;
  analysis?: string; // Detailed feedback
  tip?: string;      // Actionable advice
}

export interface TeacherInfo {
  name: string;
  avatar: string;
  messageAudio: string; // Placeholder for audio URL
  comment: string;
  commentTranslated: string;
}

export interface PackageInfo {
  id: string;
  title: string;
  lessonCount: number;
  frequency: string;
  price: string; // Display string
  tags: string[];
}

export interface VocabularyItem {
  id: string;
  word: string;
  translation: string; // Chinese/Arabic translation
  imageUrl: string; // Cartoon/realistic illustration
  rating: 1 | 2 | 3; // Star rating (1-3)
  ratingLabel: string; // "Perfect!", "Great!", "Good Try"
  studentAudioUrl: string; // Student's pronunciation audio
}

export interface PathMilestone {
  id: string;
  type: 'milestone' | 'target' | 'ability';
  timeframe: string; // "1 Month", "Approx. 6 weeks", etc.
  title: string;
  description: string;
  iconType: 'star' | 'zap' | 'flag';
  packageId: string; // Link to package
  // New fields for sincere analysis
  potentialAnalysis: string;
  educationalValue: string;
  methodology: string;
}

export interface SharePosterData {
  studentName: string;
  studentAvatar: string;
  honorTitle: string; // e.g., "Little Orator"
  percentile: number; // e.g., 85 means top 15%
  qrCodeUrl: string;
  brandLogoUrl?: string;
}

export interface StudentData {
  name: string;
  avatar: string; // URL
  levelCurrent: string;
  levelTarget: string;
  badges: Badge[];
  videoUrl: string;
  subtitles: Subtitle[];
  vocabularyMastery: VocabularyItem[]; // Today's Knowledge Takeaway
  radarData: RadarMetric[];
  teacher: TeacherInfo;
  pathMilestones: PathMilestone[];
  packages: Record<string, PackageInfo>; // Map packageId to info
  sharePoster: SharePosterData; // Viral Social Share
}

export const reportData: StudentData = {
  name: "Sara",
  avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sara&backgroundColor=b6e3f4&skinColor=ecad80&hair=long16&hairColor=0e0e0e&eyes=variant01&eyebrows=variant01&mouth=variant01",
  levelCurrent: "Level 2 (基础会话)",
  levelTarget: "Level 3 (故事表达)",
  badges: [
    { id: "b1", icon: "🌟", label: "Super Speaker", color: "#FDE700" },
    { id: "b2", icon: "🦁", label: "Brave Heart", color: "#FDE700" }
  ],
  // Using a reliable placeholder video
  videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  subtitles: [
    { id: "s1", text: "Today I went to the ", highlight: false, startTime: 0, endTime: 2.5 },
    { id: "s2", text: "supermarket", highlight: true, startTime: 2.5, endTime: 4 }, // Highlighted word
    { id: "s3", text: " with my mother.", highlight: false, startTime: 4, endTime: 6 },
    { id: "s4", text: " We bought some ", highlight: false, startTime: 6, endTime: 8 },
    { id: "s5", text: "fresh apples", highlight: true, startTime: 8, endTime: 9.5 },
    { id: "s6", text: ".", highlight: false, startTime: 9.5, endTime: 11 },
  ],
  vocabularyMastery: [
    {
      id: "v1",
      word: "Supermarket",
      translation: "超市",
      imageUrl: "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=400&h=300&fit=crop",
      rating: 3,
      ratingLabel: "Perfect!",
      studentAudioUrl: "https://www.soundjay.com/button/sounds/beep-07.mp3" // Placeholder
    },
    {
      id: "v2",
      word: "Fresh",
      translation: "新鲜的",
      imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop",
      rating: 3,
      ratingLabel: "Perfect!",
      studentAudioUrl: "https://www.soundjay.com/button/sounds/beep-08a.mp3"
    },
    {
      id: "v3",
      word: "Apple",
      translation: "苹果",
      imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop",
      rating: 3,
      ratingLabel: "Perfect!",
      studentAudioUrl: "https://www.soundjay.com/button/sounds/beep-09.mp3"
    },
    {
      id: "v4",
      word: "Vegetable",
      translation: "蔬菜",
      imageUrl: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400&h=300&fit=crop",
      rating: 2,
      ratingLabel: "Great!",
      studentAudioUrl: "https://www.soundjay.com/button/sounds/beep-10.mp3"
    },
    {
      id: "v5",
      word: "Shopping Cart",
      translation: "购物车",
      imageUrl: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400&h=300&fit=crop",
      rating: 2,
      ratingLabel: "Great!",
      studentAudioUrl: "https://www.soundjay.com/button/sounds/beep-01a.mp3"
    },
    {
      id: "v6",
      word: "Carrot",
      translation: "胡萝卜",
      imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop",
      rating: 1,
      ratingLabel: "Good",
      studentAudioUrl: "https://www.soundjay.com/button/sounds/beep-02.mp3"
    }
  ],
  radarData: [
    {
      subject: '词汇量',
      student: 90,
      average: 75,
      fullMark: 100,
      analysis: "Sara 掌握的高频词汇量远超同龄人，尤其在日常生活场景（如超市、学校）的词汇运用非常准确。",
      tip: "建议开始尝试简单的英文绘本阅读，进一步扩充形容词储备。"
    },
    {
      subject: '语法',
      student: 85,
      average: 80,
      fullMark: 100,
      analysis: "能够正确使用一般现在时和现在进行时，但在第三人称单数的变化上偶尔会有些许犹豫。",
      tip: "可以通过角色扮演游戏练习 'He/She likes...' 等句型。"
    },
    {
      subject: '流利度',
      student: 95,
      average: 70,
      fullMark: 100,
      analysis: "语速适中，停顿自然。最难得的是在思考时会使用 'Let me see...' 等自然的填充词，非常地道。",
      tip: "保持每天 15 分钟的口语磨耳朵，维持语感。"
    },
    {
      subject: '互动自信',
      student: 98,
      average: 65,
      fullMark: 100,
      analysis: "这是 Sara 最突出的强项！她不仅回答问题，还会主动向老师提问，展现了极强的沟通意愿。",
      tip: "鼓励她参加更多的小组讨论课，发挥领导力潜力。"
    },
    {
      subject: '发音',
      student: 88,
      average: 75,
      fullMark: 100,
      analysis: "元音发音饱满清晰，辅音连读（Linkage）处理得很好。'Th' 的咬舌音还可以更标准一些。",
      tip: "可以通过模仿绕口令（Tongue Twisters）来微调咬舌音。"
    },
  ],
  teacher: {
    name: "Teacher Emma",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma&backgroundColor=ffdfbf",
    messageAudio: "#",
    comment: "Sara showed amazing confidence today! Her pronunciation of 'supermarket' was perfect. I can see her potential for international schools.",
    commentTranslated: "Sara 今天表现出了惊人的自信！她对 'supermarket' 的发音非常完美。我看到了她进入国际学校的潜力。"
  },
  pathMilestones: [
    {
      id: "m1",
      type: "ability",
      timeframe: "1 Month Later",
      title: "自信自我介绍",
      description: "能够使用 5+ 个句子流畅介绍自己的爱好和家庭。",
      iconType: "star",
      packageId: "pkg_month",
      potentialAnalysis: "基于 Sara 现有的词汇量（90/100），她只需要学会更复杂的句型结构来串联这些词汇。",
      educationalValue: "自我介绍是社交自信的第一步，能帮助孩子在陌生的英语环境中迅速建立安全感。",
      methodology: "我们将通过‘我是小记者’等角色扮演游戏，让她在不知不觉中重复练习高频句型。"
    },
    {
      id: "m2",
      type: "ability",
      timeframe: "Approx. 2 Months",
      title: "说出完整长句",
      description: "不再蹦单词！掌握 'Subject + Verb + Object' 完整句型结构。",
      iconType: "zap",
      packageId: "pkg_two_months",
      potentialAnalysis: "Sara 的语法基础很扎实，但在第三人称单数上偶尔犹豫，通过专项练习可以迅速纠正。",
      educationalValue: "完整句输出是逻辑思维的体现，也是从‘单词思维’向‘英语思维’转变的关键分水岭。",
      methodology: "我们的外教将使用‘扩句法’（Sentence Expansion），引导她把简单的 Short Answer 变成完整的描述。"
    },
    {
      id: "m3",
      type: "target",
      timeframe: "3 Months Goal",
      title: "Level 3 (故事表达)",
      description: "能够独立复述绘本故事，达到国际学校入学面试基准。",
      iconType: "flag",
      packageId: "pkg_quarter",
      potentialAnalysis: "鉴于 Sara 极强的互动自信（98/100），她非常适合通过讲故事来展示语言魅力。",
      educationalValue: "故事复述能力不仅考察语言，更考察记忆力、逻辑排序和情感表达，是国际学校面试的核心考察点。",
      methodology: "引入经典的绘本教材，通过‘看图说话’和‘结局猜想’环节，激发她主动表达长段落的欲望。"
    }
  ],
  packages: {
    "pkg_month": {
      id: "pkg_month",
      title: "1个月·基础巩固",
      lessonCount: 12,
      frequency: "每周 3 课时",
      price: "$199",
      tags: ["短期尝试", "夯实基础"]
    },
    "pkg_two_months": {
      id: "pkg_two_months",
      title: "2个月·进阶突破",
      lessonCount: 24,
      frequency: "每周 3 课时",
      price: "$379",
      tags: ["成效显著", "句型突破"]
    },
    "pkg_quarter": {
      id: "pkg_quarter",
      title: "3个月·思维飞跃",
      lessonCount: 36,
      frequency: "每周 3 课时",
      price: "$499",
      tags: ["国际学校备考", "完整体系"]
    }
  },
  sharePoster: {
    studentName: "Sara",
    studentAvatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sara&backgroundColor=b6e3f4&skinColor=ecad80&hair=long16&hairColor=0e0e0e&eyes=variant01&eyebrows=variant01&mouth=variant01",
    honorTitle: "小小演说家",
    percentile: 85, // Sara 超越了 85% 的同龄人
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://www.51talk.com/trial",
    brandLogoUrl: "https://via.placeholder.com/120x40/00B4EE/FDE700?text=51Talk"
  }
};
