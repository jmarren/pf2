import Link from 'next/link'
import ButtonsGrid from "@/components/ButtonsGrid";


function Page() {
    return ( 
        <div className="w-full h-screen topography fixed top-0 ">
          <Link href='/portfolio' >
            <button
            className='fixed top-0 left-0 bg-orange-500 h-[2.5rem] px-3 text-white active:scale-75 rounded-lg m-4 ring-2 ring-inset ring-orange-600 shadow-xl' >
              Back
            </button></Link>
                <ButtonsGrid />
        </div>
     );
}

export default Page;



/*


'use client'

import ButtonOne from '@/components/ButtonOne';
import ButtonTwo from '@/components/ButtonTwo';
import SpotlightButton from '@/components/SpotlightButton';
import SpinningButton from '@/components/SpinningButton';
import ColorButton from '@/components/ColorButton';
import CursorButton from '@/components/CursorButton';
import SliderButton from '@/components/SliderButton'
import BallBounceButton from '@/components/BallBounceButton';

function ButtonsGrid() {

const handleClick = () => {
    console.log('click')
}
    
    
    return (
        <main className='flex items-center justify-center mt-36 '>
            
            <section className='grid grid-rows-9 grid-cols-5  h-[450px] w-[550px] max-w-[550px] max-h-[500px] rounded-lg shadow-2xl ' >

                <div className=' col-start-1 col-end-3 row-start-1 row-end-10 border rounded-lg  h-full w-full bg-sky-300 flex flex-col justify-center items-center'>

                    <ButtonOne text="Click Me!" onClick={handleClick}/>
                    <ButtonTwo text="Click Me!" onClick={handleClick}/>
                    <SliderButton text="" onClick={handleClick} />
                    <CursorButton text="Click Me!" />
                    <SpotlightButton text='Click Me!' onClick={handleClick}/>
                </div>
                <div className='col-start-3 col-end-6 row-start-1 row-end-10 bg-sky-300 border rounded-lg  h-full w-full flex flex-row justify-center'>

                    <div>
                    <SpinningButton />
                    <ColorButton />
                    </div >
                    <div className='w-28 h-[410px]'>
                     <BallBounceButton />                        
                    </div>
                    </div>              
            </section>
        </main>

      );
}

export default ButtonsGrid;



*/







/*
'use client'
import React from 'react';
import ButtonOne from '@/components/ButtonOne';
import ButtonTwo from '@/components/ButtonTwo';
import SpotlightButton from '@/components/SpotlightButton';
import SpinningButton from '@/components/SpinningButton';
import ColorButton from '@/components/ColorButton';
import CursorButton from '@/components/CursorButton';
import SliderButton from '@/components/SliderButton'
import BallBounceButton from '@/components/BallBounceButton';

const Page = () => {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <main >
    <section className="button-container">
      <section className="button-section">
               <ButtonOne text="Click Me!" onClick={handleClick} /> 
               <SliderButton text=''  onClick={handleClick} />
               <BallBounceButton />
      </section>


      <section className="button-section">
        <ButtonTwo text="Click Me!" onClick={handleClick} />
        <ColorButton />        

      </section>

      <section className="button-section">        
       <CursorButton text="Click Me!" />
        <SpotlightButton text="Click Me!" onClick={handleClick} />
        <SpinningButton />
      </section>
      </section> 
    </main>
  );
};

export default Page;

*/

/*
import React from 'react';
import ButtonOne from '@/components/ButtonOne';
import ButtonTwo from '@/components/ButtonTwo';
import SpotlightButton from '@/components/SpotlightButton';
import SpinningButton from '@/components/SpinningButton';
import ColorButton from '@/components/ColorButton';
import CursorButton from '@/components/CursorButton';
import SliderButton from '@/components/SliderButton'
import BallBounceButton from '@/components/BallBounceButton';

const Page = () => {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div>
      <div >        
        <SliderButton text=''  onClick={handleClick} />
        <ButtonOne  text="Click Me!" onClick={handleClick} />
        <BallBounceButton />
      </div>
      <div >
        <ButtonTwo text="Click Me!" onClick={handleClick} />
        <ColorButton />        
        <CursorButton text="Click Me!" />
      </div>
      <div style={{display: 'inline'}}>
        <SpotlightButton text="Click Me!" onClick={handleClick} />
        <SpinningButton />

      </div>
    </div>
  );
};

export default Page;
*/