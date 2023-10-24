import DotsOnCanvas from "@/components/NameDrawing"
import DotDrawer from "@/components/GreatWaveAura"
import PartialBorderDiv from "@/components/PartialBorders";

function Page() {
    return (
        <div className='bg-sky-100 w-full h-full min-h-screen fixed top-0'>

          <div className=' w-full h-full m-auto z-10 relative'>
          <div className='w-full h-full mx-auto justify-center items-center  absolute'>
            <div className='absolute justify-center items-center w-full'>
              <DotDrawer />
              <div className='w-[95.5vw] h-[95.5vh]  top-[2.25vh] left-[2.25vw] relative '>

              <div className=' h-10   justify-between top-0 flex flex-row '>
                <div className='w-[50%] h-10 flex-row'>
                  <DotsOnCanvas fontSize={75} textColor={'gray'} text={'John Marren'} className=''/>
                </div>
                <div className='w-[50%] h-10 flex-row'>
                  <DotsOnCanvas fontSize={75} textColor={'gray'} text={'Web Developer'} className=''/>
                </div>
              </div>

              <div className='flex flex-row ml-[50vw] mt-[10vh] '>
                <div className='flex flex-row h-10'><DotsOnCanvas fontSize={100} text={'Projects'} textColor={'gray'}/></div>
                <div className='flex flex-row h-10 '> <DotsOnCanvas fontSize={100} text={'Resume'} textColor={'gray'}/></div>
                <div className='flex flex-row h-10 '><DotsOnCanvas fontSize={100} text={'Github'} textColor={'gray'}/></div>
              </div>

              </div>

            </div>
            
            </div>
 

          </div>
        </div>
      );
}

export default Page;

