'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { Plus, Edit3, Eye, Trash2, Calendar, MapPin, Star, ExternalLink } from 'lucide-react';
import PrivateRoute from '@/components/PrivateRoute';
import { serviceCategories } from '@/utils/categories';

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
  return (
    <PrivateRoute>
      <MyServicesContent />
    </PrivateRoute>
  );
}

function MyServicesContent() {
  const { user, loading, getUserServices, deleteService, updateService } = useUser();
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    const fetchUserServices = async () => {
      if (user) {
        try {
          setLoadingServices(true);
          const { data: userServices, error } = await getUserServices(user.id);

          if (error) {
            console.error('Error fetching user services:', error);
          } else {
            setServices(userServices || []);
          }
        } catch (error) {
          console.error('Error in fetchUserServices:', error);
        } finally {
          setLoadingServices(false);
        }
      }
    };

    fetchUserServices();
  }, [user]);

  // Sorting function
  const sortedServices = [...services].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    // Handle special cases for sorting
    let comparison = 0;

    if (sortConfig.key === 'created_at' || sortConfig.key === 'createdAt') {
      // Sort dates
      const aDate = new Date(aValue);
      const bDate = new Date(bValue);
      comparison = aDate.getTime() - bDate.getTime();
    } else if (sortConfig.key === 'rating') {
      // Sort ratings numerically
      comparison = parseFloat(aValue) - parseFloat(bValue);
    } else {
      // Sort strings
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      if (aStr < bStr) comparison = -1;
      else if (aStr > bStr) comparison = 1;
      else comparison = 0;
    }

    return sortConfig.direction === 'asc' ? comparison : -comparison;
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Function to get sort indicator
  const getSortIndicator = (columnName) => {
    if (sortConfig.key !== columnName) {
      return (
        <span className="ml-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </span>
      );
    }

    if (sortConfig.direction === 'asc') {
      return (
        <span className="ml-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </span>
      );
    } else {
      return (
        <span className="ml-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      );
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setIsEditModalOpen(true);
  };

  const handleDeleteService = async (serviceId) => {
    if (confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      const { error } = await deleteService(serviceId);
      if (error) {
        console.error('Error deleting service:', error);
        alert('Failed to delete service. Please try again.');
      } else {
        setServices(services.filter(service => service.id !== serviceId));
      }
    }
  };

  const handleUpdateService = async () => {
    if (!editingService) return;

    const { error } = await updateService(editingService.id, editingService);
    if (error) {
      console.error('Error updating service:', error);
      alert('Failed to update service. Please try again.');
    } else {
      setServices(services.map(s => s.id === editingService.id ? editingService : s));
      setIsEditModalOpen(false);
      setEditingService(null);
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

  // Edit Service Modal Component
  const EditServiceModal = () => {
    if (!isEditModalOpen || !editingService) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-card rounded-xl p-6 w-full max-w-md">
          <h3 className="text-xl font-semibold mb-4">Edit Service</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Service Name</label>
              <input
                type="text"
                value={editingService.name || ''}
                onChange={(e) => setEditingService({...editingService, name: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={editingService.category || ''}
                onChange={(e) => setEditingService({...editingService, category: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option value="">Select a category</option>
                {serviceCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={editingService.description || ''}
                onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="text"
                value={editingService.price || ''}
                onChange={(e) => setEditingService({...editingService, price: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={editingService.status || 'active'}
                onChange={(e) => setEditingService({...editingService, status: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setIsEditModalOpen(false);
                setEditingService(null);
              }}
              className="px-4 py-2 border border-border rounded-lg hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateService}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  };

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
            <p className="text-muted-foreground mb-4">You haven&apos;t listed any services yet</p>
            <Link href="/services/create" className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Create your first service
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    Service {getSortIndicator('name')}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handleSort('category')}
                  >
                    Category {getSortIndicator('category')}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handleSort('price')}
                  >
                    Price {getSortIndicator('price')}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handleSort('status')}
                  >
                    Status {getSortIndicator('status')}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handleSort('rating')}
                  >
                    Rating {getSortIndicator('rating')}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handleSort('created_at')}
                  >
                    Added Date {getSortIndicator('created_at')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {sortedServices.map((service, index) => (
                  <tr key={service.id} className={index % 2 === 0 ? 'bg-background' : 'bg-card'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-foreground">{service.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-foreground">{service.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-primary">{service.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        service.status === 'active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm">{service.rating || 0}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {new Date(service.created_at || service.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <Link
                          href={`/service/${service.id}`}
                          className="text-primary hover:text-primary/80"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleEditService(service)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Service Modal */}
      <EditServiceModal />
    </div>
  );
}