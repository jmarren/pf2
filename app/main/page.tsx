'use client'

import Link from 'next/link'
import CardContainer from '@/components/CardContainer';
import Card from '@/components/PortfolioCard'
import LoveJames from '@/components/Love-James';
import { useState } from "react"


export default function Page() {
  const [askAwayHovered, setAskAwayHovered] = useState<boolean | null>(null)

  const handleMouseOverAskAway = () => {
    setAskAwayHovered(true)
  }

  const handleMouseLeaveAskAway = () => {
    setAskAwayHovered(false)
  }



  return (
    <div className='absolute w-full h-full px-10 pb-10 pt-16 overflow-scroll'>

      <div className='min-[750px]:grid min-[750px]:grid-cols-9  h-full min-[750px]:grid-rows-4 '>

        {/* Ask-Away */}
        <div id="ask-away-card" className=' w-full min-[750px]:col-start-1 min-[750px]:col-end-6 min-[750px]:row-span-2 min-[1000px]:px-24 mt-6 min-[750px]:mt-0 pr-4'>
          {/* <div > */}
          <CardContainer topFinal={'12%'} animation={'animate-fall1'}>
            <Card>
              <div onMouseOver={handleMouseOverAskAway} onMouseLeave={handleMouseLeaveAskAway} id="ask-away-front" className=' overflow-hidden bg-blue-200  hover:bg-indigo-100 active:bg-sky-200 w-full h-full rounded-b-lg text-center text-6xl text-green-600'>
                <div className={`w-[200%] h-full translate-x-[-50%] flex justify-around align-center   ${askAwayHovered ? "animate-slideOutRight" : ""}`}  >
                  <div className="w-[50%] h-full bg-red-500 flex items-center justify-center ">
                    <div id="buttons-container" className=" w-[200px] h-full border-green-500 flex flex-col gap-[20px] items-center justify-center " >
                      <a href='https://ask-away.mechanicalturk.one' className="w-full bg-blue-500 text-white rounded-lg py-2 px-3 text-lg border-2 border-white hover:bg-blue-600" >
                        Visit
                      </a>
                      <Link href="/learn-more" className="w-full  bg-blue-500 text-white rounded-lg py-2 px-3 text-lg border-2  border-white hover:bg-blue-600">
                        About
                      </Link>
                    </div>
                  </div>
                  <div className="w-[50%] flex justify-center items-center ">
                    <div id="logo">
                      <div id="logo-text">Ask Away</div>
                    </div>
                  </div>
                </div>
              </div>

            </Card>

          </CardContainer>
          {/* </div> */}

        </div>



        {/*  BASH CARD */}
        {/* <div className=' min-[750px]:col-start-1 min-[750px]:col-end-6 min-[750px]:row-start-1 min-[750px]:row-end-3 flex justify-center min-h-[300px]'> */}
        {/*   <BashCard /> */}
        {/* </div> */}
        {/**/}


        {/* TYPING GAME */}
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
  )
}





