'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { Clock, MapPin, MessageSquare, Calendar, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import PrivateRoute from '@/components/PrivateRoute';

export default function MyBookingsPage() {
  return (
    <PrivateRoute>
      <MyBookingsContent />
    </PrivateRoute>
  );
}

function MyBookingsContent() {
  const { user, getUserBookings } = useUser();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (user) {
        try {
          setLoading(true);
          const result = await getUserBookings(user.id);
          
          if (result.error) {
            setError(result.error);
          } else {
            setBookings(result.data || []);
          }
        } catch (err) {
          setError(err.message);
          console.error('Error fetching bookings:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBookings();
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'pending':
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  if (loading) {
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
                <div className="flex justify-between items-start mb-4">
                  <div className="h-6 bg-muted rounded w-1/3"></div>
                  <div className="h-6 bg-muted rounded w-16"></div>
                </div>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3 mb-4"></div>
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

  if (error) {
    return (
      <div className="min-h-screen bg-background dark:bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Error Loading Bookings</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Link href="/services" className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90">
            Browse Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground mt-2">View and manage your service bookings</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Your Bookings</h2>
              <p className="text-muted-foreground">{bookings.length} booking{bookings.length !== 1 ? 's' : ''} found</p>
            </div>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-foreground/50" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
            <p className="text-muted-foreground mb-4">You haven't booked any services yet</p>
            <Link href="/services" className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-card rounded-xl border border-border shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{booking.services?.name || 'Service'}</h3>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded ${getStatusColor(booking.booking_status)}`}>
                        {getStatusIcon(booking.booking_status)}
                        {booking.booking_status.charAt(0).toUpperCase() + booking.booking_status.slice(1)}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">{booking.services?.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{booking.services?.price}</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(booking.booking_date).toLocaleString()}
                    </div>
                  </div>
                </div>

                {booking.booking_notes && (
                  <div className="mb-4 p-4 bg-muted rounded-lg">
                    <div className="flex items-start">
                      <MessageSquare className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Notes</p>
                        <p className="text-sm">{booking.booking_notes}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    Booked: {new Date(booking.created_at).toLocaleDateString()}
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