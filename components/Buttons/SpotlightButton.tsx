import React, { useState, useRef, useEffect } from 'react';

interface SpotlightButtonProps {
  text: string;
  onClick: () => void;
}

const SpotlightButton: React.FC<SpotlightButtonProps> = ({ text, onClick }) => {
  const [spotlightOn, setSpotlightOn] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleSpotlightClick = () => {
    setSpotlightOn(!spotlightOn);
    onClick();
  };

  useEffect(() => {
    document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--y', `${e.clientY}px`);
  })
}, []);

const styleClass = "opacity-100 hover:opacity-50 active:scale-75 ring-2 ring-blue-400 ring-inset transition-all bg-blue-500 w-full text-white px-4 py-2 rounded-lg focus:ring-slate-200 focus:ring-inset" 
const spotlightOnStyle = "opacity-100 hover:opacity-50 active:scale-75 transition-all bg-blue-500 w-full text-white px-4 py-2 rounded-lg focus:ring-slate-400 focus:ring-inset movingGradient"


  useEffect(() => {
    if (spotlightOn && buttonRef.current && typeof document !== undefined) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spotlight = document.getElementById('spotlight-hole');
      if (spotlight) {
        spotlight.style.left = `${rect.left + rect.width / 2 - 75}px`;
        spotlight.style.top = `${rect.top + rect.height / 2 - 75}px`;

      }
    }
  }, [spotlightOn]);

  return (
    <div className='w-32 m-3'>
      <div>
        {spotlightOn && <div id="spotlight" className="spotlight">
          <div id="spotlight-hole" className="spotlight-hole"></div>
        </div>}
        <button ref={buttonRef} className={!spotlightOn ? styleClass : spotlightOnStyle} onClick={handleSpotlightClick}>
          {text}
        </button>
      </div>
    </div>
  );
};

export default SpotlightButton;
