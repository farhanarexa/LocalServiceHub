'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { Plus, Edit3, Eye, Trash2, Calendar, MapPin, Star, ExternalLink } from 'lucide-react';

// Placeholder data - in a real app, this would come from Supabase
const placeholderServices = [
  {
    id: 1,
    name: 'Plumbing Repair',
    category: 'Home Services',
    description: 'Professional plumbing services for residential and commercial needs',
    price: '$50/hr',
    rating: 4.8,
    createdAt: '2023-06-15',
    status: 'active'
  },
  {
    id: 2,
    name: 'Computer Repair',
    category: 'Tech Support',
    description: 'Expert computer repair and technical support services',
    price: '$75/hr',
    rating: 4.9,
    createdAt: '2023-07-22',
    status: 'active'
  },
  {
    id: 3,
    name: 'Tutoring',
    category: 'Education',
    description: 'Personalized tutoring for all academic subjects',
    price: '$40/hr',
    rating: 4.7,
    createdAt: '2023-08-10',
    status: 'inactive'
  }
];

export default function MyServicesPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    } else if (user) {
      // In a real app, fetch services from Supabase
      // For now, using placeholder data
      setTimeout(() => {
        setServices(placeholderServices);
        setLoadingServices(false);
      }, 500);
    }
  }, [user, loading, router]);

  const handleDeleteService = (serviceId) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(service => service.id !== serviceId));
    }
  };

  if (loading || loadingServices) {
    return (
      <div className="min-h-screen bg-background dark:bg-background">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8">
            <div className="h-8 bg-muted rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/3"></div>
          </div>
          <div className="animate-pulse">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-card p-6 rounded-xl border border-border shadow-sm mb-6">
                <div className="h-6 bg-muted rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-8 bg-muted rounded w-20"></div>
                  <div className="h-8 bg-muted rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirect is handled in useEffect
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">My Services</h1>
          <p className="text-muted-foreground mt-2">Manage the services you offer</p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-semibold">Your Services</h2>
            <p className="text-muted-foreground">{services.length} service{services.length !== 1 ? 's' : ''} listed</p>
          </div>
          
          <Link href="/services/create" className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" /> Add New Service
          </Link>
        </div>

        {services.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-foreground/50" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No services yet</h3>
            <p className="text-muted-foreground mb-4">You haven't listed any services yet</p>
            <Link href="/services/create" className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Create your first service
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-border">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold">{service.name}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      service.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {service.status}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{service.category}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Added {new Date(service.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{service.price}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span>{service.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-muted border-t border-border flex justify-between">
                  <Link 
                    href={`/service/${service.id}`}
                    className="flex items-center text-primary hover:text-primary/80"
                  >
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Link>
                  <div className="flex space-x-3">
                    <button className="text-muted-foreground hover:text-foreground">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteService(service.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}