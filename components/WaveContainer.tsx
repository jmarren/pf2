'use client'

import { usePaint } from "./PaintContext";
import GreatWave from "./GreatWave";

function WaveContainer() {
    const {paint} = usePaint();

    return (  
        paint && <GreatWave />
        
    );
}

export default WaveContainer;