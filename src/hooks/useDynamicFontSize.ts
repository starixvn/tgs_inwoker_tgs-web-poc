import { utility } from "@/utils/utility";
import { useEffect, useRef } from "react";

const exceptionName = (text: string | null) => {
  switch (text) {
    case "JUNGLEJUNGLE":
      return text = "JUNGLE\nJUNGLE";
    case "PRAGMATICPLAY":
      return text = "PRAGMATIC\nPLAY";
    default:
      return text;
  }
}

const adjustFontSize = (container: HTMLElement, text: HTMLElement) => {
  if (container && text) {
    // 替換下底線為空格
    if (text.textContent) {
      text.textContent = utility.replaceUnderscoresWithSpace(text.textContent);
      text.textContent = exceptionName(text.textContent);
    }

    const containerWidth = container.clientWidth;
    const textWidth = text.scrollWidth;

    // 先轉成大寫再計算字體大小
    const originalText = text.textContent || '';
    const upperCaseText = originalText.toUpperCase();
    text.textContent = upperCaseText;

    const computedStyles = window.getComputedStyle(text);
    const fontSize = parseInt(computedStyles.fontSize);

    if (textWidth > containerWidth) {
      const newFontSize = fontSize * (containerWidth / textWidth) * 0.9;
      text.style.fontSize = newFontSize + "px";
    }
  }
}

const resizeText = ({ container, text }: { container: HTMLElement; text: HTMLElement }) => {
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
