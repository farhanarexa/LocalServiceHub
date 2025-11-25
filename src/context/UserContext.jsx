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

      const fullBookingData = {
        ...bookingData,
        service_provider_id: serviceData.user_id
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
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', userId)
        .order('booking_date', { ascending: false });

      if (error) throw error;

      // If we need service details, fetch them separately to avoid complex joins
      if (data && data.length > 0) {
        const serviceIds = data.map(booking => booking.service_id);
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('id, name, price, category')
          .in('id', serviceIds);

        if (!servicesError && servicesData) {
          // Add service details to each booking
          const bookingsWithServices = data.map(booking => {
            const service = servicesData.find(s => s.id === booking.service_id);
            return {
              ...booking,
              services: service || null
            };
          });

          return { data: bookingsWithServices, error: null };
        }
      }

      // Return bookings without service details if service fetch fails
      return { data, error: null };
    } catch (error) {
      console.error('Get user bookings error:', error);
      return { data: null, error: error.message };
    }
  };

  // Get service provider's bookings
  const getProviderBookings = async (providerId) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('service_provider_id', providerId)
        .order('booking_date', { ascending: false });

      if (error) throw error;

      // If we need user details, fetch them separately to avoid complex joins
      if (data && data.length > 0) {
        const userIds = data.map(booking => booking.user_id);
        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('id, email')
          .in('id', userIds);

        if (!usersError && usersData) {
          // Add user details to each booking
          const bookingsWithUsers = data.map(booking => {
            const user = usersData.find(u => u.id === booking.user_id);
            return {
              ...booking,
              user: user || null
            };
          });

          return { data: bookingsWithUsers, error: null };
        }
      }

      // Return bookings without user details if user fetch fails
      return { data, error: null };
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