import { useState } from 'react';
import { Button } from './button';
import axios from 'axios';
import toast from 'react-hot-toast';
interface QuizCreationProps {
  onQuizCreated: (config: { category: string; title: string; numberOfQuestions: number }) => void;
}

const CATEGORIES = [
  'Python',
  'Java'
]  



export function QuizCreation({ onQuizCreated }: QuizCreationProps) {
  const [category, setCategory] = useState('Python');
  const [title, setTitle] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload  = {
      category,
      quizTitle: title.trim(),
      numOfQuestions:numberOfQuestions,
    };
    
    const result = await axios.post(`${(import.meta as any).env.VITE_APT_ENDPOINT}/quiz-service/quiz/create`, payload );
    if (result && result.status === 201 && result.data) {
       toast.success("Quiz created successfully!");
       localStorage.setItem('quizId', result.data);
       onQuizCreated({ category, title: title.trim(), numberOfQuestions });
    }
  };

  const incrementQuestions = () => {
    if (numberOfQuestions < 20) {
      setNumberOfQuestions(numberOfQuestions + 1);
    }
  };

  const decrementQuestions = () => {
    if (numberOfQuestions > 1) {
      setNumberOfQuestions(numberOfQuestions - 1);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h1 className="mb-8 text-center text-gray-900">Create Your Quiz</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div>
            <label htmlFor="category" className="block mb-3 text-gray-700">
              Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-3 rounded-xl border-2 transition-all ${
                    category === cat
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <p className="mt-2 text-gray-500">Select a category for your quiz</p>
          </div>

          {/* Quiz Title */}
          <div>
            <label htmlFor="title" className="block mb-3 text-gray-700">
              Quiz Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., World Capitals Challenge"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
              required
            />
            <p className="mt-2 text-gray-500">Give your quiz a memorable name</p>
          </div>

          {/* Number of Questions */}
          <div>
            <label htmlFor="questions" className="block mb-3 text-gray-700">
              Number of Questions
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={decrementQuestions}
                className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                aria-label="Decrease questions"
              >
                <span className="text-gray-600">−</span>
              </button>
              <div className="flex-1 text-center py-3 rounded-xl bg-gray-50 text-gray-900">
                {numberOfQuestions}
              </div>
              <button
                type="button"
                onClick={incrementQuestions}
                className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                aria-label="Increase questions"
              >
                <span className="text-gray-600">+</span>
              </button>
            </div>
            <p className="mt-2 text-gray-500">Choose between 1-20 questions</p>
          </div>

          {/* Submit Button */}
          <Button type="submit"  variant="primary" fullWidth>
            Create Quiz
          </Button>
        </form>
      </div>
    </div>
  );
}
