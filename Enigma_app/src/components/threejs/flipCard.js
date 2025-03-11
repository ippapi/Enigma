'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useState, useRef } from 'react';
import { TextureLoader, MathUtils } from 'three';

function RotatingCard({ frontImage, backImage, isFlipped, onFlipComplete, startAnimation }) {
  const cardRef = useRef();
  const [rotationY, setRotationY] = useState(Math.PI);
  const [positionZ, setPositionZ] = useState(0);
  const [animationStep, setAnimationStep] = useState(-1);
  const targetRotation = isFlipped ? 0 : Math.PI;
  const frontTexture = useLoader(TextureLoader, frontImage);
  const backTexture = useLoader(TextureLoader, backImage);

  useFrame(() => {
    if (animationStep === -1 && startAnimation) {
      setAnimationStep(0);
    }
    
    if (cardRef.current) {
      if (animationStep === 0) {
        setPositionZ((prev) => MathUtils.lerp(prev, 1.2, 0.1)); // Faster zoom in
        if (Math.abs(positionZ - 1.2) < 0.01) setAnimationStep(1);
      } else if (animationStep === 1) {
        setRotationY((prev) => {
          let newRotation = MathUtils.lerp(prev, targetRotation, 0.2); // Faster rotation
          if (Math.abs(newRotation - targetRotation) < 0.05) setAnimationStep(2);
          return newRotation;
        });
      } else if (animationStep === 2) {
        setPositionZ((prev) => MathUtils.lerp(prev, 0, 0.1)); // Faster zoom out
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

export default function FlipCard({ front, name, rotation, position }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  const handleClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setStartAnimation(true);
      setTimeout(() => {
        setIsFlipped((prev) => !prev);
      }, 100); // Faster flip trigger
    }
  };

  return (
    <div className="mx-5 my-20 w-69 h-96 cursor-pointer" onClick={handleClick}>
      <Canvas className="w-full h-full" camera={{ position: [0, 0, 5] }}>
        <group rotation={rotation} position={position}>
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
        </group>
        <ambientLight intensity={0.5} />
      </Canvas>


      {/* Show name input when flipped */}
      {isFlipped && (
        <p className="mt-4 text-lg font-bold">{name}</p>
      )}
    </div>
  );
}
