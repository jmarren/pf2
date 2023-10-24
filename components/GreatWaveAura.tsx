'use client'
import React, { useEffect, useRef, useState } from 'react';

const DotDrawer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [count, setCount] = useState(0);
  
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
        const paddingFactor = 0.85

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

      const imgDataVerticalLeft = offscreenCtx.getImageData(xCenter + 1, 0, 1, offscreenCanvas.height).data;
      const imgDataVerticalRight = offscreenCtx.getImageData(xCenter + scaledWidth - 1, 0, 1, offscreenCanvas.height).data;
      const imgDataHorizontalTop = offscreenCtx.getImageData(0, yCenter + 1, offscreenCanvas.width, 1).data;
      const imgDataHorizontalBottom = offscreenCtx.getImageData(0, yCenter + scaledHeight - 1, offscreenCanvas.width, 1).data;

console.log(imgDataVerticalLeft);

    const totalDots = 1000000; // Number of dots
    const intervalTime = 0.001
    const radius = 8;
      const drawDot = () => {

        const auraProb = 0.3;
        const maxAuraDistance = 100;  
        const distanceWeight = Math.random() * Math.random();

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



        if (Math.random() < 0.05) {     
            if (Math.random() > 0.5) {// Top & Bottom     
                if (Math.random() > 0.5) {     // Top Aura 
                const auraX = x;
        
                const mappedX = Math.floor(auraX * (offscreenCanvas.width / canvas.width));
                const index = mappedX * 4; 
                const red = imgDataHorizontalTop[index];
                const green = imgDataHorizontalTop[index + 1];
                const blue = imgDataHorizontalTop[index + 2];
                const alpha = imgDataHorizontalTop[index + 3];
                    
                let positionY = yCenter - (Math.random() * Math.random() * maxAuraDistance);
                ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
                ctx.beginPath();
                ctx.arc(auraX, positionY ,radius * Math.random(), 0, Math.PI * 2  );
                ctx.fill();
                }  else {       // Bottom Aura 
                const auraX = x;
        
                const mappedX = Math.floor(auraX * (offscreenCanvas.width / canvas.width));
                const index = mappedX * 4; 
                const red = imgDataHorizontalBottom[index];
                const green = imgDataHorizontalBottom[index + 1];
                const blue = imgDataHorizontalBottom[index + 2];
                const alpha = imgDataHorizontalBottom[index + 3];
                    
                let positionY = yCenter + scaledHeight +  (Math.random() * Math.random() * maxAuraDistance);
                ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
                ctx.beginPath();
                ctx.arc(auraX, positionY ,radius * Math.random(), 0, Math.PI * 2  );
                ctx.fill();
                }
            } else {
                if (Math.random() > 0.5) {      // Right Aura 
                const auraY = y;
    
                const mappedY = Math.floor(auraY * (offscreenCanvas.height / canvas.height));
                const index = mappedY * 4; 
                const red = imgDataVerticalRight[index];
                const green = imgDataVerticalRight[index + 1];
                const blue = imgDataVerticalRight[index + 2];
                const alpha = imgDataVerticalRight[index + 3];
                    
                let positionX = xCenter + scaledWidth + (Math.random() * Math.random() * maxAuraDistance);
                ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
                ctx.beginPath();
                ctx.arc(positionX, auraY ,radius * Math.random(), 0, Math.PI * 2  );
                ctx.fill();
                } else {        // Left Aura
                const auraY = y;

                const mappedY = Math.floor(auraY * (offscreenCanvas.height / canvas.height));
                const index = mappedY * 4; 
                const red = imgDataVerticalLeft[index];
                const green = imgDataVerticalLeft[index + 1];
                const blue = imgDataVerticalLeft[index + 2];
                const alpha = imgDataVerticalLeft[index + 3];
                
                let positionX = xCenter -  (Math.random() * Math.random() * maxAuraDistance);
                ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
                ctx.beginPath();
                ctx.arc(positionX, auraY ,radius * Math.random(), 0, Math.PI * 2  );
                ctx.fill();
                }
            }   
        } else {   // Regular Drawing
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



        

 
        
       setCount(prev => prev + 1)
        setTimeout(drawDot, intervalTime);
      };

      drawDot();
    };
  }, []);

  return <canvas ref={canvasRef}  className='rounded-md w-full absolute '></canvas>;
};

export default DotDrawer;


