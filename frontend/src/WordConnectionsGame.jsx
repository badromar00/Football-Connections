import { useState } from 'react';
import GAME_DATA from './data';
import GameOverModal from './GameOverModal';
import FeedbackModal from './FeedbackModal';
import GameHeader from './components/GameHeader';
import WordGrid from './components/WordGrid';
import GameControls from './components/GameControls';
import Alert from './components/Alert';
import Instructions from './components/Instructions';
import { useGameLogic } from './hooks/useGameLogic';

const WordConnectionsGame = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');

  const {
    words,
    selectedWords,
    solvedGroups,
    attemptsLeft,
    message,
    gameOver,
    todayGroups,
    revealingGroups,
    isRevealing,
    hasStartedReveal,
    setHasStartedReveal,
    handleWordClick,
    checkSelection,
    startRevealAnimation,
    setGameOver,
    setMessage,
    setSelectedWords
  } = useGameLogic(GAME_DATA);

  const handleGameOver = async (isWin = false) => {
    if (gameOver) return;
    
    setGameOver(true);
    
    if (!hasStartedReveal) {
      setHasStartedReveal(true);
      
      if (!isWin) {
        await startRevealAnimation();
        setShowModal(true);
      } else {
        setShowModal(true);
      }
    }
  };

  const handleSubmit = async () => {
    const result = await checkSelection();
    if (result) {
      handleGameOver(result.gameWon);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-gray-100">
      <style jsx global>{`
        @keyframes reveal {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes reveal-word {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-reveal {
          animation: reveal 0.5s ease-out forwards;
        }
        
        .animate-reveal-word {
          animation: reveal-word 0.5s ease-out forwards;
        }
      `}</style>

      <div className="w-full max-w-2xl mx-auto px-2 py-3 sm:p-6">
        <GameHeader
          attemptsLeft={attemptsLeft}
          solvedGroupsCount={solvedGroups.length}
          onShowInstructions={() => setShowInstructions(!showInstructions)}
          onShowFeedback={() => setShowFeedback(true)}
        />

        <Instructions 
          show={showInstructions} 
          maxAttempts={GAME_DATA.maxAttempts} 
        />

        <Alert message={message} />

        <WordGrid
          words={words}
          selectedWords={selectedWords}
          solvedGroups={solvedGroups}
          revealingGroups={revealingGroups}
          gameOver={gameOver}
          onWordClick={handleWordClick}
        />

        <GameControls
          onClear={() => setSelectedWords([])}
          onSubmit={handleSubmit}
          selectedWordsCount={selectedWords.length}
          gameOver={gameOver}
        />

        <GameOverModal 
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          didWin={solvedGroups.length === todayGroups.length}
          attemptsLeft={attemptsLeft}
        />

        <FeedbackModal 
          isOpen={showFeedback}
          onClose={() => setShowFeedback(false)}
        />
      </div>
    </div>
  );
};

export default WordConnectionsGame;