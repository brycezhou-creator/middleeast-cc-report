import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { reportData, RadarMetric } from './data/reportData';

// Import Components
import { HeroSection } from './components/HeroSection';
import { ClassRecordingSection } from './components/ClassRecordingSection';
import { KnowledgeCarousel } from './components/KnowledgeCarousel';
import { RadarAnalysisSection } from './components/RadarAnalysisSection';
import { LevelProgressionMap } from './components/LevelProgressionMap';
import { CurriculumJourneySection } from './components/CurriculumJourneySection';
import { TeacherMessageSection } from './components/TeacherMessageSection';
import { SharePosterCTA } from './components/SharePosterCTA';
import { BottomCTA } from './components/BottomCTA';

// Import Dialogs
import { MetricDetailDialog } from './components/MetricDetailDialog';
import { PlanSelectionDialog } from './components/PlanSelectionDialog';
import { ShareablePosterModal } from './components/ShareablePosterModal';

export default function App() {
  // State Management
  const [selectedMetric, setSelectedMetric] = useState<RadarMetric | null>(null);
  const [isPlanSelectionOpen, setIsPlanSelectionOpen] = useState(false);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);

  // Handlers
  const handleMetricClick = (subject: string) => {
    const metric = reportData.radarData.find(m => m.subject === subject);
    if (metric) setSelectedMetric(metric);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-royal pb-24 relative overflow-x-hidden">

      {/* Hero Section */}
      <HeroSection
        name={reportData.name}
        avatar={reportData.avatar}
        badge={reportData.badges[0]}
      />

      {/* Class Recording Section */}
      <ClassRecordingSection
        subtitles={reportData.subtitles}
      />

      {/* Knowledge Carousel Section */}
      <section className="px-5 mt-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <KnowledgeCarousel vocabularyItems={reportData.vocabularyMastery} />
        </motion.div>
      </section>

      {/* Radar Analysis Section */}
      <RadarAnalysisSection
        radarData={reportData.radarData}
        onMetricClick={handleMetricClick}
      />

      {/* Level Progression Map */}
      <LevelProgressionMap
        currentLevel={reportData.levelCode}
        targetLevel={reportData.targetLevelCode}
      />

      {/* CEJ Curriculum Journey Section */}
      <CurriculumJourneySection />

      {/* Teacher Message Section */}
      <TeacherMessageSection teacher={reportData.teacher} />

      {/* Share Poster CTA */}
      <SharePosterCTA
        studentName={reportData.name}
        onOpenPoster={() => setIsPosterModalOpen(true)}
      />

      {/* Bottom WhatsApp CTA */}
      <BottomCTA
        studentName={reportData.name}
        onOpenPlanSelection={() => setIsPlanSelectionOpen(true)}
      />

      {/* Dialogs */}

      {selectedMetric && (
        <MetricDetailDialog
          isOpen={!!selectedMetric}
          onClose={() => setSelectedMetric(null)}
          metric={selectedMetric}
        />
      )}

      <PlanSelectionDialog
        isOpen={isPlanSelectionOpen}
        onClose={() => setIsPlanSelectionOpen(false)}
        packages={reportData.packages}
      />

      <ShareablePosterModal
        isOpen={isPosterModalOpen}
        onClose={() => setIsPosterModalOpen(false)}
        posterData={reportData.sharePoster}
      />

      {/* Spacer for Safe Area */}
      <div className="h-4"></div>
    </div>
  );
}
