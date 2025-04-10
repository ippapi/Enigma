'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useLoader, useThree } from '@react-three/fiber';

const RotatingCard = () => {
  const cardRef = useRef();
  
  useFrame(() => {
    if (cardRef.current) {
      cardRef.current.rotation.y += 0.01; // Rotate around Y-axis
      cardRef.current.rotation.z = 3; // Slight tilt for 2D rotation
    }
  });

  const front_texture = useLoader(TextureLoader, '/images/Home/TheLover-01.png');
  const back_texture = useLoader(TextureLoader, '/images/Home/TheLover-02.png');

  return (<>
    <group ref={cardRef}>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[80, 128]} />
        <meshBasicMaterial map={front_texture} side={2} />
      </mesh>
      <mesh rotation-y={Math.PI} position={[0, 0, -0.5]}>
        <planeGeometry args={[80, 128]} />
        <meshBasicMaterial map={back_texture} side={2} />
      </mesh>
    </group>
  </>
  );
};

export default RotatingCard;
