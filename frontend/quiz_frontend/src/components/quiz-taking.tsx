import { useEffect, useState } from 'react';
import { Button } from './button';
import { OptionCard } from './option-card';
import { ProgressIndicator } from './progress-indicator';
import axios from 'axios';

interface QuizTakingProps {
  config: {
    category: string;
    title: string;
    numberOfQuestions: number;
  };
  onQuizCompleted: (answers: Array<{ questionIndex: number; selectedOption: number }>, score: number) => void;
}

interface Response{
  id: number;
  response: string;
}

interface Question {
  id: number;
  question: string;
  options: string[];
}

// Mock questions generator
const generateQuestions = async (setQuestions:any) =>{
   const quizId  =  localStorage.getItem("quizId") ? localStorage.getItem("quizId") : 2
   const response =  await axios.get(`${(import.meta as any).env.VITE_APT_ENDPOINT}/quiz-service/quiz/get/${quizId}`)
   if(response && response.status === 200 && response.data ){
      const questions: Question[] = response.data.map((q:any, index:number) => ({ 
        id: q.id ?? (index + 1),  
              question:q.question,
              options:[
                q.option1,
                q.option2,
                q.option3,
                q.option4
              ]
          }))
      setQuestions(questions)
   } 
}


export function QuizTaking({ config, onQuizCompleted }: QuizTakingProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [responses, setResponses] = useState<Response[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(()=>{
      generateQuestions(setQuestions);
  },[])


  const currentQuestion = questions[currentQuestionIndex];
  if(!currentQuestion) return <div>Loading...</div>;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const getScore = async (responsePayload: Response[]) => {
    try {
      const quizId = localStorage.getItem('quizId') || '2';
      const resp = await axios.post(`${(import.meta as any).env.VITE_APT_ENDPOINT}/quiz-service/quiz/getScore/${quizId}`, responsePayload);
      if (resp && resp.status === 200) {
        return Number(resp.data);
      }
    } catch (err) {
       console.error('Error fetching score:', err);
    }
    return 0;
  };

  const handleNext = async () => {
    if (selectedOption === null) return;

    const answer: Response = {
      id: currentQuestion.id,
      response: currentQuestion.options[selectedOption],
    };
    const newResponses = [...responses.filter(r => r.id !== answer.id), answer];
    setResponses(newResponses);

    if (isLastQuestion) {
      setSubmitting(true);
      const score = await getScore(newResponses);
      setSubmitting(false);
      onQuizCompleted(
        newResponses.map((r, idx) => ({ questionIndex: idx, selectedOption: 0 })),
        score
      );
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-xl ring-1 ring-gray-700 p-8">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-indigo-300 mb-1 text-sm">{config.category}</p>
            <h1 className="text-white text-2xl font-semibold mb-1">{config.title}</h1>
            <p className="text-gray-400 text-sm">Question {currentQuestionIndex + 1} of {questions.length}</p>
          </div>
          <div className="hidden sm:flex items-center">
            <ProgressIndicator
              current={currentQuestionIndex + 1}
              total={questions.length}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-gray-100 text-lg font-medium mb-6">{currentQuestion?.question}</h3>

          <div className="space-y-3">
            {currentQuestion?.options?.map((option, index) => (
              <div
                key={index}
                className={`transition-colors duration-150 rounded-lg p-3 cursor-pointer border ${selectedOption === index ? 'border-indigo-500 bg-gray-700' : 'border-transparent hover:bg-gray-700'}`}
                onClick={() => setSelectedOption(index)}
              >
                <OptionCard
                  option={option}
                  isSelected={selectedOption === index}
                  onClick={() => setSelectedOption(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">Take your time and read carefully.</div>
          <div className="flex items-center space-x-3">
            <Button
              variant="secondary"
              onClick={() => {
                if (currentQuestionIndex > 0) {
                  setCurrentQuestionIndex(currentQuestionIndex - 1);
                  setSelectedOption(null);
                }
              }}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={selectedOption === null}
            >
              {isLastQuestion ? 'Submit' : 'Next'}
            </Button>
          </div>
        </div>
      </div>

      {submitting && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-800 px-6 py-4 rounded-lg flex items-center space-x-3">
            <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin" />
            <div className="text-white">Submitting answers...</div>
          </div>
        </div>
      )}
    </div>
  );
}
