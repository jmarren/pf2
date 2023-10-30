import React, { useEffect, useState, useRef } from 'react';
import Card from '@/components/PortfolioCard';

const CardContainer: React.FC = ({topFinal, animation, children}) => {
    const cardRef = useRef<HTMLDivElement | null>(null);

    const handleAnimationEnd = () => {
      if (cardRef.current) {
        cardRef.current.style.top = topFinal;
        cardRef.current.classList.remove(animation);  // Remove the animation class so it won't re-trigger
      }
    };
  
    useEffect(() => {
      // Wait for the parent to mount, then start the animation
      const timer = setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.classList.add(animation);
          cardRef.current.addEventListener('animationend', handleAnimationEnd);
        }
      }, 100); // Delay of 100ms to ensure parent has mounted
  
      // Cleanup
      return () => {
        clearTimeout(timer);
        if (cardRef.current) {
          cardRef.current.removeEventListener('animationend', handleAnimationEnd);
        }
      };
    }, []);
  
    return (
        <div
        ref={cardRef}
        className="absolute top-[-500px] w-1/2 h-1/3 bg-sky-100 rounded-lg border transition-all shadow-lg"
      >
       {children}
      </div>
  );
};

export default CardContainer;