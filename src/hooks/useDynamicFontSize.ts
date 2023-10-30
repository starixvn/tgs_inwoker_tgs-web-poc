import { useEffect, useRef } from 'react';

const adjustFontSize = (container: HTMLElement, text: HTMLElement) => {
  if (container && text) {
    const containerWidth = container.clientWidth;
    const textWidth = text.scrollWidth;

    const computedStyles = window.getComputedStyle(text);
    const fontSize = parseInt(computedStyles.fontSize);

    if (textWidth > containerWidth) {
      const newFontSize = fontSize * (containerWidth / textWidth);
      text.style.fontSize = newFontSize + "px";
    }
  }
}

const resizeText = (container: HTMLElement, text: HTMLElement) => {
  adjustFontSize(container, text);
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

    window.addEventListener("reFontSize", handleResize);
    return () => {
      window.removeEventListener("reFontSize", handleResize);
    };
  }, []);

  return { containerRef, textRef, resizeText };
};

export default useDynamicFontSize;
