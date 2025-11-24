'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { User, Mail, Calendar, MapPin, Phone, Edit3, Save, X, Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const { user, loading: authLoading, getProfile, updateProfile } = useUser();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    joinedDate: ''
  });
  const [tempData, setTempData] = useState({ ...profileData });
  const [error, setError] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          setLoadingProfile(true);
          const { data, error } = await getProfile(user.id);

          if (error && error !== 'PGRST116') { // PGRST116 means no rows returned
            throw new Error(error);
          }

          if (data) {
            const profile = {
              name: data.name || user.user_metadata?.name || user.email?.split('@')[0] || '',
              email: user.email || '',
              phone: data.phone || user.user_metadata?.phone || '',
              location: data.location || user.user_metadata?.location || '',
              bio: data.bio || user.user_metadata?.bio || '',
              joinedDate: user.created_at ? new Date(user.created_at).toLocaleDateString() : ''
            };
            setProfileData(profile);
            setTempData({ ...profile });
          } else {
            // If no profile exists, use fallback values
            const profile = {
              name: user.user_metadata?.name || user.email?.split('@')[0] || '',
              email: user.email || '',
              phone: user.user_metadata?.phone || '',
              location: user.user_metadata?.location || '',
              bio: user.user_metadata?.bio || '',
              joinedDate: user.created_at ? new Date(user.created_at).toLocaleDateString() : ''
            };
            setProfileData(profile);
            setTempData({ ...profile });
          }
        } catch (err) {
          console.error('Error fetching profile:', err);
          setError('Failed to load profile data');
        } finally {
          setLoadingProfile(false);
        }
      }
    };

    fetchProfile();
  }, [user, getProfile]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Cancel editing, revert to saved data
      setTempData({ ...profileData });
    } else {
      // Start editing, copy current data to temp
      setTempData({ ...profileData });
    }
  };

  const handleSave = async () => {
    setSaveLoading(true);
    setError('');

    try {
      const { data, error } = await updateProfile(user.id, {
        name: tempData.name,
        email: tempData.email,
        phone: tempData.phone,
        location: tempData.location,
        bio: tempData.bio,
      });

      if (error) throw new Error(error);

      // Update the profile data after successful save
      setProfileData({ ...tempData });
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to save profile data');
    } finally {
      setSaveLoading(false);
    }
  };

  if (authLoading || loadingProfile) {
    return (
      <div className="min-h-screen bg-background dark:bg-background">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <div className="h-16 bg-muted rounded mb-4"></div>
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
              <div className="md:col-span-2 bg-card p-6 rounded-xl border border-border shadow-sm">
                <div className="h-4 bg-muted rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-5/6 mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3 mb-6"></div>
                <div className="h-10 bg-muted rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">My Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your account information</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-destructive/10 text-destructive rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary w-24 h-24 rounded-full flex items-center justify-center mb-4">
                <User className="text-primary-foreground h-12 w-12" />
              </div>
              <h2 className="text-xl font-semibold">{profileData.name}</h2>
              <p className="text-muted-foreground text-sm">{profileData.email}</p>

              <div className="mt-4 text-left w-full pt-4">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{profileData.email}</span>
                </div>
                {profileData.phone && (
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{profileData.phone}</span>
                  </div>
                )}
                {profileData.location && (
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{profileData.location}</span>
                  </div>
                )}
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Joined {profileData.joinedDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="md:col-span-2 bg-card p-6 rounded-xl border border-border shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Profile Information</h2>
              <button
                onClick={handleEditToggle}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                {isEditing ? <><X className="h-4 w-4" /> Cancel</> : <><Edit3 className="h-4 w-4" /> Edit Profile</>}
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.name}
                    onChange={(e) => setTempData({...tempData, name: e.target.value})}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                ) : (
                  <p className="text-lg">{profileData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <p className="text-lg">{profileData.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={tempData.phone}
                    onChange={(e) => setTempData({...tempData, phone: e.target.value})}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                ) : (
                  <p className="text-lg">{profileData.phone || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.location}
                    onChange={(e) => setTempData({...tempData, location: e.target.value})}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                ) : (
                  <p className="text-lg">{profileData.location || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    value={tempData.bio}
                    onChange={(e) => setTempData({...tempData, bio: e.target.value})}
                    rows="4"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                ) : (
                  <p className="text-lg">{profileData.bio || 'No bio provided'}</p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={saveLoading}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saveLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}