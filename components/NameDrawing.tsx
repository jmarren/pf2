'use client'
import Head from "next/head";
import React, { useEffect, useRef, useState } from 'react';
import { useFont } from './FontContext';
// import {loadFont} from '/pages/api/loadFont'
import opentype from 'opentype.js';

const DotsOnCanvas: React.FC = ({text, textColor, fontSize, header}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
const lengthNum = header ? text.length : 8;
const font = useFont();
// const [font, setFont] = useState(null);
const [canvasWidth, setCanvasWidth] = useState(fontSize * lengthNum / 1.5);
const [canvasHeight, setCanvasHeight] = useState(fontSize * 2);
const [fontLoaded, setFontLoaded] = useState(false);
const [allPoints,setAllPoints] = useState(null);
const [ctx, setCtx] =  useState(null); 

  const shuffle = (array: any[]) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  // const fetchFont = async () => {
  //   const response = await fetch('/api/loadFont')
  //   const data = await response.json();
  //   console.log(data)
  //   setFont(data)
  // }

  useEffect(() => {
    console.log(font);
  }, [fontLoaded])


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
    ctx.arc(allPoints[currentIndex].x, allPoints[currentIndex].y, 1.5, 0, Math.PI * 2);
    ctx.fill();
 
    let dotsToDraw = 100;
    while (dotsToDraw-- && currentIndex < allPoints.length) {
        currentIndex++;
        ctx.beginPath();
        ctx.arc(allPoints[currentIndex].x, allPoints[currentIndex].y, 1.5, 0, Math.PI * 2);
        ctx.fill();
    }



    requestAnimationFrame(() => drawDots(allPoints, ctx, currentIndex + 1));
  };

  const loadFontAndDrawDots = () => {
    // opentype.load('/MigaeSemibold-3zd2M.otf', (err, font) => {
    //     if (err) {
    //       console.error('Font could not be loaded:', err);
    //       return;
    //     }
    if (!font) return;

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
        //   const allPoints = ;
        //   drawDots(allPoints, ctx)'
        const allPointsTemp = shuffle([...points, ...outsidePoints]);
        // if (!allPointsTemp) 
        setAllPoints(allPointsTemp);

        setCtx(ctx);
        setFontLoaded(true);
        }
    //   });
  
};


useEffect(() => {
    if (fontLoaded) {
        drawDots(allPoints, ctx)
    } 
}, [fontLoaded])






useEffect(() => {
  loadFontAndDrawDots();
}, []);


const dynamicClass = header ? ' w-[500px] h-[70px] sm:w-[600px] sm:h-[90px] md:w-[750px] md:h-[120px]' 
        : ' w-[80px] h-[40px] sm:w-[100px] sm:h-[50px] md:w-[120px] md:h-[60px] lg:w-[150px] lg:h-[75px] '

if (!font) return null;
return (
    <>
    <Head><link rel="preload" href='/MigaeSemibold-3zd2M.otf' as="font" type="font/otf" crossOrigin="anonymous"></link></Head>

<canvas 
    ref={canvasRef} 
    width={canvasWidth}  
    height={canvasHeight}
    className={dynamicClass}
    >
</canvas>
</>)
};

export default React.memo(DotsOnCanvas);




/*
'use client'
import React, { useEffect, useRef, useState, useMemo } from 'react';
import opentype, { BoundingBox } from 'opentype.js';

const DotsOnCanvas: React.FC = ({text, textColor, fontSize, header}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
const lengthNum = header ? text.length : 8;
const [fontLoaded, setFontLoaded] = useState(false);
const [font, setFont] = useState(null);
const [canvasWidth, setCanvasWidth] = useState(fontSize * lengthNum / 1.5);
const [canvasHeight, setCanvasHeight] = useState(fontSize * 2);
const [oneData, setOneData] = useState(null); 
const [path, setPath] = useState(null);
const [bbox, setBbox] = useState<BoundingBox | null>(null)
  // Function to shuffle an array
  const shuffle = (array: any[]) => { //----------------------------------
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }





  useEffect(() => { // -------------------------
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


  const drawDots = (allPoints, ctx, currentIndex = 0) => {//----------------------------------
    if (currentIndex >= allPoints.length) return;

    ctx.fillStyle = textColor;
    ctx.beginPath();
    ctx.arc(allPoints[currentIndex].x, allPoints[currentIndex].y, 1.5, 0, Math.PI * 2);
    ctx.fill();
 
    let dotsToDraw = 50;
    while (dotsToDraw-- && currentIndex < allPoints.length) {
        currentIndex++;
        ctx.beginPath();
        ctx.arc(allPoints[currentIndex].x, allPoints[currentIndex].y, 1.5, 0, Math.PI * 2);
        ctx.fill();
    }



    requestAnimationFrame(() => drawDots(allPoints, ctx, currentIndex + 1));
  };


    useEffect(() => {//----------------------------------
        // Load the font
        opentype.load('/MigaeSemibold-3zd2M.otf', (err, loadedFont) => {
            if (err) {
                console.error('Font could not be loaded:', err);
                return;
            }
            if (loadedFont) {
            const tempPath = loadedFont.getPath(text, 0, fontSize , fontSize)
            setPath(tempPath);
            setOneData(tempPath.toSVG(0)) 
            // Set the loaded font to state and update fontLoaded state
            setPath(path)
            setFontLoaded(true);   
            const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svgElement.innerHTML = oneData;
          svgElement.style.visibility = 'hidden'
          svgElement.style.position = 'absolute'
          document.body.appendChild(svgElement);
          const pathElement = svgElement.querySelector('path');             
           const tempBbox = tempPath.getBoundingBox();
           setBbox(tempBbox);

            }
        });
    }, []);




  const loadFontAndDrawDots = () => {//----------------------------------
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
// This is a string representation of SVG
  
          // Append SVG path to an SVG element in the DOM (you can keep it hidden)
       
  
          const points = [];
          const outsidePoints = [];
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
        //   const allPoints = useMemo(() => shuffle([...points, ...outsidePoints]), [points, outsidePoints]);
          drawDots(allPoints, ctx)
        }
    // });
// };




// useEffect(() => {
//     loadFont();
// }, [])

useEffect(() => {
    if (fontLoaded) {
        loadFontAndDrawDots();
    }
}, [fontLoaded]);


const dynamicClass = header ? ' w-[500px] h-[70px] sm:w-[600px] sm:h-[90px] md:w-[750px] md:h-[120px]' 
        : ' w-[80px] h-[40px] sm:w-[100px] sm:h-[50px] md:w-[120px] md:h-[60px] lg:w-[150px] lg:h-[75px] '


return (<>
<canvas 
    ref={canvasRef} 
    width={canvasWidth}  
    height={canvasHeight}
    className={dynamicClass}
    >
</canvas>
</>)};

export default React.memo(DotsOnCanvas) ;

*/

