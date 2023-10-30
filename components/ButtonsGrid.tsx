'use client'

import { Suspense } from 'react';
import ButtonOne from '@/components/Buttons/ButtonOne';
import ButtonTwo from '@/components/Buttons/ButtonTwo';
import SpotlightButton from '@/components/Buttons/SpotlightButton';
import SpinningButton from '@/components/Buttons/SpinningButton';
import ColorButton from '@/components/Buttons/ColorButton';
import CursorButton from '@/components/Buttons/CursorButton';
import SliderButton from '@/components/Buttons/SliderButton'
import BallBounceButton from '@/components/Buttons/BallBounceButton';

function ButtonsGrid() {

const handleClick = () => {
    console.log('click')
}
    // ABCDEFGHIJKLMNOP
    
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
                <div className='col-start-3 col-end-6 row-start-1 row-end-10 bg-sky-300 border rounded-lg pb-4 h-full w-full flex flex-row justify-center items-center pt-2'>

                    <div>
                    <SpinningButton />
                    <ColorButton />
                    </div >
                   
                    <div className='w-1/2 h-[410px] relative'>
                      <Suspense >
                        <BallBounceButton />       
                           </Suspense>           
                    </div>
                    
                    </div>              
            </section>
        </main>

      );
}

export default ButtonsGrid;






/* Version 1: Working, but needs edits:
    
    return (
        <main className='flex items-center justify-center mt-36'>
            
            <section className='grid grid-rows-9 grid-cols-6 flex-grow h-[500px] w-[700px] max-w-[700px] border border-black' >

                <div className='col-start-1 col-end-3 row-start-1 row-end-2 border border-black h-full w-full bg-sky-300 flex flex-col justify-center items-center'>

                    <ButtonOne text="Click Me!" onClick={handleClick}/>
                    <ButtonTwo text="Click Me!" onClick={handleClick}/>
                    <SliderButton text="" onClick={handleClick} />
                    <CursorButton text="Click Me!" />
                    <SpotlightButton text='Click Me!' onClick={handleClick}/>
                </div>
                <div className='col-start-3 col-end-6 row-start-1 row-end-2 bg-sky-300 border border-black h-full w-5/6 flex flex-row'>

                    <div>
                    <SpinningButton />
                    <ColorButton />
                    </div>
                     <BallBounceButton />
                    </div>
                <div className='row-start-4 row-end-5 col-start-3 col-end-7 border border-black h-full w-full'>
                    
                </div>                    
            </section>
        </main>

      );
} 
*/