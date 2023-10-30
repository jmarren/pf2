'use client'
import React, { useRef, useState, useEffect } from 'react';

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(true);
  const animationRef = useRef<number | null>(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const localCount = 0; 

    const img = new Image();
        img.src = 'Great-Wave-Off-Kanagawa.svg';
        
    
        img.onload = () => {
            const aspectRatio = (img.width as number) / (img.height as number);
            canvas.width = (dimensions.width);
            canvas.height =  (dimensions.height);
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
    
            let scaledWidth: number, scaledHeight: number;
            const paddingFactor = 0.8
    
               if (dimensions.width / dimensions.height > aspectRatio) {
                scaledHeight = dimensions.height * paddingFactor;
                scaledWidth = dimensions.height * aspectRatio * 0.9;
              } else {
                scaledWidth = dimensions.width * paddingFactor;
                scaledHeight = (dimensions.width / aspectRatio) * 0.9;
              }
              console.log(scaledWidth);
              console.log(scaledHeight); 
            // Calculate where to start drawing the image to center it
            const xCenter = (dimensions.width - scaledWidth ) / 2;
            const yCenter = (dimensions.height - scaledHeight) / 2;
    
    
          const offscreenCanvas = document.createElement('canvas');
          offscreenCanvas.width = dimensions.width;
          offscreenCanvas.height = dimensions.height;
    
          const offscreenCtx = offscreenCanvas.getContext('2d', {willReadFrequently: true});
          if (!offscreenCtx) return;
            
    
          offscreenCtx.drawImage(img, xCenter, yCenter, scaledWidth, scaledHeight );
          const imgData = offscreenCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height).data;
    
          const imgDataVerticalLeft = offscreenCtx.getImageData(xCenter + 1, 0, 1, offscreenCanvas.height).data;
          const imgDataVerticalRight = offscreenCtx.getImageData(xCenter + scaledWidth - 1, 0, 1, offscreenCanvas.height).data;
          const imgDataHorizontalTop = offscreenCtx.getImageData(0, yCenter + 1, offscreenCanvas.width, 1).data;
          const imgDataHorizontalBottom = offscreenCtx.getImageData(0, yCenter + scaledHeight - 1, offscreenCanvas.width, 1).data;
          const imgDataBottomLeft = offscreenCtx.getImageData(xCenter + 1, yCenter + scaledHeight - 1, 1, 1).data;
          const imgDataTopLeft = offscreenCtx.getImageData(xCenter + 1,yCenter + 1, 1, 1 ).data;
          const imgDataTopRight = offscreenCtx.getImageData(xCenter + scaledWidth - 1, yCenter + 10, -1, 1).data;
          const imgDataBottomRight = offscreenCtx.getImageData(xCenter + scaledWidth - 20, yCenter + scaledHeight - 10, 1, 1 ).data;
    
    
        
          // BottomLeft
          const bottomLeftRed = imgDataBottomLeft[0];
          const bottomLeftGreen = imgDataBottomLeft[1];
          const bottomLeftBlue = imgDataBottomLeft[2];
          // TopLeft
          const topLeftRed = imgDataTopLeft[0];
          const topLeftGreen = imgDataTopLeft[1];
          const topLeftBlue = imgDataTopLeft[2];
          // Top Right
          const topRightRed = imgDataTopRight[0];
          const topRightGreen = imgDataTopRight[1];
          const topRightBlue = imgDataTopRight[2];
          // Bottom Right
          const bottomRightRed = imgDataBottomRight[0];
          const bottomRightGreen = imgDataBottomRight[1];
          const bottomRightBlue = imgDataBottomRight[2];
    
    
    const totalDots = 10000000; // Number of dots
    const dotsPerBatch = 1000; // Number of dots to be drawn in one go
    const radius = 1;
  const drawDots = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    // const drawDotBatch = () => {
        for (let i = 0; i < dotsPerBatch; i++) {
    
            const auraProb = 0.3;
            const maxAuraDistance = 150;  
            const distanceWeight = Math.random() * Math.random();
    
    
            const x = Math.floor(Math.random() * dimensions.width);
            const y = Math.floor(Math.random() * dimensions.height);
    
            if (Math.random() < 0.05) {     
                if (Math.random() > 0.5) {// Top & Bottom     
                    if (Math.random() > 0.5) {     // Top Aura 
                    const auraX = x;
            
                    const mappedX = Math.floor(auraX * (offscreenCanvas.width / dimensions.width));
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
            
                    const mappedX = Math.floor(auraX * (offscreenCanvas.width / dimensions.width));
                    const index = mappedX * 4; 
                    const red = imgDataHorizontalBottom[index];
                    const green = imgDataHorizontalBottom[index + 1];
                    const blue = imgDataHorizontalBottom[index + 2];
                    const alpha = imgDataHorizontalBottom[index + 3];
                        
                    let positionY = yCenter + scaledHeight +  (Math.random() * Math.random() * maxAuraDistance);
                    ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
                    ctx.beginPath();
                    ctx.arc(auraX, positionY , Math.random(), 0, Math.PI * 2  );
                    ctx.fill();
                    }
                } else {
                    if (Math.random() > 0.5) {      // Right Aura 
                    const auraY = y;
        
                    const mappedY = Math.floor(auraY * (offscreenCanvas.height / dimensions.height));
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
    
                    const mappedY = Math.floor(auraY * (offscreenCanvas.height / dimensions.height));
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
            if (Math.random() < 0.05) { // Corners
                if (Math.random() > 0.5) { // Left
                    if (Math.random() > 0.5) { // Top Left
                        const maxAuraDistance = 100; 
                        const auraX = Math.random() * xCenter; // Generate aura to the left
                        const auraY = yCenter - (Math.random() * Math.random() * maxAuraDistance); // Generate aura above
                    
                        ctx.fillStyle = `rgb(${topLeftRed}, ${topLeftGreen}, ${topLeftBlue})`;
                        ctx.beginPath();
                        ctx.arc(auraX, auraY, radius * Math.random(), 0, Math.PI * 2);
                        ctx.fill();
                    }
                    
                    else { // Bottom Left
                        const maxAuraDistance = 100; 
                        const auraX = Math.random() * xCenter; // Generate aura to the left
                        const auraY = yCenter + scaledHeight + (Math.random() * Math.random() * maxAuraDistance); // Generate aura below
                    
                        ctx.fillStyle = `rgb(${bottomLeftRed}, ${bottomLeftGreen}, ${bottomLeftBlue})`;
                        ctx.beginPath();
                        ctx.arc(auraX, auraY, radius * Math.random(), 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
                else { // Right
                    if (Math.random() > 0.5) { // Top Right
                        const maxAuraDistance = 100; 
                        const auraX = xCenter + scaledWidth + (Math.random() * Math.random() * maxAuraDistance);// Generate aura to the Right
                        const auraY = Math.random() * yCenter // Generate aura above
                    
                        ctx.fillStyle = `rgb(${topRightRed}, ${topRightGreen}, ${topRightBlue})`;
                        ctx.beginPath();
                        ctx.arc(auraX, auraY, radius * Math.random(), 0, Math.PI * 2);
                        ctx.fill();
                    } else { // Bottom Right
                        const maxAuraDistance = 100; 
                        const auraX = xCenter + scaledWidth + (Math.random() * Math.random()  * maxAuraDistance);// Generate aura to the Right
                        const auraY =  (scaledHeight + yCenter) + (Math.random() * Math.random() * maxAuraDistance) // Generate aura above
                    
                        ctx.fillStyle = `rgb(${bottomRightRed}, ${bottomRightGreen}, ${bottomRightBlue})`;
                        ctx.beginPath();
                        ctx.arc(auraX, auraY, radius * Math.random(), 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
    
            }
            } else {   // Main Drawing
              const index = (y * dimensions.width + x) * 4;
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
        }
    //   }
      drawDots(canvas, ctx);
      }
  };

  const clearArea = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    // Your code to clear an area
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (isDrawing) {
          drawDots(canvas, ctx);
        } else {
          clearArea(canvas, ctx);
        }
      }
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  const handleButtonClick = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsDrawing((prev) => !prev);
    animate();
  };

  useEffect(() => {
    animate();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} width={500} height={500} />
      <button onClick={handleButtonClick} className="toggle-button">
        Toggle Animation
      </button>
    </div>
  );
};

export default CanvasComponent;
