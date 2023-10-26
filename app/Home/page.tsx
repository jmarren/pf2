import DotsOnCanvas from "@/components/NameDrawing"
import DotDrawer from "@/components/GreatWaveResize"
import PartialBorderDiv from "@/components/PartialBorders";
import { Suspense } from "react";
import Head from 'next/head'

function Page() {
    return (
      <>
    <Head><link rel="preload" href='/MigaeSemibold-3zd2M.otf' as="font" type="font/otf" crossOrigin="anonymous"></link></Head>
        <div className='bg-sky-100 w-full h-full min-h-screen fixed top-0'>
          <div className=' w-full h-full m-auto z-10 relative'>
          <div className='w-full h-full mx-auto justify-center items-center  absolute'>
            <div className='absolute justify-center items-center w-full h-full'>
                            <Suspense><DotDrawer /></Suspense >
              <div className='w-[95.5vw] h-[95.5vh]  top-[2.25vh] left-[2.25vw] relative '>

              
              <div className='h-12  sm:h-16  md:h-28  justify-between top-0 flex flex-row'>
                <div className=' ml-8 w-full h-12 justify-start'>
                  <DotsOnCanvas fontSize={100} textColor={'#98a3a1'} text={'John Marren - Web Developer'} header={true} className=''/>
                </div>
                {/* <div className='w-[50%] h-12 justify-end'>
                  <DotsOnCanvas fontSize={50} textColor={'gray'} text={'Web Developer'} header={true} className=''/>
                </div> */}
              </div>

              <div className='flex flex-row ml-[50vw] sm:ml-[55vw]'>
                <div className='flex flex-row h-10 cursor-pointer'><DotsOnCanvas fontSize={100} text={'Projects'} textColor={'#98a3a1'} header={false} /></div>
                <a target='_blank' href='/Resume_9_8.pdf'>
                  <div className='flex flex-row h-10 cursor-pointer'> <DotsOnCanvas fontSize={100} text={'Resume'} textColor={'#98a3a1'} header={false} />
                  </div>
                </a>
                <a target='_blank' href="https://github.com/jmarren">
                  <div className='flex flex-row h-10 cursor-pointer' ><DotsOnCanvas fontSize={100} text={'Github'} textColor={'#98a3a1'} header={false} />
                  </div>
                </a>
              </div>

              </div>

            </div>
            
            </div>
 

          </div>
        </div></>
      );
}

export default Page;

