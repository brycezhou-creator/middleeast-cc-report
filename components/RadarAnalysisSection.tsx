import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Info } from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  PolarRadiusAxis,
  Legend
} from 'recharts';
import { RadarMetric } from '../data/reportData';

interface RadarAnalysisSectionProps {
  radarData: RadarMetric[];
  onMetricClick: (subject: string) => void;
}

// Custom Tick Component with dynamic positioning and floating animations
const CustomTick = ({
  x,
  y,
  payload,
  onMetricClick
}: {
  x: number;
  y: number;
  payload: { value: string };
  onMetricClick: (subject: string) => void;
}) => {
  // Calculate angle for offset adjustment
  const cx = 200; // Center X (approximate, adjust based on container)
  const cy = 160; // Center Y (approximate, adjust based on container)
  const angle = Math.atan2(y - cy, x - cx);

  // Add offset to push labels outward from the chart
  const offset = 40; // Increased base offset
  let adjustedX = x + Math.cos(angle) * offset;
  let adjustedY = y + Math.sin(angle) * offset;

  // Individual adjustments for each label to prevent overlap and align neatly
  switch (payload.value) {
    case '词汇量':
      adjustedY += 20; // Move up slightly
      break;
    case '语法':
      adjustedX -= 5; // Move right
      adjustedY += 15;
      break;
    case '流利度':
      adjustedY -= 17; // Move up to align with 互动自信
      adjustedX += 5;
      break;
    case '互动自信':
      adjustedX -= 10; // Move left
      break;
    case '发音':
      adjustedX -= 20; // Move left more to avoid overlap with chart
      break;
  }

  return (
    <foreignObject
      x={adjustedX - 30}
      y={adjustedY - 18}
      width={90}
      height={36}
      style={{ overflow: 'visible' }}
    >
      <motion.button
        initial={{ opacity: 0, scale: 0.5, y: 10 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -3, 0],
        }}
        transition={{
          opacity: { duration: 0.5, delay: 0.3 },
          scale: { duration: 0.5, delay: 0.3, ease: "easeOut" },
          y: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 0.5 // Stagger the floating
          }
        }}
        whileHover={{
          scale: 1.1,
          y: -2,
          boxShadow: "0 8px 25px rgba(0, 180, 238, 0.25)"
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onMetricClick(payload.value)}
        className="w-full px-3 py-1.5 bg-white border-[1.5px] border-gray-200 rounded-full text-[11px] font-bold text-royal shadow-lg hover:border-brand hover:shadow-xl transition-all flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer"
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)'
        }}
      >
        <span>{payload.value}</span>
        <Info size={10} className="text-brand flex-shrink-0" />
      </motion.button>
    </foreignObject>
  );
};

export const RadarAnalysisSection = ({ radarData, onMetricClick }: RadarAnalysisSectionProps) => {
  const radarContainerRef = useRef(null);
  const isRadarInView = useInView(radarContainerRef, { once: true, amount: 0.3 });

  return (
    <section className="px-5 mt-8">
      <div className="bg-surface rounded-2xl p-6 shadow-card relative">
        <h3 className="text-dark font-bold text-lg mb-1">能力维度分析</h3>
        <p className="text-gray-400 text-xs mb-6">点击下方图表上的标签查看详细分析</p>

        {/* Responsive Radar Chart Container */}
        <div ref={radarContainerRef} className="relative h-80 w-full">
          {isRadarInView && (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="55%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />

                {/* Custom Tick Labels with dynamic positioning */}
                <PolarAngleAxis
                  dataKey="subject"
                  tick={(props) => (
                    <CustomTick {...props} onMetricClick={onMetricClick} />
                  )}
                />

                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />

                {/* Global Average */}
                <Radar
                  name="全球平均"
                  dataKey="average"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fill="#cbd5e1"
                  fillOpacity={0.1}
                  isAnimationActive={true}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />

                {/* Student */}
                <Radar
                  name="Sara"
                  dataKey="student"
                  stroke="#FDE700"
                  strokeWidth={3}
                  fill="#FDE700"
                  fillOpacity={0.4}
                  isAnimationActive={true}
                  animationDuration={2000}
                  animationEasing="ease-out"
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </section>
  );
};

