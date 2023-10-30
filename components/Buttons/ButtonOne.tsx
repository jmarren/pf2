import React from 'react';

interface ButtonOneProps {
  text: string;
  onClick: () => void;
}

const ButtonOne: React.FC<ButtonOneProps> = ({ text, onClick }) => {
  return (
    <div className='w-5/6 m-3'>
    <button className="active:scale-75 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2  bg-gradient-to-br from-pink-400 via-red-500 to-yellow-500 text-white px-10 py-4 rounded-lg 
     transition duration-300 ease-in-out hover:from-yellow-500 hover:to-pink-400 hover:text-black focus:bg-blue-500" onClick={onClick}>
      {text}
    </button>
    </div>
  );
};

export default ButtonOne;
