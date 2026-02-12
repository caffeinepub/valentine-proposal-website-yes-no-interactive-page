import { useState, useCallback } from 'react';
import { Heart } from 'lucide-react';

interface TapHeart {
  id: number;
  x: number;
  y: number;
}

export default function TapHeartsOverlay() {
  const [hearts, setHearts] = useState<TapHeart[]>([]);
  const [nextId, setNextId] = useState(0);

  const handleTap = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    let clientX: number, clientY: number;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const newHeart: TapHeart = {
      id: nextId,
      x,
      y,
    };

    setHearts((prev) => [...prev, newHeart]);
    setNextId((prev) => prev + 1);

    // Remove heart after animation
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);
  }, [nextId]);

  return (
    <div
      className="relative w-full h-32 bg-romantic-muted/10 rounded-lg border-2 border-dashed border-romantic-accent/30 cursor-pointer overflow-hidden touch-none"
      onClick={handleTap}
      onTouchStart={handleTap}
    >
      <div className="absolute inset-0 flex items-center justify-center text-romantic-text/50 text-sm pointer-events-none">
        Tap or click anywhere to create hearts! 💕
      </div>
      
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-tap-heart pointer-events-none"
          style={{
            left: heart.x,
            top: heart.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Heart className="w-6 h-6 text-romantic-accent fill-romantic-accent" />
        </div>
      ))}
    </div>
  );
}
