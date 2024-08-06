'use client'
import { usePaint } from '@/components/PaintContext'
import { useRef } from 'react';


function PaintScreenButton() {
  const { paintPage, paint } = usePaint();
  const ButtonRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className='fixed bottom-0 left-0 z-50'  >
      <div
        ref={ButtonRef}
        className=' shadow-lg relative bg-blue-400 w-60 h-20
        rounded-full font-[Sora] text-white flex justify-items-start items-center'
      >
        <div className='hover:scale-105 ml-6 mb-5 m-3 z-10'>
          <button className="btn-class-name" onClick={paintPage}>
            <span className="back"></span>
            <span className="front"></span>
          </button>
        </div>
        <div className='z-10 mb-5'>PAINT SCREEN</div>
      </div>
      <div className="absolute top-0 -mt-2 w-full h-full  bg-blue-300 rounded-full z-1">

      </div>
    </div>);
}

export default PaintScreenButton;
