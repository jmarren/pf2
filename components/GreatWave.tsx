'use client'
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { OffscreenImgData, Dimensions } from '@/types';
import { usePaint } from './PaintContext';

const GreatWave = forwardRef<HTMLCanvasElement>((_, ref) => {
  const { paint } = usePaint();
  const radius = 25;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);
  const [offscreenImgData, setOffscreenImgData] = useState<OffscreenImgData | null>(null);
  const [newCall, setNewCall] = useState(false);
  type Func = (...args: any[]) => void;
  const dotsPerBatch = 1000; // Number of dots to be drawn in one go
  const [destruct, setDestruct] = useState(false);
  const [clear, setClear] = useState(false)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    if (image === null) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (canvas === undefined) return;


    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    const aspectRatio = (image.width as number) / (image.height as number);
    canvas.width = (window.innerWidth);
    canvas.height = (window.innerHeight);

    let scaledWidthTemp: number, scaledHeightTemp: number;
    const paddingFactor = 0.8

    if (window.innerWidth / window.innerHeight > aspectRatio) {
      scaledHeightTemp = window.innerHeight * paddingFactor;
      scaledWidthTemp = window.innerHeight * aspectRatio * 0.9;
    } else {
      scaledWidthTemp = window.innerWidth * paddingFactor;
      scaledHeightTemp = (window.innerWidth / aspectRatio) * 0.9;
    }
    // Calculate where to start drawing the image to center it
    const xCenterTemp = (window.innerWidth - scaledWidthTemp) / 2;
    const yCenterTemp = (window.innerHeight - scaledHeightTemp) / 2;

    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = window.innerWidth;
    offscreenCanvas.height = window.innerHeight;

    const offscreenCtx = offscreenCanvas.getContext('2d', { willReadFrequently: true });
    if (!offscreenCtx) return;

    offscreenCtx.drawImage(image, xCenterTemp, yCenterTemp, scaledWidthTemp, scaledHeightTemp);

    const imgData = offscreenCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height).data

    const imgDataVerticalLeft = offscreenCtx.getImageData(xCenterTemp + 1, 0, 1, offscreenCanvas.height).data;
    const imgDataVerticalRight = offscreenCtx.getImageData(xCenterTemp + scaledWidthTemp - 1, 0, 1, offscreenCanvas.height).data;
    const imgDataHorizontalTop = offscreenCtx.getImageData(0, yCenterTemp + 1, offscreenCanvas.width, 1).data;
    const imgDataHorizontalBottom = offscreenCtx.getImageData(0, yCenterTemp + scaledHeightTemp - 1, offscreenCanvas.width, 1).data;
    const imgDataBottomLeft = offscreenCtx.getImageData(xCenterTemp + 1, yCenterTemp + scaledHeightTemp - 1, 1, 1).data;
    const imgDataTopLeft = offscreenCtx.getImageData(xCenterTemp + 1, yCenterTemp + 1, 1, 1).data;
    const imgDataTopRight = offscreenCtx.getImageData(xCenterTemp + scaledWidthTemp - 1, yCenterTemp + 10, -1, 1).data;
    const imgDataBottomRight = offscreenCtx.getImageData(xCenterTemp + scaledWidthTemp - 20, yCenterTemp + scaledHeightTemp - 10, 1, 1).data;

    setOffscreenImgData(prev => ({
      ...prev,
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
        top: imgDataHorizontalTop,
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
    }))
    setNewCall(false);
  }, [newCall, image])



  useEffect(() => {
    if (offscreenImgData === null) return;
    if (image == null || dimensions === null) return;

    // CLEAR ====================
    const clearDots = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;


      for (let i = 0; i < dotsPerBatch; i++) {
        const x = Math.floor(Math.random() * dimensions.width);
        const y = Math.floor(Math.random() * dimensions.height);
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        // Clear the area inside the clipping path
        ctx.clearRect(x - 5, y - 5, 10, 10);
        ctx.restore();

      }

      animationRef.current = requestAnimationFrame(clearDots);
    }





    // DRAW ================
    const drawDotBatch = () => {
      if (newCall) return;
      setNewCall(true);
      const maxAuraDistance = 150;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      for (let i = 0; i < dotsPerBatch && !clear; i++) {
        const x = Math.floor(Math.random() * dimensions.width);
        const y = Math.floor(Math.random() * dimensions.height);

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
              ctx.arc(auraX, positionY, radius * Math.random() * Math.random() * Math.random() * Math.random() * Math.random() * Math.random(), 0, Math.PI * 2);
              ctx.fill();
            } else {       // Bottom Aura 
              const auraX = x;

              const mappedX = Math.floor(auraX * (offscreenImgData.offscreenCanvasWidth / dimensions.width));
              const index = mappedX * 4;
              const red = offscreenImgData.edges.bottom[index];
              const green = offscreenImgData.edges.bottom[index + 1];
              const blue = offscreenImgData.edges.bottom[index + 2];
              const alpha = offscreenImgData.edges.bottom[index + 3];

              let positionY = offscreenImgData.yCenter + offscreenImgData.scaledHeight + (Math.random() * Math.random() * maxAuraDistance);
              ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
              ctx.beginPath();
              ctx.arc(auraX, positionY, radius * Math.random() * Math.random() * Math.random() * Math.random() * Math.random() * Math.random(), 0, Math.PI * 2);
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
              ctx.arc(positionX, auraY, radius * Math.random() * Math.random() * Math.random() * Math.random() * Math.random() * Math.random(), 0, Math.PI * 2);
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
              ctx.arc(positionX, auraY, radius * Math.random() * Math.random() * Math.random() * Math.random() * Math.random() * Math.random(), 0, Math.PI * 2);
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
                ctx.arc(auraX, auraY, radius * Math.random() * Math.random() * Math.random() * Math.random() * Math.random() * Math.random(), 0, Math.PI * 2);
                ctx.fill();
              }

              else { // Bottom Left
                const maxAuraDistance = 100;
                const auraX = Math.random() * offscreenImgData.xCenter; // Generate aura to the left
                const auraY = offscreenImgData.yCenter + offscreenImgData.scaledHeight + (Math.random() * Math.random() * maxAuraDistance); // Generate aura below

                ctx.fillStyle = `rgb(${offscreenImgData.corners.bottomLeft.red}, ${offscreenImgData.corners.bottomLeft.green}, ${offscreenImgData.corners.bottomLeft.blue})`;
                ctx.beginPath();
                ctx.arc(auraX, auraY, radius * Math.random() * Math.random() * Math.random() * Math.random() * Math.random() * Math.random(), 0, Math.PI * 2);
                ctx.fill();
              }
            }
            else { // Right
              if (Math.random() > 0.5) { // Top Right
                const maxAuraDistance = 100;
                const auraX = offscreenImgData.xCenter + offscreenImgData.scaledWidth + (Math.random() * Math.random() * maxAuraDistance);// Generate aura to the Right
                const auraY = Math.random() * offscreenImgData.yCenter // Generate aura above

                ctx.fillStyle = `rgb(${offscreenImgData.corners.topRight.red}, ${offscreenImgData.corners.topRight.green}, ${offscreenImgData.corners.topRight.blue})`;
                ctx.beginPath();
                ctx.arc(auraX, auraY, radius * Math.random() * Math.random() * Math.random() * Math.random() * Math.random() * Math.random(), 0, Math.PI * 2);
                ctx.fill();
              } else { // Bottom Right
                const maxAuraDistance = 100;
                const auraX = offscreenImgData.xCenter + offscreenImgData.scaledWidth + (Math.random() * Math.random() * maxAuraDistance);// Generate aura to the Right
                const auraY = (offscreenImgData.scaledHeight + offscreenImgData.yCenter) + (Math.random() * Math.random() * maxAuraDistance) // Generate aura above

                ctx.fillStyle = `rgb(${offscreenImgData.corners.bottomRight.red}, ${offscreenImgData.corners.bottomRight.green}, ${offscreenImgData.corners.bottomRight.blue})`;
                ctx.beginPath();
                ctx.arc(auraX, auraY, radius * Math.random() * Math.random() * Math.random() * Math.random() * Math.random() * Math.random(), 0, Math.PI * 2);
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
            ctx.arc(x, y, radius * Math.random() * Math.random() * Math.random() * Math.random() * Math.random() * Math.random(), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      // if (localCount.current < totalDots) {
      animationRef.current = requestAnimationFrame(drawDotBatch);
      // }

    }

    if (clear) {
      clearDots();
    } else {
      drawDotBatch();
    }
  }, [offscreenImgData, dimensions, image, newCall, clear])


  useEffect(() => {
    const img = new Image();
    img.src = '/Great-Wave-Off-Kanagawa.svg';
    img.onload = () => {
      setImage(img);
    }
  }, [])

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })
    const debounce = (func: Func, delay: number): Func => {
      let debounceTimer: ReturnType<typeof setTimeout> | undefined;
      return function(this: any, ...args: any[]): void {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, args), delay);
      };
    };

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      setDimensions(prev => ({
        ...prev,
        width: window.innerWidth,
        height: window.innerHeight
      }));
    }

    const debouncedHandleResize = debounce(handleResize, 5)

    window.addEventListener('resize', debouncedHandleResize);
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    }
  }, [])


  useImperativeHandle(ref, () => ({
    ...canvasRef.current,  // assuming canvasRef is a ref to the canvas element
    startClearing: () => {
      if (animationRef.current !== undefined && animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      setDestruct(true);
    },
  } as HTMLCanvasElement & { startClearing: () => void; }));


  useEffect(() => {
    if (destruct) {
      setClear(true)
    }

  }, [destruct])

  return <canvas ref={canvasRef} className='rounded-md h-full min-h-screen w-full absolute ' ></canvas>;
});

GreatWave.displayName = 'GreatWave';

export default GreatWave;
