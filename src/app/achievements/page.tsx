import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TargetCursor from '@/app/components/TargetCursor';
import FloatingParticles from '@/app/components/FloatingParticles';
import BackgroundImage from '@/app/components/BackgroundImage';
import AchievementsSection from '@/app/components/AchievementsSection';

export const metadata = {
  title: 'Achievements - Rohan Ghuge Portfolio',
  description: 'See the key milestones, certifications, and achievements Rohan Ghuge has earned.',
};

export default function AchievementsPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden pt-20">
      <BackgroundImage />
      <div className="relative z-10">
        <TargetCursor />
        <FloatingParticles />
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-12">
          <AchievementsSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
