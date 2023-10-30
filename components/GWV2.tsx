"use client"
import React, { useEffect, useRef, useState, useCallback } from 'react';

const DotDrawer: React.FC = () => {
  const radius = 1;
  const [offscreenLoaded, setOffscreenLoaded] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const localCount = useRef(0) // Local count variable
  const [dimensions, setDimensions] = useState(null);
  const [offscreenImgData, setOffscreenImgData] = useState(null);
  const [newCall, setNewCall] = useState(false);
  type Func = (...args: any[]) => void;
const totalDots = 10000000; // Number of dots
const dotsPerBatch = 1000; // Number of dots to be drawn in one go

const debounce = (func: Func, delay: number): Func => {
  let debounceTimer: ReturnType<typeof setTimeout> | undefined;
  return function(this: any, ...args: any[]): void {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
};
    const handleResize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);

        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight 
        });
        setNewCall(true);
    }, [canvasRef, setDimensions, setNewCall])

    const debouncedHandleResize = debounce(handleResize, 50)
    
const drawOffscreenCanvas = useCallback(() => {
    if (!imageLoaded) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
    
        const ctx = canvas.getContext('2d', {willReadFrequently: true});
        if (!ctx) return;
    
        console.log(dimensions)
        console.log(image.width)
        console.log(image.height)
         const aspectRatio = (image.width as number) / (image.height as number);
         console.log(aspectRatio)
        canvas.width = (dimensions.width);
        canvas.height =  (dimensions.height);
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        let scaledWidthTemp: number, scaledHeightTemp: number;
        const paddingFactor = 0.8

           if (dimensions.width / dimensions.height > aspectRatio) {
            scaledHeightTemp = dimensions.height * paddingFactor;
            scaledWidthTemp = dimensions.height * aspectRatio * 0.9;
          } else {
            scaledWidthTemp = dimensions.width * paddingFactor;
            scaledHeightTemp = (dimensions.width / aspectRatio) * 0.9;
          }
          console.log(scaledWidthTemp);
          console.log(scaledHeightTemp); 
        // Calculate where to start drawing the image to center it
        const xCenterTemp = (dimensions.width - scaledWidthTemp ) / 2;
        const yCenterTemp = (dimensions.height - scaledHeightTemp) / 2;

      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = dimensions.width;
      offscreenCanvas.height = dimensions.height;

      const offscreenCtx = offscreenCanvas.getContext('2d', {willReadFrequently: true});
      if (!offscreenCtx) return;

      console.log(offscreenCtx);
      console.log(yCenterTemp ); 
      console.log(scaledHeightTemp);
      console.log(offscreenCanvas);
        
      offscreenCtx.drawImage(image, xCenterTemp, yCenterTemp, scaledWidthTemp, scaledHeightTemp );

      const imgData = offscreenCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height).data;

      const imgDataVerticalLeft = offscreenCtx.getImageData(xCenterTemp + 1, 0, 1, offscreenCanvas.height).data;
      const imgDataVerticalRight = offscreenCtx.getImageData(xCenterTemp + scaledWidthTemp - 1, 0, 1, offscreenCanvas.height).data;
      const imgDataHorizontalTop = offscreenCtx.getImageData(0, yCenterTemp + 1, offscreenCanvas.width, 1).data;
      const imgDataHorizontalBottom = offscreenCtx.getImageData(0, yCenterTemp + scaledHeightTemp - 1, offscreenCanvas.width, 1).data;
      const imgDataBottomLeft = offscreenCtx.getImageData(xCenterTemp + 1, yCenterTemp + scaledHeightTemp - 1, 1, 1).data;
      const imgDataTopLeft = offscreenCtx.getImageData(xCenterTemp + 1,yCenterTemp + 1, 1, 1 ).data;
      const imgDataTopRight = offscreenCtx.getImageData(xCenterTemp + scaledWidthTemp - 1, yCenterTemp + 10, -1, 1).data;
      const imgDataBottomRight = offscreenCtx.getImageData(xCenterTemp + scaledWidthTemp - 20, yCenterTemp + scaledHeightTemp - 10, 1, 1 ).data;

      setOffscreenImgData({
        scaledWidth: scaledWidthTemp,
        scaledHeight: scaledHeightTemp,
        yCenter: yCenterTemp,
        xCenter: xCenterTemp, 
        offscreenCanvasWidth: offscreenCanvas.width,
        offscreenCanvasHeight: offscreenCanvas.height, 
        main: imgData,
        edges: {
            left: imgDataVerticalLeft,
            right: imgDataVerticalRight,
            top:  imgDataHorizontalTop,
            bottom: imgDataHorizontalBottom,
        },
        corners: {
            topLeft: {
                red: imgDataTopLeft[0],
                green: imgDataTopLeft[1],
                blue: imgDataTopLeft[2],    
            },
            bottomRight: {
                red: imgDataBottomRight[0],
                green: imgDataBottomRight[1],
                blue: imgDataBottomRight[2], 
            },
            topRight: {
                red: imgDataTopRight[0],
                green: imgDataTopRight[1],
                blue: imgDataTopRight[2], 
            },
            bottomLeft: {
                red: imgDataBottomLeft[0],
                green: imgDataBottomLeft[1],
                blue: imgDataBottomLeft[2], 
            }
        }
    })
    setOffscreenLoaded(true)
}, [dimensions, image, setOffscreenImgData, imageLoaded])

const drawDotBatch = useCallback(() => {
    if (newCall ) return;
    setNewCall(true);
    if (!offscreenLoaded) return;
    if (!imageLoaded) return;
        const auraProb = 0.3;
        const maxAuraDistance = 150;  
        const distanceWeight = Math.random() * Math.random();
    for (let i = 0; i < dotsPerBatch && !newCall; i++) {
        const x = Math.floor(Math.random() * dimensions.width);
        const y = Math.floor(Math.random() * dimensions.height);
        const canvas = canvasRef.current;
        if (!canvas) return;
    
        const ctx = canvas.getContext('2d', {willReadFrequently: true});
        if (!ctx) return;
        

        if (Math.random() < 0.05) {     
            if (Math.random() > 0.5) {// Top & Bottom     
                if (Math.random() > 0.5) {     // Top Aura 
                const auraX = x;
        
                const mappedX = Math.floor(auraX * (offscreenImgData.offscreenCanvasWidth / dimensions.width));
                const index = mappedX * 4; 
                const red = offscreenImgData.edges.top[index];
                const green = offscreenImgData.edges.top[index + 1];
                const blue = offscreenImgData.edges.top[index + 2];
                const alpha = offscreenImgData.edges.top[index + 3];
                    
                let positionY = offscreenImgData.yCenter - (Math.random() * Math.random() * maxAuraDistance);
                ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
                ctx.beginPath();
                ctx.arc(auraX, positionY ,radius * Math.random(), 0, Math.PI * 2  );
                ctx.fill();
                }  else {       // Bottom Aura 
                const auraX = x;
        
                const mappedX = Math.floor(auraX * (offscreenImgData.offscreenCanvasWidth / dimensions.width));
                const index = mappedX * 4; 
                const red = offscreenImgData.edges.bottom[index];
                const green = offscreenImgData.edges.bottom[index + 1];
                const blue = offscreenImgData.edges.bottom[index + 2];
                const alpha = offscreenImgData.edges.bottom[index + 3];
                    
                let positionY = offscreenImgData.yCenter + offscreenImgData.scaledHeight +  (Math.random() * Math.random() * maxAuraDistance);
                ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
                ctx.beginPath();
                ctx.arc(auraX, positionY , Math.random(), 0, Math.PI * 2  );
                ctx.fill();
                }
            } else {
                if (Math.random() > 0.5) {      // Right Aura 
                const auraY = y;
    
                const mappedY = Math.floor(auraY * (offscreenImgData.offscreenCanvasHeight / dimensions.height));
                const index = mappedY * 4; 
                const red = offscreenImgData.edges.right[index];
                const green = offscreenImgData.edges.right[index + 1];
                const blue = offscreenImgData.edges.right[index + 2];
                const alpha = offscreenImgData.edges.right[index + 3];
                    
                let positionX = offscreenImgData.xCenter + offscreenImgData.scaledWidth + (Math.random() * Math.random() * maxAuraDistance);
                ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
                ctx.beginPath();
                ctx.arc(positionX, auraY ,radius * Math.random(), 0, Math.PI * 2  );
                ctx.fill();
                } else {        // Left Aura
                const auraY = y;

                const mappedY = Math.floor(auraY * (offscreenImgData.offscreenCanvasHeight / dimensions.height));
                const index = mappedY * 4; 
                const red = offscreenImgData.edges.left[index];
                const green = offscreenImgData.edges.left[index + 1];
                const blue = offscreenImgData.edges.left[index + 2];
                const alpha = offscreenImgData.edges.left[index + 3];
                
                let positionX = offscreenImgData.xCenter - (Math.random() * Math.random() * maxAuraDistance);
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
                    const auraX = Math.random() * offscreenImgData.xCenter; // Generate aura to the left
                    const auraY = offscreenImgData.yCenter - (Math.random() * Math.random() * maxAuraDistance); // Generate aura above
                
                    ctx.fillStyle = `rgb(${offscreenImgData.corners.topLeft.red}, ${offscreenImgData.corners.topLeft.green}, ${offscreenImgData.corners.topLeft.blue})`;
                    ctx.beginPath();
                    ctx.arc(auraX, auraY, radius * Math.random(), 0, Math.PI * 2);
                    ctx.fill();
                }
                
                else { // Bottom Left
                    const maxAuraDistance = 100; 
                    const auraX = Math.random() * offscreenImgData.xCenter; // Generate aura to the left
                    const auraY = offscreenImgData.yCenter + offscreenImgData.scaledHeight + (Math.random() * Math.random() * maxAuraDistance); // Generate aura below
                
                    ctx.fillStyle = `rgb(${offscreenImgData.corners.bottomLeft.red}, ${offscreenImgData.corners.bottomLeft.green}, ${offscreenImgData.corners.bottomLeft.blue})`;
                    ctx.beginPath();
                    ctx.arc(auraX, auraY, radius * Math.random(), 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            else { // Right
                if (Math.random() > 0.5) { // Top Right
                    const maxAuraDistance = 100; 
                    const auraX = offscreenImgData.xCenter + offscreenImgData.scaledWidth + (Math.random() * Math.random() * maxAuraDistance);// Generate aura to the Right
                    const auraY = Math.random() *  offscreenImgData.yCenter // Generate aura above
                
                    ctx.fillStyle = `rgb(${ offscreenImgData.corners.topRight.red}, ${ offscreenImgData.corners.topRight.green}, ${ offscreenImgData.corners.topRight.blue})`;
                    ctx.beginPath();
                    ctx.arc(auraX, auraY, radius * Math.random(), 0, Math.PI * 2);
                    ctx.fill();
                } else { // Bottom Right
                    const maxAuraDistance = 100; 
                    const auraX = offscreenImgData.xCenter + offscreenImgData.scaledWidth + (Math.random() * Math.random()  * maxAuraDistance);// Generate aura to the Right
                    const auraY =  (offscreenImgData.scaledHeight + offscreenImgData.yCenter) + (Math.random() * Math.random() * maxAuraDistance) // Generate aura above
                
                    ctx.fillStyle = `rgb(${ offscreenImgData.corners.bottomRight.red}, ${offscreenImgData.corners.bottomRight.green}, ${offscreenImgData.corners.bottomRight.blue})`;
                    ctx.beginPath();
                    ctx.arc(auraX, auraY, radius * Math.random(), 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
        } else {   // Main Drawing
          const index = (y * dimensions.width + x) * 4;
          if (offscreenImgData.main[index + 3] > 0) {
            const red = offscreenImgData.main[index];
            const green = offscreenImgData.main[index + 1];
            const blue = offscreenImgData.main[index + 2];
            ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
            ctx.fillRect(x, y, 1, 1);
            ctx.beginPath();
            ctx.arc(x, y, radius * Math.random(), 0, Math.PI * 2);
            ctx.fill();
            }
        }
    }
    if (localCount.current < totalDots) {
        return requestAnimationFrame(drawDotBatch);
    }
}, [offscreenImgData, dimensions, newCall, setNewCall])

useEffect(() => {   
    window.addEventListener('resize', debouncedHandleResize);
    return () => {
        window.removeEventListener('resize', debouncedHandleResize);
    }
}, [debouncedHandleResize, handleResize]);

const loadImage = useCallback(() => {
    const img = new Image();
    img.src = 'Great-Wave-Off-Kanagawa.svg';
    img.onload = () => {
        setImage(img);
        setImageLoaded(true);
    }

}, [setImage, setImageLoaded])

useEffect(() => {
    if (typeof Window == undefined) return;
    setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
      })
      setNewCall(false)

    loadImage();
}, [loadImage, setDimensions, newCall]);

useEffect(() => {
        drawDotBatch();
}, [offscreenImgData, drawDotBatch, imageLoaded, newCall])

useEffect(() => {
    if (imageLoaded && dimensions !== null) {
        drawOffscreenCanvas() 
    }

}, [drawOffscreenCanvas, imageLoaded, dimensions, newCall])


  return <canvas ref={canvasRef}  className='rounded-md h-full min-h-screen w-full absolute ' ></canvas>;
};

export default React.memo(DotDrawer);


