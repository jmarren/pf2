'use client'
import React, { useEffect, useRef } from 'react';

const DotDrawer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = 'Great-Wave-Off-Kanagawa.svg';
    

    img.onload = () => {
        const aspectRatio = (img.width as number) / (img.height as number);
     
        
        canvas.width = (window.innerWidth) * 0.85;
        canvas.height =  ( window.innerHeight) * 0.85;

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        let scaledWidth: number, scaledHeight: number;
        const paddingFactor = 0.8

           if (canvasWidth / canvasHeight > aspectRatio) {
            scaledHeight = canvasHeight * paddingFactor;
            scaledWidth = canvasHeight * aspectRatio;
          } else {
            scaledWidth = canvasWidth * paddingFactor;
            scaledHeight = canvasWidth / aspectRatio;
          }

        // Calculate where to start drawing the image to center it
        const xCenter = (canvasWidth - scaledWidth ) / 2;
        const yCenter = (canvasHeight - scaledHeight) / 2;


      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;

      const offscreenCtx = offscreenCanvas.getContext('2d');
      if (!offscreenCtx) return;
        

      offscreenCtx.drawImage(img, xCenter, yCenter, scaledWidth, scaledHeight );
      const imgData = offscreenCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height).data;
      console.log(imgData);

      
      let count = 0;
      const totalDots = 1000000; // Number of dots
      const intervalTime = 100000 / totalDots; // 10 seconds
      const radius = 8;



      const drawDot = () => {


        ctx.fillStyle = 'red'; // color for the bottom-right corner
ctx.fillRect(canvas.width - 5, canvas.height - 5, 10, 10); // 10x10 square dot

// Drawing a point at xCenter, yCenter
ctx.fillStyle = 'blue'; // color for the center
ctx.beginPath();
ctx.arc(xCenter, yCenter, 5, 0, Math.PI * 2); // 5 is the radius of the dot
ctx.fill();

// Drawing a point representing scaledWidth, scaledHeight from the top-left corner
ctx.fillStyle = 'green'; // color for scaled dimensions
ctx.fillRect(xCenter + scaledWidth, yCenter + scaledHeight, 10, 10); // 10x10 square dot

        if (count >= totalDots) return;

        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);
      
        const auraProb = 0.3;
        const maxAuraDistance = 100;  // Maximum distance from image boundary to place an 'aura' dot
      

        if (Math.random() < auraProb) {
          let auraX = x;
          let auraY = y;


          // Apply a weighting function to make points closer to the edge more likely
          const distanceWeight = Math.random() * Math.random();
          let adjustXLeft = false;
          let adjustXRight = false;
          let adjustYTop = false;
          let adjustYBottom = false;
          let closestX, closestY;

          function findWidthPointOnOriginal(img, newCanvasWidth , pointOnNew, padding) {
            const xScaleFactor = img.width / (newCanvasWidth);
            return (pointOnNew) / xScaleFactor ;
          }

          function findHeightPointOnOriginal(img, newCanvasHeight, pointOnNew, padding) {
            const yScaleFactor  = img.height / (newCanvasHeight);
            return (pointOnNew) / yScaleFactor;
          }

          if (Math.random() < 0.5) {
            // Adjust X-coordinate for the aura point
            if (Math.random() < 0.5)   {
                auraX = xCenter - maxAuraDistance * distanceWeight;
                adjustXLeft = true;
                closestX = findWidthPointOnOriginal(offscreenCanvas, scaledWidth, xCenter, xCenter);
                // closestX = scaledWidth - offscreenCtx.width;
                closestY = findHeightPointOnOriginal(offscreenCanvas, scaledHeight , auraY, yCenter);
                auraY = auraY

            } else {
                auraX = xCenter + scaledWidth + maxAuraDistance * distanceWeight;
                adjustXRight = true;
                closestX = xCenter + scaledWidth - 1;
                closestY = auraY;
            }               
        } else {
            // Adjust Y-coordinate for the aura point
            if (Math.random() < 0.5) {
                auraY = yCenter - maxAuraDistance * distanceWeight;
                adjustYTop = true;
                closestY = yCenter + 1;
                closestX = auraX;
            } else {
                auraY = yCenter + scaledHeight + maxAuraDistance * distanceWeight;
                adjustYBottom = true;
                closestY = yCenter + scaledHeight - 1;
                closestX = auraX;
            }
        }
    
        const closestIndex = Math.floor((closestY * offscreenCanvas.width + closestX) * 4);
        //   console.log(`aura: (${auraX}, ${auraY}) closest: (${closestX}, ${closestY})`)
           
        //   const closestIndex = Math.floor((closestY * canvas.width + closestX) * 4);
        

        const red = imgData[closestIndex];
          const green = imgData[closestIndex + 1];
          const blue = imgData[closestIndex + 2];
        //   const alpha = imgData[closestIndex + 3];
        //   ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        // ctx.fillStyle = 'red'
        ctx.fillStyle = adjustXLeft ? `rgb(${red}, ${green}, ${blue})` : 'transparent'


      
        //   ctx.fillStyle = 'red'; // Hard-coded color for the aura
        //   ctx.fillRect(auraX, auraY, 1, 1);
          ctx.beginPath();
          ctx.arc(auraX, auraY, radius * Math.random(), 0, Math.PI * 2);
          ctx.fill();


      
        } else {
          const index = (y * canvas.width + x) * 4;
          if (imgData[index + 3] > 0) {
            const red = imgData[index];
            const green = imgData[index + 1];
            const blue = imgData[index + 2];
            ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
            ctx.fillRect(x, y, 1, 1);
            ctx.beginPath();
            ctx.arc(x, y, radius * Math.random(), 0, Math.PI * 2);
            ctx.fill();
          }
        }
        count++;
        setTimeout(drawDot, intervalTime);
      };

      drawDot();
    };
  }, []);

  return <canvas ref={canvasRef}  className='rounded-md w-full absolute '></canvas>;
};

export default DotDrawer;







/*

'use client'
import React, { useEffect, useRef } from 'react';

const DotDrawer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = 'Great-Wave-Off-Kanagawa.svg';
    

    img.onload = () => {
        const aspectRatio = (img.width as number) / (img.height as number);
     
        
        canvas.width = (window.innerWidth) * 0.85;
        canvas.height =  ( window.innerHeight) * 0.85;

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        let scaledWidth: number, scaledHeight: number;
        const paddingFactor = 0.75

           if (canvasWidth / canvasHeight > aspectRatio) {
            scaledHeight = canvasHeight * paddingFactor;
            scaledWidth = canvasHeight * aspectRatio;
          } else {
            scaledWidth = canvasWidth * paddingFactor;
            scaledHeight = canvasWidth / aspectRatio;
          }

        // Calculate where to start drawing the image to center it
        const xCenter = (canvasWidth - scaledWidth ) / 2;
        const yCenter = (canvasHeight - scaledHeight) / 2;


      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;

      const offscreenCtx = offscreenCanvas.getContext('2d');
      if (!offscreenCtx) return;
        

      offscreenCtx.drawImage(img, xCenter, yCenter, scaledWidth, scaledHeight );
      const imgData = offscreenCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height).data;
      console.log(imgData);

      
      let count = 0;
      const totalDots = 1000000; // Number of dots
      const intervalTime = 100000 / totalDots; // 10 seconds
      const radius = 8;



      const drawDot = () => {
        if (count >= totalDots) return;
        // Drawing a point at canvasWidth, canvasHeight
ctx.fillStyle = 'red'; // color for the bottom-right corner
ctx.fillRect(canvas.width - 5, canvas.height - 5, 10, 10); // 10x10 square dot

// Drawing a point at xCenter, yCenter
ctx.fillStyle = 'blue'; // color for the center
ctx.beginPath();
ctx.arc(xCenter, yCenter, 5, 0, Math.PI * 2); // 5 is the radius of the dot
ctx.fill();

// Drawing a point representing scaledWidth, scaledHeight from the top-left corner
ctx.fillStyle = 'green'; // color for scaled dimensions
ctx.fillRect(xCenter + scaledWidth, yCenter + scaledHeight, 10, 10); // 10x10 square dot


        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);
      
        const auraProb = 0.3;
        const maxAuraDistance = 100;  // Maximum distance from image boundary to place an 'aura' dot
      
        let xScaleFactor = (scaledWidth - xCenter) / canvasWidth;
        let yScaleFactor = (scaledHeight - yCenter) / canvasHeight;

        if (Math.random() < auraProb) {
          let auraX = x;
          let auraY = y;


          // Apply a weighting function to make points closer to the edge more likely
          const distanceWeight = Math.random() * Math.random();
          
          let adjustXRight = false;
          let adjustYTop = false;
          let adjustXLeft = false;
          let adjustYBottom = false;
          let closestX, closestY;

              
          if (Math.random() < 0.5) {
            // Adjust X-coordinate for the aura point
            if (Math.random() < 0.5)   {
                auraX = xCenter - maxAuraDistance * distanceWeight;
                adjustXLeft = true;
                closestX = xCenter;
                closestY = auraY;
            } else {
                auraX = xCenter + scaledWidth + maxAuraDistance * distanceWeight;
                adjustXRight = true;
                closestX = xCenter + scaledWidth;
                closestY = auraY;
            }               
        } else {
            // Adjust Y-coordinate for the aura point
            if (Math.random() < 0.5) {
                auraY = yCenter - maxAuraDistance * distanceWeight;
                adjustYBottom = true;
                closestY = yCenter;
                closestX = auraX;
            } else {
                auraY = yCenter + scaledHeight + maxAuraDistance * distanceWeight;
                adjustYTop = true;
                closestY = yCenter + scaledHeight;
                auraX = (x + xCenter ) / xScaleFactor
                closestX = (x ) * xScaleFactor + xCenter;

                // auraX =( 2 * auraX /  aspectRatio) + xCenter

            }
        }

        const closestIndex = Math.floor(((closestY - 1) * canvas.width + closestX) * 4);

        const red = imgData[closestIndex];
          const green = imgData[closestIndex + 1];
          const blue = imgData[closestIndex + 2];
          const alpha = imgData[closestIndex + 3];
          ctx.fillStyle = adjustYBottom ? `rgba(${red}, ${green}, ${blue}, ${alpha / 255})` : 'transparent';

          ctx.beginPath();
          ctx.arc(auraX ,auraY, radius * Math.random(), 0, Math.PI * 2);
          ctx.fill();
        //   ctx.fillStyle = adjustYTop ? 'red' : 'transparent'
        //   ctx.beginPath();
        //   ctx.arc(closestX, closestY, 2, 0, Math.PI * 2);
        //   ctx.fill();

      
        } else {
          const index = (y * canvas.width + x) * 4;
          if (imgData[index + 3] > 0) {
            const red = imgData[index];
            const green = imgData[index + 1];
            const blue = imgData[index + 2];
            ctx.fillStyle =  `rgb(${red}, ${green}, ${blue})`;
            ctx.fillRect(x, y, 1, 1);
            ctx.beginPath();
            ctx.arc(x, y, radius * Math.random(), 0, Math.PI * 2);
            ctx.fill();
          }
        }
        count++;
        setTimeout(drawDot, intervalTime);
      };

      drawDot();
    };
  }, []);

  return <canvas ref={canvasRef}  className='rounded-md w-full absolute '></canvas>;
};

export default DotDrawer;
*/










/*
'use client'
import React, { useEffect, useRef } from 'react';

const DotDrawer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = 'Great-Wave-Off-Kanagawa.svg';
    

    img.onload = () => {
        const aspectRatio = (img.width as number) / (img.height as number);
     
        
        canvas.width = (window.innerWidth) * 0.85;
        canvas.height =  ( window.innerHeight) * 0.85;
        // canvas.width = (img.width as number) * 3;
        // canvas.height = (img.height as number) * 3 ;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        let scaledWidth, scaledHeight;
        const paddingFactor = 0.8

           if (canvasWidth / canvasHeight > aspectRatio) {
            scaledHeight = canvasHeight * paddingFactor;
            scaledWidth = canvasHeight * aspectRatio;
          } else {
            scaledWidth = canvasWidth * paddingFactor;
            scaledHeight = canvasWidth / aspectRatio;
          }

        // Calculate where to start drawing the image to center it
        const xCenter = (canvasWidth - scaledWidth ) / 2;
        const yCenter = (canvasHeight - scaledHeight) / 2;


      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;

      const offscreenCtx = offscreenCanvas.getContext('2d');
      if (!offscreenCtx) return;
        

      offscreenCtx.drawImage(img, xCenter, yCenter, scaledWidth, scaledHeight );
      const imgData = offscreenCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height).data;
      console.log(imgData);

      
      let count = 0;
      const totalDots = 1000000; // Number of dots
      const intervalTime = 100000 / totalDots; // 10 seconds
      const radius = 8;



      const drawDot = () => {
        if (count >= totalDots) return;

        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);
      
        const auraProb = 0.3;
        const maxAuraDistance = 100;  // Maximum distance from image boundary to place an 'aura' dot
      

        if (Math.random() < auraProb) {
          let auraX = x;
          let auraY = y;


          // Apply a weighting function to make points closer to the edge more likely
          const distanceWeight = Math.random() * Math.random();
          let adjustXLeft = false;
          let adjustXRight = false;
          let adjustYTop = false;
          let adjustYBottom = false;
          let closestX, closestY;

          if (Math.random() < 0.5) {
            // Adjust X-coordinate for the aura point
            if (Math.random() < 0.5)   {
                auraX = xCenter - maxAuraDistance * distanceWeight;
                adjustXLeft = true;
                closestX = xCenter;
                closestY = auraY;
            } else {
                auraX = xCenter + scaledWidth + maxAuraDistance * distanceWeight;
                adjustXRight = true;
                closestX = xCenter + scaledWidth;
                closestY = auraY;
            }               
        } else {
            // Adjust Y-coordinate for the aura point
            if (Math.random() < 0.5) {
                auraY = yCenter - maxAuraDistance * distanceWeight;
                adjustYBottom = true;
                closestY = yCenter;
                closestX = auraX;
            } else {
                auraY = yCenter + scaledHeight + maxAuraDistance * distanceWeight;
                adjustYTop = true;
                closestY = yCenter + scaledHeight;
                closestX = auraX;
            }
        }
    
        const closestIndex = Math.floor((closestY * canvas.width + closestX) * 4);
        //   console.log(`aura: (${auraX}, ${auraY}) closest: (${closestX}, ${closestY})`)
           
        //   const closestIndex = Math.floor((closestY * canvas.width + closestX) * 4);
        

        const red = imgData[closestIndex];
          const green = imgData[closestIndex + 1];
          const blue = imgData[closestIndex + 2];
          const alpha = imgData[closestIndex + 3];
          ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`;
        // ctx.fillStyle = 'red'

      
        //   ctx.fillStyle = 'red'; // Hard-coded color for the aura
            ctx.fillRect(auraX, auraY, 1, 1);
          ctx.beginPath();
          ctx.arc(auraX, auraY, radius * Math.random(), 0, Math.PI * 2);
          ctx.fill();
      
        } else {
          const index = (y * canvas.width + x) * 4;
          if (imgData[index + 3] > 0) {
            const red = imgData[index];
            const green = imgData[index + 1];
            const blue = imgData[index + 2];
            ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
            ctx.fillRect(x, y, 1, 1);
            ctx.beginPath();
            ctx.arc(x, y, radius * Math.random(), 0, Math.PI * 2);
            ctx.fill();
          }
        }
        count++;
        setTimeout(drawDot, intervalTime);
      };

      drawDot();
    };
  }, []);

  return <canvas ref={canvasRef}  className='rounded-md w-full absolute '></canvas>;
};

export default DotDrawer;
*/








// function AuraPoint(imgData) {
//     let rightEdgeX = xCenter + scaledWidth;
//     let leftEdgeX = xCenter;
//     let closestX = 
// }




      /*
      const drawDot = () => {

        if (count >= totalDots) return;

        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);

        const auraProb = 0.3;
        const auraDistance = 50; // Minimum distance from image boundary to place an 'aura' dot

        
        if (Math.random() < auraProb ) {

            let auraX = x;
            let auraY = y;
            
            // Adjust the auraX and auraY so they are at least `auraDistance` away from the image boundaries
            if (auraX < xCenter) {
              auraX = xCenter - auraDistance - Math.random() * auraDistance;
            } else if (auraX > xCenter) {
              auraX = xCenter + auraDistance + Math.random() * auraDistance;
            }
            
            if (auraY < yCenter) {
              auraY = yCenter - auraDistance - Math.random() * auraDistance;
            } else if (auraY > yCenter) {
              auraY = yCenter + auraDistance + Math.random() * auraDistance;
            }


            let closestX = Math.min(Math.max(x, xCenter), xCenter + scaledWidth);
            let closestY = Math.min(Math.max(y, yCenter), yCenter + scaledHeight);
        
            const index = ((closestY - yCenter) * scaledWidth + (closestX - xCenter)) * 4;
            if (imgData[index + 3] > 0) {
              const red = imgData[index];
              const green = imgData[index + 1];
              const blue = imgData[index + 2];
            //   ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
              ctx.fillStyle = 'red'
              ctx.fillRect(auraX, auraY, 1, 1);
        
              ctx.beginPath();
              ctx.arc(x, y, radius * Math.random(), 0, Math.PI * 2);
              ctx.fill();
            }
        } else {

        const index = (y * canvas.width + x) * 4;
        if (imgData[index + 3] > 0) {
          const red = imgData[index];
          const green = imgData[index + 1];
          const blue = imgData[index + 2];
          ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
          ctx.fillRect(x, y, 1, 1);

          ctx.beginPath();
          ctx.arc(x, y, radius * Math.random(), 0, Math.PI * 2);
          ctx.fill();
          
        }
        }
*/






/*
import React, { useEffect, useRef } from 'react';
import opentype from 'opentype.js';
// import Image from 'next/image'

const GreatWave: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
   
      
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      

      const img = new Image();
      img.src = `/Great-Wave-Off-Kanagawa.svg`;

      img.onload = () => {      
        img.style.visibility = 'hidden';
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  
        let count = 0;
        const totalDots = 100000; // Number of dots
        const intervalTime = 100000 / totalDots; // 10 seconds
  
        const drawDot = () => {
          if (count >= totalDots) return;
  
          const x = Math.floor(Math.random() * canvas.width);
          const y = Math.floor(Math.random() * canvas.height);
  
          const index = (y * canvas.width + x) * 4;
          if (imgData[index + 3] > 0) {
            ctx.fillStyle = "black"; // Dot color
            ctx.fillRect(x, y, 1, 1);
          }
  
          count++;
          setTimeout(drawDot, intervalTime);
        };
  
        drawDot();
      };
    }, []);
  
    return <canvas ref={canvasRef} width={400} height={400}></canvas>;
  };

export default GreatWave;



*/