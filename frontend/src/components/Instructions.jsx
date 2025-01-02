const Instructions = ({ show, maxAttempts }) => {
  if (!show) return null;

  return (
    <div className="mb-4 p-2 sm:p-4 rounded-xl bg-gray-800/50 border border-gray-700 text-sm sm:text-base">
      <h2 className="font-bold mb-2">How to Play</h2>
      <p className="text-gray-300">
        Find groups of 4 related players. Select 4 players and submit them together to discover categories. 
        Be careful - you only have {maxAttempts} attempts!
      </p>
    </div>
  );
};

export default Instructions; 