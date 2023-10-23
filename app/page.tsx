import PartialBorderDiv from "@/components/PartialBorders"
import DotsOnCanvas from "@/components/NameDrawing"
import DotDrawer from "@/components/GreatWave"
import Image from 'next/image'

export default function Home() {
  return (
    <div className='min-h-screen w-full h-full relative flex justify-center items-center'>
        <PartialBorderDiv />         
         <div className='absolute w-[95%] h-[95%] top-[2.5vh] left-[2.5vw] flex justify-around items-center'>
          {/* <div className='flex-column justify-center absolute  h-full top-0 left-0 border border-red-700'> */}
            <DotDrawer />
          {/* </div> */}
        <div className='w-[95.5vw] h-[95.5vh]  top-[2.25vh] left-[2.25vw] relative border border-black'>

          <div className=' h-10   justify-between top-0 flex flex-row border border-black'>
            <div className='w-[50%] h-10 flex-row'>
              <DotsOnCanvas fontSize={75} textColor={'gray'} text={'John Marren'} className=''/>
            </div>
            <div className='w-[50%] h-10 flex-row'>
              <DotsOnCanvas fontSize={75} textColor={'gray'} text={'Web Developer'} className='border border-black'/>
            </div>
          </div>
          
          <div className='flex flex-row ml-[50vw] '>
            <div className='flex flex-row h-10'><DotsOnCanvas fontSize={100} text={'Projects'} textColor={'gray'}/></div>
            <div className='flex flex-row h-10 '> <DotsOnCanvas fontSize={100} text={'Resume'} textColor={'gray'}/></div>
            <div className='flex flex-row h-10 '><DotsOnCanvas fontSize={100} text={'Github'} textColor={'gray'}/></div>
          </div>

      </div>
         
          
         
          
        </div>
      </div>


  )
}
