import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock,
    Mic,
    BookOpen,
    Globe,
    Award,
    Brain,
    TreeDeciduous,
    PenTool,
    X,
    ChevronRight,
    ChevronDown,
    Star
} from 'lucide-react';

// ============================================
// DATA DEFINITIONS (Brand Colors Only)
// ============================================

interface CurriculumNode {
    id: string;
    title: string;
    subtitle: string;
    iconType: 'tree' | 'mic' | 'book' | 'pen';
    iconColor: string;
    iconBg: string;
    details: { level: string; text: string }[];
    description?: string;
}

// Strict brand color palette: Royal (blue), Brand (yellow), Emerald (green for Vocab only)
const CURRICULUM_DATA: CurriculumNode[] = [
    {
        id: 'vocab',
        title: 'Vocabulary',
        subtitle: 'Cumulative: 3300+ Words',
        iconType: 'tree',
        iconColor: 'text-success',
        iconBg: 'bg-success/10',
        details: [
            { level: 'Ls-L0', text: '360+ key words.' },
            { level: 'L1-L3', text: '1200+ words.' },
            { level: 'L4-L6', text: '2500+ words.' },
            { level: 'L7-L9', text: 'Over 3300 words. (The number of words here are cumulative)' }
        ]
    },
    {
        id: 'speaking',
        title: 'Listening & Speaking',
        subtitle: 'Authentic English Practice',
        iconType: 'mic',
        iconColor: 'text-brand',
        iconBg: 'bg-brand/10',
        description: 'We rely on live and authentic English practice, focusing heavily on listening and speaking skills.',
        details: [
            { level: 'Ls-L0', text: 'Understand simple commands and engage in basic communication.' },
            { level: 'L1-L3', text: 'Participate in daily conversations.' },
            { level: 'L4-L6', text: 'Confidently discuss hobbies, daily routines, and personal interests.' },
            { level: 'L7-L9', text: 'Accurately and confidently discuss abstract topics, opinions, and current events.' }
        ]
    },
    {
        id: 'reading',
        title: 'Reading',
        subtitle: 'From Phonics to Chapter Books',
        iconType: 'book',
        iconColor: 'text-royal',
        iconBg: 'bg-royal/10',
        details: [
            { level: 'Ls-L0', text: 'Recognize letters and read simple, short sentences.' },
            { level: 'L1-L3', text: 'Read short stories and articles using phonics skills.' },
            { level: 'L4-L6', text: 'Use reading strategies to understand fictional and non-fictional texts with increasing independence.' },
            { level: 'L7-L9', text: 'Adapt reading strategies to analyze different genres, including articles and chapter books.' }
        ]
    },
    {
        id: 'writing',
        title: 'Writing',
        subtitle: 'Structured Expression',
        iconType: 'pen',
        iconColor: 'text-royal',
        iconBg: 'bg-royal/5',
        details: [
            { level: 'Ls-L0', text: 'Practice basic spelling and learn how to complete simple sentences.' },
            { level: 'L1-L3', text: 'Compose short paragraphs, such as postcards and personal introductions.' },
            { level: 'L4-L6', text: 'Write short, well-organized paragraphs about personal experiences.' },
            { level: 'L7-L9', text: 'Write clear, well-structured essays to express and support an argument.' }
        ]
    }
];

// Brand-compliant icons
const ADVANTAGE_ICONS = [
    { icon: Clock, color: 'text-royal' },
    { icon: Mic, color: 'text-brand' },
    { icon: BookOpen, color: 'text-royal' },
    { icon: Globe, color: 'text-royal' },
    { icon: Award, color: 'text-brand' },
    { icon: Brain, color: 'text-royal' }
];

const TEACHING_FEATURES = [
    { icon: Clock, text: '25-minute individual lessons with specialized English teachers.' },
    { icon: Mic, text: 'Correct pronunciation, interactive teaching.' },
    { icon: BookOpen, text: 'Attractive learning materials.' }
];

const CORE_VALUES = [
    { icon: Globe, text: 'Prepares you to study abroad' },
    { icon: Award, text: 'Aligns with international standards (CEFR)' },
    { icon: Brain, text: 'Nurtures thinking skills' }
];

// ============================================
// ICON MAPPING HELPER
// ============================================

const getIcon = (iconType: string) => {
    switch (iconType) {
        case 'tree': return TreeDeciduous;
        case 'mic': return Mic;
        case 'book': return BookOpen;
        case 'pen': return PenTool;
        default: return Star;
    }
};

// ============================================
// CURRICULUM DETAIL DIALOG (Light Mode)
// ============================================

interface CurriculumDialogProps {
    isOpen: boolean;
    onClose: () => void;
    node: CurriculumNode | null;
}

const CurriculumDialog = ({ isOpen, onClose, node }: CurriculumDialogProps) => {
    if (!isOpen || !node) return null;

    const IconComponent = getIcon(node.iconType);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden border border-gray-100"
            >
                {/* Dialog Header */}
                <div className={`${node.iconBg} p-6 relative border-b border-gray-100`}>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm"
                    >
                        <X size={18} className="text-gray-500" />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center`}>
                            <IconComponent size={32} className={node.iconColor} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">{node.title}</h3>
                            <p className="text-gray-500 text-sm">{node.subtitle}</p>
                        </div>
                    </div>
                    {node.description && (
                        <p className="mt-4 text-gray-600 text-sm leading-relaxed">{node.description}</p>
                    )}
                </div>

                {/* Timeline Content */}
                <div className="p-6 overflow-y-auto max-h-[50vh] bg-gray-50/50">
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                        Learning Journey
                    </h4>
                    <div className="relative">
                        {/* Timeline Line - Brand gradient */}
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand via-royal to-royal/50" />

                        {/* Timeline Items */}
                        <div className="space-y-4">
                            {node.details.map((detail, index) => (
                                <motion.div
                                    key={detail.level}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative pl-10"
                                >
                                    {/* Timeline Dot */}
                                    <div className={`absolute left-2 top-1 w-5 h-5 rounded-full border-2 border-white shadow-md flex items-center justify-center ${index === 0 ? 'bg-brand' :
                                        index === 1 ? 'bg-royal/70' :
                                            index === 2 ? 'bg-royal' :
                                                'bg-royal'
                                        }`}>
                                        <ChevronRight size={10} className="text-white" />
                                    </div>

                                    {/* Content Card */}
                                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-2 ${index === 0 ? 'bg-brand/10 text-yellow-700' :
                                            'bg-royal/10 text-royal'
                                            }`}>
                                            {detail.level}
                                        </span>
                                        <p className="text-gray-700 text-sm leading-relaxed">{detail.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ============================================
// CURRICULUM NODE COMPONENT (Light Mode)
// ============================================

interface CurriculumNodeProps {
    node: CurriculumNode;
    index: number;
    onClick: () => void;
    position: 'left' | 'right';
}

const CurriculumNodeComponent: React.FC<CurriculumNodeProps> = ({ node, index, onClick, position }) => {
    const IconComponent = getIcon(node.iconType);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className={`flex items-center gap-4 ${position === 'right' ? 'flex-row-reverse' : ''}`}
        >
            {/* Badge - Pure white with enhanced border */}
            <motion.button
                onClick={onClick}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                whileHover={{
                    scale: 1.08,
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15)',
                    borderColor: '#FDE700'
                }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 rounded-full bg-white border-[1.5px] border-gray-200 shadow-xl flex items-center justify-center cursor-pointer relative group transition-colors duration-300"
            >
                <IconComponent size={36} className={node.iconColor} />
                {/* Subtle pulse */}
                <div className="absolute inset-0 rounded-full bg-gray-100 animate-ping opacity-20" />
            </motion.button>

            {/* Text Content */}
            <div className={`flex-1 ${position === 'right' ? 'text-right' : 'text-left'}`}>
                <h4 className="text-gray-900 font-bold text-base">{node.title}</h4>
                <p className="text-gray-500 text-xs mt-0.5">{node.subtitle}</p>
                <button
                    onClick={onClick}
                    className="mt-2 text-royal text-xs font-semibold hover:text-royal/70 transition-colors"
                >
                    View Details
                </button>
            </div>
        </motion.div>
    );
};

// ============================================
// MAIN COMPONENT
// ============================================

export const CurriculumJourneySection = () => {
    const [selectedNode, setSelectedNode] = useState<CurriculumNode | null>(null);
    const [isAdvantagesOpen, setIsAdvantagesOpen] = useState(false);

    return (
        <section className="px-5 mt-10">
            {/* ====== UNIFIED WHITE CONTAINER ====== */}
            <div className="bg-surface backdrop-blur-sm border border-white/20 rounded-2xl shadow-card overflow-hidden">

                {/* ====== HEADER SECTION ====== */}
                <div className="p-4 flex items-center justify-between border-b border-gray-100">
                    <h3 className="text-dark font-bold flex items-center gap-2">
                        <span className="w-2 h-6 bg-brand rounded-full"></span>
                        CEJ Curriculum System
                    </h3>
                </div>

                {/* Subtitle / Slogan moved to content area */}
                <div className="px-6 pt-6 pb-2 text-center">
                    <p className="text-gray-500 text-sm font-medium">Global Vision, Individual Focus</p>
                </div>

                {/* ====== ADVANTAGES FEATURE BAR (Collapsible) ====== */}
                <div className="px-4 py-4 border-b border-gray-50">
                    <motion.button
                        onClick={() => setIsAdvantagesOpen(!isAdvantagesOpen)}
                        className="w-full bg-royal/5 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center justify-between border border-gray-100 hover:bg-royal/10 transition-all duration-300"
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Left: Title */}
                        <span className="text-royal font-semibold text-sm">Why CEJ?</span>

                        {/* Center: Icon Pills */}
                        <div className="flex items-center gap-1.5">
                            {ADVANTAGE_ICONS.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="w-7 h-7 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center"
                                >
                                    <item.icon size={14} className={item.color} />
                                </div>
                            ))}
                        </div>

                        {/* Right: Chevron */}
                        <motion.div
                            animate={{ rotate: isAdvantagesOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronDown size={20} className="text-royal/60" />
                        </motion.div>
                    </motion.button>

                    {/* Expanded Bento Grid */}
                    <AnimatePresence>
                        {isAdvantagesOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="overflow-hidden"
                            >
                                <div className="grid grid-cols-2 gap-3 pt-4">
                                    {/* Teaching Features Column */}
                                    <div className="space-y-2">
                                        <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-1">
                                            Teaching Features
                                        </h4>
                                        {TEACHING_FEATURES.map((feature, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.08 }}
                                                className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all"
                                            >
                                                <div className="w-7 h-7 rounded-lg bg-royal/10 flex items-center justify-center mb-2">
                                                    <feature.icon size={14} className="text-royal" />
                                                </div>
                                                <p className="text-gray-700 text-[11px] leading-relaxed">{feature.text}</p>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Core Values Column */}
                                    <div className="space-y-2">
                                        <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-1">
                                            Core Values
                                        </h4>
                                        {CORE_VALUES.map((value, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.08 }}
                                                className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all"
                                            >
                                                <div className="w-7 h-7 rounded-lg bg-brand/10 flex items-center justify-center mb-2">
                                                    <value.icon size={14} className="text-brand" />
                                                </div>
                                                <p className="text-gray-700 text-[11px] leading-relaxed">{value.text}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ====== S-SHAPED CURRICULUM MAP ====== */}
                <div className="relative px-6 pb-10 pt-6 bg-gray-50/30">
                    {/* Section Subtitle */}
                    <div className="relative z-10 text-center mb-8">
                        <h3 className="text-gray-800 font-semibold text-lg">The Learning Journey</h3>
                        <p className="text-gray-400 text-xs mt-1">Tap each milestone to explore</p>
                    </div>

                    {/* S-Shaped Path Container */}
                    <div className="relative z-10">
                        {/* SVG S-Curve Path */}
                        <svg
                            className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-20 pointer-events-none"
                            viewBox="0 0 80 460"
                            preserveAspectRatio="none"
                        >
                            {/* Background track - light gray dashed (removed, using only gradient path) */}

                            {/* Progress line - Brand to Royal gradient (thicker dashed) */}
                            <path
                                d="M40 20
                   Q75 80, 40 140
                   Q5 200, 40 260
                   Q75 320, 40 380
                   Q5 440, 40 460"
                                fill="none"
                                stroke="url(#brandGradient)"
                                strokeWidth="6"
                                strokeDasharray="10 10"
                                strokeLinecap="round"
                                opacity="0.15"
                            />
                            {/* Gradient Definition */}
                            <defs>
                                <linearGradient id="brandGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#FDE700" />
                                    <stop offset="40%" stopColor="#00B4EE" />
                                    <stop offset="100%" stopColor="#0077A3" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Curriculum Nodes */}
                        <div className="space-y-12 relative">
                            {CURRICULUM_DATA.map((node, index) => (
                                <CurriculumNodeComponent
                                    key={node.id}
                                    node={node}
                                    index={index}
                                    onClick={() => setSelectedNode(node)}
                                    position={index % 2 === 0 ? 'left' : 'right'}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Dialog */}
            <AnimatePresence>
                {selectedNode && (
                    <CurriculumDialog
                        isOpen={!!selectedNode}
                        onClose={() => setSelectedNode(null)}
                        node={selectedNode}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default CurriculumJourneySection;
