import HeroSection from '@/components/HeroSection';
import ExploreCategories from '@/components/ExploreCategories';
import FeaturedServices from '@/components/FeaturedServices';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <main>
        <HeroSection />
        <ExploreCategories />
        <FeaturedServices />
        <Testimonials />
      </main>
    </div>
  );
}
