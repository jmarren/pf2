'use client'
import Link from 'next/link'
import { Transition } from '@headlessui/react';
import React, {useEffect, useState} from 'react'
import CardContainer from '@/components/CardContainer';
import Card from '@/components/PortfolioCard'
import LoveJames from '@/components/Love-James';

const Page: React.FC = () => {
    const [show, setShow] = useState(false);

    useEffect(()=> {
        setTimeout(() => {
            setShow(true);  
        }, 100)

    }, [])
    
    return (
        <div className='w-full h-screen bg-orange-400 flex'>
            <Link href='/'>
                <button className='absolute top-2 left-2 bg-[#003f88] p-3 rounded-md ring-1 ring-inset ring-blue-500 hover:ring-4 active:bg-blue-500 text-yellow-400' >Back to Home</button>
            </Link>
            <div className='ml-[25%]'>
                {/* {show ?  <> */}
                <CardContainer topFinal={'51%'} animation={'animate-fall2'} >
                    <Card>
                        <LoveJames />
                    </Card>
                </CardContainer>  
                <CardContainer topFinal={'12%'} animation={'animate-fall1'} >
                    <Card>
                    <div 
                    className='bg-indigo-200  hover:bg-indigo-100 active:bg-indigo-300 active:ring-inset active:ring-4 active:ring-white w-full h-full flex items-center justify-center rounded-b-lg text-center text-6xl text-green-600'>
                        <a href='/portfolio/Buttons' className='w-full h-full flex items-center justify-center text-base sm:text-3xl lg:text-7xl'>
                        Fun With Buttons
        </a>
    </div></Card></CardContainer>
    {/* </> : <></>}  */}
            </div>
        </div>
    );
  };
      
 export default Page;









    //     const [isMounted, setIsMounted] = useState(false);

//     useEffect(() => {
//         setIsMounted(true);
//     }, [])

//     return (
//         <div className="flex flex-col items-center justify-center h-screen bg-[#f7b13c]">
//       <Transition
//         show={isMounted}
//         enter="transform transition-all duration-1500 ease-out"
//         enterFrom="-translate-y-full"
//         enterTo="translate-y-1/4"
//         className="m-4 p-8 bg-blue-300"
//       >
//         <Card />
//       </Transition>

//       <Transition
//         show={isMounted}
//         enter="transform transition-all duration-1500 ease-out delay-300"
//         enterFrom="-translate-y-full"
//         enterTo="translate-y-1/4"
//         className="m-4 p-8 bg-green-300"
//       >
//        <Card />
//       </Transition>
//     </div>        
//     );
// }

// export default Page; 




















{/* <div className='bg-red-500 w-full h-full min-h-screen relative'>
            <div className='bg-blue-500 w-1/4 h-1/2 top-1/4 left-1/2 absolute'> 
                <Link href={'/animate'} >
                    <button className='bg-stone-300 w-1/2  h-1/2 top-1/4 left-1/4 absolute'>
                        Back to Animate
                    </button>
                </Link>
            </div>
    </div>  */}