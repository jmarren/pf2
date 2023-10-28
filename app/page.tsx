import DotsOnCanvas from "@/components/NameDrawing";
import DotDrawer from "@/components/GreatWaveResize";
import { Suspense } from "react";
import Link from 'next/link';

function Page() {
    return (
      <>
   <link rel="preload" href='/MigaeSemibold-3zd2M.otf' as="font" type="font/otf" crossOrigin="anonymous"></link>
        <div className='bg-sky-100 w-full h-full min-h-screen fixed top-0'> 
          <div className=' w-full h-full m-auto z-10 relative'>
          <div className='w-full h-full mx-auto justify-center items-center  absolute'>
            <div className='absolute justify-center items-center w-full h-full'>
                <Suspense>
                  <DotDrawer />
                </Suspense >
              <div className='w-[95.5vw] h-[95.5vh]  top-[2.25vh] left-[2.25vw] relative '>
              <div className='h-10 min-[320px]:h-12 sm:h-16  md:h-28  justify-between top-0 flex flex-row'>
                <div className=' ml-8 w-full h-10 justify-start'>
                  <DotsOnCanvas fontSize={100} textColor={'#98a3a1'} text={'John Marren - Web Developer'} header={true} />
                </div>
              </div>
              <div className='flex flex-row ml-[50vw] sm:ml-[55vw]'>
                <Link href='/portfolio'>
                <div className='flex flex-row h-10 cursor-pointer'><DotsOnCanvas fontSize={150} text={'Projects'} textColor={'#98a3a1'} header={false} />
                </div>
               </Link>
                <a target='_blank' href='/Resume_9_8.pdf'>
                  <div className='flex flex-row h-10 cursor-pointer'> <DotsOnCanvas fontSize={150} text={'Resume'} textColor={'#98a3a1'} header={false} />
                  </div>
                </a>
                <a target='_blank' href="https://github.com/jmarren">
                  <div className='flex flex-row h-10 cursor-pointer' ><DotsOnCanvas fontSize={150} text={'Github'} textColor={'#98a3a1'} header={false} />
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

export default Page;

/* 
import PartialBorderDiv from "@/components/PartialBorders"
import DotsOnCanvas from "@/components/NameDrawing"
import DotDrawer from "@/components/GreatWave"
import Image from 'next/image'

export default function Home() {
  return (
    <div className='min-h-screen w-full h-full relative flex justify-center items-center'>
        <PartialBorderDiv />         
         <div className='absolute w-[95%] h-[95%] top-[2.5vh] left-[2.5vw] flex justify-around items-center'>
          <div className='flex-column justify-center absolute  h-full top-0 left-0 border border-red-700'>
            <DotDrawer />
          </div>
        <div className='w-[95.5vw] h-[95.5vh]  top-[2.25vh] left-[2.25vw] relative border border-black'>

          <div className=' h-10   justify-between top-0 flex flex-row border border-black'>
            <div className='w-[50%] h-16 flex-row'>
              <DotsOnCanvas fontSize={75} textColor={'gray'} text={'John Marren'} className=''/>
            </div>
            <div className='w-[50%] h-16 flex-row'>
              <DotsOnCanvas fontSize={75} textColor={'gray'} text={'Web Developer'} className='border border-black'/>
            </div>
          </div>
          <div className=' absolute h-10 top-[100px] z-20 border border-green-500'><DotsOnCanvas fontSize={75} text={'Projects'} textColor={'red'}/></div>
          <div className='flex  ml-[20vw] h-10 top-28 mt-[200px] border border-green-500 '>
            <div className='flex flex-row h-10 top-20 z-20'><DotsOnCanvas fontSize={75} text={'Projects'} textColor={'red'}/></div>
            <div className='flex flex-row h-10 '> <DotsOnCanvas fontSize={75} text={'Resume'} textColor={'gray'}/></div>
            <div className='flex flex-row h-10 '><DotsOnCanvas fontSize={75} text={'Github'} textColor={'gray'}/></div>
          </div>

      </div>
         
          
         
          
        </div>
      </div>


  )
}
*/