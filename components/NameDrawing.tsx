'use client'
import React, { useEffect, useRef } from 'react';
import opentype from 'opentype.js';

const DotsOnCanvas: React.FC = ({text, textColor, fontSize}) => {
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
    opentype.load('/Roboto-Medium.ttf', (err, font) => {
      if (err) {
        console.error('Font could not be loaded:', err);
        return;
      }
      
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


        const allPoints = shuffle([...points, ...outsidePoints]);

        allPoints.forEach((point, index) => {
          setTimeout(() => {
            ctx.fillStyle = textColor;
            ctx.beginPath();
            ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
            ctx.fill();
          }, index * interval);
        });    
 



      }
    });
}, []);

return <canvas ref={canvasRef} width={1000} height={200}>
{/* <svg href={oneData}></svg> */}
</canvas>;
};

export default DotsOnCanvas;



