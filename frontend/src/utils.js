// Get today's date string in YYYY-MM-DD format
export const getTodayString = () => new Date().toISOString().split('T')[0];

// Shuffle an array using Fisher-Yates algorithm
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Arrange words in a 4x4 grid
export const arrangeWordsIn4x4 = (words) => {
  return words.slice(0, 16);
};

// Get word display styles based on word characteristics
export const getWordStyles = (word) => {
  const words = word.split(' ');
  const maxLength = Math.max(...words.map(w => w.length));
  const isMultiWord = words.length > 1;
  
  // Base text size on the longest word length and number of words
  let textSizeClass = 'text-xs sm:text-base'; // default size
  
  if (isMultiWord) {
    if (words.length >= 3) {
      textSizeClass = 'text-[0.6rem] sm:text-xs';
    } else if (maxLength > 10) {
      textSizeClass = 'text-[0.65rem] sm:text-sm';
    } else {
      textSizeClass = 'text-xs sm:text-base';
    }
  } else {
    if (maxLength > 12) {
      textSizeClass = 'text-[0.6rem] sm:text-xs';
    } else if (maxLength > 8) {
      textSizeClass = 'text-[0.65rem] sm:text-sm';
    }
  }

  // For multi-word entries, use flex column layout with more spacing
  const layoutClass = isMultiWord ? 'flex-col space-y-1.5' : '';
  
  return {
    textSizeClass,
    layoutClass,
    words: isMultiWord ? words : [word]
  };
}; 