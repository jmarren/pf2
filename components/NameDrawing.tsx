'use client'
import React, { useEffect, useRef, useState } from 'react';
import opentype from 'opentype.js';

const DotsOnCanvas: React.FC = ({text, textColor, fontSize, header}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);


const [canvasWidth, setCanvasWidth] = useState(fontSize * text.length / 1.5);
const [canvasHeight, setCanvasHeight] = useState(fontSize * 2);


  // Function to shuffle an array
  const shuffle = (array: any[]) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }



  useEffect(() => {
    // Debounce function
    const debounce = (func, delay) => {
      let debounceTimer;
      return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
      };
    };

    const scaleCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight)
            // Scale the context to fit the new dimensions
            ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
            loadFontAndDrawDots();
    };

    const debouncedScaleCanvas = debounce(scaleCanvas, 150);
    window.addEventListener('resize', debouncedScaleCanvas);

    return () => {
      window.removeEventListener('resize', debouncedScaleCanvas);
    };
  }, []);


  const drawDots = (allPoints, ctx, currentIndex = 0) => {

    if (currentIndex >= allPoints.length) return;

    ctx.fillStyle = textColor;
    ctx.beginPath();
    ctx.arc(allPoints[currentIndex].x, allPoints[currentIndex].y, 2.5, 0, Math.PI * 2);
    ctx.fill();
 
    let dotsToDraw = 10;
    while (dotsToDraw-- && currentIndex < allPoints.length) {
        currentIndex++;
        ctx.beginPath();
        ctx.arc(allPoints[currentIndex].x, allPoints[currentIndex].y, 2.5, 0, Math.PI * 2);
        ctx.fill();
    }



    requestAnimationFrame(() => drawDots(allPoints, ctx, currentIndex + 1));
  };

  const loadFontAndDrawDots = () => {
    opentype.load('/Roboto-Medium.ttf', (err, font) => {
        if (err) {
          console.error('Font could not be loaded:', err);
          return;
        }
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        if (font) {
          const path = font.getPath(text, 0, fontSize , fontSize);
          const oneData = path.toSVG(0); // This is a string representation of SVG
  
          // Append SVG path to an SVG element in the DOM (you can keep it hidden)
          const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svgElement.innerHTML = oneData;
          svgElement.style.visibility = 'hidden'
          svgElement.style.position = 'absolute'
          document.body.appendChild(svgElement);
          const pathElement = svgElement.querySelector('path');
  
          const points = [];
          const outsidePoints = [];
          const bbox = path.getBoundingBox();
          const density = 0.5;
          const interval = 20;
          // const interval = 5000 / ((bbox.x2 - bbox.x1) * (bbox.y2 - bbox.y1) / (density * density));
          const chanceToDrawOutside = 0.0; // 20% chance to draw a point outside the path
  
  
  
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
          drawDots(allPoints, ctx)
        }
      });
  
};





useEffect(() => {
  loadFontAndDrawDots();
}, []);


const dynamicClass = header ? ' w-[175px] h-[55px] sm:w-[150px] sm:h-[60px] md:h-[120px] md:w-[300px]' 
        : ' w-[80px] h-[40px] sm:w-[100px] sm:h-[50px] md:w-[120px] md:h-[60px] lg:w-[150px] lg:h-[75px] '

return (
    <>
<canvas 
    ref={canvasRef} 
    width={canvasWidth}  
    height={canvasHeight}
    className={dynamicClass}
    >
</canvas><link rel="preload" href="/Roboto-Medium.ttf" as="font" type="font/ttf" ></link>
</>)
};

export default DotsOnCanvas;



