import React, {
    useEffect,
    useRef,
    useState,
  } from "react";
  import * as THREE from 'three'
  import { useFrame } from "@react-three/fiber";
  import { useGLTF } from "@react-three/drei";
  
  const BubbleFont = () => {
    const { nodes, status } = useGLTF("./letters/scene.gltf") as any;
    const lettersGroup = useRef<THREE.Group>(null);
    const eCommerceGroup = useRef<THREE.Group>(null);
    const clickToEnterGroup = useRef<THREE.Group>(null); // Assuming you've imported * as Three from 'three'
    const spotLightRef = useRef(null);


  
    const nameMapping: {[key: string]: string} = {
      A_0: "A",
      B_1: "B",
      C_2: "C",
      E_3: "E",
      D_5: "D",
      F_6: "F",
      G_7: "G",
      H_4: "H",
      I_8: "I",
      J_9: "J",
      K_10: "K",
      L_11: "L",
      M_12: "M",
      N_15: "N",
      O_13: "O",
      P_14: "P",
      Q_16: "Q",
      R_17: "R",
      S_18: "S",
      T_19: "T",
      U_20: "U",
      V_21: "V",
      W_22: "W",
      X_23: "X",
      Y_24: "Y",
      Z_25: "Z",
    };
  
    for (const name in nodes) {
      const newName = nameMapping[name];
      if (newName !== undefined) {
        nodes[newName] = nodes[name];
        delete nodes[name];
      }
    }
  const loveJamesArray = ["L", "O", "V", "E", "J", "A", "M", "E", "S"];

  const loveJamesLetters = loveJamesArray.map(letter => nodes[letter].clone());

  const eCommerceArray = "ECommerceeExperience".toUpperCase().split('');

  const eCommerceLetters = eCommerceArray.map(letter => nodes[letter].clone());
  const clickToEnterArray = "clicktoenter".toUpperCase().split('');

  const clickToEnter = clickToEnterArray.map(letter => nodes[letter].clone());


  const [scaleDirection, setScaleDirection] = useState(1);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setScaleDirection(-scaleDirection);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [scaleDirection]);

  useFrame(({ clock }) => {
    if (clickToEnterGroup.current) {
      console.log('clickToEnterGroup.current:', clickToEnterGroup.current);

        // Use the sine function to make it loop
        const time = clock.getElapsedTime() % 2; // Loop every 2 seconds
        const progress = time / 2; // Normalize time to a 0-1 range
        
        const bouncyScale = easeOutBounce(progress) + sineBounce(progress); // Apply the bounce easing

        clickToEnterGroup.current.scale.set(1, 1, bouncyScale);
    }
  });


  const sineBounce = (x: number) => {
    return Math.abs(Math.sin(x)) ** 0.5;
  };

  const easeOutBounce = (x: number) => {
    const n1 = 7.5625;
    const d1 = 2.75;
    
    if (x < 1 / d1) {
      return n1 * x * x;
    } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
      return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
  };
  

  
    return (
      <>
       <group
          position={[-3,3,-4]}
          rotation={[Math.PI / 2, 0, (3 * Math.PI) / 2]}
          scale={1.3}
          ref={lettersGroup}
        >
            {loveJamesLetters.map((letter, index) => 
                <primitive key={nodes[letter]} object={letter} position={[0, index, 0]} rotation={[0, 0 , Math.PI / 2]} castShadow/>
            )}
        </group> 
        <group
  position={[-2, 1, -4]}
  rotation={[Math.PI / 2, 0, (3 * Math.PI) / 2]}
  scale={0.8}
  ref={eCommerceGroup}
>
  {eCommerceLetters.map((letter, index) => {
    const clonedLetter = letter.clone();
    clonedLetter.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        child.material = child.material.clone();
        child.material.color.set('#218fb8'); // Change this to your desired color
      }
    });
    
    let xPos = 1;
    let lineNo = 0;
    if (index < 9) {
        xPos += index;
        lineNo = 0;
    }
    if (index > 9){
        lineNo = 2;
        xPos += index - 8;
    }
    

    return (
      <primitive
        key={index}
        object={clonedLetter}
        position={[0, xPos, lineNo]}
        rotation={[0, 0, Math.PI / 2]}
      />
    );
  })}
</group>
{/* <group
  position={[-12, -5, -8]}
  rotation={[Math.PI / 2, 0, (3 * Math.PI) / 2]}
  scale={1}
  ref={clickToEnterGroup}
>
  {clickToEnter.map((letter, index) => {
    const clonedLetter = letter.clone();
    clonedLetter.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        child.material = child.material.clone();
        child.material.color.set('#ed8a3e'); // Change this to your desired color
      }
    });
    
    let xPos = 1;
    if (index < 5) {
        xPos += index * 2;

    }
    if (index >= 5 && index < 7){
        xPos += index * 2 + 1;
    }
    if (index >= 7) {
        xPos += index * 2 + 2;
    }
    

    return (
      <primitive
        key={index}
        object={clonedLetter}
        position={[0, xPos, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
    );
  })}
</group> */}

        
<directionalLight
  position={[-3,4,0]}  // Replace with actual coordinates
  intensity={0.5}
  target={lettersGroup.current ? (lettersGroup.current as THREE.Object3D) : undefined}
  />
<directionalLight
  position={[3,4,0]}  // Replace with actual coordinates
  intensity={0.8}
  target={lettersGroup.current ? (lettersGroup.current as THREE.Object3D) : undefined}
  />

<directionalLight   position={[0, 10, 5]}
  target={lettersGroup.current ? (lettersGroup.current as THREE.Object3D) : undefined}
  intensity={1} // Reduced intensity
  castShadow
  color={'white'}
  ref={spotLightRef}
  />
<ambientLight position={[0, 3, 5]} castShadow />

      </>
    );
  };
  
  export default BubbleFont;
  