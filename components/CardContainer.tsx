'use client'
import React, { useEffect, ReactNode, useRef, useState } from 'react';
import { usePaint } from './PaintContext';


interface CardContainerProps {
  topFinal: string;
  animation: string;
  children: ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({ topFinal, animation, children }) => {
  const { paint, paintPage } = usePaint();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])



  return (
    <div
      ref={cardRef}
      className={`w-full  min-h-[300px] h-5/6 top-[-34vh] m-4  bg-sky-100 rounded-lg hover:shadow-sky-200 transition-all shadow-2xl gradient-shadow hover:shadow-2xl hover:scale-105 duration-300
        ${isMounted ? 'translate-y-0 opacity-100 visible ' : '-translate-y-full opacity-0 invisible absolute'} ${paint ? 'translate-x-full' : ''}
        `}
    >
      {children}
    </div>
  );
};

export default CardContainer;



