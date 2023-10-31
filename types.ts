export type Color = {
    red: number;
    green: number;
    blue: number;
  };
  
  export type EdgeData = {
    left: Uint8ClampedArray;
    right: Uint8ClampedArray;
    top: Uint8ClampedArray;
    bottom: Uint8ClampedArray;
  };
  
  export type CornerData = {
    topLeft: Color;
    bottomRight: Color;
    topRight: Color;
    bottomLeft: Color;
  };
  
  export type OffscreenImgData = {
    scaledWidth: number;
    scaledHeight: number;
    yCenter: number;
    xCenter: number;
    offscreenCanvasWidth: number;
    offscreenCanvasHeight: number;
    main: Uint8ClampedArray;
    edges: EdgeData;
    corners: CornerData;
  };

  export type Dimensions = {
    width: number;
    height: number;
  }



export type CustomCanvasHandle =  {
    startClearing: () => void;
  }

 export interface Point {
    x: number;
    y: number;
  }
  