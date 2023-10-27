/*'use client'
import React, { useEffect, useRef, useState } from 'react';
import opentype from 'opentype.js';
// import {loadFont} from 'pages/api/loadFonts'


import { useFont } from '@/components/FontContext';

const DotsOnCanvas: React.FC = ({}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const font = useFont();
    const [canvasWidth, setCanvasWidth] = useState(100 * 8 / 1.5);
    const [canvasHeight, setCanvasHeight] = useState(100 * 2);
    const [fontsLoaded, setFontsLoaded] = useState(false)
    const textColor = '#98a3a1'
    const item  = 'John Marren'


    const drawDots = (allPoints, ctx, currentIndex = 0) => {
        if (currentIndex >= allPoints.length) return;
    
        ctx.fillStyle = textColor;
        ctx.beginPath();
        ctx.arc(allPoints[currentIndex].x, allPoints[currentIndex].y, 1.5, 0, Math.PI * 2);
        ctx.fill();
     
        let dotsToDraw = 100;
        while (dotsToDraw-- && currentIndex < allPoints.length) {
            currentIndex++;
            ctx.beginPath();
            ctx.arc(allPoints[currentIndex].x, allPoints[currentIndex].y, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
    
    }

    useEffect(() => {
        console.log('ran')
        console.log('font: ', font);
    }, [])


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



    const loadFontAndDrawDots = () => {
        if (!font) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;


        const textItems = {
            header: 'John Marren - Web Developer',
            projects: 'Projects',
            resume: 'Resume',
            github: 'Github'
        }

        const shuffle = (array: any[]) => {
            let currentIndex = array.length, randomIndex;
            while (currentIndex !== 0) {
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
              [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            }
            return array;
          }

            const path = font.getPath(item, 0, 100, 100);
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

          //   drawDots(allPoints, ctx)'
          const allPointsTemp = shuffle([...points, ...outsidePoints]);
          drawDots(allPointsTemp, ctx)
          }
    

    const dynamicClass = 'w-[500px] h-[70px] sm:w-[600px] sm:h-[90px] md:w-[750px] md:h-[120px] border border-red-600' 
return (

    <canvas 
    ref={canvasRef} 
    width={canvasWidth}  
    height={canvasHeight}
    className={dynamicClass}
    >
</canvas>
)
}
export default React.memo(DotsOnCanvas)


*/