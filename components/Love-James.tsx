"use client"

import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, Environment } from "@react-three/drei";
import Heart from './Heart'
import BubbleFont from "./Letters";
import React, {Suspense} from 'react'
import { DoubleSide } from "three";



function LoveJames() {
        return (  

        <a href="https://lovej-d62f6.web.app/" target="_blank" rel="noopener noreferrer">
<Suspense fallback={<div>Loading...</div>} > 
<div className="h-full w-full" >
         
         <Canvas className="h-full w-full  rounded-b-lg bg-blue-200 hover:bg-blue-100">
        <OrthographicCamera top={-10}/>
        {/* <Environment
            files="./HDRIs/industrial_sunset_puresky_4k.hdr"
            background
          /> */}
          
                <group>
                    <Suspense fallback={null} >
                    <BubbleFont />
                    <Heart />
                    </Suspense>
                </group>
            
            <ambientLight intensity={1.3} />
        </Canvas>
       
        </div> </Suspense>
        </a>
    );
}

export default LoveJames;
