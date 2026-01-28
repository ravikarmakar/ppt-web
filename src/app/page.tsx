import HeroSection from '@/components/hero/HeroSection';
import NavigationHub from '@/components/home/NavigationHub';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <NavigationHub />
    </main>
  );
}
