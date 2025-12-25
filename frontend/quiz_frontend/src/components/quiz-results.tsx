import { Button } from './button';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
  onGoHome: () => void;
}

export function QuizResults({ score, totalQuestions, onRetry, onGoHome }: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getResultMessage = () => {
    if (percentage >= 80) return 'Excellent!';
    if (percentage >= 60) return 'Great Job!';
    if (percentage >= 40) return 'Good Effort!';
    return 'Keep Practicing!';
  };

  const getResultColor = () => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getResultIcon = () => {
    if (percentage >= 60) {
      return <CheckCircle2 className="w-16 h-16 text-green-500" />;
    }
    return <XCircle className="w-16 h-16 text-red-500" />;
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {getResultIcon()}
          </div>
          <h1 className={`mb-2 ${getResultColor()}`}>{getResultMessage()}</h1>
          <p className="text-gray-500">You've completed the quiz</p>
        </div>

        {/* Score Display */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <div className="inline-flex items-baseline gap-2">
              <span className="text-gray-900" style={{ fontSize: '3rem' }}>{score}</span>
              <span className="text-gray-500">/ {totalQuestions}</span>
            </div>
            <p className="text-gray-600 mt-2">Correct Answers</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-center text-gray-500 mt-2">{percentage}% Score</p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button variant="primary" onClick={onRetry} fullWidth>
            Retry Quiz
          </Button>
          <Button variant="secondary" onClick={onGoHome} fullWidth>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
