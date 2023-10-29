import { useEffect, useRef } from 'react';

function adjustFontSize(container: HTMLElement, text: HTMLElement) {
  const containerWidth = container.clientWidth;
  const textWidth = text.scrollWidth;

  const fontSize = parseInt(window.getComputedStyle(text).fontSize);

  if (textWidth > containerWidth) {
    const newFontSize = fontSize * (containerWidth / textWidth);
    text.style.fontSize = newFontSize + "px";
  }
}

const useDynamicFontSize = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current && textRef.current) {
      adjustFontSize(containerRef.current, textRef.current);
    }

    const handleResize = () => {
      if (containerRef.current && textRef.current) {
        adjustFontSize(containerRef.current, textRef.current);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { containerRef, textRef };
};

export default useDynamicFontSize;
