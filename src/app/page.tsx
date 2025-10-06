import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/landing/Hero';
import { Objective } from '@/components/landing/Objective';
import { WeeklySchedule } from '@/components/landing/WeeklySchedule';
import { ProgramPlaybook } from '@/components/landing/ProgramPlaybook';
import { ProgramOnboarding } from '@/components/landing/ProgramOnboarding';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Objective />
        <ProgramPlaybook />
        <ProgramOnboarding />
        <WeeklySchedule />
      </main>
      <Footer />
    </div>
  );
}
