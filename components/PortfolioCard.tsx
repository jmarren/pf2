interface CardProps {
  children: React.ReactNode;
}


const Card: React.FC<CardProps>  = ({children}) =>  {
  return ( <div className="w-full h-64  flex overflow-hidden rounded-lg ">
  <div className="w-1/5 h-8 flex items-center gap-2 p-2.5">
    <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
    <div className="w-2.5 h-2.5 rounded-full bg-green-600"></div>
  </div>
  <div className="w-4/5 h-8 flex items-center p-2 gap-2">
    <div className="flex">
    <svg viewBox="0 0 20 20" height="16" width="16" xmlns="http://www.w3.org/2000/svg" data-name="20" id="_20">
        <path transform="translate(6.25 3.75)" d="M0,6.25,6.25,0l.875.875L1.75,6.25l5.375,5.375L6.25,12.5Z" id="Fill"></path>
      </svg>
      <svg viewBox="0 0 20 20" height="16" width="16" xmlns="http://www.w3.org/2000/svg" data-name="20" id="_20">
        <path transform="translate(6.625 3.75)" d="M7.125,6.25.875,12.5,0,11.625,5.375,6.25,0,.875.875,0Z" id="Fill"></path>
      </svg>
    </div>
    <div className="relative flex items-center justify-center w-2/3 h-full border border-black rounded p-1 text-xs text-gray-400">
      <svg className="absolute left-2.5" width="7.89" height="7.887" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.89 16.887">
      <path id="Fill" d="M16.006,16.887h0l-4.743-4.718a6.875,6.875,0,1,1,.906-.906l4.719,4.744-.88.88ZM6.887,1.262a5.625,5.625,0,1,0,5.625,5.625A5.631,5.631,0,0,0,6.887,1.262Z" transform="translate(0.003 0)"></path>
      </svg>

    </div>      
  </div> <div className='w-full h-[85%] top-[15%] absolute rounded-b-lg'>{children}</div>
</div>);
}

export default Card; 

