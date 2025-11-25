'use client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useState, useEffect, use as ReactUse } from 'react';
import { useUser } from '@/context/UserContext';
import BookingModal from '@/components/BookingModal';

// Component to handle the service detail logic
function ServiceDetailContent({ params }) {

  const paramsValue = ReactUse(params);
  const { id } = paramsValue;
  const serviceId = Number(id);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { user, getServiceById, createServiceBooking } = useUser();

  useEffect(() => {
    if (!serviceId || isNaN(serviceId)) {
      setError('Invalid service ID');
      return;
    }

    const fetchService = async () => {
      try {
        setLoading(true);
        const result = await getServiceById(serviceId);
        if (result.error) {
          setError(result.error);
          console.error('Error fetching service:', result.error);
        } else {
          setService(result.data);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error in fetchService:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  if (isNaN(serviceId)) {
    notFound();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-6">
            <Link href="/services" className="flex items-center text-primary hover:text-primary/80 mb-8">
              ← Back to Services
            </Link>

            <div className="animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                    <div className="bg-muted rounded-xl w-full h-80 mb-6"></div>
                    <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="h-4 bg-muted rounded w-5/6"></div>
                    </div>
                  </div>

                  <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                    <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                  </div>
                </div>

                <div>
                  <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                    <div className="h-6 bg-muted rounded w-2/3 mb-6"></div>
                    <div className="h-20 bg-muted rounded-full mx-auto mb-6"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                    </div>

                    <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                      <div className="h-8 bg-muted rounded w-full"></div>
                    </div>

                    <div className="mt-6 h-12 bg-primary rounded-lg w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Service not found</h1>
          <p className="text-muted-foreground mb-4">{error || 'The requested service could not be found.'}</p>
          <Link href="/services" className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  // Extract contact info and availability from description if they exist
  let contactInfo = '';
  let availability = '';
  let displayDescription = service.description;

  if (service.description) {
    const lines = service.description.split('\n');
    const contactLine = lines.find(line => line.startsWith('Contact: '));
    const availabilityLine = lines.find(line => line.startsWith('Availability: '));

    if (contactLine) {
      contactInfo = contactLine.replace('Contact: ', '');
      displayDescription = displayDescription.replace(contactLine, '').trim();
    }
    if (availabilityLine) {
      availability = availabilityLine.replace('Availability: ', '');
      displayDescription = displayDescription.replace(availabilityLine, '').trim();
    }
  }

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
                {service.image_url ? (
                  <img
                    src={service.image_url}
                    alt={service.name}
                    className="w-full h-80 object-cover rounded-xl mb-6"
                  />
                ) : (
                  <div className="bg-muted border-2 border-dashed rounded-xl w-full h-80 flex items-center justify-center text-muted-foreground mb-6">
                    Service Image
                  </div>
                )}
                <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-medium text-primary px-2 py-1 rounded bg-primary/10">
                    {service.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">{service.rating || 0}</span>
                    <span className="text-muted-foreground">(0 reviews)</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">{displayDescription}</p>
                {contactInfo && (
                  <p className="text-muted-foreground mb-2"><strong>Contact:</strong> {contactInfo}</p>
                )}
                {availability && (
                  <p className="text-muted-foreground"><strong>Availability:</strong> {availability}</p>
                )}
              </div>

              <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                <p className="text-muted-foreground">No reviews yet.</p>
                <p className="text-sm text-muted-foreground mt-2">Be the first to review this service!</p>
              </div>
            </div>

            <div>
              <div className="bg-card rounded-xl p-6 border border-border shadow-sm sticky top-8">
                <h2 className="text-xl font-semibold mb-6">Service Provider</h2>
                <div className="text-center mb-6">
                  <div className="bg-muted rounded-full w-20 h-20 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-3xl">🏢</span>
                  </div>
                  <h3 className="text-lg font-bold">Service Provider</h3>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span>Service Location</span>
                  </div>
                  {contactInfo && (
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      <span>{contactInfo}</span>
                  </div>
                  )}
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <span>Provider Email</span>
                  </div>
                  {availability && (
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span>{availability}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Price</span>
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                  </div>
                </div>

                <button
                  className="mt-6 w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 font-medium transition"
                  onClick={() => {
                    if (user) {
                      setIsBookingModalOpen(true);
                    } else {
                      // Redirect to login if not authenticated
                      window.location.href = '/login';
                    }
                  }}
                >
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

      {/* Booking Modal */}
      {service && (
        <BookingModal
          service={service}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          onBookingSuccess={() => {
            // Show success message or handle booking confirmation
            // In a real app, you might want to show a toast notification
            console.log('Booking confirmed! The service provider will contact you soon.');
          }}
        />
      )}
    </div>
  );
}

// Simple wrapper to pass params to the client component
export default function ServiceDetailPage({ params }) {
  return (
    <ServiceDetailContent params={params} />
  );
}



