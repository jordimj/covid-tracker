import { useState, useEffect } from 'react';

export interface WindowProps {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowProps>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
