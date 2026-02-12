import { useState } from 'react';
import { Heart } from 'lucide-react';
import QuestionState from './components/valentine/QuestionState';
import YesSuccessState from './components/valentine/YesSuccessState';
import NoPlayfulState from './components/valentine/NoPlayfulState';
import { useSpicyMode } from './hooks/useSpicyMode';

type AppState = 'question' | 'yes' | 'no';

function App() {
  const [state, setState] = useState<AppState>('question');
  const [noClickCount, setNoClickCount] = useState(0);
  const [noAttemptCount, setNoAttemptCount] = useState(0);
  const { isSpicyMode, toggleSpicyMode } = useSpicyMode();

  const handleYes = () => {
    setState('yes');
    setNoClickCount(0);
    setNoAttemptCount(0);
  };

  const handleNo = () => {
    setState('no');
    setNoClickCount((prev) => prev + 1);
  };

  const handleNoAttempt = () => {
    setNoAttemptCount((prev) => prev + 1);
  };

  const handleReset = () => {
    setState('question');
    setNoClickCount(0);
    setNoAttemptCount(0);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/generated/valentine-pattern.dim_1024x1024.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px'
        }}
      />
      
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-romantic-light via-romantic-medium to-romantic-dark pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          {state === 'question' && (
            <QuestionState 
              onYes={handleYes} 
              onNo={handleNo}
              onNoAttempt={handleNoAttempt}
              noAttemptCount={noAttemptCount}
              isSpicyMode={isSpicyMode}
              toggleSpicyMode={toggleSpicyMode}
            />
          )}
          {state === 'yes' && (
            <YesSuccessState 
              onReset={handleReset}
              isSpicyMode={isSpicyMode}
            />
          )}
          {state === 'no' && (
            <NoPlayfulState 
              onYes={handleYes} 
              onBack={handleReset}
              clickCount={noClickCount}
            />
          )}
        </main>

        <footer className="relative z-10 py-6 px-4 text-center text-sm text-romantic-text/60">
          <p className="flex items-center justify-center gap-1.5 flex-wrap">
            Built with <Heart className="w-4 h-4 text-romantic-accent fill-romantic-accent" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-romantic-accent hover:text-romantic-accent-dark transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
          <p className="mt-1 text-xs">© {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
