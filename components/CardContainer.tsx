'use client'
import React, { useEffect, ReactNode, useRef } from 'react';

interface CardContainerProps {
    topFinal: string;
    animation: string;
    children: ReactNode;
}

const CardContainer: React.FC <CardContainerProps> = ({topFinal, animation, children}) => {
    const cardRef = useRef<HTMLDivElement | null>(null);  
    useEffect(() => {
      // Wait for the parent to mount, then start the animation
      const card = cardRef.current;
    const handleAnimationEnd = () => {
      if (card) {
        card.style.top = topFinal;
        card.classList.remove(animation);  // Remove the animation class so it won't re-trigger
      }
    };
      const timer = setTimeout(() => {
        if (card) {
          card.classList.add(animation);
          card.addEventListener('animationend', handleAnimationEnd);
        }
      }, 100); // Delay of 100ms to ensure parent has mounted
  
      // Cleanup
      return () => {
        clearTimeout(timer);
        if (card) {
          card.removeEventListener('animationend', handleAnimationEnd);
        }
      };
    }, [animation, topFinal]);
  
    return (
        <div
        ref={cardRef}
        className="absolute top-[-34vh] w-1/2 h-1/3 min-h-[200px] bg-sky-100 rounded-lg border transition-all shadow-lg hover:scale-105 duration-300 "
        >
       {children}
      </div>
  );
};

export default CardContainer;