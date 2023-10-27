/*
'use client'

import React, { useEffect, useRef, useState } from 'react';

const DotDrawer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [count, setCount] = useState(0);
  const [img, setImage] = useState<HTMLImageElement | null>(null);
  const [aspect, setAspect] = useState(0);
  const paddingFactor = 0.85;
  const [canvasWidth, setCanvasWidth] = useState(0.85 * window.innerWidth);
  const [canvasHeight, setCanvasHeight] = useState(0.85 * window.innerHeight);
  const [scaledWidth, setScaledWidth] = useState(0);
  const [scaledHeight, setScaledHeight] = useState(0);
  const [xCenter, setXCenter] = useState(0);
  const [yCenter, setYCenter] = useState(0);
  const [offscreenCanvas, setOffscreenCanvas] = useState<HTMLCanvasElement | null>(null)
  const [offscreenCtx, setOffscreenCtx] = useState<HTMLCanvasElement | null>(null);
  const [imgData, setImgData] = useState({});
  const [redraw, setRedraw] = useState(false);

  const loadImage = () => {
    const image = new Image();
    image.src = 'Great-Wave-Off-Kanagawa.svg';
    image.onload = () => {
      setImage(image);
      setAspect(image.width / image.height);
    };
  };

  useEffect(loadImage, []);

  useEffect(() => {
    const ratio = canvasWidth / canvasHeight;
    if (ratio > aspect) {
      setScaledHeight(canvasHeight * paddingFactor);
      setScaledWidth(canvasHeight * aspect);
    } else {
      setScaledWidth(canvasWidth * paddingFactor);
      setScaledHeight(canvasWidth / aspect);
    }
  }, [canvasWidth, canvasHeight, aspect]);

  useEffect(() => {
    setXCenter((canvasWidth - scaledWidth) / 2);
    setYCenter((canvasHeight - scaledHeight) / 2);
  }, [canvasWidth, canvasHeight, scaledWidth, scaledHeight]);

  const initializeOffscreenCanvas = () => {
    const newOffscreenCanvas = document.createElement('canvas');
    newOffscreenCanvas.width = canvasWidth;
    newOffscreenCanvas.height = canvasHeight;
    setOffscreenCanvas(newOffscreenCanvas);
    
  }
  useEffect(() => {
    if (!offscreenCanvas) { 
    return
}
    setOffscreenCtx(offscreenCanvas.getContext('2d'))

  }, [offscreenCanvas])

  useEffect(() => {
    if (img && xCenter && yCenter && scaledWidth && scaledHeight) {
      initializeOffscreenCanvas();
    }
  }, [img, xCenter, yCenter, scaledWidth, scaledHeight]);

  useEffect(() => {
    // if (offscreenCanvas) {
    //   const offscreenCtx = offscreenCanvas.getContext('2d');
    // }
    initializeOffscreenCanvas();
    if (offscreenCtx) {
       setImgData(prev => ({...prev, 
            main: offscreenCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height).data,
            verticalLeft: offscreenCtx.getImageData(xCenter + 1, 0, 1, offscreenCanvas.height).data,
            verticalRight: offscreenCtx.getImageData(xCenter + scaledWidth - 1, 0, 1, offscreenCanvas.height).data,
            horizontalTop: offscreenCtx.getImageData(0, yCenter + 1, offscreenCanvas.width, 1).data,
            horizontalBottom: offscreenCtx.getImageData(0, yCenter + scaledHeight - 1, offscreenCanvas.width, 1).data,
            bottomLeft: offscreenCtx.getImageData(xCenter + 1, yCenter + scaledHeight - 1, 1, 1).data,
            topLeft: offscreenCtx.getImageData(xCenter + 1, yCenter + 1, 1, 1).data,
            topRight: offscreenCtx.getImageData(xCenter + scaledWidth - 1, yCenter + 10, -1, 1).data,
            bottomRight: offscreenCtx.getImageData(xCenter + scaledWidth - 20, yCenter + scaledHeight - 10, 1, 1).data
          }));

          
    
    
    }

  }, [offscreenCtx]);



  const drawCanvas = () => {
    setCount(0)
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {willReadFrequently: true});
    if (!ctx) return;

    if (img) {
        const aspectRatio = (img.width as number) / (img.height as number);
        canvas.width = window.innerWidth * 0.85;
        canvas.height = window.innerHeight * 0.85;

        // if (offscreenCanvas) {
        //             const offscreenCtx = offscreenCanvas.getContext('2d');
        if (!offscreenCtx) return; 
        offscreenCtx.drawImage(img, xCenter, yCenter, scaledWidth, scaledHeight );
    
      // BottomLeft
      const bottomLeftRed = imgData.bottomLeft[0];
      const bottomLeftGreen = imgData.bottomLeft[1];
      const bottomLeftBlue = imgData.bottomLeft[2];
      // TopLeft
      const topLeftRed = imgData.topLeft[0];
      const topLeftGreen = imgData.topLeft[1];
      const topLeftBlue = imgData.topLeft[2];
      // Top Right
      const topRightRed = imgData.topRight[0];
      const topRightGreen = imgData.topRight[1];
      const topRightBlue = imgData.topRight[2];
      // Bottom Right
      const bottomRightRed = imgData.bottomRight[0];
      const bottomRightGreen = imgData.bottomRight[1];
      const bottomRightBlue = imgData.bottomRight[2];

 
const totalDots = 10000000; // Number of dots
const dotsPerBatch = 1000; // Number of dots to be drawn in one go
const radius = 4;
        
const drawDotBatch = () => {
    for (let i = 0; i < dotsPerBatch ; i++) {

        const auraProb = 0.3;
        const maxAuraDistance = 150;  
        const distanceWeight = Math.random() * Math.random();

        if (count >= totalDots) return;

        const x = Math.floor(Math.random() * canvasWidth);
        const y = Math.floor(Math.random() * canvasHeight);

        // const canvas = canvasRef.current;

        if (Math.random() < 0.05) {     
            if (Math.random() > 0.5) {// Top & Bottom     
                if (Math.random() > 0.5) {     // Top Aura 
                const auraX = x;
        
                const mappedX = Math.floor(auraX * (offscreenCanvas.width / canvas.width));
                const index = mappedX * 4; 
                const red = imgData.horizontalTop[index];
                const green = imgData.horizontalTop[index + 1];
                const blue = imgData.horizontalTop[index + 2];
                const alpha = imgData.horizontalTop[index + 3];
                    
                let positionY = yCenter - (Math.random() * Math.random() * maxAuraDistance);
                ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
                ctx.beginPath();
                ctx.arc(auraX, positionY ,radius * Math.random(), 0, Math.PI * 2  );
                ctx.fill();
                }  else {       // Bottom Aura 
                const auraX = x;
        
                const mappedX = Math.floor(auraX * (offscreenCanvas.width / canvas.width));
                const index = mappedX * 4; 
                const red = imgData.horizontalBottom[index];
                const green = imgData.horizontalBottom[index + 1];
                const blue = imgData.horizontalBottom[index + 2];
                const alpha = imgData.horizontalBottom[index + 3];
                    
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
                const red = imgData.verticalRight[index];
                const green = imgData.verticalRight[index + 1];
                const blue = imgData.verticalRight[index + 2];
                const alpha = imgData.verticalRight[index + 3];
                    
                let positionX = xCenter + scaledWidth + (Math.random() * Math.random() * maxAuraDistance);
                ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
                ctx.beginPath();
                ctx.arc(positionX, auraY ,radius * Math.random(), 0, Math.PI * 2  );
                ctx.fill();
                } else {        // Left Aura
                const auraY = y;

                const mappedY = Math.floor(auraY * (offscreenCanvas.height / canvas.height));
                const index = mappedY * 4; 
                const red = imgData.verticalLeft[index];
                const green = imgData.verticalLeft[index + 1];
                const blue = imgData.verticalLeft[index + 2];
                const alpha = imgData.verticalLeft[index + 3];
                
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
          const index = (y * canvas.width + x) * 4;
          if (imgData.main[index + 3] > 0) {
            const red = imgData.main[index];
            const green = imgData.main[index + 1];
            const blue = imgData.main[index + 2];
            ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
            ctx.fillRect(x, y, 1, 1);
            ctx.beginPath();
            ctx.arc(x, y, radius * Math.random(), 0, Math.PI * 2);
            ctx.fill();
            }
        }   
        setCount(prev => prev + dotsPerBatch);
    }   
    if (count < totalDots) {
        requestAnimationFrame(drawDotBatch);
    }
}
    drawDotBatch();

    }
}


  useEffect(() => {
    if (imgData.main) {
            drawCanvas();
    }

  }, [imgData]);



  const handleResize = () => {
    setCanvasWidth(0.85 * window.innerWidth);
    setCanvasHeight(0.85 * window.innerHeight);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCanvas();
  }
//   const handleResize = () => {
//     setCanvasWidth(0.85 * window.innerWidth);
//     setCanvasHeight(0.85 * window.innerHeight);
//     setRedraw(!redraw);
    
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//             const ctx = canvas.getContext('2d');
//             if (!ctx) return;

//             ctx.clearRect(0, 0, canvasWidth, canvasHeight)
//             // Scale the context to fit the new dimensions
//             // ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform

//   }

  useEffect(() => {
    const debounce = (func, delay) => {
      let debounceTimer;
      return function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(func, delay);
      };
    };

    const debouncedHandleResize = debounce(handleResize, 150);
    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [img]);

  return <canvas ref={canvasRef} className='rounded-md w-full absolute '></canvas>;
};

export default DotDrawer;












/*'use client'
import React, { useEffect, useRef, useState } from 'react';

const DotDrawer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [count, setCount] = useState(0);
  let localCount = 0; // Local count variable
  const [img, setImage] = useState<HTMLImageElement | null>(null);
  const [aspect, setAspect] = useState(0);
  const [canvasWidth, setCanvasWidth] = useState(0);
const [canvasHeight, setCanvasHeight] = useState(0);
  const [redraw, setRedraw] = useState(false);
const paddingFactor = 0.85
const [scaledHeight, setScaledHeight] = useState(0);
const [scaledWidth, setScaledWidth ] = useState(0);
const  [offscreenCanvas, setOffscreenCanvas] = useState<HTMLCanvasElement | null>(null)
const [xCenter, setXCenter] = useState(0);
const [yCenter, setYCenter] = useState(0);
const [imgData, setImgData] = useState(null);



  const loadImage = () => {
    const image = new Image();
    image.src = 'Great-Wave-Off-Kanagawa.svg';
    const aspectRatio = (image.width as number) / (image.height as number);
    image.onload = () => {
            setImage(image)
            setAspect(aspectRatio)
    }
  }

  useEffect(() => {
        if (canvasWidth / canvasHeight > aspect) {
            setScaledHeight(canvasHeight * paddingFactor);
            setScaledWidth(canvasHeight * aspect)
        } else {
            setScaledWidth(canvasWidth * paddingFactor);
            setScaledHeight(canvasWidth / aspect);
        }
  }, [canvasWidth, canvasHeight])  

  useEffect(() => {
    if ( canvasWidth && scaledWidth) {
        setXCenter((canvasWidth - scaledWidth ) / 2)
    }
  }, [canvasWidth, scaledWidth])

  useEffect(() => {
    setYCenter((canvasHeight - scaledHeight) / 2)
  }, [canvasHeight, scaledHeight])

  useEffect(() => {
    if (img && xCenter && yCenter && scaledWidth && scaledHeight ) { 
      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = canvasWidth;
      offscreenCanvas.height = canvasHeight;
      setOffscreenCanvas(offscreenCanvas)
    }
  }, [img, xCenter, yCenter, scaledWidth, scaledHeight]);

  useEffect(() => {
    if (offscreenCanvas) {
        const offscreenCtx = offscreenCanvas.getContext('2d');

        if (offscreenCtx) {
            setImgData(offscreenCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height).data)
        } else {return};
    }
  }, [offscreenCanvas]);

  const drawCanvas = () => {
    setCount(0)
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {willReadFrequently: true});
    if (!ctx) return;

    if (img) {
        const aspectRatio = (img.width as number) / (img.height as number);
        // canvas.width = (window.innerWidth) * 0.85;
        // canvas.height =  ( window.innerHeight) * 0.85;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;


        // let scaledWidth: number, scaledHeight: number;




        // Calculate where to start drawing the image to center it
        // const xCenter = (canvasWidth - scaledWidth ) / 2;
        // const yCenter = (canvasHeight - scaledHeight) / 2;

        if (offscreenCanvas) {
                    const offscreenCtx = offscreenCanvas.getContext('2d');
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
const radius = 4;
        
const drawDotBatch = () => {
    for (let i = 0; i < dotsPerBatch && localCount < totalDots; i++) {

        const auraProb = 0.3;
        const maxAuraDistance = 150;  
        const distanceWeight = Math.random() * Math.random();

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

        localCount++;
        setCount(prev => prev + dotsPerBatch);
    }   
    

   

    
    if (localCount < totalDots) {
        requestAnimationFrame(drawDotBatch);
    }
}
    drawDotBatch();
}
    }
    }
  
  useEffect(() => {
  drawCanvas();
     }, [offscreenCanvas, redraw]);

useEffect(() => {

    setCanvasWidth(0.85 * window.innerWidth);
    setCanvasHeight(0.85 * window.innerHeight)
    loadImage();
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

                setCanvasWidth(0.85 * window.innerWidth);
                setCanvasHeight(0.85 * window.innerHeight)

                setRedraw(!redraw);
                // Scale the context to fit the new dimensions
                // ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
                // ctx.scale( window.innerWidth / prevWidth, window.innerHeight / prevHeight)

        };
    
        const debouncedScaleCanvas = debounce(scaleCanvas, 150);
        window.addEventListener('resize', debouncedScaleCanvas);
    
        return () => {
          window.removeEventListener('resize', debouncedScaleCanvas);
        };
      }, [img]);

    //   useEffect(() => {
    //     drawCanvas();
    //   }, [canvasHeight, canvasWidth])




  return <canvas ref={canvasRef}  className='rounded-md w-full absolute '></canvas>;
};

export default DotDrawer;

*/
