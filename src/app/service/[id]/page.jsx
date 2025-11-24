// src/app/service/[id]/page.jsx

import { notFound } from 'next/navigation';
import Link from 'next/link';
import PrivateRoute from '@/components/PrivateRoute';

// Full mock data (all 6 services)
const services = [
  {
    id: 1,
    name: 'Plumbing Repair',
    category: 'Home Services',
    provider: "John's Plumbing",
    rating: 4.8,
    price: '$50/hr',
    description: 'Professional plumbing services for residential and commercial needs',
    fullDescription: "John's Plumbing has been serving the community for over 15 years. Licensed plumbers, 24/7 emergency service.",
    contact: { phone: '+1 (555) 123-4567', email: 'info@johnsplumbing.com', address: '123 Main St, City, State' },
    availability: 'Mon-Sat 8:00 AM - 6:00 PM',
    reviews: [
      { id: 1, user: 'Sarah Johnson', rating: 5, comment: 'Fixed my leak in no time!', date: '2024-11-15' },
      { id: 2, user: 'Michael Chen', rating: 4, comment: 'Great work and fair pricing.', date: '2024-10-22' }
    ]
  },
  {
    id: 2,
    name: 'Computer Repair',
    category: 'Tech Support',
    provider: 'TechFix Solutions',
    rating: 4.9,
    price: '$75/hr',
    description: 'Expert computer repair and technical support services',
    fullDescription: 'Certified technicians fix hardware, software, and virus issues fast.',
    contact: { phone: '+1 (555) 234-5678', email: 'support@techfixsolutions.com', address: '456 Tech Ave, City, State' },
    availability: 'Mon-Fri 9:00 AM - 7:00 PM',
    reviews: [
      { id: 1, user: 'Emily Rodriguez', rating: 5, comment: 'Fixed my laptop quickly!', date: '2024-11-20' },
      { id: 2, user: 'David Wilson', rating: 5, comment: 'Saved my important files.', date: '2024-10-30' }
    ]
  },
  {
    id: 3,
    name: 'Cleaning Service',
    category: 'Home Services',
    provider: 'Sparkle Cleaners',
    rating: 4.7,
    price: '$35/hr',
    description: 'Thorough cleaning services for homes and offices',
    fullDescription: 'Deep cleaning, regular maintenance, move-in/move-out with eco-friendly products.',
    contact: { phone: '+1 (555) 345-6789', email: 'hello@sparkleclean.com', address: '789 Clean St, City, State' },
    availability: 'Mon-Sun 7:00 AM - 9:00 PM',
    reviews: []
  },
  {
    id: 4,
    name: 'Tutoring',
    category: 'Education',
    provider: 'EduCare Tutors',
    rating: 4.9,
    price: '$40/hr',
    description: 'Personalized tutoring for all academic subjects',
    fullDescription: 'One-on-one tutoring in Math, Science, English, and test prep.',
    contact: { phone: '+1 (555) 456-7890', email: 'contact@educaretutors.com', address: '321 Study Lane, City, State' },
    availability: 'Mon-Fri 3:00 PM - 9:00 PM, Sat 10:00 AM - 6:00 PM',
    reviews: []
  },
  {
    id: 5,
    name: 'Electrical Work',
    category: 'Home Services',
    provider: 'PowerPro Electric',
    rating: 4.6,
    price: '$60/hr',
    description: 'Professional electrical installation and repair',
    fullDescription: 'Licensed electricians for wiring, lighting, and emergency repairs.',
    contact: { phone: '+1 (555) 567-8901', email: 'service@powerpro.com', address: '555 Volt Road, City, State' },
    availability: 'Available 24/7 for emergencies',
    reviews: []
  },
  {
    id: 6,
    name: 'Pet Grooming',
    category: 'Personal Care',
    provider: 'Furry Friends Care',
    rating: 4.8,
    price: '$30/hr',
    description: 'Professional pet grooming and care services',
    fullDescription: 'Full-service grooming: bath, haircut, nail trim, ear cleaning.',
    contact: { phone: '+1 (555) 678-9012', email: 'info@furryfriends.com', address: '101 Paw Street, City, State' },
    availability: 'Tue-Sun 9:00 AM - 5:00 PM',
    reviews: []
  }
];

export default async function ServiceDetailPage({ params }) {
  return (
    <PrivateRoute>
      <ServiceDetailContent params={params} />
    </PrivateRoute>
  );
}

// This is the ONLY correct way in Next.js 16 + Turbopack
async function ServiceDetailContent({ params }) {
  const { id } = await params;                    // ← await the Promise!
  const serviceId = Number(id);

  if (isNaN(serviceId)) notFound();

  const service = services.find(s => s.id === serviceId);
  if (!service) notFound();

  return (
    <div className="min-h-screen bg-background">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/services" className="flex items-center text-primary hover:text-primary/80 mb-8">
            ← Back to Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                <div className="bg-muted border-2 border-dashed rounded-xl w-full h-80 flex items-center justify-center text-muted-foreground mb-6">
                  Service Image
                </div>
                <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-medium text-primary px-2 py-1 rounded bg-primary/10">
                    {service.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">Star</span>
                    <span className="font-medium">{service.rating}</span>
                    <span className="text-muted-foreground">({service.reviews.length} reviews)</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">{service.fullDescription}</p>
                <p>{service.description}</p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                {service.reviews.length === 0 ? (
                  <p className="text-muted-foreground">No reviews yet.</p>
                ) : (
                  <div className="space-y-6">
                    {service.reviews.map(review => (
                      <div key={review.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{review.user}</h3>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">Star</span>
                            <span>{review.rating}</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-2">{review.comment}</p>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="bg-card rounded-xl p-6 border border-border shadow-sm sticky top-8">
                <h2 className="text-xl font-semibold mb-6">Service Provider</h2>
                <div className="text-center mb-6">
                  <div className="bg-muted rounded-full w-20 h-20 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-3xl">Building</span>
                  </div>
                  <h3 className="text-lg font-bold">{service.provider}</h3>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span>{service.contact.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    <span>{service.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <span>{service.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{service.availability}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Price</span>
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                  </div>
                </div>

                <button className="mt-6 w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 font-medium transition">
                  Book This Service
                </button>
                <p className="text-center text-sm text-muted-foreground mt-3">
                  Contact provider directly for details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



