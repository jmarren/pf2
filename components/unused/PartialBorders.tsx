import React, {CSSProperties} from 'react'
 
const PartialBorderDiv = () => {


    const verticalBorderStyle: CSSProperties = {
      content: '',
      position: 'absolute',
      top: 0,
      width: '2px',
      height: '90%',
      background: 'gray'
    };
  
    const horizontalBorderStyle: CSSProperties = {
      content: '',
      position: 'absolute',
      left: 0,
      width: '90%',
      height: '2px',
      background: 'gray'
    };

  
    return (
      <div className='w-[95vw] h-[95vh] min-h-[95vh]' style={{ position: 'relative'}}>
        <div style={{ ...horizontalBorderStyle, top: '2.5vh', left: '2.5vw' }}></div>
        <div style={{ ...horizontalBorderStyle, top: '97.8vh', left: '12.4vw'}}></div>
        <div style={{ ...verticalBorderStyle, left: '2.5vw', top: '2.5vh' }}></div>
        <div style={{ ...verticalBorderStyle, left: '97.8vw', top: '12.5vh' }}></div>

      </div>
    );
  };
  export default PartialBorderDiv