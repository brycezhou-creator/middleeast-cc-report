import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface ScrollHintProps {
    scrollRef: React.RefObject<HTMLDivElement>;
    className?: string; // Allow custom positioning classes if needed
}

export const ScrollHint: React.FC<ScrollHintProps> = ({ scrollRef, className = '' }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const element = scrollRef.current;
        if (!element) return;

        const handleScroll = () => {
            if (element.scrollLeft > 20) {
                setIsVisible(false);
            }
        };

        // Initial check in case it's already scrolled (e.g. browser restoration)
        if (element.scrollLeft > 20) {
            setIsVisible(false);
        }

        element.addEventListener('scroll', handleScroll, { passive: true });
        return () => element.removeEventListener('scroll', handleScroll);
    }, [scrollRef]);

    if (!isVisible) return null;

    return (
        <div
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none ${className}`}
        >
            <div className="bg-black/20 backdrop-blur-[2px] rounded-l-full p-1.5 pr-2 animate-pulse flex items-center justify-center">
                <ChevronRight className="text-white animate-bounce-horizontal" size={24} strokeWidth={3} />
            </div>
            {/* Custom horizontal bounce animation style using tailwind config or simple inline if needed
                But here we can just use standard animate-bounce or a custom keyframe if animate-bounce is vertical.
                'animate-bounce' is vertical. We want horizontal. 
                Let's just use `animate-pulse` on the container and standard Lucide icon. 
                Or we can inject a quick style.
            */}
            <style>{`
                @keyframes bounce-x {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(25%); }
                }
                .animate-bounce-horizontal {
                    animation: bounce-x 1s infinite;
                }
            `}</style>
        </div>
    );
};
