import { useWindowSize } from './useWindowSize';

export function GetIsMobile(): boolean {
  const { width, height } = useWindowSize();

  if (height === undefined || width === undefined) {
    return true;
  }

  return height <= 700 || width <= 500;
}
