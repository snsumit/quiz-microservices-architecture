import { Button } from './button';
import { Brain, Zap, Target, TrendingUp, Sparkles, Users } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-6">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span className="text-indigo-700">Smart Quiz Platform</span>
        </div>
        
        <h1 className="mb-6 text-gray-900 max-w-3xl mx-auto">
          Test Your Knowledge,
          <br />
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Challenge Your Mind
          </span>
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto" style={{ fontSize: '1.125rem', lineHeight: '1.75rem' }}>
          Create custom quizzes in seconds, challenge yourself across multiple categories, 
          and track your progress with our beautiful and intuitive quiz platform.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button variant="primary" onClick={onGetStarted}>
            Get Started Free
          </Button>
          <button 
            className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Learn More →
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-gray-900 mb-1" style={{ fontSize: '2rem' }}>50K+</div>
            <div className="text-gray-500">Quizzes Created</div>
          </div>
          <div className="text-center">
            <div className="text-gray-900 mb-1" style={{ fontSize: '2rem' }}>500K+</div>
            <div className="text-gray-500">Questions Answered</div>
          </div>
          <div className="text-center">
            <div className="text-gray-900 mb-1" style={{ fontSize: '2rem' }}>98%</div>
            <div className="text-gray-500">Satisfaction Rate</div>
          </div>
        </div>
      </div>

      {/* Visual Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
            <Brain className="w-6 h-6" />
          </div>
          <h3 className="mb-2">Multiple Categories</h3>
          <p className="text-indigo-100">
            From science to sports, explore diverse topics and expand your knowledge base.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-gray-900 mb-2">Instant Results</h3>
          <p className="text-gray-600">
            Get immediate feedback and detailed performance insights after every quiz.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-gray-900 mb-2">Customizable</h3>
          <p className="text-gray-600">
            Create quizzes tailored to your needs with flexible question counts and topics.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4">Why Choose QuizMaster?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to create, take, and master quizzes in one beautiful platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            <div>
              <h4 className="text-gray-900 mb-2">Track Your Progress</h4>
              <p className="text-gray-600">
                Watch your knowledge grow with detailed score tracking and performance analytics.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div>
              <h4 className="text-gray-900 mb-2">Beautiful Design</h4>
              <p className="text-gray-600">
                Enjoy a clean, modern interface that works perfectly on any device.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            <div>
              <h4 className="text-gray-900 mb-2">Smart Learning</h4>
              <p className="text-gray-600">
                Adaptive quizzes that help you focus on areas that need improvement.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div>
              <h4 className="text-gray-900 mb-2">Community Driven</h4>
              <p className="text-gray-600">
                Join thousands of learners improving their knowledge every day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl">
        <h2 className="mb-4">Ready to Start Learning?</h2>
        <p className="mb-8 text-indigo-100 max-w-2xl mx-auto">
          Join our community of learners and start creating your first quiz in less than 30 seconds.
        </p>
        <button
          onClick={onGetStarted}
          className="px-8 py-4 bg-white text-indigo-600 rounded-xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
        >
          Create Your First Quiz
        </button>
      </div>
    </div>
  );
}
