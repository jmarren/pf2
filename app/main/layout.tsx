'use client'
import { PaintProvider } from '@/components/PaintContext';
import PaintScreenButton from '@/components/PaintScreenButton';
import WaveContainer from '@/components/WaveContainer';
import SocialButtons from '@/components/SocialButtons';



export default function MainLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
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
          {children}
        </div >
      </>
    </PaintProvider >
  )
}


