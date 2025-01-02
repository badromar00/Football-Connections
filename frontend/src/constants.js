// Storage keys for local storage
export const STORAGE_KEYS = {
  SELECTED_WORDS: 'connections_selected_words',
  SOLVED_GROUPS: 'connections_solved_groups',
  ATTEMPTS_LEFT: 'connections_attempts_left',
  GAME_OVER: 'connections_game_over',
  GAME_DATE: 'connections_game_date',
  PREVIOUS_GUESSES: 'connections_previous_guesses',
  WORDS: 'connections_words',
  REVEALING_GROUPS: 'connections_revealing_groups',
  HAS_STARTED_REVEAL: 'connections_has_started_reveal'
};

// Style constants
export const STYLES = {
  ALERT: {
    error: 'bg-red-950/50 text-red-200 border border-red-900/50',
    success: 'bg-green-950/50 text-green-200 border border-green-900/50'
  },
  BUTTON: {
    primary: 'px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700'
  },
  WORD_TILE: {
    base: 'min-h-[7rem] sm:min-h-[5rem] py-5 px-3 sm:p-4 flex items-center justify-center font-bold rounded-lg transition-all duration-200',
    selected: 'bg-blue-500/20 ring-2 ring-blue-400 text-blue-200',
    unselected: 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700',
    disabled: 'opacity-50 cursor-not-allowed',
    enabled: 'hover:scale-105'
  }
}; 