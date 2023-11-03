import React, { useState, useEffect, useRef } from 'react';

const SpinningButton: React.FC = () => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const spinButtonContainer = useRef<HTMLDivElement | null>(null); 

    const toggleSpin = () => {
        setIsRunning(!isSpinning);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRunning) {
          timer = setTimeout(() => {
            console.log("Half a second has passed!");
            setIsRunning(false);
          }, 500);
        }
    
        return () => {
          if (timer) {
            clearTimeout(timer);
          }
        };
      }, [isRunning]);

      useEffect(() => {
        if (spinButtonContainer.current) {

          window.innerWidth > 400 ? document.documentElement.style.setProperty('--bounceButtonWidth', `${spinButtonContainer.current.offsetWidth * 1.5}px`) : document.documentElement.style.setProperty('--bounceButtonWidth', `${spinButtonContainer.current.offsetWidth * 0.8 }px`) // Set CSS variable        
        }

      }, [])



    return (
        <div className='m-3 w-5/6 h-64 z-[300]' ref={spinButtonContainer}> 
        <button
            className='bg-orange-500 rounded-xl text-white ring-4 ring-inset ring-orange-400 w-full h-full  hover:scale-75 hover:bg-orange-400 hover:text-black'
            onClick={toggleSpin}
            style={{
                transition: 'transform 0.5s',
                zIndex: `${isRunning ? '500' : '100'}`,
                transform: `${isRunning ? 'rotate(360deg)' : 'rotate(0deg)'} translate(${isRunning ? '0, 300px' : '0 , 0'})`

            }}
        >
            Click Me!
        </button>
        </div>
    );
};

export default SpinningButton;
