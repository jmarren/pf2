'use client'
import TextCanvas from "@/components/TextCanvas";
import GreatWave from '@/components/GreatWave'
import React, { Suspense, useRef, useState} from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';


function Page() {
  const [currentBgColor, setCurrentBgColor] = useState('sky-100');
  const router = useRouter(); // Next.js router
  const ref1 = useRef<HTMLCanvasElement>(null)
  const ref2 = useRef<HTMLCanvasElement>(null)
  const ref3 = useRef<HTMLCanvasElement>(null)
  const ref4 = useRef<HTMLCanvasElement>(null)
  const ref5 = useRef<HTMLCanvasElement>(null)


  const startAllClearing = () => { 
    [ref1, ref2, ref3, ref4, ref5].forEach((ref) => {
      if (ref && ref.current && typeof ref.current.startClearing === 'function') {
        ref.current.startClearing();
      }
    });

    setTimeout(() => {
      setCurrentBgColor('orange-400');
    }, 1500);

    setTimeout(() => {
    // Navigate to a different page
    router.push('/portfolio'); // Replace '/newPage' with the path you want to navigate to
  }, 2500);

  }

    return (
      <>
   <link rel="preload" href='/MigaeSemibold-3zd2M.otf' as="font" type="font/otf" crossOrigin="anonymous"></link>
   <div className={`w-full h-full min-h-screen fixed top-0 smooth-transition ${currentBgColor === 'sky-100' ? 'bg-sky-100' : 'bg-orange-400'}`}> 
          <div className=' w-full h-full m-auto z-10 relative'>
          <div className='w-full h-full mx-auto justify-center items-center  absolute'>
            <div className='absolute justify-center items-center w-full h-full'>
                <Suspense>
                  <GreatWave ref={ref1} />
                </Suspense >
              <div className='w-[95.5vw] h-[95.5vh]  top-[2.25vh] left-[2.25vw] relative pointer-events-none'>
              <div className='h-10 min-[320px]:h-12 sm:h-16  md:h-28  justify-between top-0 flex flex-row text-5xl text-[#3C6C8C]'>
                 <div className='
                 text-[#3C6C8C] text border border-blue-500 ml-4 mt-3
                 w-[300px] h-[100px] 
                 min-[320px]:w-[350px] min-[320px]:h-[50px] 
                 min-[450px]:h-[70px] min-[450px]:w-[500px] 
                 sm:w-[600px] sm:h-[90px] 
                 md:w-[750px] md:h-[120px]'
    
                 >
                  John Marren
                  </div> 
                  {/* <TextCanvas ref={ref2} fontSize={150} textColor={'#3C6C8C'} text={'John Marren - Web Developer'} header={true} /> */}
              </div>
              <div className='flex flex-row 
              text-sm m-2 mt-14
              min-[300px]:w-[90vw] min-[300px]:ml-[5vw]
              '>
                <div onClick={startAllClearing} className='flex flex-row m-4  text-[#3C6C8C] h-10 cursor-pointer pointer-events-auto '>
                  {/* <TextCanvas  ref={ref3} fontSize={150} text={'Projects'} textColor={'#3C6C8C'} header={false} /> */}
                  Projects
                </div>
                <Link  target='_blank' href='/Res
                me_9_8.pdf'>
                  <div className='flex flex-row m-4  text-[#3C6C8C] h-10 cursor-pointer pointer-events-auto'> 
                  {/* <TextCanvas ref={ref4} fontSize={150} text={'Resume'} textColor={'#3C6C8C'} header={false} /> */}
                  Resume
                  </div>
                </Link>
                <a target='_blank' href="https://
                ithub.com/jmarren">
                  <div className='flex flex-row m-4  text-[#3C6C8C] h-10 cursor-pointer pointer-events-auto' >
                    {/* <TextCanvas ref={ref5} fontSize={150} text={'Github'} textColor={'#3C6C8C'} header={false} /> */}
                    Github
                  </div>
                </a>
              </div>
              </div>
            </div>
            </div>
          </div>      
        </div>
  </>
      );
}

export default React.memo(Page);




// 'use client'
// import TextCanvas from "@/components/TextCanvas";
// import GreatWave from '@/components/GreatWave'
// import React, { Suspense, useRef, useState} from "react";
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';


// function Page() {
//   const [currentBgColor, setCurrentBgColor] = useState('sky-100');
//   const router = useRouter(); // Next.js router
//   const ref1 = useRef<HTMLCanvasElement>(null)
//   const ref2 = useRef<HTMLCanvasElement>(null)
//   const ref3 = useRef<HTMLCanvasElement>(null)
//   const ref4 = useRef<HTMLCanvasElement>(null)
//   const ref5 = useRef<HTMLCanvasElement>(null)


//   const startAllClearing = () => { 
//     [ref1, ref2, ref3, ref4, ref5].forEach((ref) => {
//       if (ref && ref.current && typeof ref.current.startClearing === 'function') {
//         ref.current.startClearing();
//       }
//     });

//     setTimeout(() => {
//       setCurrentBgColor('orange-400');
//     }, 1500);

//     setTimeout(() => {
//     // Navigate to a different page
//     router.push('/portfolio'); // Replace '/newPage' with the path you want to navigate to
//   }, 2500);

//   }

//     return (
//       <>
//    <link rel="preload" href='/MigaeSemibold-3zd2M.otf' as="font" type="font/otf" crossOrigin="anonymous"></link>
//    <div className={`w-full h-full min-h-screen fixed top-0 smooth-transition ${currentBgColor === 'sky-100' ? 'bg-sky-100' : 'bg-orange-400'}`}> 
//           <div className=' w-full h-full m-auto z-10 relative'>
//           <div className='w-full h-full mx-auto justify-center items-center  absolute'>
//             <div className='absolute justify-center items-center w-full h-full'>
//                 <Suspense>
//                   <GreatWave ref={ref1} />
//                 </Suspense >
//               <div className='w-[95.5vw] h-[95.5vh]  top-[2.25vh] left-[2.25vw] relative pointer-events-none'>
//               <div className='h-10 min-[320px]:h-12 sm:h-16  md:h-28  justify-between top-0 flex flex-row'>
//                   <TextCanvas ref={ref2} fontSize={150} textColor={'#3C6C8C'} text={'John Marren - Web Developer'} header={true} />
//               </div>
//               <div className='flex flex-row ml-[50vw] sm:ml-[55vw] '>
//                 <div onClick={startAllClearing} className='flex flex-row h-10 cursor-pointer pointer-events-auto'>
//                   <TextCanvas  ref={ref3} fontSize={150} text={'Projects'} textColor={'#3C6C8C'} header={false} />
//                 </div>
//                 <Link  target='_blank' href='/Resume_9_8.pdf'>
//                   <div className='flex flex-row h-10 cursor-pointer pointer-events-auto'> 
//                   <TextCanvas ref={ref4} fontSize={150} text={'Resume'} textColor={'#3C6C8C'} header={false} />
//                   </div>
//                 </Link>
//                 <a target='_blank' href="https://github.com/jmarren">
//                   <div className='flex flex-row h-10 cursor-pointer pointer-events-auto' >
//                     <TextCanvas ref={ref5} fontSize={150} text={'Github'} textColor={'#3C6C8C'} header={false} />
//                   </div>
//                 </a>
//               </div>
//               </div>
//             </div>
//             </div>
//           </div>      
//         </div>
//   </>
//       );
// }

// export default React.memo(Page);
