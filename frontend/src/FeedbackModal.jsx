import React, { useState } from 'react';
import { MessageSquare, X, CheckCircle, AlertCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const FeedbackModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      const sanitizedEmail = email.trim().slice(0, 254);
      const sanitizedMessage = message.trim().slice(0, 1000);

      const response = await fetch(`${API_URL}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          email: sanitizedEmail,
          message: sanitizedMessage,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setEmail('');
          setMessage('');
          setStatus('');
        }, 2000);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isSubmitDisabled = !email || !message || !isValidEmail(email) || isSubmitting;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-6 h-6 text-gray-400" />
          <h2 className="text-xl font-bold text-gray-100">Send Feedback</h2>
        </div>
        
        {status === 'success' && (
          <div className="mb-4 p-4 bg-green-950/50 text-green-200 border border-green-900/50 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <p>Thank you for your feedback!</p>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-4 p-4 bg-red-950/50 text-red-200 border border-red-900/50 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <p>{errorMessage}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-100 placeholder-gray-500"
            />
            {email && !isValidEmail(email) && (
              <p className="mt-1 text-sm text-red-400">Please enter a valid email address</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
              Your Feedback
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you think..."
              required
              rows={4}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-100 placeholder-gray-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 ${
              isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;