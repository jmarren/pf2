import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PaintProvider } from '@/components/PaintContext'
import localFont from 'next/font/local'

 
// Font files can be colocated inside of `app`
const MigaeSemibold = localFont({
  src: '../public/MigaeSemibold-3zd2M.otf',
  display: 'swap',
})
 


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'John Marren - Web Developer',
  description: 'Typescript, React.js, Node.js, Next.js, Tailwind and more',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>

    <html lang="en">
      <body className={MigaeSemibold.className}>
        <PaintProvider>{children}
          </PaintProvider></body>
    </html></>
  )
}
