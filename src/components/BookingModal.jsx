'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';

export default function BookingModal({ service, isOpen, onClose, onBookingSuccess }) {
  const { user, createServiceBooking } = useUser();
  const [bookingDate, setBookingDate] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!bookingDate) {
      setError('Please select a booking date and time');
      setLoading(false);
      return;
    }

    try {
      const bookingData = {
        user_id: user.id,
        service_id: service.id,
        booking_date: new Date(bookingDate).toISOString(),
        booking_notes: notes,
        booking_status: 'pending'
      };

      const result = await createServiceBooking(bookingData);

      if (result.error) {
        throw new Error(result.error);
      }

      setSuccess(true);

      // Wait a bit before closing to show success message
      setTimeout(() => {
        onBookingSuccess();
        onClose();
        setLoading(false);
        setSuccess(false);
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to create booking. Please try again.');
      setLoading(false);
      console.error('Booking error:', err);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card rounded-xl border border-border shadow-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Book {service.name}</h2>
            <button 
              onClick={onClose} 
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Service
              </label>
              <div className="p-3 bg-muted rounded-lg">
                {service.name}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="bookingDate" className="block text-sm font-medium mb-2">
                Booking Date & Time *
              </label>
              <input
                type="datetime-local"
                id="bookingDate"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                min={new Date().toISOString().slice(0, 16)} // Prevent past dates
              />
            </div>

            <div className="mb-4">
              <label htmlFor="notes" className="block text-sm font-medium mb-2">
                Additional Notes
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="3"
                className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="Any special requirements or details..."
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Booking confirmed! The service provider will contact you soon.
              </div>
            )}

            {!success && (
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Booking...
                    </span>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}