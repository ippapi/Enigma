'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useState, useRef, useEffect } from 'react';
import { TextureLoader, MathUtils } from 'three';

function RotatingCard({ frontImage, backImage, isFlipped, onFlipComplete, startAnimation }) {
  const cardRef = useRef();
  const [rotationY, setRotationY] = useState(0);
  const [positionZ, setPositionZ] = useState(0);
  const [animationStep, setAnimationStep] = useState(-1);
  const targetRotation = isFlipped ? Math.PI : 0;
  const frontTexture = useLoader(TextureLoader, frontImage);
  const backTexture = useLoader(TextureLoader, backImage);

  useFrame(() => {
    if (animationStep === -1 && startAnimation) {
      setAnimationStep(0);
    }
    
    if (cardRef.current) {
      if (animationStep === 0) {
        setPositionZ((prev) => MathUtils.lerp(prev, 1.5, 0.05)); // Slower zoom in
        if (Math.abs(positionZ - 1.5) < 0.01) setAnimationStep(1);
      } else if (animationStep === 1) {
        setRotationY((prev) => {
          const overshoot = targetRotation + (isFlipped ? 0.35 : -0.35);
          let newRotation = MathUtils.lerp(prev, overshoot, 0.1); // Slower rotation
          if (Math.abs(newRotation - overshoot) < 0.01) {
            setAnimationStep(2);
          }
          return newRotation;
        });
      } else if (animationStep === 2) {
        setRotationY((prev) => {
          let newRotation = MathUtils.lerp(prev, targetRotation, 0.08); // Even slower return rotation
          if (Math.abs(newRotation - targetRotation) < 0.01) setAnimationStep(3);
          return newRotation;
        });
      } else if (animationStep === 3) {
        setPositionZ((prev) => MathUtils.lerp(prev, 0, 0.05)); // Slower zoom out
        if (Math.abs(positionZ) < 0.01) {
          setAnimationStep(-1);
          onFlipComplete();
        }
      }
      
      cardRef.current.rotation.y = rotationY;
      cardRef.current.position.z = positionZ;
    }
  });

  return (
    <group ref={cardRef}>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[2.5, 4]} />
        <meshBasicMaterial map={frontTexture} side={2} />
      </mesh>
      <mesh rotation-y={Math.PI} position={[0, 0, -0.01]}>
        <planeGeometry args={[2.5, 4]} />
        <meshBasicMaterial map={backTexture} side={2} />
      </mesh>
    </group>
  );
}

export default function TarotCard({ front }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  const handleClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setStartAnimation(true);
      setTimeout(() => {
        setIsFlipped((prev) => !prev);
      }, 200); // Slight delay before state flip
    }
  };

  return (
    <div className="w-64 h-96 cursor-pointer" onClick={handleClick}>
      <Canvas className="w-full h-full" camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <RotatingCard
          frontImage={front || "./front.jpg"}
          backImage="./back.jpg"
          isFlipped={isFlipped}
          startAnimation={startAnimation}
          onFlipComplete={() => {
            setIsAnimating(false);
            setStartAnimation(false);
          }}
        />
      </Canvas>
    </div>
  );
}
