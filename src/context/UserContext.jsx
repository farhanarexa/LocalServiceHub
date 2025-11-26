'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
// import supabase from '@/utils/supabaseClient';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const checkInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const authUser = session?.user || null;
      setUser(authUser);
      setLoading(false);

      // If user is authenticated, fetch their profile
      if (authUser) {
        try {
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .single();

          if (error && error.code !== 'PGRST116') { // PGRST116 means no rows returned
            console.error('Error fetching profile:', error);
          } else if (profileData) {
            // Update user object with profile data
            setUser({
              ...authUser,
              user_metadata: {
                ...authUser.user_metadata,
                ...profileData
              }
            });
          }
        } catch (err) {
          console.error('Error in useEffect:', err);
        }
      }

      // Listen for auth changes
      const { data: { subscription } } = await supabase.auth.onAuthStateChange(
        async (_event, session) => {
          const authUser = session?.user || null;
          setUser(authUser);

          // If user is authenticated, fetch their profile
          if (authUser) {
            try {
              const { data: profileData, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authUser.id)
                .single();

              if (error && error.code !== 'PGRST116') { // PGRST116 means no rows returned
                console.error('Error fetching profile:', error);
              } else if (profileData) {
                // Update user object with profile data
                setUser({
                  ...authUser,
                  user_metadata: {
                    ...authUser.user_metadata,
                    ...profileData
                  }
                });
              }
            } catch (err) {
              console.error('Error in auth state change:', err);
            }
          }
        }
      );

      // Clean up subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    };

    checkInitialSession();
  }, []);

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Login error:', error);
      return { data: null, error: error.message };
    }
  };

  const register = async (email, password, options = {}) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: options,
        },
      });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Register error:', error);
      return { data: null, error: error.message };
    }
  };

  const googleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        }
      });

      if (error) throw error;
    } catch (error) {
      console.error('Google login error:', error);
      return { error: error.message };
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Get user profile
  const getProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows returned
        throw error;
      }

      return { data, error: null };
    } catch (error) {
      console.error('Get profile error:', error);
      return { data: null, error: error.message };
    }
  };

  // Update user profile
  const updateProfile = async (userId, profileData) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          ...profileData,
          updated_at: new Date().toISOString()
        }, { onConflict: ['id'] });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Update profile error:', error);
      return { data: null, error: error.message };
    }
  };

  // Upload profile image
  const uploadProfileImage = async (userId, file) => {
    try {
      // Generate a unique filename using the user ID and timestamp
      const fileName = `${userId}/${Date.now()}_${file.name}`;

      const { data, error } = await supabase
        .storage
        .from('profile-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      // Get the public URL of the uploaded image
      const { data: { publicUrl } } = supabase
        .storage
        .from('profile-images')
        .getPublicUrl(fileName);

      return { publicUrl, error: null };
    } catch (error) {
      console.error('Upload profile image error:', error);
      return { publicUrl: null, error: error.message };
    }
  };

  // Delete profile image
  const deleteProfileImage = async (filePath) => {
    try {
      const { error } = await supabase
        .storage
        .from('profile-images')
        .remove([filePath]);

      if (error) throw error;

      return { error: null };
    } catch (error) {
      console.error('Delete profile image error:', error);
      return { error: error.message };
    }
  };

  // Create a new service
  const createService = async (serviceData) => {
    try {
      // If there's an image file to upload, do that first
      let finalServiceData = { ...serviceData };

      if (serviceData.image_file) {
        const { publicUrl, error: uploadError } = await uploadServiceImage(user.id, serviceData.image_file);

        if (uploadError) {
          throw new Error(`Image upload failed: ${uploadError}`);
        }

        // Add the image URL to the service data
        finalServiceData.image_url = publicUrl;

        // Remove the image file from the data to be stored in the database
        delete finalServiceData.image_file;
      }

      const { data, error } = await supabase
        .from('services')
        .insert([finalServiceData])
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Create service error:', error);
      return { data: null, error: error.message };
    }
  };

  // Upload service image to Supabase storage
  const uploadServiceImage = async (userId, file) => {
    try {
      // Generate a unique filename using the user ID and timestamp
      const fileName = `services/${userId}/${Date.now()}_${file.name}`;

      const { data, error } = await supabase
        .storage
        .from('service-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      // Get the public URL of the uploaded image
      const { data: { publicUrl } } = supabase
        .storage
        .from('service-images')
        .getPublicUrl(fileName);

      return { publicUrl, error: null };
    } catch (error) {
      console.error('Upload service image error:', error);
      return { publicUrl: null, error: error.message };
    }
  };

  // Get user's services
  const getUserServices = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Get user services error:', error);
      return { data: null, error: error.message };
    }
  };

  // Get all services
  const getAllServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('status', 'active'); // Only fetch active services

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Get all services error:', error);
      return { data: null, error: error.message };
    }
  };

  // Get a single service by ID
  const getServiceById = async (serviceId) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', serviceId)
        .eq('status', 'active')
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Get service by ID error:', error);
      return { data: null, error: error.message };
    }
  };

  // Create a booking for a service
  const createServiceBooking = async (bookingData) => {
    try {
      // First, get the service to get the provider ID
      const { data: serviceData } = await supabase
        .from('services')
        .select('user_id')
        .eq('id', bookingData.service_id)
        .single();

      if (!serviceData) {
        throw new Error('Service not found');
      }

      // Get current user's profile information from the profiles table to include in booking
      let user_email = null;
      let user_full_name = null;
      let user_phone = null;
      let user_location = null;

      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('email, name, phone, location')
          .eq('id', bookingData.user_id)
          .single();

        if (!profileError && profileData) {
          user_email = profileData.email || null;
          user_full_name = profileData.name || null; // Use 'name' not 'full_name' as per schema
          user_phone = profileData.phone || null;
          user_location = profileData.location || null;
        }
      } catch (err) {
        console.warn('Could not fetch user profile for booking:', err);
      }

      const fullBookingData = {
        ...bookingData,
        service_provider_id: serviceData.user_id,
        user_email,
        user_full_name,
        user_phone,
        user_location
      };

      const { data, error } = await supabase
        .from('bookings')
        .insert([fullBookingData])
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Create service booking error:', error);
      return { data: null, error: error.message };
    }
  };

  // Get user's bookings
  const getUserBookings = async (userId) => {
    try {
      // First, get all bookings for the user
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', userId)
        .order('booking_date', { ascending: false });

      if (bookingsError) throw bookingsError;

      if (bookingsData && bookingsData.length > 0) {
        // Extract unique service IDs to fetch service details
        const serviceIds = [...new Set(bookingsData.map(booking => booking.service_id))];

        // Fetch service details in a single query
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('id, name, price, category')
          .in('id', serviceIds);

        if (servicesError) {
          console.error('Error fetching service data:', servicesError);
          // Still return bookings even if service data fetch fails
          return { data: bookingsData, error: null };
        }

        // Add service data to each booking
        const bookingsWithServices = bookingsData.map(booking => {
          const service = servicesData.find(s => s.id === booking.service_id);
          return {
            ...booking,
            service: service || null // Changed from 'services' to 'service' to match the service requests page
          };
        });

        return { data: bookingsWithServices, error: null };
      }

      return { data: bookingsData || [], error: null };
    } catch (error) {
      console.error('Get user bookings error:', error);
      return { data: null, error: error.message };
    }
  };

  // Get service provider's bookings
  const getProviderBookings = async (providerId) => {
    try {
      // Get bookings with service info using a simple approach that should work
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .eq('service_provider_id', providerId)
        .order('booking_date', { ascending: false });

      if (bookingsError) throw bookingsError;

      if (bookingsData && bookingsData.length > 0) {
        // Get service details
        const serviceIds = [...new Set(bookingsData.map(booking => booking.service_id))];
        let servicesData = [];

        if (serviceIds.length > 0) {
          const { data: servicesResult, error: servicesError } = await supabase
            .from('services')
            .select('id, name, price, category')
            .in('id', serviceIds);

          if (!servicesError) {
            servicesData = servicesResult;
          }
        }

        // Format bookings with service info and stored user info
        const bookingsWithDetails = bookingsData.map(booking => {
          const service = servicesData.find(s => s.id === booking.service_id) || null;

          // Create a user object using the information stored in the booking
          // or available through other means
          const userObject = {
            email: booking.user_email || 'Email not available',
            user_metadata: {
              full_name: booking.user_full_name || null,
              phone: booking.user_phone || null,
              location: booking.user_location || null
            }
          };

          return {
            ...booking,
            service,
            user: userObject
          };
        });

        return { data: bookingsWithDetails, error: null };
      }

      return { data: bookingsData || [], error: null };
    } catch (error) {
      console.error('Get provider bookings error:', error);
      return { data: null, error: error.message };
    }
  };

  // Update booking status
  const updateBookingStatus = async (bookingId, status) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({
          booking_status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Update booking status error:', error);
      return { data: null, error: error.message };
    }
  };

  // Create a review for a completed booking - will be updated in the return

  // Get reviews for a service
  const getServiceReviews = async (serviceId) => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('service_id', serviceId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Get service reviews error:', error);
      return { data: null, error: error.message };
    }
  };

  // Get reviews for a service provider
  const getProviderReviews = async (providerId) => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('service_provider_id', providerId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Get provider reviews error:', error);
      return { data: null, error: error.message };
    }
  };

  // Get user's submitted reviews
  const getUserReviews = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('reviewer_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Get user reviews error:', error);
      return { data: null, error: error.message };
    }
  };

  // Update a review
  const updateReview = async (reviewId, reviewData) => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .update({
          ...reviewData,
          updated_at: new Date().toISOString()
        })
        .eq('id', reviewId)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Update review error:', error);
      return { data: null, error: error.message };
    }
  };

  // Delete a review
  const deleteReview = async (reviewId) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);

      if (error) throw error;

      return { error: null };
    } catch (error) {
      console.error('Delete review error:', error);
      return { error: error.message };
    }
  };

  // Update a service
  const updateService = async (serviceId, serviceData) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', serviceId)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Update service error:', error);
      return { data: null, error: error.message };
    }
  };

  // Delete a service
  const deleteService = async (serviceId) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);

      if (error) throw error;

      return { error: null };
    } catch (error) {
      console.error('Delete service error:', error);
      return { error: error.message };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    googleLogin,
    logout,
    getProfile,
    updateProfile,
    uploadProfileImage,
    deleteProfileImage,
    createService,
    getUserServices,
    getAllServices,
    getServiceById,
    createServiceBooking,
    getUserBookings,
    getProviderBookings,
    updateBookingStatus,
    createReview: async (reviewData) => {
      try {
        // Get booking info to get service details
        const { data: bookingData, error: bookingError } = await supabase
          .from('bookings')
          .select('service_id, service_provider_id')
          .eq('id', reviewData.booking_id)
          .single();

        if (bookingError) throw bookingError;

        if (!bookingData) {
          throw new Error('Booking not found');
        }

        const fullReviewData = {
          ...reviewData,
          service_id: bookingData.service_id,
          service_provider_id: bookingData.service_provider_id,
          reviewer_id: user?.id  // Add the current user as the reviewer
        };

        const { data, error } = await supabase
          .from('reviews')
          .insert([fullReviewData])
          .select()
          .single();

        if (error) throw error;

        return { data, error: null };
      } catch (error) {
        console.error('Create review error:', error);
        return { data: null, error: error.message };
      }
    },
    getServiceReviews,
    getProviderReviews,
    getUserReviews,
    updateReview,
    deleteReview,
    updateService,
    deleteService,
    uploadServiceImage,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}