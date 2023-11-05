import Link from 'next/link'
import CardContainer from '@/components/CardContainer';
import Card from '@/components/PortfolioCard'
import LoveJames from '@/components/Love-James';
import BashCard from '@/components/BashCard';
import { PaintProvider } from '@/components/PaintContext';
import PaintScreenButton from '@/components/PaintScreenButton';
import WaveContainer from '@/components/WaveContainer';


function Page() {

    return (
<PaintProvider >
    <> 
        <div className="h-screen w-full dots bg-yellow-600 fixed box-content" >
            <WaveContainer /> 
            <div className='fixed w-full h-16 border-4 border-white z-10 bg-red-400 box-border flex text-3xl text-sky-100 font-[Sora] shadow-xl'>
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
            

<div className="social-buttons fixed  bottom-0 left-[40vw] z-20 hover:scale-105 transition ease-in-out duration-350">
  <a href="#" className="social-button github">
    <svg className="cf-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-2.5 0 19 19"><path d="M9.464 17.178a4.506 4.506 0 0 1-2.013.317 4.29 4.29 0 0 1-2.007-.317.746.746 0 0 1-.277-.587c0-.22-.008-.798-.012-1.567-2.564.557-3.105-1.236-3.105-1.236a2.44 2.44 0 0 0-1.024-1.348c-.836-.572.063-.56.063-.56a1.937 1.937 0 0 1 1.412.95 1.962 1.962 0 0 0 2.682.765 1.971 1.971 0 0 1 .586-1.233c-2.046-.232-4.198-1.023-4.198-4.554a3.566 3.566 0 0 1 .948-2.474 3.313 3.313 0 0 1 .091-2.438s.773-.248 2.534.945a8.727 8.727 0 0 1 4.615 0c1.76-1.193 2.532-.945 2.532-.945a3.31 3.31 0 0 1 .092 2.438 3.562 3.562 0 0 1 .947 2.474c0 3.54-2.155 4.32-4.208 4.548a2.195 2.195 0 0 1 .625 1.706c0 1.232-.011 2.227-.011 2.529a.694.694 0 0 1-.272.587z"></path></svg>
      </a>
      <a href="#" className="social-button linkedin">
        <svg viewBox="0 -2 44 44" version="1.1" xmlns="http://www.w3.org/2000/svg" >
        <g id="Icons" stroke="none" stroke-width="1">
            <g transform="translate(-702.000000, -265.000000)">
                <path d="M746,305 L736.2754,305 L736.2754,290.9384 C736.2754,287.257796 734.754233,284.74515 731.409219,284.74515 C728.850659,284.74515 727.427799,286.440738 726.765522,288.074854 C726.517168,288.661395 726.555974,289.478453 726.555974,290.295511 L726.555974,305 L716.921919,305 C716.921919,305 717.046096,280.091247 716.921919,277.827047 L726.555974,277.827047 L726.555974,282.091631 C727.125118,280.226996 730.203669,277.565794 735.116416,277.565794 C741.21143,277.565794 746,281.474355 746,289.890824 L746,305 L746,305 Z M707.17921,274.428187 L707.117121,274.428187 C704.0127,274.428187 702,272.350964 702,269.717936 C702,267.033681 704.072201,265 707.238711,265 C710.402634,265 712.348071,267.028559 712.41016,269.710252 C712.41016,272.34328 710.402634,274.428187 707.17921,274.428187 L707.17921,274.428187 L707.17921,274.428187 Z M703.109831,277.827047 L711.685795,277.827047 L711.685795,305 L703.109831,305 L703.109831,277.827047 L703.109831,277.827047 Z" id="LinkedIn">
    </path>
            </g>
        </g>
    </svg>
  </a>
  <a >
    <div className='bg-blue-300 rounded-full p-[0.85rem] social-button-resume text-[#333] font-[Sora] hover:text-blue-400' >
        RESUME
    </div>
    
  </a>
</div>

            {/* <GreatWave /> */}
        <div className='absolute w-full h-full px-10 pb-10 pt-16 '> {/* GRID CONTAINER */}
            <div className='grid grid-cols-9  h-full grid-rows-4  '> {/* GRID ITSELF */}

                <div className='h-full col-start-1 col-end-6 row-start-1 row-end-3 flex justify-center'>

                    <BashCard />



                </div>
                <div className='flex items-center justify-center h-full col-start-1 col-end-6 row-start-3 row-end-4'>
                    <PaintScreenButton />
                
                </div>


                <div className='h-full w-full col-span-4 row-span-2'>
                      <CardContainer topFinal={'12%'} animation={'animate-fall1'} >
                     <Card>
                     <div 
                    className='bg-blue-200  hover:bg-indigo-100 active:bg-sky-300 active:ring-inset active:ring-4 active:ring-white w-full h-full flex items-center justify-center rounded-b-lg text-center text-6xl text-green-600'>
                        <Link href='/portfolio/Buttons' className='w-full h-full flex items-center justify-center text-3xl md:text-5xl lg:text-7xl px-4'>
                        Fun With Buttons
        </Link>
    </div></Card></CardContainer>
     
                </div>


            
            <div className='h-full w-full col-start-6 col-end-10 row-start-3 row-end-5 '>
            
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












