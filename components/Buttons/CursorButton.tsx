import React, { useState, useEffect, useRef, FC } from 'react';

interface Props {
  text: string;
}
interface CurrentPositionType {
  x: number;
  y: number;
}

const CursorButton: FC<Props> = ({ text }) => {  
  const intervalIdRef = useRef<number | null>(null);
  const removeDivIntervalRef = useRef<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [mousePositions, setMousePositions] = useState<CurrentPositionType[]>([]);

  useEffect(() => {
    if (isRunning) {
      removeDivIntervalRef.current = window.setInterval(() => {
        setMousePositions(prev => prev.slice(0, prev.length - 1));
      }, 50);
    }

    return () => {
      if (removeDivIntervalRef.current !== null) {
        clearInterval(removeDivIntervalRef.current);
      }
    };
  }, [isRunning]);

  const captureMousePosition = (event: MouseEvent) => {
    setMousePositions(prevPositions => [{ x: event.clientX, y: event.clientY }, ...prevPositions]);
  };

  const runFunction = () => {
    window.addEventListener('mousemove', captureMousePosition, { once: true });
  };

  const startInterval = () => {
    if (intervalIdRef.current === null) {
      intervalIdRef.current = window.setInterval(runFunction, 25);
      setIsRunning(true);
    }
  };

  const stopInterval = () => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
      setIsRunning(false);
    }
    window.removeEventListener('mousemove', captureMousePosition);
  };

    
    return (
    <>      {isRunning ? mousePositions.map((coords, index) => {
    const hue = index * 36; // Spread the hues around the color wheel

    return   (
        <div
        key={hue + index.toString()}
        id='cursors'
        style={{
          zIndex: 400,
          position: 'fixed',
          left: coords.x,
          top: coords.y,
          pointerEvents: 'none',
          filter: `hue-rotate(${hue}deg)` // Change color using hue rotation
        }}
        className='w-[20px] h-[20px] fixed bg-blue-400 rounded-full'
      ></div> 
    );
  }) : <></>}
    <div className="w-[5/6] m-3">
      <button
        className="active:scale-75 w-full bg-yellow-400 text-white px-10 py-4 rounded-3xl transition ease-in-out ring-2 ring-inset ring-yellow-500 hover:bg-yellow-500"
        onClick={isRunning ? stopInterval : startInterval}
      >
        {text}
      </button></div>
    </>
  );
};

export default CursorButton;

/*
import React, { useState, useEffect, FC } from 'react';

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
      const x = e.clientX - 10
      const y = e.clientY - 10
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
      <div
        key={hue + index.toString()}
        id='cursors'
        style={{
          zIndex: 50,
          position: 'fixed',
          left: coords.x,
          top: coords.y,
          pointerEvents: 'none',
          filter: `hue-rotate(${hue}deg)` // Change color using hue rotation
        }}
        className='w-[20px] h-[20px] fixed bg-blue-400 rounded-full'
      ></div> 
    );
  }) : <></>}
      </div>
    </div>
  );
};

export default CursorButton;

*/


/* 



 
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





















/* import React, { useState, useEffect, useRef, FC } from 'react';
import Image from 'next/image';

interface Props {
  text: string;
}
interface CurrentPositionType {
  x: number;
  y: number;
}

const CursorButton: FC<Props> = ({ text }) => {  
  const intervalIdRef = useRef<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [mousePositions, setMousePositions] = useState<CurrentPositionType[]>([]);

  const captureMousePosition = (event: MouseEvent) => {
    console.log('x: ', event.clientX, ' y: ', event.clientY)
    setMousePositions((prev) => [{ x: event.clientX, y: event.clientY }, ...prev.slice(0, -1)]);
    // setMousePositions(prevPositions => [...prevPositions, { x: event.clientX - 300, y: event.clientY - 345}]);

  };

  const runFunction = () => {
    window.addEventListener('mousemove', captureMousePosition, { once: true });
  };

  useEffect(() => {
    console.log('NEW IMAGE!')
    console.log('mousePositions[mousePositions.length - 1]',  mousePositions[mousePositions.length - 1])
  }, [mousePositions])

  const startInterval = () => {
    // setMousePositions((prev) => [{ x: e.clientX, y: e.clientY }, ...prev.slice(0, -1)]);
    if (intervalIdRef.current === null) {
      intervalIdRef.current = window.setInterval(runFunction, 50);
      setIsRunning(true);
    }
  };

  const stopInterval = () => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
      setIsRunning(false);
    }
    window.removeEventListener('mousemove', captureMousePosition);
  };
    
    return (
    <>      {isRunning ? mousePositions.map((coords, index) => {
    const hue = index * 36; // Spread the hues around the color wheel
    if (index === mousePositions.length - 1) {
        console.log('coords: ', coords);
        // console.log('mousePositions: ', mousePositions[mousePositions.length - 1])
    }
    return  <Image 
        id='cursors'
        src='/icons8-cursor.svg'
        alt="cursor"
        width={10}
        height={10}
        style={{
          zIndex: 100,
          position: 'fixed',
          left: coords.x,
          top: coords.y,
          pointerEvents: 'none',
          filter: `hue-rotate(${hue}deg)` // Change color using hue rotation
        }}
        className='w-[50%] h-full scale-[0.12] bg-blue-400 rounded-full border border-red-700'
        key={index} // Important for React to identify each SVG uniquely
      />
    
  }) : <></>}
    <div className="w-[5/6] m-3">
      <button
        className="active:scale-75 w-full bg-yellow-400 text-white px-10 py-4 rounded-3xl transition ease-in-out ring-2 ring-inset ring-yellow-500 hover:bg-yellow-500"
        onClick={isRunning ? stopInterval : startInterval}
      >
        {text}
      </button></div>
    </>
  );
};

export default CursorButton;
*/




// Previous
/*
import React, { useState, useEffect, useRef, FC } from 'react';
import Image from 'next/image';

interface Props {
  text: string;
}
interface CurrentPositionType {
  x: number;
  y: number;
}

const CursorButton: FC<Props> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [clicked, setClicked] = useState(false);
  const [positions, setPositions] = useState(Array(100).fill({ x: 0, y: 0 }));
  const [currentPosition, setCurrentPosition] = useState<CurrentPositionType | null> (null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  // Handle mouse move events and update currentPosition
 
     const handleMouseMove = (e: MouseEvent) => {

      const x = e.clientX;
      const y = e.clientY;
      console.log('x: ', x,  ' y: ', y)
      setCurrentPosition({ x, y });
    };
 
 
 
  useEffect(() => {
      document.addEventListener('mousemove', handleMouseMove, true);
      return () => document.removeEventListener('mousemove', handleMouseMove, true);

  }, []);

  // Control the behavior of trailing cursors



  useEffect(() => {
    if (!currentPosition) return;
    if (!clicked) return; 
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
      if (!clicked ) return;
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [currentPosition]);


  return (
    <div ref={containerRef} className="w-[5/6] m-3">
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
          zIndex: 100,
          position: 'fixed',
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
*/