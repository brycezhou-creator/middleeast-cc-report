
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
  levelCurrent: "Level 2 (Basic Conversation)",
  levelTarget: "Level 3 (Story Telling)",
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
      id: "v6",
      word: "Carrot",
      translation: "جزر",
      imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop",
      rating: 1,
      ratingLabel: "Good",
      studentAudioUrl: "https://www.soundjay.com/button/sounds/beep-02.mp3"
    },
    {
      id: "v4",
      word: "Vegetable",
      translation: "خضروات",
      imageUrl: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400&h=300&fit=crop",
      rating: 2,
      ratingLabel: "Great!",
      studentAudioUrl: "https://www.soundjay.com/button/sounds/beep-10.mp3"
    },
    {
      id: "v5",
      word: "Shopping Cart",
      translation: "عربة التسوق",
      imageUrl: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400&h=300&fit=crop",
      rating: 2,
      ratingLabel: "Great!",
      studentAudioUrl: "https://www.soundjay.com/button/sounds/beep-01a.mp3"
    },
    {
      id: "v1",
      word: "Supermarket",
      translation: "سوبر ماركت",
      imageUrl: "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=400&h=300&fit=crop",
      rating: 3,
      ratingLabel: "Perfect!",
      studentAudioUrl: "https://www.soundjay.com/button/sounds/beep-07.mp3" // Placeholder
    },
    {
      id: "v2",
      word: "Fresh",
      translation: "طازج",
      imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop",
      rating: 3,
      ratingLabel: "Perfect!",
      studentAudioUrl: "https://www.soundjay.com/button/sounds/beep-08a.mp3"
    },
    {
      id: "v3",
      word: "Apple",
      translation: "تفاحة",
      imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop",
      rating: 3,
      ratingLabel: "Perfect!",
      studentAudioUrl: "https://www.soundjay.com/button/sounds/beep-09.mp3"
    }
  ],
  radarData: [
    {
      subject: 'Vocabulary',
      student: 68,
      average: 78,
      fullMark: 100,
      analysis: "Sara has a foundation in everyday vocabulary, but her word bank needs expansion, especially in descriptive words and academic terms.",
      tip: "Introduce graded readers and picture books to systematically build vocabulary across different themes."
    },
    {
      subject: 'Grammar',
      student: 72,
      average: 75,
      fullMark: 100,
      analysis: "Sara understands basic sentence structures but sometimes struggles with tense consistency and subject-verb agreement.",
      tip: "Focus on interactive grammar games and sentence-building activities to reinforce patterns naturally."
    },
    {
      subject: 'Fluency',
      student: 75,
      average: 72,
      fullMark: 100,
      analysis: "Sara speaks at a comfortable pace without too many hesitations. This is one of her stronger areas compared to peers.",
      tip: "Continue daily English conversations and storytelling practice to maintain this natural rhythm."
    },
    {
      subject: 'Confidence',
      student: 78,
      average: 70,
      fullMark: 100,
      analysis: "Sara shows excellent willingness to communicate! She actively participates and isn't afraid to make mistakes - a crucial trait for language learning.",
      tip: "Channel this confidence into group discussions and presentations to further develop public speaking skills."
    },
    {
      subject: 'Pronunciation',
      student: 65,
      average: 80,
      fullMark: 100,
      analysis: "Sara's pronunciation needs focused attention. Some vowel sounds are unclear, and certain consonant combinations are challenging for her.",
      tip: "Regular phonics drills and pronunciation coaching with native teachers will make a significant difference here."
    },
  ],
  teacher: {
    name: "Teacher Emma",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma&backgroundColor=ffdfbf",
    messageAudio: "#",
    comment: "Sara showed amazing confidence today! Her pronunciation of 'supermarket' was perfect. I can see her potential for international schools.",
    commentTranslated: "Sara displayed amazing confidence today! Her pronunciation of 'supermarket' was perfect. I can see her potential for international schools."
  },
  pathMilestones: [
    {
      id: "m1",
      type: "ability",
      timeframe: "1 Month Later",
      title: "Confident Self-Introduction",
      description: "Able to fluently introduce hobbies and family using 5+ sentences.",
      iconType: "star",
      packageId: "pkg_month",
      potentialAnalysis: "Based on Sara's existing vocabulary (68/100), she needs to learn more complex sentence structures to connect these words effectively.",
      educationalValue: "Self-introduction is the first step to social confidence, helping children quickly establish a sense of security in unfamiliar English environments.",
      methodology: "We'll use role-playing games like 'Young Reporter' to help her practice high-frequency sentence patterns naturally and repeatedly."
    },
    {
      id: "m2",
      type: "ability",
      timeframe: "Approx. 2 Months",
      title: "说出完整长句",
      description: "不再蹦单词！掌握 'Subject + Verb + Object' 完整句型结构。",
      iconType: "zap",
      packageId: "pkg_two_months",
      potentialAnalysis: "Sara has a solid grammar foundation, but occasionally hesitates with third-person singular. This can be quickly corrected through targeted practice.",
      educationalValue: "Complete sentence output demonstrates logical thinking and marks the crucial transition from 'word-based thinking' to 'English thinking'.",
      methodology: "Our foreign teachers will use 'Sentence Expansion' techniques to guide her in transforming simple short answers into complete descriptions."
    },
    {
      id: "m3",
      type: "target",
      timeframe: "3 Months Goal",
      title: "Level 3 (Story Telling)",
      description: "Able to independently retell picture book stories, meeting international school interview standards.",
      iconType: "flag",
      packageId: "pkg_quarter",
      potentialAnalysis: "Given Sara's exceptional confidence (78/100), she's well-suited to showcase her language skills through storytelling.",
      educationalValue: "Story retelling assesses not just language, but also memory, logical sequencing, and emotional expression - key evaluation points in international school interviews.",
      methodology: "We'll introduce classic picture book materials, using 'Picture Description' and 'Ending Prediction' activities to inspire her to express longer narratives independently."
    }
  ],
  packages: {
    "pkg_month": {
      id: "pkg_month",
      title: "1 Month · Foundation",
      lessonCount: 12,
      frequency: "3 lessons/week",
      price: "$199",
      tags: ["Short-term Trial", "Build Foundation"]
    },
    "pkg_two_months": {
      id: "pkg_two_months",
      title: "2 Months · Breakthrough",
      lessonCount: 24,
      frequency: "3 lessons/week",
      price: "$379",
      tags: ["Proven Results", "Sentence Mastery"]
    },
    "pkg_quarter": {
      id: "pkg_quarter",
      title: "3 Months · Fluency Leap",
      lessonCount: 36,
      frequency: "3 lessons/week",
      price: "$499",
      tags: ["Int'l School Prep", "Complete System"]
    }
  },
  sharePoster: {
    studentName: "Sara",
    studentAvatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sara&backgroundColor=b6e3f4&skinColor=ecad80&hair=long16&hairColor=0e0e0e&eyes=variant01&eyebrows=variant01&mouth=variant01",
    honorTitle: "Rising Star Speaker",
    percentile: 85, // Sara surpasses 85% of peers
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://www.51talk.com/trial",
    brandLogoUrl: "https://via.placeholder.com/120x40/00B4EE/FDE700?text=51Talk"
  }
};
