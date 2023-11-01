import {useState, useEffect} from 'react'

function ColorButton() {
  const [color, setColor] = useState('#f97316');

  function getRandomHexColor(): string {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

useEffect(() => {

function hexToRGB(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function RGBToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}


function getDarkerShade(color: string, amount: number): string {
  let [r, g, b] = hexToRGB(color);

  r = Math.max(0, r - amount);
  g = Math.max(0, g - amount);
  b = Math.max(0, b - amount);

  return RGBToHex(r, g, b);
}

  document.documentElement.style.setProperty('--colorButtonColor', `${color}`); // Set CSS variable    
  let hoverColor = getDarkerShade(color, 30)    
  document.documentElement.style.setProperty('--colorButtonHoverColor', `${hoverColor}`); // Set CSS variable        
  let ringColor = getDarkerShade(color, -30);
  document.documentElement.style.setProperty('--colorButtonRingColor', `${ringColor}`); // Set CSS variable        
}, [color]);



const handleClick = () => {
  const newColor = getRandomHexColor();
  setColor(newColor);
}


    return (
        <div >
          <button id='myColorButton' className='hover:bg-[--colorButtonHoverColor] w-5/6 h-32 p-4 m-3 rounded-xl transition duration-100 ring-2 ring-inset ring-[--colorButtonHoverColor] bg-[--colorButtonColor] text-white hover:text-black active:scale-110 ease-in-out'
          onClick={handleClick}
          >
            Click Me!
          </button>
        </div>
      );
    }

export default ColorButton;