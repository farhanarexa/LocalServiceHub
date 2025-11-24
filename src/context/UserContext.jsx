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
      setUser(session?.user || null);
      setLoading(false);

      // Listen for auth changes
      const { data: { subscription } } = await supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user || null);
          setLoading(false);
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
      const { data, error } = await supabase
        .from('services')
        .insert([serviceData])
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Create service error:', error);
      return { data: null, error: error.message };
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
    updateService,
    deleteService,
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