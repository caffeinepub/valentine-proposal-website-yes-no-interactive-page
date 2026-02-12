import { Heart, ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NoPlayfulStateProps {
  onYes: () => void;
  onBack: () => void;
  clickCount: number;
}

const playfulMessages = [
  {
    title: "Are you sure, Catherine? 🥺",
    message: "I promise to make it the best Valentine's Day ever for you! Just give me a chance?"
  },
  {
    title: "Really, Catherine? 💔",
    message: "I've already planned something special just for you... Please reconsider? I know you'll love it!"
  },
  {
    title: "Catherine... No is not an option here 😏",
    message: "Come on, you know you want to say yes! I'll make it worth your while with all the virtual dates and love you can handle!"
  },
  {
    title: "Seriously, Catherine? 🙏",
    message: "I'm not taking no for an answer! You're stuck with me, and I'm going to keep asking until you say yes!"
  },
  {
    title: "Catherine, let's be real... 💝",
    message: "No isn't really an option when we both know yes is the right answer. Just click that beautiful 'Yes' button already!"
  },
  {
    title: "One more time, Catherine... 🌹",
    message: "I'll keep this up all day if I have to! No is simply not in my vocabulary when it comes to you. Say yes!"
  },
  {
    title: "Catherine, I'm persistent! 💪",
    message: "You can click 'No' a hundred times, but I'll ask a hundred and one. Might as well save us both time and just say yes now!"
  }
];

export default function NoPlayfulState({ onYes, onBack, clickCount }: NoPlayfulStateProps) {
  const messageIndex = Math.min(clickCount - 1, playfulMessages.length - 1);
  const currentMessage = playfulMessages[messageIndex];

  return (
    <div className="w-full max-w-2xl mx-auto animate-shake">
      <Card className="bg-white/95 dark:bg-romantic-card/95 backdrop-blur-sm border-romantic-border shadow-2xl">
        <CardHeader className="text-center space-y-6 pb-4">
          {/* Sad Heart Icon */}
          <div className="flex justify-center">
            <div className="relative animate-wiggle">
              <Heart className="w-16 h-16 text-romantic-muted fill-romantic-muted" />
            </div>
          </div>

          <CardTitle className="text-3xl md:text-4xl font-bold text-romantic-heading tracking-tight">
            {currentMessage.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 pt-2">
          <p className="text-center text-lg md:text-xl text-romantic-text leading-relaxed px-4">
            {currentMessage.message}
          </p>

          {clickCount >= 3 && (
            <div className="flex items-center justify-center gap-2 text-romantic-accent animate-fade-in">
              <AlertCircle className="w-5 h-5" />
              <p className="text-center text-base font-semibold">
                Reminder: "No" is not really an option here! 😉
              </p>
            </div>
          )}

          {clickCount >= 5 && (
            <p className="text-center text-sm text-orange-600 dark:text-orange-400 italic animate-fade-in">
              🔥 Catherine, I'm not giving up! The "Yes" button is calling your name... 🔥
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              onClick={onYes}
              size="lg"
              className="w-full sm:w-auto text-lg px-12 py-6 bg-romantic-accent hover:bg-romantic-accent-dark text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse-slow"
            >
              <Heart className="w-5 h-5 mr-2 fill-current" />
              Okay, Yes! 💕
            </Button>
            
            <Button
              onClick={onBack}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-base px-8 py-5 border-2 border-romantic-border hover:bg-romantic-muted/50 text-romantic-text transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          {clickCount >= 3 && (
            <p className="text-center text-sm text-romantic-accent italic animate-fade-in">
              ✨ Catherine, the "Yes" button is looking extra good right now... ✨
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
