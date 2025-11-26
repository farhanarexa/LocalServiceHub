import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';

// Helper function to check if a review is within 24 hours of creation
const isWithin24Hours = (dateString) => {
  if (!dateString) return false;
  const reviewDate = new Date(dateString);
  const currentTime = new Date();
  const timeDiff = currentTime - reviewDate;
  const hoursDiff = timeDiff / (1000 * 60 * 60);
  return hoursDiff <= 24;
};

export default function ReviewModal({ booking, isOpen, onClose, onReviewSuccess }) {
  const { user, createReview, updateReview, getUserBookingReview } = useUser();
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [existingReview, setExistingReview] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  if (!isOpen) return null;

  // Check if user has already reviewed this booking
  useEffect(() => {
    if (isOpen && booking && user) {
      const checkExistingReview = async () => {
        try {
          setIsChecking(true);
          const { data: review } = await getUserBookingReview(booking.id, user.id);
          setExistingReview(review);

          // If there's an existing review, set the initial form values
          if (review) {
            setRating(review.rating);
            setReviewText(review.review_text || '');
          } else {
            // Reset to default if no existing review
            setRating(5);
            setReviewText('');
          }
        } catch (err) {
          console.error('Error checking existing review:', err);
          setError('Failed to check existing reviews. Please try again.');
        } finally {
          setIsChecking(false);
        }
      };

      checkExistingReview();
    }
  }, [isOpen, booking, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Check if existing review is within 24 hours before allowing edit
    if (existingReview && !isWithin24Hours(existingReview.created_at)) {
      setError('Reviews can only be edited within 24 hours of submission.');
      setLoading(false);
      return;
    }

    try {
      const reviewData = {
        booking_id: booking.id,
        rating: parseInt(rating),
        review_text: reviewText
      };

      let result;
      if (existingReview) {
        // Update existing review
        result = await updateReview(existingReview.id, reviewData);
      } else {
        // Create new review
        result = await createReview(reviewData);
      }

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
        disabled={loading}
      >
        ★
      </button>
    ));
  };

  if (isChecking) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div className="bg-card rounded-xl border border-border shadow-lg w-full max-w-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-lg">Loading review...</p>
        </div>
      </div>
    );
  }

  // Check if existing review is editable
  const isEditable = existingReview && isWithin24Hours(existingReview.created_at);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card rounded-xl border border-border shadow-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {existingReview ? 'Edit Your Review' : 'Review ' + (booking.service?.name || 'Service')}
            </h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
              disabled={loading}
            >
              ✕
            </button>
          </div>

          <p className="text-sm text-muted-foreground mb-2">
            {existingReview ? 'Edit your review for this service:' : 'How was your experience with this service?'}
          </p>

          {existingReview && (
            <div className="mb-4 p-3 bg-muted rounded-lg text-sm">
              <p className="font-medium">You previously submitted:</p>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < existingReview.rating ? 'text-yellow-500' : 'text-muted-foreground'}>
                    ★
                  </span>
                ))}
                <span className="ml-2">({existingReview.rating} stars)</span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Submitted on {new Date(existingReview.created_at).toLocaleString()}
                {!isEditable && (
                  <span className="block text-destructive mt-1">
                    Review cannot be edited after 24 hours.
                  </span>
                )}
              </div>
            </div>
          )}

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
                disabled={loading || (existingReview && !isEditable)}
                maxLength={500}
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
                className={`px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  existingReview && !isEditable
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
                disabled={loading || (existingReview && !isEditable)}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {existingReview ? 'Updating...' : 'Submitting...'}
                  </span>
                ) : (
                  existingReview && !isEditable
                    ? 'Cannot Edit'
                    : (existingReview ? 'Update Review' : 'Submit Review')
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}