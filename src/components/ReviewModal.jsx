import { useState } from 'react';
import { useUser } from '@/context/UserContext';

export default function ReviewModal({ booking, isOpen, onClose, onReviewSuccess }) {
  const { createReview } = useUser();
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const reviewData = {
        booking_id: booking.id,
        rating: parseInt(rating),
        review_text: reviewText
      };

      const result = await createReview(reviewData);
      
      if (result.error) {
        throw new Error(result.error);
      }

      onReviewSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to submit review. Please try again.');
      console.error('Review submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  // Render star rating component
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => setRating(index + 1)}
        className={`text-2xl ${index < rating ? 'text-yellow-500' : 'text-muted-foreground'}`}
      >
        ★
      </button>
    ));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card rounded-xl border border-border shadow-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Review {booking.service?.name || 'Service'}</h2>
            <button 
              onClick={onClose} 
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>

          <p className="text-sm text-muted-foreground mb-2">
            How was your experience with this service?
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="flex items-center justify-center mb-2">
                {renderStars()}
              </div>
              <div className="text-center text-sm text-muted-foreground">
                {rating} Star{rating !== 1 ? 's' : ''}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="reviewText" className="block text-sm font-medium mb-2">
                Your Review (Optional)
              </label>
              <textarea
                id="reviewText"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows="4"
                className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="Share your experience with this service..."
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                {error}
              </div>
            )}

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
                    Submitting...
                  </span>
                ) : (
                  'Submit Review'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}