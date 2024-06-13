'use client'

import Link from 'next/link'
import CardContainer from '@/components/CardContainer';
import Card from '@/components/PortfolioCard'
import LoveJames from '@/components/Love-James';
import BashCard from '@/components/BashCard';
import { PaintProvider } from '@/components/PaintContext';
import PaintScreenButton from '@/components/PaintScreenButton';
import WaveContainer from '@/components/WaveContainer';
import SocialButtons from '@/components/SocialButtons';
import FetchDrop from '@/components/FetchDrop';

function Page() {
  return (
    <PaintProvider>
      <>
        <PaintScreenButton />

        <div className="h-screen w-full dots bg-yellow-600 fixed box-content">
          <WaveContainer />
          <div className='fixed w-full h-16 border-4 border-white z-10 bg-red-400 box-border flex text-sm min-[700px]:text-md min-[950px]:text-lg text-white font-[Sora] shadow-xl'>
            <div className='w-1/2 flex justify-start'>
              <div className='bg-blue-400  px-10 flex items-center justify-start border-r-4 border-white '>
                John Marren
              </div>
            </div>
            <FetchDrop />
            <div className='w-1/2 flex justify-end'>
              <div className='bg-blue-400  flex items-center justify-end border-l-4 border-white px-10'>
                Web Developer
              </div>
            </div>
          </div>

          <div className='z-10 w-10 h-full border-l-4 border-r-4 border-white bg-yellow-400  fixed top-16 left-0'></div>
          <div className='z-10 w-10 h-full border-l-4 border-r-4 border-white fixed bg-yellow-400 top-16 right-0'></div>
          <div className='z-10 w-full h-10 border-4 bg-red-400 border-white fixed bottom-0'></div>

          <SocialButtons />


          {/* <div className='grid grid-cols-2 grid-rows-2 w-full h-full'>
                    <div className='border-2 border-white w-full h-full'></div>
                    <div className='border-2 border-red-500 bg-blue-500  w-full h-full row-span-2'>
                    <div className=' w-full flex items-center justify-center mt-16 min-[750px]:mt-0 min-[750px]:col-start-1 min-[750px]:col-end-5 min-[750px]:row-start-3 min-[750px]:row-end-4 border-2 border-white relative'>
                                <CardContainer topFinal={'-10%'} animation={'animate-fall2'}>
                                <Card>
                                    <div className='border border-black w-full h-full bg-white'></div>
                                </Card>
                                </CardContainer>
                            </div>
                    </div>
                    <div className='border-2 border-white w-full h-full'></div>
                     <div className='border-2 border-white w-full h-full'></div> 
                </div> */}





          <div className='absolute w-full h-full px-10 pb-10 pt-16 overflow-scroll'>

            <div className='min-[750px]:grid min-[750px]:grid-cols-9  h-full min-[750px]:grid-rows-4 '>

              {/*  BASH CARD */}
              <div className=' min-[750px]:col-start-1 min-[750px]:col-end-6 min-[750px]:row-start-1 min-[750px]:row-end-3 flex justify-center min-h-[300px]'>
                <BashCard />
              </div>

              {/* TYPING */}
              <div className='w-full  min-[750px]:col-start-1 min-[750px]:col-end-6 min-[750px]:row-start-3 min-[750px]:row-end-5 mt-6 min-[750px]:mt-0 mb-24 min-[750px]:mb-0  min-[1000px]:px-24  pr-4'>

                {/* <div className='w-full flex items-center justify-center mt-16 min-[750px]:mt-0 min-[750px]:col-start-1 min-[750px]:col-end-5 min-[750px]:row-start-3 min-[750px]:row-end-4 border-2 border-white relative'> */}
                <CardContainer topFinal={'-10%'} animation={'animate-fall2'}>
                  <Card>
                    <div className='bg-blue-200  hover:bg-indigo-100 active:bg-sky-200 w-full h-full flex items-center justify-center rounded-b-lg text-center text-6xl text-blue-500 '>
                      <Link href='https://thetypinggame.com' className='w-full h-full flex items-center justify-center text-3xl md:text-5xl lg:text-7xl px-4'>
                        Typing Game
                      </Link></div>
                  </Card>
                </CardContainer>
              </div>

              {/* FUN WITH BUTTONS */}
              <div className=' w-full min-[750px]:col-span-4 min-[750px]:row-span-2  mt-6 min-[750px]:mt-0 pr-4'>
                <CardContainer topFinal={'12%'} animation={'animate-fall1'}>
                  <Card>
                    <div className='bg-blue-200  hover:bg-indigo-100 active:bg-sky-200 w-full h-full flex items-center justify-center rounded-b-lg text-center text-6xl text-green-600'>
                      <Link href='/Buttons' className='w-full h-full flex items-center justify-center text-3xl md:text-5xl lg:text-7xl px-4'>
                        Fun With Buttons
                      </Link>
                    </div>
                  </Card>
                </CardContainer>
              </div>


              {/* LOVE JAMES */}
              <div className='w-full min-[750px]:col-start-6 min-[750px]:col-end-10 min-[750px]:row-start-3 min-[750px]:row-end-5 mt-6 min-[750px]:mt-0 mb-24 min-[750px]:mb-0 pr-4'>
                <CardContainer topFinal={'51%'} animation={'animate-fall2'}>
                  <Card>
                    <LoveJames />
                  </Card>
                </CardContainer>
              </div>


              <div className='h-10 w-full  min-[750px]:hidden'></div>
            </div>
          </div>
        </div>
      </>
    </PaintProvider>
  );
}

export default Page;











