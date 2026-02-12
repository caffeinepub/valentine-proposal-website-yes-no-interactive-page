import { useState, useCallback } from 'react';

interface TapKiss {
  id: number;
  x: number;
  y: number;
}

export default function TapKissesOverlay() {
  const [kisses, setKisses] = useState<TapKiss[]>([]);
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

    const newKiss: TapKiss = {
      id: nextId,
      x,
      y,
    };

    setKisses((prev) => [...prev, newKiss]);
    setNextId((prev) => prev + 1);

    // Remove kiss after animation
    setTimeout(() => {
      setKisses((prev) => prev.filter((k) => k.id !== newKiss.id));
    }, 1500);
  }, [nextId]);

  return (
    <div
      className="relative w-full h-32 bg-romantic-muted/10 rounded-lg border-2 border-dashed border-romantic-accent/30 cursor-pointer overflow-hidden touch-none"
      onClick={handleTap}
      onTouchStart={handleTap}
    >
      <div className="absolute inset-0 flex items-center justify-center text-romantic-text/50 text-sm pointer-events-none">
        Tap or click anywhere to send kisses! 💋
      </div>
      
      {kisses.map((kiss) => (
        <div
          key={kiss.id}
          className="absolute animate-tap-kiss pointer-events-none"
          style={{
            left: kiss.x,
            top: kiss.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <img 
            src="/assets/generated/kiss-mark.dim_256x256.png" 
            alt="kiss" 
            className="w-8 h-8 opacity-90"
          />
        </div>
      ))}
    </div>
  );
}
