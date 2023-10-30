import React, { useState, useEffect, FC } from 'react';
import Image from 'next/image';

interface Props {
  text: string;
}


const CursorButton: FC<Props> = ({ text }) => {
  const [clicked, setClicked] = useState(false);
  const [positions, setPositions] = useState(Array(100).fill({ x: 0, y: 0 }));
  const [currentPosition, setCurrentPosition] = useState({ x: -610, y: -340 });
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Handle mouse move events and update currentPosition
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - 300;
      const y = e.clientY - 345;
      setCurrentPosition({ x, y });

    };

    if (clicked) {
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [clicked]);

  // Control the behavior of trailing cursors
  useEffect(() => {
    const moveTrail = () => {
      setPositions((prev) => [{ ...currentPosition }, ...prev.slice(0, -1)]);
    };

    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    if (currentPosition.x !== positions[0].x || currentPosition.y !== positions[0].y) {
      moveTrail();
    } else {
      const id = setInterval(moveTrail, 50);
      setIntervalId(id);
    }

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [currentPosition, positions]);


  return (
    <div className="w-[5/6] m-3">
      <button
        className="active:scale-75 w-full bg-yellow-400 text-white px-10 py-4 rounded-3xl transition ease-in-out ring-2 ring-inset ring-yellow-500 hover:bg-yellow-500"
        onClick={() => setClicked((prev) => !prev)}
      >
        {text}
      </button>
      <div>
      {clicked ? positions.map((coords, index) => {
    const hue = index * 36; // Spread the hues around the color wheel
   
    return   (
      <Image 
        id='cursors'
        src='/icons8-cursor.svg'
        alt="cursor"
        width={10}
        height={10}
        style={{
          position: 'absolute',
          left: coords.x,
          top: coords.y,
          pointerEvents: 'none',
          filter: `hue-rotate(${hue}deg)` // Change color using hue rotation
        }}
        className='w-[50%] h-full scale-[0.12] bg-blue-400 rounded-full'
        key={index} // Important for React to identify each SVG uniquely
      />
    );
  }) : <></>}
      </div>
    </div>
  );
};

export default CursorButton;






//  ==========================  V2  ==========================
/*
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface CursorButtonProps {
  text: string;
  onClick: () => void;
}

const CursorButton: React.FC<CursorButtonProps> = ({ text, onClick }) => {
  const [clicked, setClicked] = useState(false);
  const [positions, setPositions] = useState(Array(10).fill({ x: 0, y: 0 }));
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const moveTrail = () => {
      setPositions(prevPositions => [
        currentPosition,
        ...prevPositions.slice(0, -1),
      ]);
    };

    if (clicked) {
      document.addEventListener('mousemove', event => {
        const x = event.clientX - 600;
        const y = event.clientY - 350;
        setCurrentPosition({ x, y });
      });
    }

    // Clear existing interval when mouse moves
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    // Start new interval when mouse stops
    if (currentPosition.x === positions[0].x && currentPosition.y === positions[0].y) {
      const id = setInterval(moveTrail, 50);
      setIntervalId(id);
    } else {
      moveTrail();
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [currentPosition, positions, clicked, intervalId]);

  return (
    <div className='w-48 m-3'>
      <button
        className="active:scale-75 w-full bg-yellow-500 text-white px-10 py-4 rounded-3xl transition ease-in-out"
        onClick={() => setClicked(prevClicked => !prevClicked)}
      >
        {text}
      </button>

        {clicked &&
          positions.map((coords, index) =>  (
            
            <Image
              key={index}
              src="/icons8-cursor.svg"
              alt="cursor"
              width={10}
              height={10}
              style={{
                position: 'absolute',
                left: coords.x,
                top: coords.y,
                pointerEvents: 'none',
                width: '100%',
                height: '100%',

              }}
              className="scale-[0.12]"
            />

          ))}

    </div>
  );
};

export default CursorButton;
*/



/// ========================== V1  ==========================
/* import React, {useState, useEffect} from 'react';
import Image from 'next/image';


interface CursorButtonProps {
  text: string;
  onClick: () => void;
}

const CursorButton: React.FC<CursorButtonProps> = ({ text, onClick }) => {
  const [clicked, setClicked] = useState(false);
  const [positions, setPositions] = useState(
    Array(10).fill({ x: 0, y: 0 })
  );
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [intervalId, setIntervalId] = useState(null);



  useEffect(() => {
    const moveTrail = () => {
      setPositions((prevPositions) => [
        currentPosition,
        ...prevPositions.slice(0, -1),
      ]);
    };

    // Start interval when mouse stops
    const startInterval = () => {
      if (!intervalId) {
        const id = setInterval(moveTrail, 50);
        setIntervalId(id);
      }
    };

    // Clear interval when mouse moves
    const clearExistingInterval = () => {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    };

    if (currentPosition.x !== positions[0].x || currentPosition.y !== positions[0].y) {
      clearExistingInterval();
      moveTrail();
    } else {
      startInterval();
    }

    return () => {
      clearExistingInterval();
    };
  }, [currentPosition, positions, intervalId]);



 useEffect(() => {

 const handleMouseMove = (event) => {
      const x = event.clientX - 600;
      const y = event.clientY - 350;
      setCurrentPosition({ x, y });
      console.log(x, y)
      
      // const svgElement = document.getElementById('cursors')
      // if (svgElement) {
        console.log( positions)

        setPositions((prevPositions) => [
          { x, y },
          ...prevPositions.slice(0, -1),
        ]);       
    //}
 }

  if (clicked) {
    document.addEventListener('mousemove', handleMouseMove);
  }


 }, [clicked])







 
  return (
    <div className='w-48 m-3'>
    <button className="active:scale-75 w-full bg-yellow-500 text-white px-10 py-4 rounded-3xl transition ease-in-out" onClick={() => setClicked((prevClicked) => !prevClicked)}>
      {text}
    </button>
    <div >   {clicked ? positions.map((coords, index) => {
      return  <Image id='cursors' src='/icons8-cursor.svg' alt="cursor" width={10} height={10} style={{position: 'absolute', left: coords.x, top: coords.y, pointerEvents: 'none'}} className='w-full h-full scale-[0.12]' />
    }) : null}

</div>

    </div>
  );
};

export default CursorButton;
*/