'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { Clock, MapPin, MessageSquare, Calendar, User, CheckCircle, XCircle, AlertCircle, Check, X } from 'lucide-react';
import PrivateRoute from '@/components/PrivateRoute';

export default function ServiceRequestsPage() {
  return (
    <PrivateRoute>
      <ServiceRequestsContent />
    </PrivateRoute>
  );
}

function ServiceRequestsContent() {
  const { user, getProviderBookings, updateBookingStatus } = useUser();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      if (user) {
        try {
          setLoading(true);
          const result = await getProviderBookings(user.id);
          
          if (result.error) {
            setError(result.error);
          } else {
            setRequests(result.data || []);
          }
        } catch (err) {
          setError(err.message);
          console.error('Error fetching service requests:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRequests();
  }, [user]);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const result = await updateBookingStatus(bookingId, newStatus);
      
      if (result.error) {
        throw new Error(result.error);
      }

      // Update the local state
      setRequests(prevRequests => 
        prevRequests.map(request => 
          request.id === bookingId 
            ? { ...request, booking_status: newStatus } 
            : request
        )
      );
      
      // Show success notification
      console.log(`Booking status updated to ${newStatus}`);
    } catch (err) {
      console.error('Error updating booking status:', err);
      alert('Failed to update booking status. Please try again.');
    }
  };

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
          <h1 className="text-2xl font-bold text-destructive mb-2">Error Loading Service Requests</h1>
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
          <h1 className="text-3xl md:text-4xl font-bold">Service Requests</h1>
          <p className="text-muted-foreground mt-2">Manage incoming service booking requests</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Booking Requests</h2>
              <p className="text-muted-foreground">{requests.length} request{requests.length !== 1 ? 's' : ''} found</p>
            </div>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-foreground/50" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No service requests yet</h3>
            <p className="text-muted-foreground mb-4">You don&apos;t have any incoming booking requests</p>
            <Link href="/services" className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              View My Services
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {requests.map((request) => (
              <div key={request.id} className="bg-card rounded-xl border border-border shadow-sm p-6">
                {/* Service Information */}
                <div className="mb-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <h3 className="text-xl font-semibold mb-2">{request.service?.name || 'Service'}</h3>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Category: </span>
                      <span>{request.service?.category || 'Uncategorized'}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Price: </span>
                      <span className="font-medium text-primary">{request.service?.price || 'Price N/A'}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status: </span>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded ${getStatusColor(request.booking_status)}`}>
                        {getStatusIcon(request.booking_status)}
                        {request.booking_status.charAt(0).toUpperCase() + request.booking_status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customer information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Customer Information
                    </p>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-muted-foreground">Email: </span>{request.user?.email || request.user_email || 'Email not available'}</p>

                      {/* Try multiple sources for user name */}
                      {(request.user?.user_metadata?.full_name || request.user_full_name) && (
                        <p><span className="text-muted-foreground">Name: </span>{request.user?.user_metadata?.full_name || request.user_full_name}</p>
                      )}

                      {/* Try multiple sources for phone */}
                      {(request.user?.user_metadata?.phone || request.user_phone) && (
                        <p><span className="text-muted-foreground">Phone: </span>{request.user?.user_metadata?.phone || request.user_phone}</p>
                      )}

                      {/* Try multiple sources for location */}
                      {(request.user?.user_metadata?.location || request.user_location) && (
                        <p><span className="text-muted-foreground">Location: </span>{request.user?.user_metadata?.location || request.user_location}</p>
                      )}

                      {/* Show when no contact info is available */}
                      {!request.user?.email && !request.user_email &&
                       !request.user?.user_metadata?.full_name && !request.user_full_name &&
                       !request.user?.user_metadata?.phone && !request.user_phone &&
                       !request.user?.user_metadata?.location && !request.user_location && (
                        <p className="text-sm text-muted-foreground italic">Contact information not available</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Service Details</p>
                    <div className="space-y-1 text-sm">
                      <p className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Service Date: </span>
                        {new Date(request.booking_date).toLocaleString()}
                      </p>
                      <p className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Requested: </span>
                        {new Date(request.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {request.booking_notes && (
                  <div className="mb-4 p-4 bg-muted rounded-lg">
                    <div className="flex items-start">
                      <MessageSquare className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Customer Notes</p>
                        <p className="text-sm">{request.booking_notes}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                  {/* Status management for service provider */}
                  <div className="flex gap-2 ml-auto">
                    {request.booking_status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(request.id, 'confirmed')}
                          className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                        >
                          <Check className="h-4 w-4" />
                          Confirm
                        </button>
                        <button
                          onClick={() => handleStatusChange(request.id, 'cancelled')}
                          className="flex items-center gap-1 px-3 py-1 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors text-sm"
                        >
                          <X className="h-4 w-4" />
                          Decline
                        </button>
                      </>
                    )}

                    {request.booking_status === 'confirmed' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(request.id, 'completed')}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        >
                          <Check className="h-4 w-4" />
                          Mark as Completed
                        </button>
                        <button
                          onClick={() => handleStatusChange(request.id, 'cancelled')}
                          className="flex items-center gap-1 px-3 py-1 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors text-sm"
                        >
                          <X className="h-4 w-4" />
                          Cancel
                        </button>
                      </>
                    )}
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