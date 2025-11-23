import Link from 'next/link';

const services = [
  {
    id: 1,
    name: 'Plumbing Repair',
    provider: 'John\'s Plumbing',
    rating: 4.8,
    price: '$50/hr',
    image: 'https://via.placeholder.com/300x200'
  },
  {
    id: 2,
    name: 'Computer Repair',
    provider: 'TechFix Solutions',
    rating: 4.9,
    price: '$75/hr',
    image: 'https://via.placeholder.com/300x200'
  },
  {
    id: 3,
    name: 'Cleaning Service',
    provider: 'Sparkle Cleaners',
    rating: 4.7,
    price: '$35/hr',
    image: 'https://via.placeholder.com/300x200'
  },
  {
    id: 4,
    name: 'Tutoring',
    provider: 'EduCare Tutors',
    rating: 4.9,
    price: '$40/hr',
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
            <div
              key={service.id}
              className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-border"
            >
              <div className="h-48 bg-muted relative">
                <div className="bg-muted border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center text-foreground/50">
                  Service Image
                </div>
                <div className="absolute top-4 right-4 bg-yellow-500 text-primary-foreground px-2 py-1 rounded-full text-sm font-semibold flex items-center">
                  <span>★</span> {service.rating}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-muted-foreground mb-3">{service.provider}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">{service.price}</span>
                  <Link
                    href={`/service/${service.id}`}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
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