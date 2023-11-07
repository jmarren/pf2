'use client'
import {usePaint} from '@/components/PaintContext'


function BashCard() {
    const {paint} = usePaint();
    return ( <> 
    <aside className={`bg-sky-100 text-slate-500 m-4 p-4 px-6 pb-6 rounded-lg w-full max-w-md font-mono  shadow-lg transition transform ${paint ? 'translate-x-full':'' }`}>
  <div className="flex justify-between items-center">
    <div className="flex space-x-2 text-red-500">
      <div className="w-3 h-3 rounded-full bg-red-500"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div className="w-3 h-3 rounded-full bg-green-500"></div>
    </div>
    <p className="text-[0.6rem] min-[645px]:text-sm">bash</p>
  </div>
  <div className="mt-4">
    <p className="text-green-400 text-[0.6rem] min-[645px]:text-sm">$ npm install portfolio/john-marren</p>
    <p className="text-slate-500 text-[0.6rem] min-[645px]:text-sm">+ portfolio/john-marren@1.0.0</p>
    <p className="text-slate-500 text-[0.6rem] min-[645px]:text-sm">added 1 package, and audited 2 packages in 3s</p>
    <p className="text-green-400 text-[0.6rem] min-[645px]:text-sm">$</p>
    <div className='text-[0.2rem] min-[750px]:text-[0.3rem] font-extrabold'>
    <pre className='text-slate-500'>   ####   ## ##   ###  ##  ###  ##           ##   ##    ##     ######   ######   #######  ###  ##  </pre> 
    <pre className='text-slate-500'>    ##   ##   ##   ##  ##    ## ##            ## ##      ##     ##  ##   ##  ##   ##  ##    ## ##  </pre>
    <pre className='text-slate-500'>    ##   ##   ##   ##  ##   # ## #           # ### #   ## ##    ##  ##   ##  ##   ##       # ## #  </pre> 
    <pre className='text-slate-500'>    ##   ##   ##   ######   ## ##            ## # ##   ##  ##   ## ##    ## ##    ## ##    ## ##   </pre> 
    <pre className='text-slate-500'>##  ##   ##   ##   ##  ##   ##  ##           ##   ##   ## ###   ## ##    ## ##    ##       ##  ##   </pre> 
    <pre className='text-slate-500'>##  ##   ##   ##   ##  ##   ##  ##           ##   ##   ##  ##   ##  ##   ##  ##   ##  ##   ##  ##  </pre> 
    <pre className='text-slate-500'> ####     ## ##   ###  ##  ###  ##           ##   ##  ###  ###  ###  ##  #### ##  ######  ###  ##  </pre> 
 </div>

  </div>
</aside>
    
    
    </> );
}

export default BashCard;