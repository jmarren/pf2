"use client"

import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, Environment } from "@react-three/drei";
import Heart from './Heart'
import BubbleFont from "./Letters";
import React, {Suspense} from 'react'




function LoveJames() {
        return (  
    <Suspense fallback={null} >
        <a href="https://lovej-d62f6.web.app/" target="_blank" rel="noopener noreferrer">
        <Suspense fallback={<div>Loading...</div>} > 
        <div className="h-full w-full" >
            <Canvas className="h-full w-full  rounded-b-lg bg-blue-200 hover:bg-blue-100">
            <OrthographicCamera top={-10}/>
                    <group>
                        <BubbleFont />
                        <Heart />
                    </group>
                
                <ambientLight intensity={1.3} />
            </Canvas>
        </div>       
    </Suspense>
 </a> </Suspense>
    );
}

export default LoveJames;
