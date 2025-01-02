import { STYLES } from '../constants';

const GameControls = ({ 
  onClear, 
  onSubmit, 
  selectedWordsCount, 
  gameOver 
}) => {
  return (
    <div className="flex justify-center gap-2 sm:gap-4 mt-4 sm:mt-6">
      <button
        onClick={onClear}
        className={STYLES.BUTTON.secondary}
        disabled={selectedWordsCount === 0 || gameOver}
      >
        Clear
      </button>
      <button
        onClick={onSubmit}
        className={STYLES.BUTTON.primary}
        disabled={selectedWordsCount !== 4 || gameOver}
      >
        Submit
      </button>
    </div>
  );
};

export default GameControls; 