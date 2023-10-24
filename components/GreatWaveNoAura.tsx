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
        
        count++;
        setTimeout(drawDot, intervalTime);
      };

      drawDot();
    };
  }, []);

  return <canvas ref={canvasRef}  className='rounded-md w-full absolute '></canvas>;
};

export default DotDrawer;


