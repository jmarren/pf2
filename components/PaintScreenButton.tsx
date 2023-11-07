'use client'
import {usePaint} from '@/components/PaintContext'
import {useRef, useState, useEffect} from 'react';


function PaintScreenButton() {
    const {paintPage, paint} = usePaint();
    const ButtonRef = useRef<HTMLDivElement | null>(null);
    const [transformValue, setTransformValue] = useState<string>('translateX(0) translateY(0)');

    useEffect(() => {
      if (paint && ButtonRef.current) {
        const currentWidth = ButtonRef.current.getBoundingClientRect().width; 
        const currentHeight = ButtonRef.current.getBoundingClientRect().height; 
        const positionX = ButtonRef.current.getBoundingClientRect().x ;
        const positionY = ButtonRef.current.getBoundingClientRect().y + currentHeight;
        setTransformValue(`translateX(-${positionX}px) translateY(calc(100vh - ${positionY}px))`);
    } else {
        setTransformValue('translateX(0) translateY(0)');
      }
    }, [paint]);


    return (  
    <div 
     style={{
        transform: transformValue,
        transition: 'transform 0.5s ease',
     }}
     className={` 
        transition-transform ${ paint ? ' sticky translate-to-bottom-left z-50' : 'relative z-0'}`} 
    >
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