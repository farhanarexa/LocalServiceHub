'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { MapPin, DollarSign, Tag, Calendar, Info, AlertCircle, CheckCircle, Upload } from 'lucide-react';
import PrivateRoute from '@/components/PrivateRoute';
import { serviceCategories } from '@/utils/categories';

export default function CreateServicePage() {
  return (
    <PrivateRoute>
      <CreateServiceContent />
    </PrivateRoute>
  );
}

function CreateServiceContent() {
  const router = useRouter();
  const { user, createService } = useUser();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    priceType: 'hourly',
    location: '', // This will be used in the description or additional fields if the DB column doesn't exist
    contactInfo: '', // This will be stored in description or would need DB column
    availability: '', // This will be stored in description or would need DB column
    status: 'active',
    image_file: null
  });

  const categories = serviceCategories;

  const priceTypes = [
    { value: 'hourly', label: 'Per Hour' },
    { value: 'fixed', label: 'Fixed Price' },
    { value: 'daily', label: 'Per Day' },
    { value: 'project', label: 'Project-Based' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Store the file for upload
      setFormData(prev => ({
        ...prev,
        image_file: file
      }));
    }
  };

  const formatPrice = (price, priceType) => {
    if (!price) return '';

    switch (priceType) {
      case 'hourly':
        return `$${price}/hr`;
      case 'daily':
        return `$${price}/day`;
      case 'fixed':
        return `$${price}`;
      case 'project':
        return `$${price} (project)`;
      default:
        return `$${price}`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Prepare service data with formatted price
      // Include all form fields, the createService function will handle image upload separately
      let description = formData.description;

      // If we have location, contact info, or availability, append them to the description
      // since they might not be separate columns in the database
      if (formData.location) {
        description += `\nLocation: ${formData.location}`;
      }
      if (formData.contactInfo) {
        description += `\nContact: ${formData.contactInfo}`;
      }
      if (formData.availability) {
        description += `\nAvailability: ${formData.availability}`;
      }

      const serviceData = {
        user_id: user.id,
        name: formData.name,
        category: formData.category,
        description: description.trim(),
        price: formatPrice(formData.price, formData.priceType),
        rating: 0, // Default rating - will be updated by reviews later
        status: formData.status,
        image_file: formData.image_file, // This will be processed by createService
      };

      // Call the create service function from UserContext
      const result = await createService(serviceData);

      if (result.error) {
        throw new Error(result.error);
      }

      setSuccess('Service created successfully!');

      // Redirect to my-services page after a short delay
      setTimeout(() => {
        router.push('/my-services');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to create service. Please try again.');
      console.error('Error creating service:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Create New Service</h1>
          <p className="text-muted-foreground mt-2">
            Fill out the form to list your service on LocalServiceHub
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 text-destructive mr-3" />
            <span className="text-destructive">{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
            <span className="text-green-500">{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border shadow-sm p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Service Name */}
            <div className="md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Service Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Info className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="e.g. Plumbing Repair, Computer Tutoring"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2">
                Category *
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none outline-none transition"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-2">
                Price *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Price Type */}
            <div>
              <label htmlFor="priceType" className="block text-sm font-medium mb-2">
                Price Type *
              </label>
              <select
                id="priceType"
                name="priceType"
                value={formData.priceType}
                onChange={handleChange}
                required
                className="w-full pl-3 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none outline-none transition"
              >
                {priceTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <label htmlFor="location" className="block text-sm font-medium mb-2">
                Service Location *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="e.g. City, State or Service Area"
                />
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                className="w-full pl-4 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="Describe your service in detail. What do you offer? What makes you different?"
              />
            </div>

            {/* Contact Info */}
            <div className="md:col-span-2">
              <label htmlFor="contactInfo" className="block text-sm font-medium mb-2">
                Contact Information
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="contactInfo"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="Phone number, email, or other contact method"
                />
              </div>
            </div>

            {/* Availability */}
            <div className="md:col-span-2">
              <label htmlFor="availability" className="block text-sm font-medium mb-2">
                Availability
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                </div>
                <textarea
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  rows="2"
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="e.g. Monday-Friday 9am-5pm, Weekend appointments available"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Service Image (Optional)
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-32 h-32 border-2 border-border border-dashed rounded-lg overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="image"
                    className="inline-block bg-accent text-foreground px-4 py-2 rounded-lg hover:bg-accent/80 transition-colors cursor-pointer"
                  >
                    Choose Image
                  </label>
                  <p className="mt-2 text-sm text-muted-foreground">
                    JPG, PNG, or GIF (Max 5MB)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                'Create Service'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}