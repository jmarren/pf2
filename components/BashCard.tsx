'use client'
import {usePaint} from '@/components/PaintContext'


function BashCard() {
    const {paint} = usePaint();
    return ( <> 
    <div className={`bg-sky-100 text-slate-500 m-4 p-4 px-6 pb-6 rounded-lg w-full max-w-md font-mono  shadow-lg transition transform ${paint ? 'translate-x-full':'' }`}>
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
    {/* <div className='text-[0.2em] min-[750px]:text-[0.3em] font-extrabold'> */}
    {/* <div className=''>
    <pre className='text-slate-500 text-[0.2rem] min-[750px]:text-[0.3rem] tracking-tighter'>   ####   ## ##   ###  ##  ###  ##           ##   ##    ##     ######   ######   #######  ###  ##  </pre> 
    <pre className='text-slate-500 text-[0.2rem] min-[750px]:text-[0.3rem] tracking-tighter'>    ##   ##   ##   ##  ##    ## ##            ## ##      ##     ##  ##   ##  ##   ##  ##    ## ##  </pre>
    <pre className='text-slate-500 text-[0.2rem] min-[750px]:text-[0.3rem] tracking-tighter'>    ##   ##   ##   ##  ##   # ## #           # ### #   ## ##    ##  ##   ##  ##   ##       # ## #  </pre> 
    <pre className='text-slate-500 text-[0.2rem] min-[750px]:text-[0.3rem] tracking-tighter'>    ##   ##   ##   ######   ## ##            ## # ##   ##  ##   ## ##    ## ##    ## ##    ## ##   </pre> 
    <pre className='text-slate-500 text-[0.2rem] min-[750px]:text-[0.3rem] tracking-tighter'>##  ##   ##   ##   ##  ##   ##  ##           ##   ##   ## ###   ## ##    ## ##    ##       ##  ##   </pre> 
    <pre className='text-slate-500 text-[0.2rem] min-[750px]:text-[0.3rem] tracking-tighter'>##  ##   ##   ##   ##  ##   ##  ##           ##   ##   ##  ##   ##  ##   ##  ##   ##  ##   ##  ##  </pre> 
    <pre className='text-slate-500 text-[0.2rem] min-[750px]:text-[0.3rem] tracking-tighter'> ####     ## ##   ###  ##  ###  ##           ##   ##  ###  ###  ###  ##  #### ##  ######  ###  ##  </pre> 
 </div> */}


 <pre  className='text-slate-500  text-[0.4rem]'>      ____        __            </pre>  
 <pre  className='text-slate-500  text-[0.4rem]'>     |    | ____ |  |__   ____  </pre>
 <pre  className='text-slate-500  text-[0.4rem]'>     |    |/  _ \|  |  \ /    \ </pre>
 <pre  className='text-slate-500  text-[0.4rem]'> /\__|    |  |_| |   Y  \   |  \</pre>
 <pre  className='text-slate-500  text-[0.4rem]'> \________|\____/|___|  /___|  /</pre>
 <pre  className='text-slate-500  text-[0.4rem]'>                      \/     \/ </pre>
 <pre  className='text-slate-500  text-[0.4rem]'>     _____                                       </pre>  
 <pre  className='text-slate-500  text-[0.4rem]'>    /     \ _____ ______________   ____   ____   </pre>
 <pre  className='text-slate-500  text-[0.4rem]'>   /  \ /  \\__  \\_  __ \_  __ \_/ __ \ /    \  </pre>
 <pre  className='text-slate-500  text-[0.4rem]'>  /    Y    \/ __ \|  | \/|  | \/\  ___/|   |  \ </pre>
 <pre  className='text-slate-500  text-[0.4rem]'>  \____|__  |____  /__|   |__|    \___  |___|  / </pre>
 <pre  className='text-slate-500  text-[0.4rem]'>          \/     \/                   \/     \/  </pre>

  </div>
</div>
    
    
    </> );
}

export default BashCard;