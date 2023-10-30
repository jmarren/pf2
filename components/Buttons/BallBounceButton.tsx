'use client'
import {useState, useRef, useEffect } from 'react';


function BallBounceButton() {
    const [clicked, setClicked] = useState(false); 
    const [rectTop, setRectTop] = useState(0);
    const [initialClass, setInitialClass] = useState(false);

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    let unclickedClass=`w-[--bounceButtonWidth] h-[410px] hover:bg-lime-300 rounded-md active:rounded-3xl   bg-lime-400 ring ring-inset ring-lime-500 active:ring-sky-200 m-3 mb-4 absolute text-white hover:text-black top-[-10px] `

    if (!initialClass) {
        unclickedClass=`w-[--bounceButtonWidth] h-[410px] rounded-md active:rounded-3xl bg-lime-400 hover:bg-lime-300 ring ring-inset  ring-lime-500 active:ring-sky-200 m-3 mb-4 fixed text-white hover:text-black  `
    }

    const clickedClass='w-[--bounceButtonWidth] h-[--bounceButtonWidth] rounded-full bg-lime-400 hover:bg-lime-300 ring ring-inset ring-lime-500 active:ring-sky-200 fallDown sticky transition-all m-3 z-100 text-white hover:text-black'

    useEffect(() => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();                    
            const distanceToBottom = window.innerHeight - rect.top - 112; // Calculate distance to bottom
            setRectTop(rect.top);
            document.documentElement.style.setProperty('--distance-to-bottom', `${distanceToBottom}px`); // Set CSS variable        
        }
        setInitialClass(true);
    }, [])

    const handleClick = () => {
        setInitialClass(false);
        setClicked(!clicked)        
        if (buttonRef.current) {
        buttonRef.current.style.top = `${rectTop - 20 }px`;
        } 


    };
    return ( 
        <div className='relative  w-full h-full'>
        <button 
        className={clicked ? clickedClass : unclickedClass} 
        ref={buttonRef} 
        onClick={handleClick}>
            Click {<br/>} Me!
        </button>
        </div>
     );
}

export default BallBounceButton;