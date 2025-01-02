import React, { useState, useEffect } from 'react';
import { X, Share2 } from 'lucide-react';

const GameOverModal = ({ isOpen, onClose, didWin, attemptsLeft }) => {
  const [timeUntilNext, setTimeUntilNext] = useState('');
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    const calculateTimeUntilMidnight = () => {
      const now = new Date();
      const pst = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
      const tomorrow = new Date(pst);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diffMs = tomorrow - pst;
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const timer = setInterval(() => {
      setTimeUntilNext(calculateTimeUntilMidnight());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl shadow-xl">
        <div className="p-6 relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">
            Game Over
          </h2>

          {/* Game result message */}
          <div className="text-center mb-8">
            {didWin ? (
              <p className="text-green-400 text-lg font-bold">
                Congratulations! You found all connections!
              </p>
            ) : (
              <p className="text-red-400 text-lg font-bold">
                Better luck next time!
              </p>
            )}
          </div>

          {/* Timer */}
          <div className="text-center mb-8">
            <p className="text-gray-400 mb-2">Next puzzle in</p>
            <p className="text-2xl font-mono font-bold text-white">
              {timeUntilNext}
            </p>
          </div>

          {/* Share button */}
          <div className="flex justify-center">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
            >
              <Share2 className="w-5 h-5" />
              {showCopied ? 'Copied!' : 'Share'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;