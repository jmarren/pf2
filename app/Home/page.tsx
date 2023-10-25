import DotsOnCanvas from "@/components/NameDrawing"
import DotDrawer from "@/components/GreatWaveResize"
import PartialBorderDiv from "@/components/PartialBorders";
// import { Suspense } from "react";

function Page() {
    return (
        <div className='bg-sky-100 w-full h-full min-h-screen fixed top-0'>

          <div className=' w-full h-full m-auto z-10 relative'>
          <div className='w-full h-full mx-auto justify-center items-center  absolute'>
            <div className='absolute justify-center items-center w-full h-full'>
              <DotDrawer />
              <div className='w-[95.5vw] h-[95.5vh]  top-[2.25vh] left-[2.25vw] relative '>

              {/* <Suspense > */}
              <div className=' h-12  sm:h-16  md:h-28 lg:h-40 justify-between top-0 flex flex-row'>
                <div className='w-[50%] h-12 justify-start'>
                  <DotsOnCanvas fontSize={50} textColor={'gray'} text={'John Marren'} header={true} className=''/>
                </div>
                <div className='w-[50%] h-12 justify-end'>
                  <DotsOnCanvas fontSize={50} textColor={'gray'} text={'Web Developer'} header={true} className=''/>
                </div>
              </div>

              <div className='flex flex-row ml-[50vw]'>
                <div className='flex flex-row h-10 '><DotsOnCanvas fontSize={50} text={'Projects'} textColor={'gray'} header={false} /></div>
                <div className='flex flex-row h-10 '> <DotsOnCanvas fontSize={50} text={'Resume'} textColor={'gray'} header={false} /></div>
                <div className='flex flex-row h-10 '><DotsOnCanvas fontSize={50} text={'Github'} textColor={'gray'} header={false} /></div>
              </div>
              {/* </Suspense> */}
              </div>

            </div>
            
            </div>
 

          </div>
        </div>
      );
}

export default Page;

