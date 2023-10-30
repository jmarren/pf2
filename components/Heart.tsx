import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useFrame } from "@react-three/fiber";
import {  useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";


function Heart() {
    const {scene} = useThree();
    const heartRef = useRef<THREE.Group | null>(null);
    
    useEffect(() => {
      const loader = new GLTFLoader();
      loader.load('models/pixel-heart.glb', (gltf) => {
        heartRef.current = gltf.scene;
        scene.add(heartRef.current);
      });
      
    }, [scene]);
  
    useFrame(() => {
      if (heartRef.current) {
        heartRef.current.castShadow = true;
        heartRef.current.scale.set(3,3,3)
        // Rotate the model
        heartRef.current.rotation.y += 0.01;
        // Change position
        heartRef.current.position.x = -7; // replace with desired x-coordinate
        heartRef.current.position.y = 0.5; // replace with desired y-coordinate
        heartRef.current.position.z = -4; // replace with desired z-coordinate
      }
    });
  

  return (
    <>
        <ambientLight intensity={0.5} />
    </>
  );
}

export default Heart;
