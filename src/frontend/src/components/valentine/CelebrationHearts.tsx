import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface FloatingHeart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export default function CelebrationHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Generate random hearts
    const newHearts: FloatingHeart[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
      size: 20 + Math.random() * 20
    }));
    setHearts(newHearts);

    // Auto-hide after 8 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-0 animate-float-up"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          <Heart
            className="text-romantic-accent fill-romantic-accent opacity-80"
            style={{ width: heart.size, height: heart.size }}
          />
        </div>
      ))}
    </div>
  );
}
