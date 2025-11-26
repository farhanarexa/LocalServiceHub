'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import ServiceCard from '@/components/ServiceCard';
import { serviceCategories } from '@/utils/categories';

const allCategories = ['All Services', ...serviceCategories];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const { getAllServices } = useUser();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const result = await getAllServices();
        if (result.error) {
          console.error('Error fetching services:', result.error);
        } else {
          setServices(result.data || []);
        }
      } catch (error) {
        console.error('Error in fetchServices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'All Services' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <div className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Find Services Near You</h1>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            Discover and connect with trusted professionals in your community
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4">
              <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Filter Services</h2>

                <div className="mb-6">
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {allCategories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-accent'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-3/4">
              <div className="bg-card p-6 rounded-xl border border-border shadow-sm mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search services or providers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    disabled={loading}
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-6">
                  {selectedCategory} ({loading ? '...' : filteredServices.length} services)
                </h2>

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div key={item} className="bg-card rounded-xl overflow-hidden shadow-lg border border-border animate-pulse">
                        <div className="h-48 bg-muted"></div>
                        <div className="p-6">
                          <div className="h-4 bg-muted rounded w-3/4 mb-3"></div>
                          <div className="h-6 bg-muted rounded w-1/2 mb-2"></div>
                          <div className="h-4 bg-muted rounded w-full mb-2"></div>
                          <div className="h-4 bg-muted rounded w-2/3 mb-4"></div>
                          <div className="flex justify-between items-center">
                            <div className="h-6 bg-muted rounded w-1/4"></div>
                            <div className="h-4 bg-muted rounded w-1/6"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredServices.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                      ))}
                    </div>

                    {filteredServices.length === 0 && (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">No services found matching your criteria.</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}