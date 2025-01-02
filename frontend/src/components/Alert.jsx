import { AlertCircle, Check } from 'lucide-react';
import { STYLES } from '../constants';

const Alert = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mb-4">
      <div className={`${STYLES.ALERT[message.type]} p-3 rounded-xl flex items-center gap-2 backdrop-blur-sm text-sm sm:text-base sm:p-4`}>
        {message.type === 'error' ? 
          <AlertCircle className="h-4 w-4" /> : 
          <Check className="h-4 w-4" />
        }
        <span>{message.text}</span>
      </div>
    </div>
  );
};

export default Alert; 