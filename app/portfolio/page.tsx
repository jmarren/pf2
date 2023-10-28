import Link from 'next/link'

function Page() {
    return (  <div className='bg-red-500 w-full h-full min-h-screen relative'>
            <div className='bg-blue-500 w-1/4 h-1/2 top-1/4 left-1/2 absolute'> 
                <Link href={'/animate'} >
                    <button className='bg-stone-300 w-1/2  h-1/2 top-1/4 left-1/4 absolute'>
                        Back to Animate
                    </button>
                </Link>
            </div>
    </div> );
}

export default Page;