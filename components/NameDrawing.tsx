'use client'
import React, { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { useFont } from './FontContext';


interface DotsOnCanvasProps {
  text: string;
  textColor: string;
  fontSize: number;
  header?: boolean;
}

const DotsOnCanvas: React.FC<DotsOnCanvasProps> = forwardRef(({text, textColor, fontSize, header}, ref) => {
  type Func = (...args: any[]) => void;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
const lengthNum = header ? text.length : 8;
const font = useFont();
const [canvasWidth, setCanvasWidth] = useState(fontSize * lengthNum / 1.5);
const [canvasHeight, setCanvasHeight] = useState(fontSize * 2);
const [fontLoaded, setFontLoaded] = useState(false);
const animationRef = useRef();
const [clear, setClear] = useState(false);
const [destruct, setDestruct] = useState(false)


  const shuffle = (array: any[]) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  const clearDots = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', {willReadFrequently: true});
    if (!ctx) return;


    for (let i = 0; i < 500; i++) {
        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        // Clear the area inside the clipping path
        ctx.clearRect(x - 5, y - 5, 10, 10);
        ctx.restore();

    }

    animationRef.current = requestAnimationFrame(clearDots);
}

  const drawDots = useCallback((allPoints: any[], ctx: CanvasRenderingContext2D , currentIndex = 0) => {
    if (currentIndex >= allPoints.length) return;

    ctx.fillStyle = textColor;
    ctx.beginPath();
    ctx.arc(allPoints[currentIndex].x, allPoints[currentIndex].y, 1, 0, Math.PI * 2);
    ctx.fill();
 
    let dotsToDraw = 100;
    while (dotsToDraw-- && currentIndex < allPoints.length && !clear) {
      if ( currentIndex >= allPoints.length - 1) return;
        currentIndex++;
        ctx.beginPath();
        ctx.arc(allPoints[currentIndex].x, allPoints[currentIndex].y, 1, 0, Math.PI * 2);
        ctx.fill();
    }
    animationRef.current = requestAnimationFrame(() => drawDots(allPoints, ctx, currentIndex + 1));
  }, [textColor, clear]);

const loadFontAndDrawDots = useCallback(() => {
    if (font === null) return;
    

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        

          const path = font.getPath(text, 0, fontSize , fontSize);
          const oneData = path.toSVG(0); // This is a string representation of SVG
          const bbox = path.getBoundingBox();
         
          const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svgElement.innerHTML = oneData;
          svgElement.style.visibility = 'hidden'
          svgElement.style.position = 'absolute'
          document.body.appendChild(svgElement);
          const pathElement = svgElement.querySelector('path');
  
          const points = [];
          const outsidePoints = [];
          const density = 1
          const interval = 200;
          // const interval = 5000 / ((bbox.x2 - bbox.x1) * (bbox.y2 - bbox.y1) / (density * density));
          const chanceToDrawOutside = 0.0; // 20% chance to draw a point outside the path
          setFontLoaded(true);
          
          for (let x = bbox.x1; x <= bbox.x2; x += density) {
            for (let y = bbox.y1; y <= bbox.y2; y += density) {
              const point = svgElement.createSVGPoint();
              point.x = x;
              point.y = y;          

              
              if (point.x && point.y && pathElement && pathElement.isPointInFill(point) ) {
                points.push({ x, y });
              } else if (Math.random() < chanceToDrawOutside) {
                  outsidePoints.push({x, y})
              }
            }
          }   
          const allPoints = shuffle([...points, ...outsidePoints]);
          // if (!newCall) {
            if (!destruct) {
              drawDots(allPoints, ctx)
            }
          // }

}, [drawDots, canvasRef, font, setFontLoaded, fontSize, text])

 // Debounce function
    const debounce = (func: Func, delay: number): Func => {
      let debounceTimer: ReturnType<typeof setTimeout> | undefined;
      return function(this: any, ...args: any[]): void {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, args), delay);
      };
    };

    const scaleCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
            loadFontAndDrawDots();
    }, [canvasRef, loadFontAndDrawDots]);

  const debouncedScaleCanvas = debounce(scaleCanvas, 50)

  useEffect(() => {
    window.addEventListener('resize', debouncedScaleCanvas);

    return () => {
      window.removeEventListener('resize', debouncedScaleCanvas);
    };
  }, [debouncedScaleCanvas]);

useEffect(() => {
  loadFontAndDrawDots();
}, [loadFontAndDrawDots]);


useImperativeHandle(ref,  () => ({
  startClearing: () => {
    cancelAnimationFrame(animationRef.current);
    setDestruct(true);    
  }
}));

// const handleClick = () => {
//   cancelAnimationFrame(animationRef.current);
//   setDestruct(true);
// }
 
useEffect(() => {
  if (destruct) {
    setClear(true);
  }
}, [destruct])

useEffect(() => {
  if (clear) {
    clearDots();
  }
}, [clear])

const dynamicClass = header ? 'w-[300px] h-[40px] min-[320px]:w-[350px] min-[320px]:h-[50px] min-[450px]:h-[70px] min-[450px]:w-[500px] sm:w-[600px] sm:h-[90px] md:w-[750px] md:h-[120px]' 
        : ' w-[30px] h-[15px] min-[320px]:w-[65px] min-[320px]:h-[30px] min-[450px]:w-[80px] min-[450px]:h-[40px] sm:w-[100px] sm:h-[50px] md:w-[120px] md:h-[60px] lg:w-[150px] lg:h-[75px] '

return (
    <>
<canvas 
    ref={canvasRef} 
    width={canvasWidth}  
    height={canvasHeight}
    className={dynamicClass}
    // onClick={handleClick}
    >
</canvas>
</>)
});

export default React.memo(DotsOnCanvas);