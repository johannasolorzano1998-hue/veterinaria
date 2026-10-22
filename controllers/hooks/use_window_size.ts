import { useState, useEffect } from "react";

export const sizes = {
  xs: 350,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

export type Orientation = 'landscape' | 'portrait' | 'none';

type WindowData = {
  width: number;
  height: number;
  orientation: Orientation;
}

export function useWindowSize(): WindowData {
  const [windowSize, setWindowSize] = useState<WindowData>({
    width: 0,
    height: 0,
    orientation: 'none',
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    // Remove the listener as soon as the component is unmounted
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}