import Link from 'next/link'
import ButtonsGrid from "@/components/ButtonsGrid";


function Page() {
    return ( 
        <div className="w-full h-screen topography fixed top-0 ">
          <Link href='/' >
            <button
            className='fixed top-0 left-0 bg-orange-500 hover:ring-4 hover:ring-inset hover:ring-orange-600 hover:text-green-900 transition duration-50 ease-in h-[2.5rem] px-3 text-white active:scale-75 rounded-lg m-4 ring-2 ring-inset ring-orange-600 shadow-xl' >
              Back
            </button></Link>
                <ButtonsGrid />
        </div>
     );
}

export default Page;
