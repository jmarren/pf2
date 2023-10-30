import React, { useState } from 'react';

interface ButtonTwoProps {
  text: string;
  onClick: () => void;
}

const ButtonTwo: React.FC<ButtonTwoProps> = ({ text, onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = () => {
    setIsClicked(!isClicked);
    onClick();
  };

  const buttonClass = isClicked
    ? 'bg-blue-500 text-white w-[50%] h-full rounded-full transition-all natural-bounce ease-in-out ring-2 ring-inset ring-blue-600 hover:bg-blue-400 hover:ring-blue-500'
    : 'bg-green-300  text-white w-full h-full rounded-lg transition-all ring-2 ring-inset ring-green-400 active:rounded-3xl active:scale-90 active:scale-x-90 hover:bg-green-400'


  const divClass = isClicked 
    ? 'bg-slate-300 m-3 w-5/6 h-12  ring-2 ring-inset border-slate-200 box-border rounded-3xl cursor-pointer'
    : 'bg-slate-300 m-3 w-5/6 h-12 ring-2 ring-inset ring-slate-200 box-border rounded-lg active:rounded-2xl cursor-pointer'
  return (
    <div className={divClass} onClick={handleButtonClick}> 
    <button className={buttonClass} onClick={handleButtonClick}>
      {text}
    </button>
    </div>
  );
};

export default ButtonTwo;
