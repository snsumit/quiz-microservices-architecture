import { useState } from 'react';
import { LandingPage } from './components/landing-page';
import { QuizCreation } from './components/quiz-creation';
import { QuizTaking } from './components/quiz-taking';
import { QuizResults } from './components/quiz-results';

type Screen = 'landing' | 'creation' | 'taking' | 'results';

interface QuizConfig {
  category: string;
  title: string;
  numberOfQuestions: number;
}

interface QuizAnswer {
  questionIndex: number;
  selectedOption: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [score, setScore] = useState(0);

  const handleGetStarted = () => {answers
    setCurrentScreen('creation');
  };

  const handleQuizCreated = (config: QuizConfig) => {
    setQuizConfig(config);
    setAnswers([]);
    setCurrentScreen('taking');
  };

  const handleQuizCompleted = (finalAnswers: QuizAnswer[], finalScore: number) => {
    setAnswers(finalAnswers);
    setScore(finalScore);
    setCurrentScreen('results');
  };

  const handleRetry = () => {
    setAnswers([]);
    setCurrentScreen('taking');
  };

  const handleGoHome = () => {
    setQuizConfig(null);
    setAnswers([]);
    setScore(0);
    setCurrentScreen('landing');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {currentScreen === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}
      {currentScreen === 'creation' && (
        <QuizCreation onQuizCreated={handleQuizCreated} />
      )}
      {currentScreen === 'taking' && quizConfig && (
        <QuizTaking
          config={quizConfig}
          onQuizCompleted={handleQuizCompleted}
        />
      )}
      {currentScreen === 'results' && quizConfig && (
        <QuizResults
          score={score}
          totalQuestions={quizConfig.numberOfQuestions}
          onRetry={handleRetry}
          onGoHome={handleGoHome}
        />
      )}
    </div>
  );
}