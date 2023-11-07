import Link from 'next/link'
import CardContainer from '@/components/CardContainer';
import Card from '@/components/PortfolioCard'
import LoveJames from '@/components/Love-James';
import BashCard from '@/components/BashCard';
import { PaintProvider } from '@/components/PaintContext';
import PaintScreenButton from '@/components/PaintScreenButton';
import WaveContainer from '@/components/WaveContainer';
import SocialButtons from '@/components/SocialButtons';


function Page() {

    return (
<PaintProvider >
    <> 
        <div className="h-screen w-full dots bg-yellow-600 fixed box-content" >
            <WaveContainer /> 
            <div className='fixed w-full h-16 border-4 border-white z-10 bg-red-400 box-border flex text-lg min-[700px]:text-2xl text-white font-[Sora] shadow-xl'>
                <div className='w-1/2 flex justify-start'>
                    <div className='bg-blue-400  px-10 flex items-center justify-start border-r-4 border-white '>
                        John Marren
                    </div>
                </div>
                
                <div className='w-1/2 flex justify-end'>
                    <div className='bg-blue-400  flex items-center justify-end border-l-4 border-white px-10'> 
                        Web Developer
                    </div>
                </div>
            </div>

            <div className='z-10 w-10 h-full border-l-4 border-r-4 border-white bg-yellow-400  fixed top-16 left-0'>
            </div>
            <div className='z-10 w-10 h-full border-l-4 border-r-4 border-white fixed bg-yellow-400 top-16 right-0'>
            </div>
            <div className='z-10 w-full h-10 border-4 bg-red-400 border-white fixed bottom-0'> </div>
            
            <SocialButtons />

        <div className='absolute w-full h-full px-10 pb-10 pt-16 overflow-scroll'> {/* GRID CONTAINER */}
            <div className='min-[425px]:grid min-[425px]:grid-cols-9  h-full min-[425px]:grid-rows-4'> {/* GRID ITSELF */}

                <div className=' min-[425px]:col-start-1 min-[425px]:col-end-6 min-[425px]:row-start-1 min-[425px]:row-end-3 flex justify-center min-h-[300px]'>

                    <BashCard />



                </div>
                <div className='flex items-center justify-center mt-6 min-[425px]:mt-0 min-[425px]:col-start-1 min-[425px]:col-end-6 min-[425px]:row-start-3 min-[425px]:row-end-4'>
                    <PaintScreenButton />
                
                </div>


                <div className=' w-full min-[425px]:col-span-4 min-[425px]:row-span-2  mt-6 min-[425px]:mt-0'>
                      <CardContainer topFinal={'12%'} animation={'animate-fall1'} >
                     <Card>
                     <div 
                    className='bg-blue-200  hover:bg-indigo-100 active:bg-sky-200 w-full h-full flex items-center justify-center rounded-b-lg text-center text-6xl text-green-600'>
                        <Link href='/Buttons' className='w-full h-full flex items-center justify-center text-3xl md:text-5xl lg:text-7xl px-4'>
                        Fun With Buttons
        </Link>
    </div></Card></CardContainer>
     
                </div>


            
            <div className='w-full min-[425px]:col-start-6 min-[425px]:col-end-10 min-[425px]:row-start-3 min-[425px]:row-end-5 mt-6 min-[425px]:mt-0 mb-24 min-[425px]:mb-0'>
            
             <CardContainer topFinal={'51%'} animation={'animate-fall2'} >
                     <Card>
                             <LoveJames />           
                     </Card>
                 </CardContainer>  
            
            
            </div>
        </div> 









{/*
  
  
    */}





        </div>
        </div>
        </>
        </PaintProvider> 
     );
}

export default Page;












