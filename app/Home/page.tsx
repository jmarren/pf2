import DotsOnCanvas from "@/components/NameDrawing"
import DotDrawer from "@/components/GreatWave"
import PartialBorderDiv from "@/components/PartialBorders";

function Page() {
    return (
        <div className='bg-sky-100 w-full h-full min-h-screen fixed top-0'>

          <div className='border border-black w-full h-full m-auto z-10 relative'>
          <div className='w-full h-full mx-auto justify-center items-center  absolute'>
            <div className='absolute justify-center items-center w-full'>
              <DotDrawer />
            </div>
            
            </div>
 

          </div>
        </div>
      );
}

export default Page;

