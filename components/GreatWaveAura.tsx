'use client'
import React, { useEffect, useRef, useState } from 'react';

const DotDrawer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [count, setCount] = useState(0);
    // useEffect(() => {
    //     console.log(radius)
    //     console.log(count)
    //     if (count == 50) {
    //         console.log('radius now 10')
    //         setRadius(10);
    //     }
    //     if (count ===  100) {
    //         console.log('radius now 5')
    //         setRadius(5);
    //     }
    // }, [count])

  
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

      const imgDataVerticalLeft = offscreenCtx.getImageData(xCenter, 0, 1, offscreenCanvas.height).data;
      const imgDataVerticalRight = offscreenCtx.getImageData(xCenter + scaledWidth, 0, 1, offscreenCanvas.height).data;
      const imgDataHorizontalTop = offscreenCtx.getImageData(0, yCenter, offscreenCanvas.width, 1).data;
      const imgDataHorizontalBottom = offscreenCtx.getImageData(0, yCenter + scaledHeight, offscreenCanvas.width, 1).data;

console.log(imgDataVerticalLeft);

      const totalDots = 1000000; // Number of dots
    //   const intervalTime = 100000 / totalDots; // 10 seconds
    const intervalTime = 0.001
      const radius = 8;
    // const radius = 15;





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



        // Bottom Aura 
        if (Math.random() < 0.05) {
            const auraX = x;
    
            const mappedX = Math.floor(auraX * (offscreenCanvas.width / canvas.width));
            const index = mappedX * 4; // Each pixel has 4 values: R, G, B, and A
            const red = imgDataHorizontalBottom[index];
            const green = imgDataHorizontalBottom[index + 1];
            const blue = imgDataHorizontalBottom[index + 2];
            const alpha = imgDataHorizontalBottom[index + 3];
            
            // let strength = scaledHeight / Math.abs(scaledHeight / 2 - auraX);
    
            let positionY = yCenter + scaledHeight +  maxAuraDistance * distanceWeight;
            ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha * 2/ (255 * distanceWeight)})`;
            ctx.beginPath();
            ctx.arc(auraX, positionY ,radius * Math.random(), 0, Math.PI * 2  );
            ctx.fill();
        }         



        // Top Aura
        if (Math.random() < 0.05) {
  
            const auraX = x;
    
            const mappedX = Math.floor(auraX * (offscreenCanvas.width / canvas.width));
            const index = mappedX * 4; // Each pixel has 4 values: R, G, B, and A
            const red = imgDataHorizontalTop[index];
            const green = imgDataHorizontalTop[index + 1];
            const blue = imgDataHorizontalTop[index + 2];
            const alpha = imgDataHorizontalTop[index + 3];
            
            // let strength = scaledHeight / Math.abs(scaledHeight / 2 - auraX);
    
            let positionY = yCenter -  maxAuraDistance * distanceWeight;
            ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha * 2/ (255 * distanceWeight)})`;
            ctx.beginPath();
            ctx.arc(auraX, positionY ,radius * Math.random(), 0, Math.PI * 2  );
            ctx.fill();
        }         



        // Right Aura 
        if (Math.random() < 0.05) {
  
            const auraY = y;
    
            const mappedY = Math.floor(auraY * (offscreenCanvas.height / canvas.height));
            const index = mappedY * 4; // Each pixel has 4 values: R, G, B, and A
            const red = imgDataVerticalRight[index];
            const green = imgDataVerticalRight[index + 1];
            const blue = imgDataVerticalRight[index + 2];
            const alpha = imgDataVerticalRight[index + 3];
            
            let strength = scaledHeight / Math.abs(scaledHeight / 2 - auraY);
    
            let positionX = xCenter + scaledWidth +  maxAuraDistance * distanceWeight;
            ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha / (255 * distanceWeight)})`;
            ctx.beginPath();
            ctx.arc(positionX, auraY ,radius * Math.random(), 0, Math.PI * 2  );
            ctx.fill();
        } 

        // Left Aura
        if (Math.random() < 0.05) {
  
        const auraY = y;

        const mappedY = Math.floor(auraY * (offscreenCanvas.height / canvas.height));
        const index = mappedY * 4; // Each pixel has 4 values: R, G, B, and A
        const red = imgDataVerticalLeft[index];
        const green = imgDataVerticalLeft[index + 1];
        const blue = imgDataVerticalLeft[index + 2];
        const alpha = imgDataVerticalLeft[index + 3];
        
        let strength = scaledHeight / Math.abs(scaledHeight / 2 - auraY);

        let positionX = xCenter - maxAuraDistance * distanceWeight;
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha / (255 * distanceWeight)})`;
        // ctx.fillStyle = 'red'
        ctx.beginPath();
        ctx.arc(positionX, auraY ,radius * Math.random(), 0, Math.PI * 2  );
        ctx.fill();
    }
  
          const index = (y * canvas.width + x) * 4;
          if (imgData[index + 3] > 0) {
            const red = imgData[index];
            const green = imgData[index + 1];
            const blue = imgData[index + 2];
            ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
            // ctx.fillStyle = 'red'
            ctx.fillRect(x, y, 1, 1);
            ctx.beginPath();
            ctx.arc(x, y, radius * Math.random(), 0, Math.PI * 2);
            ctx.fill();
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


