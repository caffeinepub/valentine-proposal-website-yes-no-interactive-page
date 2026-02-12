import { useState, useRef, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import QuestionExtras from './QuestionExtras';

interface QuestionStateProps {
  onYes: () => void;
  onNo: () => void;
  onNoAttempt: () => void;
  noAttemptCount: number;
  isSpicyMode: boolean;
  toggleSpicyMode: () => void;
}

export default function QuestionState({ 
  onYes, 
  onNo, 
  onNoAttempt, 
  noAttemptCount,
  isSpicyMode,
  toggleSpicyMode 
}: QuestionStateProps) {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNoHover = () => {
    onNoAttempt();
    
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    
    // Calculate max movement based on attempt count (escalate)
    const baseMove = 40;
    const escalation = Math.min(noAttemptCount * 15, 100);
    const maxMove = baseMove + escalation;
    
    // Random direction
    const angle = Math.random() * Math.PI * 2;
    let newX = Math.cos(angle) * maxMove;
    let newY = Math.sin(angle) * maxMove;
    
    // Clamp to container bounds
    const maxX = (container.width - button.width) / 2 - 20;
    const maxY = (container.height - button.height) / 2 - 20;
    
    newX = Math.max(-maxX, Math.min(maxX, newX));
    newY = Math.max(-maxY, Math.min(maxY, newY));
    
    setNoButtonPosition({ x: newX, y: newY });
    
    // After many attempts, allow clicking
    if (noAttemptCount > 8) {
      setTimeout(() => {
        setNoButtonPosition({ x: 0, y: 0 });
      }, 1500);
    }
  };

  const handleNoClick = () => {
    // Reset position on click
    setNoButtonPosition({ x: 0, y: 0 });
    onNo();
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <Card className="bg-white/95 dark:bg-romantic-card/95 backdrop-blur-sm border-romantic-border shadow-2xl">
        <CardHeader className="text-center space-y-6 pb-4">
          {/* Hero Image */}
          <div className="relative w-full max-w-md mx-auto aspect-video rounded-lg overflow-hidden shadow-lg">
            <img
              src="/assets/generated/valentine-hero.dim_1600x900.png"
              alt="Valentine's Day"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Heart Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <Heart className="w-16 h-16 text-romantic-accent fill-romantic-accent animate-pulse-slow" />
              <div className="absolute inset-0 animate-ping-slow">
                <Heart className="w-16 h-16 text-romantic-accent fill-romantic-accent opacity-30" />
              </div>
            </div>
          </div>

          <CardTitle className="text-4xl md:text-5xl font-bold text-romantic-heading tracking-tight">
            Catherine, will u be my valentine?
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 pt-2">
          <p className="text-center text-lg md:text-xl text-romantic-text leading-relaxed px-4">
            Catherine, even though we're miles apart, you're always close to my heart. 
            I can't wait for our next video call, our virtual movie nights, and all the online adventures we share together. 
            Distance means nothing when you mean everything to me. Will you be my valentine?
          </p>

          {/* Optional Interactive Elements */}
          <QuestionExtras 
            isSpicyMode={isSpicyMode}
            toggleSpicyMode={toggleSpicyMode}
          />

          <div 
            ref={containerRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 relative min-h-[100px]"
          >
            <Button
              onClick={onYes}
              size="lg"
              className="w-full sm:w-auto text-lg px-12 py-6 bg-romantic-accent hover:bg-romantic-accent-dark text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Heart className="w-5 h-5 mr-2 fill-current" />
              Yes! 💕
            </Button>
            
            <Button
              ref={noButtonRef}
              onClick={handleNoClick}
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoHover}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-lg px-12 py-6 border-2 border-romantic-border hover:bg-romantic-muted/50 text-romantic-text transition-all duration-200"
              style={{
                transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              }}
            >
              No
            </Button>
          </div>

          {noAttemptCount >= 3 && (
            <p className="text-center text-sm text-romantic-accent italic animate-fade-in">
              💫 The "No" button seems a bit shy... maybe try "Yes" instead? 💫
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
