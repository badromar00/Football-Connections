import { HelpCircle, MessageSquare } from 'lucide-react';
import { getTodayString } from '../utils';

const GameHeader = ({ 
  attemptsLeft, 
  solvedGroupsCount, 
  onShowInstructions, 
  onShowFeedback 
}) => {
  return (
    <div className="mb-4 sm:mb-8">
      {/* Title and date */}
      <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text text-center mb-2">
        Football Connections
      </h1>
      <p className="text-center text-sm sm:text-base text-gray-400 mb-3">
        {getTodayString()}
      </p>
      
      {/* Game stats */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base mb-3">
        <span className="px-2 py-1 sm:px-4 sm:py-1.5 bg-gray-800/50 rounded-lg border border-gray-700">
          Attempts: {attemptsLeft}
        </span>
        <span className="px-2 py-1 sm:px-4 sm:py-1.5 bg-gray-800/50 rounded-lg border border-gray-700">
          Found: {solvedGroupsCount}/4
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center gap-2">
        <button 
          onClick={onShowFeedback}
          className="text-gray-400 hover:text-gray-200 transition-colors"
        >
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button 
          onClick={onShowInstructions}
          className="text-gray-400 hover:text-gray-200 transition-colors"
        >
          <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
};

export default GameHeader; 