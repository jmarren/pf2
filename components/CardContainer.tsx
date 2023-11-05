'use client'
import React, { useEffect, ReactNode, useRef, useState } from 'react';
import { usePaint } from './PaintContext';


interface CardContainerProps {
    topFinal: string;
    animation: string;
    children: ReactNode;
}

const CardContainer: React.FC <CardContainerProps> = ({topFinal, animation, children}) => {
  const { paint, paintPage } = usePaint();
    const cardRef = useRef<HTMLDivElement | null>(null);  
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, [])


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
        className={` top-[-34vh] m-4  bg-sky-100 rounded-lg hover:shadow-sky-200 transition-all shadow-2xl gradient-shadow hover:shadow-2xl hover:scale-105 duration-300
        ${isMounted ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'} ${paint ? 'translate-x-full':'' }
        `}
        >
       {children}
      </div>
  );
};

export default CardContainer;
//  w-[250px] h-1/3 min-h-[200px]

/* CENTERED VERSION :
  <div
        ref={cardRef}
        className={`absolute top-[-34vh]  bg-sky-100 rounded-lg hover:shadow-sky-200 transition-all shadow-2xl gradient-shadow hover:shadow-2xl hover:scale-105 duration-300
        h-1/3 min-h-[200px]
        w-[75vw] ml-[12.5vw]
        min-[450px]:w-[60vw] min-[450px]:ml-[20vw]
        min-[700px]:w-[50vw] min-[750px]:ml-[25vw]
        min-[1000px]:w-[40vw] min-[1000px]:ml-[30vw]
        ${isMounted ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'}
        `}
        >
       {children}
      </div>
*/



