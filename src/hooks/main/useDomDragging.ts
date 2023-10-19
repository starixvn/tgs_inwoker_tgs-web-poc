import React, { useRef, useState } from "react";

export function useDomDragging() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const domRef = useRef<HTMLDivElement>(null);

  // 說明:滑鼠單次點擊切換Tab ; 滑鼠長按不放可拖曳
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - (domRef.current?.scrollLeft ?? 0));
    if (domRef.current) {
      domRef.current.style.cursor = "grabbing"; // 手指按下時,滑鼠游標變成手指
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    if (!domRef.current) return;
    const x = e.pageX - domRef.current.getBoundingClientRect().left;
    const distance = (x - startX) * 3;
    //  number: 滑鼠移動位移與滾動條滾動關係,數值越大越快
    domRef.current.scrollLeft = startX + distance;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (domRef.current) {
      domRef.current.style.cursor = "grab";
      domRef.current.style.scrollBehavior = "smooth";
      domRef.current.scrollLeft += 50;
      // number: 滾動條滾動距離,可控制反彈距離
      domRef.current.style.scrollBehavior = "auto";
    }
  };

  return {
    isDragging,
    domRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
}
