import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ExploreCategories from '@/components/ExploreCategories';
import FeaturedServices from '@/components/FeaturedServices';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ExploreCategories />
        <FeaturedServices />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
