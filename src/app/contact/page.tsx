import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TargetCursor from '@/app/components/TargetCursor';
import FloatingParticles from '@/app/components/FloatingParticles';
import BackgroundImage from '@/app/components/BackgroundImage';
import ContactSection from '@/app/components/ContactSection';

export const metadata = {
  title: 'Contact Me - Rohan Ghuge Portfolio',
  description: 'Get in touch with Rohan Ghuge for opportunities, collaborations, or inquiries.',
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden pt-20">
      <BackgroundImage />
      <div className="relative z-10">
        <TargetCursor />
        <FloatingParticles />
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-12">
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
