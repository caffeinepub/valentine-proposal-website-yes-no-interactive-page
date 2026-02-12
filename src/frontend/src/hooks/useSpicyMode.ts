import { useState, useEffect } from 'react';

const STORAGE_KEY = 'valentine-spicy-mode';

export function useSpicyMode() {
  const [isSpicyMode, setIsSpicyMode] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(isSpicyMode));
    } catch {
      // Ignore storage errors
    }
  }, [isSpicyMode]);

  const toggleSpicyMode = () => setIsSpicyMode((prev) => !prev);

  return { isSpicyMode, toggleSpicyMode };
}
