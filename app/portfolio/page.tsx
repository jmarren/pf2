// 'use client'
import Link from 'next/link'
import CardContainer from '@/components/CardContainer';
import Card from '@/components/PortfolioCard'
import LoveJames from '@/components/Love-James';


const Page: React.FC = () => {
    return (
        <div className='w-full h-screen bg-orange-400 flex'>
            <Link href='/'>
                <button className='absolute top-2 left-2 transition duration-300  bg-[#003f88] p-3 rounded-md ring-1 ring-inset ring-blue-500 hover:ring-4 active:bg-blue-500 ease-in-out active:scale-90 text-yellow-500' >
                    Back to Home
                    </button>
            </Link>
            <div className='ml-[25%]'>
                <CardContainer topFinal={'51%'} animation={'animate-fall2'} >
                    <Card>
                            <LoveJames />

                        
                    </Card>
                </CardContainer>  
                <CardContainer topFinal={'12%'} animation={'animate-fall1'} >
                    <Card>
                    <div 
                    className='bg-indigo-200  hover:bg-indigo-100 active:bg-indigo-300 active:ring-inset active:ring-4 active:ring-white w-full h-full flex items-center justify-center rounded-b-lg text-center text-6xl text-green-600'>
                        <Link href='/portfolio/Buttons' className='w-full h-full flex items-center justify-center text-base sm:text-3xl lg:text-7xl'>
                        Fun With Buttons
        </Link>
    </div></Card></CardContainer>
            </div>
        </div>
    );
  };
      
 export default Page;
