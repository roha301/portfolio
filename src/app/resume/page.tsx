import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TargetCursor from '@/app/components/TargetCursor';
import FloatingParticles from '@/app/components/FloatingParticles';
import BackgroundImage from '@/app/components/BackgroundImage';

export const metadata = {
  title: 'Resume - Rohan Ghuge Portfolio',
  description: 'View and download Rohan Ghuge\'s resume detailing education, technical projects, and experience.',
};

export default function ResumePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden pt-24">
      <BackgroundImage />
      <div className="relative z-10 flex flex-col min-h-[calc(100vh-6rem)]">
        <TargetCursor />
        <FloatingParticles />
        <Header />
        <main className="flex-grow max-w-5xl w-full mx-auto px-6 py-12 flex flex-col items-center">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 gradient-text-anime">
              My Resume
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              View or download my professional resume to learn more about my background, skills, and experience.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href="/assets/Rohan_Ghuge_Resume.pdf"
                download="Rohan_Ghuge_Resume.pdf"
                className="px-6 py-3 font-bold rounded-lg transition-all duration-300 relative overflow-hidden group shadow-lg shadow-purple-500/20"
                style={{
                  background: 'linear-gradient(135deg, #6B21A8, #1D4ED8)',
                  color: 'white',
                  border: '1px solid rgba(124,58,237,0.5)',
                }}
              >
                <span className="relative z-10">Download PDF</span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }} />
              </a>
            </div>
          </div>
          
          {/* PDF Viewer Frame */}
          <div className="w-full aspect-[1/1.4] max-w-4xl rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl bg-black/40 backdrop-blur-md">
            <iframe
              src="/assets/Rohan_Ghuge_Resume.pdf#toolbar=0"
              className="w-full h-full border-none"
              title="Rohan Ghuge Resume"
            />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
