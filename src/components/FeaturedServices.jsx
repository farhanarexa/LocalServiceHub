import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';

const services = [
  {
    id: 1,
    name: 'Plumbing Repair',
    provider: 'John\'s Plumbing',
    rating: 4.8,
    price: '$50/hr',
    description: 'Professional plumbing services for residential and commercial needs',
    category: 'Home Services',
    image: 'https://via.placeholder.com/300x200'
  },
  {
    id: 2,
    name: 'Computer Repair',
    provider: 'TechFix Solutions',
    rating: 4.9,
    price: '$75/hr',
    description: 'Expert computer repair and technical support services',
    category: 'Tech Support',
    image: 'https://via.placeholder.com/300x200'
  },
  {
    id: 3,
    name: 'Cleaning Service',
    provider: 'Sparkle Cleaners',
    rating: 4.7,
    price: '$35/hr',
    description: 'Thorough cleaning services for homes and offices',
    category: 'Home Services',
    image: 'https://via.placeholder.com/300x200'
  },
  {
    id: 4,
    name: 'Tutoring',
    provider: 'EduCare Tutors',
    rating: 4.9,
    price: '$40/hr',
    description: 'Personalized tutoring for all academic subjects',
    category: 'Education',
    image: 'https://via.placeholder.com/300x200'
  }
];

export default function FeaturedServices() {
  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Local Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the most popular and highly rated services in your area.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}