'use client';
import { useState } from 'react';
import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';

const services = [
  {
    id: 1,
    name: 'Plumbing Repair',
    category: 'Home Services',
    provider: 'John\'s Plumbing',
    rating: 4.8,
    price: '$50/hr',
    description: 'Professional plumbing services for residential and commercial needs',
    image: 'https://via.placeholder.com/300x200'
  },
  {
    id: 2,
    name: 'Computer Repair',
    category: 'Tech Support',
    provider: 'TechFix Solutions',
    rating: 4.9,
    price: '$75/hr',
    description: 'Expert computer repair and technical support services',
    image: 'https://via.placeholder.com/300x200'
  },
  {
    id: 3,
    name: 'Cleaning Service',
    category: 'Home Services',
    provider: 'Sparkle Cleaners',
    rating: 4.7,
    price: '$35/hr',
    description: 'Thorough cleaning services for homes and offices',
    image: 'https://via.placeholder.com/300x200'
  },
  {
    id: 4,
    name: 'Tutoring',
    category: 'Education',
    provider: 'EduCare Tutors',
    rating: 4.9,
    price: '$40/hr',
    description: 'Personalized tutoring for all academic subjects',
    image: 'https://via.placeholder.com/300x200'
  },
  {
    id: 5,
    name: 'Electrical Work',
    category: 'Home Services',
    provider: 'PowerPro Electric',
    rating: 4.6,
    price: '$60/hr',
    description: 'Professional electrical installation and repair',
    image: 'https://via.placeholder.com/300x200'
  },
  {
    id: 6,
    name: 'Pet Grooming',
    category: 'Personal Care',
    provider: 'Furry Friends Care',
    rating: 4.8,
    price: '$30/hr',
    description: 'Professional pet grooming and care services',
    image: 'https://via.placeholder.com/300x200'
  }
];

const categories = [
  'All Services',
  'Home Services',
  'Tech Support',
  'Education',
  'Healthcare',
  'Personal Care',
  'Transportation',
  'Food & Dining',
  'Entertainment'
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'All Services' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.provider.toLowerCase().includes(searchQuery.toLowerCase());
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
                    {categories.map(category => (
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
                  {selectedCategory} ({filteredServices.length} services)
                </h2>

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}