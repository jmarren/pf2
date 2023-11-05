'use client'
import {usePaint} from '@/components/PaintContext'


function BashCard() {
    const {paint} = usePaint();
    return ( <> 
    
    <aside className={`bg-sky-100 text-slate-500 m-4 p-4 px-6 pb-6 rounded-lg w-full max-w-md font-mono  transition transform ${paint ? 'translate-x-full':'' }`}>
  <div className="flex justify-between items-center">
    <div className="flex space-x-2 text-red-500">
      <div className="w-3 h-3 rounded-full bg-red-500"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div className="w-3 h-3 rounded-full bg-green-500"></div>
    </div>
    <p className="text-sm">bash</p>
  </div>
  <div className="mt-4">
    <p className="text-green-400">$ npm install portfolio/john-marren</p>
    <p className="text-slate-500">+ portfolio/john-marren@1.0.0</p>
    <p className="text-slate-500">added 1 package, and audited 2 packages in 3s</p>
    <p className="text-green-400">$</p>
    <div className='text-[6px] font-extrabold'>
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