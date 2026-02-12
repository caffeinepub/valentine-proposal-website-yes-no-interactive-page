import { useState } from 'react';
import { Sparkles, Heart, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import TapHeartsOverlay from './TapHeartsOverlay';
import TapKissesOverlay from './TapKissesOverlay';

interface QuestionExtrasProps {
  isSpicyMode: boolean;
  toggleSpicyMode: () => void;
}

export default function QuestionExtras({ isSpicyMode, toggleSpicyMode }: QuestionExtrasProps) {
  const [showNote, setShowNote] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [showKisses, setShowKisses] = useState(false);
  const [showSpicyJoke, setShowSpicyJoke] = useState(false);

  const sweetNotes = [
    "Catherine, your smile lights up my screen and my world in ways words can't describe. 💫",
    "Every video call with you, Catherine, feels like a beautiful dream come true. ✨",
    "Catherine, you're the reason I believe in magic and happily ever afters, no matter the distance. 🌟",
    "With you, Catherine, every online moment feels like Valentine's Day. 💖",
    "Catherine, distance means nothing when someone means everything. You're my everything. 💕",
    "Every text, every call, every virtual moment with you, Catherine, is a treasure. 🎁",
  ];

  const spicyJokes = [
    "Catherine, are you a keyboard? Because you're just my type. 😏",
    "Is your name Wi-Fi? Because I'm feeling a strong connection. 🔥",
    "Catherine, are you a camera? Because every time I look at you, I smile... and other things happen too. 😉",
    "If you were a vegetable, you'd be a cute-cumber... and I'd want to pickle you. 🥒",
    "Catherine, do you believe in love at first video call, or should I call you again? 💋",
    "Are you a magician? Because whenever I look at you, everyone else disappears... and my pants get tighter. 🎩✨",
    "Catherine, I'm not a photographer, but I can picture us together... naked. 📸",
    "Is it hot in here, or is it just our chemistry through the screen? 🌡️🔥",
  ];

  const randomNote = sweetNotes[Math.floor(Math.random() * sweetNotes.length)];
  const randomSpicyJoke = spicyJokes[Math.floor(Math.random() * spicyJokes.length)];

  return (
    <div className="space-y-4 py-2 border-t border-romantic-border/30">
      {/* Spicy Mode Toggle */}
      <div className="flex items-center justify-center gap-3 py-2">
        <Label htmlFor="spicy-mode" className="text-sm text-romantic-text cursor-pointer flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-500" />
          Spicy (18+) Mode
        </Label>
        <Switch
          id="spicy-mode"
          checked={isSpicyMode}
          onCheckedChange={toggleSpicyMode}
        />
      </div>

      {/* Sweet Note Reveal */}
      <div className="flex flex-col items-center gap-3">
        {!showNote ? (
          <Button
            onClick={() => setShowNote(true)}
            variant="ghost"
            size="sm"
            className="text-romantic-accent hover:text-romantic-accent-dark hover:bg-romantic-muted/30 transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Reveal a sweet note for Catherine
          </Button>
        ) : (
          <Card className="bg-romantic-accent/10 border-romantic-accent/30 p-4 animate-scale-in">
            <p className="text-center text-romantic-text italic leading-relaxed">
              {randomNote}
            </p>
          </Card>
        )}
      </div>

      {/* Spicy Joke Reveal (only when Spicy mode is ON) */}
      {isSpicyMode && (
        <div className="flex flex-col items-center gap-3">
          {!showSpicyJoke ? (
            <Button
              onClick={() => setShowSpicyJoke(true)}
              variant="ghost"
              size="sm"
              className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all duration-300"
            >
              <Flame className="w-4 h-4 mr-2" />
              Reveal a spicy joke (18+)
            </Button>
          ) : (
            <Card className="bg-orange-50 dark:bg-orange-950/30 border-orange-300 dark:border-orange-700 p-4 animate-scale-in">
              <p className="text-center text-romantic-text leading-relaxed">
                {randomSpicyJoke}
              </p>
            </Card>
          )}
        </div>
      )}

      {/* Tap Hearts Interaction */}
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Button
          onClick={() => {
            setShowHearts(!showHearts);
            setShowKisses(false);
          }}
          variant="ghost"
          size="sm"
          className="text-romantic-accent hover:text-romantic-accent-dark hover:bg-romantic-muted/30 transition-all duration-300"
        >
          <Heart className="w-4 h-4 mr-2 fill-current" />
          {showHearts ? 'Hide' : 'Tap to'} sprinkle hearts
        </Button>

        <Button
          onClick={() => {
            setShowKisses(!showKisses);
            setShowHearts(false);
          }}
          variant="ghost"
          size="sm"
          className="text-romantic-accent hover:text-romantic-accent-dark hover:bg-romantic-muted/30 transition-all duration-300"
        >
          💋 {showKisses ? 'Hide' : 'Send'} virtual kisses
        </Button>
      </div>

      {showHearts && (
        <div className="pt-2">
          <TapHeartsOverlay />
        </div>
      )}

      {showKisses && (
        <div className="pt-2">
          <TapKissesOverlay />
        </div>
      )}
    </div>
  );
}
