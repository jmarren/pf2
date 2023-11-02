// 'use client'
import Link from 'next/link'
import CardContainer from '@/components/CardContainer';
import Card from '@/components/PortfolioCard'
import LoveJames from '@/components/Love-James';
// bg-[#003f88]

const Page: React.FC = () => {
    return (
        <div className='w-full h-screen bg-orange-400 flex'>
            <Link href='/'>
                <button className='absolute top-2 left-2 transition duration-100  bg-sky-700 rounded-md ring-1 ring-inset ring-blue-500 hover:ring-4 hover:text-white hover:scale-105 active:bg-blue-500 ease-in-out active:scale-90 text-yellow-500
                text-[0.5em] p-2
                min-[300px]:text-[0.6em] 
                min-[350px]:tex-[0.75em] 
                min-[700px]:text-[1em] min-[700px]:px-3
                ' >
                    Back to Home
                    </button>
            </Link>
            <div >
                <CardContainer topFinal={'51%'} animation={'animate-fall2'} >
                    <Card>
                            <LoveJames />

                        
                    </Card>
                </CardContainer>  
                <CardContainer topFinal={'12%'} animation={'animate-fall1'} >
                    <Card>
                    <div 
                    className='bg-blue-200  hover:bg-indigo-100 active:bg-sky-300 active:ring-inset active:ring-4 active:ring-white w-full h-full flex items-center justify-center rounded-b-lg text-center text-6xl text-green-600'>
                        <Link href='/portfolio/Buttons' className='w-full h-full flex items-center justify-center text-3xl md:text-5xl lg:text-7xl px-4'>
                        Fun With Buttons
        </Link>
    </div></Card></CardContainer>
            </div>
        </div>
    );
  };
      
 export default Page;
