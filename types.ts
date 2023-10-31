export type Color = {
    red: number;
    green: number;
    blue: number;
  };
  
  export type EdgeData = {
    left: ImageData;
    right: ImageData;
    top: ImageData;
    bottom: ImageData;
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
    main: ImageData;
    edges: EdgeData;
    corners: CornerData;
  };