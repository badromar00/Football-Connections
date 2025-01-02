import { getWordStyles } from '../utils';
import { STYLES } from '../constants';

const WordTile = ({ word, isSelected, onClick, disabled }) => {
  const { textSizeClass, layoutClass, words } = getWordStyles(word);
  
  return (
    <button
      onClick={onClick}
      className={`
        ${STYLES.WORD_TILE.base}
        ${layoutClass}
        ${isSelected ? STYLES.WORD_TILE.selected : STYLES.WORD_TILE.unselected}
        ${disabled ? STYLES.WORD_TILE.disabled : STYLES.WORD_TILE.enabled}
      `}
      disabled={disabled}
    >
      {words.map((wordPart, idx) => (
        <span key={idx} className={`text-center ${textSizeClass} w-full px-1`}>
          {wordPart}
        </span>
      ))}
    </button>
  );
};

const SolvedGroup = ({ group, isRevealing, revealIndex }) => {
  return (
    <div 
      className={`
        p-3 sm:p-4 rounded-xl ${group.color} backdrop-blur-sm shadow-lg
        transform transition-all duration-500 ease-in-out
        ${isRevealing ? 'animate-reveal opacity-100 translate-y-0' : ''}
      `}
    >
      <p className="text-white font-bold mb-3 px-2 text-center text-sm sm:text-base">
        {group.category}
      </p>
      <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
        {group.words.map((word, wordIndex) => {
          const { textSizeClass, layoutClass, words } = getWordStyles(word);
          return (
            <div
              key={wordIndex}
              className={`
                min-h-[7rem] sm:min-h-[5rem]
                py-5 px-3 sm:p-4
                flex items-center justify-center ${layoutClass}
                font-bold rounded-lg
                bg-white/10 backdrop-blur-sm
                transform transition-all duration-500 delay-${wordIndex * 100}
                ${isRevealing ? 'animate-reveal-word opacity-100 scale-100' : ''}
              `}
            >
              {words.map((wordPart, idx) => (
                <span key={idx} className={`text-center ${textSizeClass} w-full px-1`}>
                  {wordPart}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const WordGrid = ({ 
  words, 
  selectedWords, 
  solvedGroups, 
  revealingGroups, 
  gameOver, 
  onWordClick 
}) => {
  const organizeWords = () => {
    const sections = [];
    
    // Add solved groups
    solvedGroups.forEach((group) => {
      sections.push({
        type: 'solved',
        words: group.words,
        category: group.category,
        color: group.color
      });
    });
    
    // Add revealing groups
    revealingGroups.forEach((group) => {
      sections.push({
        type: 'solved',
        words: group.words,
        category: group.category,
        color: group.color
      });
    });
    
    // Add remaining unsolved words
    const solvedAndRevealingWords = [...solvedGroups, ...revealingGroups]
      .flatMap(group => group.words);
    
    const remainingWords = words.filter(word => 
      !solvedAndRevealingWords.includes(word)
    );
    
    if (remainingWords.length > 0) {
      sections.push({
        type: 'unsolved',
        words: remainingWords
      });
    }
    
    return sections;
  };

  const renderSection = (section, sectionIndex) => {
    if (section.type === 'solved') {
      return (
        <SolvedGroup
          key={sectionIndex}
          group={section}
          isRevealing={revealingGroups.includes(section)}
          revealIndex={revealingGroups.indexOf(section)}
        />
      );
    }

    return (
      <div key={sectionIndex} className="grid grid-cols-4 gap-1.5 sm:gap-3">
        {section.words.map((word, wordIndex) => (
          <WordTile
            key={wordIndex}
            word={word}
            isSelected={selectedWords.includes(word)}
            onClick={() => onWordClick(word)}
            disabled={gameOver}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {organizeWords().map((section, index) => renderSection(section, index))}
    </div>
  );
};

export default WordGrid; 