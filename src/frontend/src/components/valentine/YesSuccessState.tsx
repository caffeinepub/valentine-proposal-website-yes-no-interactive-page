import { useState } from 'react';
import { Heart, Sparkles, Shuffle, PartyPopper, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CelebrationHearts from './CelebrationHearts';
import FunQuestionsFlow from './FunQuestionsFlow';
import TapKissesOverlay from './TapKissesOverlay';

interface YesSuccessStateProps {
  onReset: () => void;
  isSpicyMode: boolean;
}

const dateIdeas = [
  "📹 Virtual dinner date - we'll cook the same meal and video call while we eat together",
  "🎬 Netflix Party watch-along with your favorite snacks and live reactions",
  "🎮 Online co-op gaming session - let's beat that game together!",
  "☕ Virtual coffee date - grab our favorite drinks and catch up face-to-face",
  "🎨 Online paint-along tutorial - we'll create art together from our own spaces",
  "🎵 Share our favorite playlists and have a virtual dance party",
  "📚 Virtual book club date - read the same book and discuss over video call",
  "🍕 Order the same takeout and have a synchronized dinner date online",
  "🎭 Watch a live-streamed concert or theater show together",
  "🌅 Wake up early for a sunrise video call with coffee in hand",
  "🎲 Play online board games or trivia together",
  "✨ Virtual stargazing - use an astronomy app and explore the night sky together",
];

const freePasses = [
  { id: 'kiss', emoji: '💋', title: 'Kiss Pass', description: 'Redeem for unlimited kisses anytime!', spicy: false },
  { id: 'feet', emoji: '👣', title: 'Feet Pass', description: 'One free foot massage session!', spicy: false },
  { id: 'whatever', emoji: '✨', title: 'Whatever You Say Card', description: 'I have to do whatever you say for a day!', spicy: false },
  { id: 'dick', emoji: '🍆', title: 'Dick Pass', description: 'Redeem for... you know what 😏', spicy: true },
];

export default function YesSuccessState({ onReset, isSpicyMode }: YesSuccessStateProps) {
  const [currentIdea, setCurrentIdea] = useState<string | null>(null);
  const [showMoreHearts, setShowMoreHearts] = useState(false);
  const [showFunQuestions, setShowFunQuestions] = useState(false);
  const [showKisses, setShowKisses] = useState(false);

  const pickRandomIdea = () => {
    const randomIdea = dateIdeas[Math.floor(Math.random() * dateIdeas.length)];
    setCurrentIdea(randomIdea);
  };

  if (showFunQuestions) {
    return (
      <FunQuestionsFlow onClose={() => setShowFunQuestions(false)} />
    );
  }

  const visiblePasses = freePasses.filter(pass => !pass.spicy || isSpicyMode);

  return (
    <>
      <CelebrationHearts />
      {showMoreHearts && <CelebrationHearts />}
      
      <div className="w-full max-w-3xl mx-auto animate-scale-in">
        <Card className="bg-white/95 dark:bg-romantic-card/95 backdrop-blur-sm border-romantic-accent shadow-2xl">
          <CardHeader className="text-center space-y-6 pb-4">
            {/* Animated Hearts */}
            <div className="flex justify-center gap-4">
              <Heart className="w-12 h-12 text-romantic-accent fill-romantic-accent animate-bounce-slow" style={{ animationDelay: '0ms' }} />
              <Heart className="w-16 h-16 text-romantic-accent fill-romantic-accent animate-bounce-slow" style={{ animationDelay: '150ms' }} />
              <Heart className="w-12 h-12 text-romantic-accent fill-romantic-accent animate-bounce-slow" style={{ animationDelay: '300ms' }} />
            </div>

            <CardTitle className="text-4xl md:text-6xl font-bold text-romantic-accent tracking-tight">
              Yay! 🎉
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 pt-2">
            <div className="text-center space-y-4">
              <p className="text-2xl md:text-3xl font-semibold text-romantic-heading">
                Catherine, you've made me the happiest person! 💖
              </p>
              
              <p className="text-lg md:text-xl text-romantic-text leading-relaxed px-4">
                I can't wait to celebrate this Valentine's Day with you online, Catherine! 
                Get ready for virtual dates, video calls filled with laughter, and all the digital love I can send your way. 
                Distance can't stop us from making this special!
              </p>

              <p className="text-2xl md:text-3xl font-bold text-romantic-accent pt-2">
                I love you, Catherine! ❤️
              </p>

              <div className="flex items-center justify-center gap-2 text-romantic-accent pt-4">
                <Sparkles className="w-6 h-6 animate-pulse" />
                <span className="text-lg font-medium">This is going to be perfect!</span>
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
            </div>

            {/* Free Passes Section */}
            <div className="space-y-4 pt-6 border-t border-romantic-border/30">
              <div className="flex items-center justify-center gap-2 text-romantic-heading">
                <Gift className="w-6 h-6 text-romantic-accent" />
                <h3 className="text-2xl font-bold">Your Free Passes! 🎁</h3>
              </div>
              
              <p className="text-center text-sm text-romantic-text/80 px-4">
                Catherine, here are your special redeemable passes - use them wisely! 😉
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {visiblePasses.map((pass) => (
                  <Card 
                    key={pass.id}
                    className={`p-4 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${
                      pass.spicy 
                        ? 'bg-orange-50 dark:bg-orange-950/30 border-orange-300 dark:border-orange-700' 
                        : 'bg-romantic-accent/10 border-romantic-accent/30'
                    }`}
                  >
                    <div className="text-4xl mb-2">{pass.emoji}</div>
                    <h4 className="font-bold text-lg text-romantic-heading mb-1">
                      {pass.title}
                    </h4>
                    <p className="text-sm text-romantic-text/80">
                      {pass.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Optional Post-Yes Interactions */}
            <div className="space-y-4 pt-4 border-t border-romantic-border/30">
              <div className="flex flex-col items-center gap-3">
                <Button
                  onClick={pickRandomIdea}
                  variant="outline"
                  size="sm"
                  className="text-romantic-accent border-romantic-accent/50 hover:bg-romantic-accent/10 transition-all duration-300"
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  Pick our virtual date idea
                </Button>

                {currentIdea && (
                  <Card className="bg-romantic-accent/10 border-romantic-accent/30 p-4 animate-scale-in max-w-md">
                    <p className="text-center text-romantic-text font-medium">
                      {currentIdea}
                    </p>
                  </Card>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 flex-wrap">
                <Button
                  onClick={() => setShowFunQuestions(true)}
                  variant="outline"
                  size="sm"
                  className="text-romantic-accent border-romantic-accent/50 hover:bg-romantic-accent/10 transition-all duration-300"
                >
                  <PartyPopper className="w-4 h-4 mr-2" />
                  Answer fun questions!
                </Button>

                <Button
                  onClick={() => setShowMoreHearts(true)}
                  variant="ghost"
                  size="sm"
                  className="text-romantic-accent hover:text-romantic-accent-dark hover:bg-romantic-muted/30 transition-all duration-300"
                >
                  <Heart className="w-4 h-4 mr-2 fill-current" />
                  More celebration hearts!
                </Button>

                <Button
                  onClick={() => setShowKisses(!showKisses)}
                  variant="ghost"
                  size="sm"
                  className="text-romantic-accent hover:text-romantic-accent-dark hover:bg-romantic-muted/30 transition-all duration-300"
                >
                  💋 {showKisses ? 'Hide' : 'Send'} virtual kisses
                </Button>
              </div>

              {showKisses && (
                <div className="pt-2">
                  <TapKissesOverlay />
                </div>
              )}
            </div>

            <div className="flex justify-center pt-4">
              <Button
                onClick={onReset}
                variant="outline"
                size="lg"
                className="text-base px-8 py-5 border-2 border-romantic-border hover:bg-romantic-muted/50 text-romantic-text transition-all duration-300"
              >
                Start Over
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
