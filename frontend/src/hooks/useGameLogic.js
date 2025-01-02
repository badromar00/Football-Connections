import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../constants';
import { getTodayString, arrangeWordsIn4x4, shuffleArray } from '../utils';

export const useGameLogic = (GAME_DATA) => {
  const [words, setWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [solvedGroups, setSolvedGroups] = useState([]);
  const [attemptsLeft, setAttemptsLeft] = useState(GAME_DATA.maxAttempts);
  const [message, setMessage] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [todayGroups, setTodayGroups] = useState([]);
  const [revealingGroups, setRevealingGroups] = useState([]);
  const [isRevealing, setIsRevealing] = useState(false);
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [hasStartedReveal, setHasStartedReveal] = useState(false);
  const [startTime, setStartTime] = useState(null);

  // Initialize start time when game begins
  useEffect(() => {
    if (!startTime && words.length > 0) {
      setStartTime(Date.now());
    }
  }, [words]);

  const getTodayGameData = () => {
    const today = getTodayString();
    return GAME_DATA.groupsByDate[today] || Object.values(GAME_DATA.groupsByDate)[0];
  };

  // Load saved game state
  useEffect(() => {
    const savedDate = localStorage.getItem(STORAGE_KEYS.GAME_DATE);
    const today = getTodayString();

    if (savedDate !== today) {
      // New day, clear previous game state
      localStorage.clear();
      localStorage.setItem(STORAGE_KEYS.GAME_DATE, today);
      
      // Initialize new game
      const groups = getTodayGameData();
      setTodayGroups(groups);
      const allWords = groups.flatMap(group => group.words);
      const arrangedWords = arrangeWordsIn4x4(shuffleArray(allWords));
      setWords(arrangedWords);
      localStorage.setItem(STORAGE_KEYS.WORDS, JSON.stringify(arrangedWords));
    } else {
      // Load saved game state
      const savedWords = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORDS));
      const savedSelectedWords = JSON.parse(localStorage.getItem(STORAGE_KEYS.SELECTED_WORDS) || '[]');
      const savedSolvedGroups = JSON.parse(localStorage.getItem(STORAGE_KEYS.SOLVED_GROUPS) || '[]');
      const savedAttemptsLeft = parseInt(localStorage.getItem(STORAGE_KEYS.ATTEMPTS_LEFT)) || GAME_DATA.maxAttempts;
      const savedGameOver = JSON.parse(localStorage.getItem(STORAGE_KEYS.GAME_OVER) || 'false');
      const savedPreviousGuesses = JSON.parse(localStorage.getItem(STORAGE_KEYS.PREVIOUS_GUESSES) || '[]');
      const savedRevealingGroups = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVEALING_GROUPS) || '[]');
      const savedHasStartedReveal = JSON.parse(localStorage.getItem(STORAGE_KEYS.HAS_STARTED_REVEAL) || 'false');

      const groups = getTodayGameData();
      setTodayGroups(groups);
      setWords(savedWords || arrangeWordsIn4x4(shuffleArray(groups.flatMap(group => group.words))));
      setSelectedWords(savedSelectedWords);
      setSolvedGroups(savedSolvedGroups);
      setAttemptsLeft(savedAttemptsLeft);
      setGameOver(savedGameOver);
      setPreviousGuesses(savedPreviousGuesses);
      setRevealingGroups(savedRevealingGroups);
      setHasStartedReveal(savedHasStartedReveal);
    }
  }, []);

  const handleWordClick = (word) => {
    if (gameOver || solvedGroups.some(group => group.words.includes(word))) {
      return;
    }
  
    setSelectedWords(prev => {
      const newSelected = prev.includes(word) 
        ? prev.filter(w => w !== word)
        : prev.length < 4 ? [...prev, word] : prev;
      
      localStorage.setItem(STORAGE_KEYS.SELECTED_WORDS, JSON.stringify(newSelected));
      return newSelected;
    });
  
    setMessage(null);
  };

  const startRevealAnimation = async () => {
    if (isRevealing || revealingGroups.length > 0) return;
    
    setIsRevealing(true);
    
    const unsolvedGroups = todayGroups.filter(
      group => !solvedGroups.includes(group)
    );

    if (unsolvedGroups.length === 0) {
      setIsRevealing(false);
      return;
    }

    const sortedGroups = unsolvedGroups.sort((a, b) => 
      a.category.localeCompare(b.category)
    );

    setRevealingGroups([]);
    
    for (let i = 0; i < sortedGroups.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRevealingGroups(prev => [...prev, sortedGroups[i]]);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRevealing(false);
  };

  const checkSelection = async () => {
    if (selectedWords.length !== 4) {
      setMessage({ type: 'error', text: 'Select exactly 4 words' });
      return;
    }
  
    const selectionKey = selectedWords.sort().join(',');
    if (previousGuesses.includes(selectionKey)) {
      setMessage({ type: 'error', text: 'Already guessed this combination' });
      return;
    }
  
    setPreviousGuesses(prev => {
      const newGuesses = [...prev, selectionKey];
      localStorage.setItem(STORAGE_KEYS.PREVIOUS_GUESSES, JSON.stringify(newGuesses));
      return newGuesses;
    });
  
    const matchingGroup = todayGroups.find(group => 
      selectedWords.every(word => group.words.includes(word)) &&
      !solvedGroups.includes(group)
    );
  
    if (matchingGroup) {
      const newSolvedGroups = [...solvedGroups, matchingGroup];
      setSolvedGroups(newSolvedGroups);
      localStorage.setItem(STORAGE_KEYS.SOLVED_GROUPS, JSON.stringify(newSolvedGroups));
      setSelectedWords([]);
      localStorage.setItem(STORAGE_KEYS.SELECTED_WORDS, JSON.stringify([]));
      setMessage({ type: 'success', text: `Correct! Category: ${matchingGroup.category}` });
  
      if (newSolvedGroups.length === todayGroups.length) {
        setMessage({ type: 'success', text: 'Congratulations! You won!' });
        return { gameWon: true, timeSpent: Math.floor((Date.now() - startTime) / 1000) };
      }
    } else {
      const almostMatchingGroup = todayGroups.find(group => 
        selectedWords.filter(word => group.words.includes(word)).length === 3 &&
        !solvedGroups.includes(group)
      );
  
      const newAttemptsLeft = attemptsLeft - 1;
      setAttemptsLeft(newAttemptsLeft);
      localStorage.setItem(STORAGE_KEYS.ATTEMPTS_LEFT, JSON.stringify(newAttemptsLeft));
      
      if (almostMatchingGroup) {
        setMessage({ type: 'error', text: 'Almost! One away!' });
      } else {
        setMessage({ type: 'error', text: 'Incorrect combination' });
      }
      
      setSelectedWords([]);
      localStorage.setItem(STORAGE_KEYS.SELECTED_WORDS, JSON.stringify([]));

      if (newAttemptsLeft <= 0) {
        setMessage({ type: 'error', text: 'Game Over! Out of attempts' });
        return { gameWon: false, timeSpent: Math.floor((Date.now() - startTime) / 1000) };
      }
    }
    return null;
  };

  return {
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
  };
}; 