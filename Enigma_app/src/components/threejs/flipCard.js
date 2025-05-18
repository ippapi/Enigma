'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useState, useRef } from 'react';
import { TextureLoader, MathUtils } from 'three';

function RotatingCard({ frontImage, backImage, isFlipped, onFlipComplete, startAnimation, floatOffset = 0 }) {
  const cardRef = useRef();
  const [rotationY, setRotationY] = useState(Math.PI);
  const [positionZ, setPositionZ] = useState(0);
  const [animationStep, setAnimationStep] = useState(-1);
  const targetRotation = isFlipped ? 0 : Math.PI;
  const frontTexture = useLoader(TextureLoader, frontImage);
  const backTexture = useLoader(TextureLoader, backImage);

  useFrame(({ clock }) => {
    // Floating effect using sine wave
    const floatY = Math.sin(clock.getElapsedTime() * 2 + floatOffset) * 0.1;

    if (animationStep === -1 && startAnimation) {
      setAnimationStep(0);
    }

    if (cardRef.current) {
      if (animationStep === 0) {
        setPositionZ((prev) => MathUtils.lerp(prev, 1.2, 0.1));
        if (Math.abs(positionZ - 1.2) < 0.01) setAnimationStep(1);
      } else if (animationStep === 1) {
        setRotationY((prev) => {
          let newRotation = MathUtils.lerp(prev, targetRotation, 0.2);
          if (Math.abs(newRotation - targetRotation) < 0.05) setAnimationStep(2);
          return newRotation;
        });
      } else if (animationStep === 2) {
        setPositionZ((prev) => MathUtils.lerp(prev, 0, 0.1));
        if (Math.abs(positionZ) < 0.01) {
          setAnimationStep(-1);
          onFlipComplete();
        }
      }

      cardRef.current.rotation.y = rotationY;
      cardRef.current.position.z = positionZ;
      cardRef.current.position.y = floatY;
    }
  });

  return (
    <group ref={cardRef}>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[2.25 , 3.6]} />
        <meshBasicMaterial map={frontTexture} side={2} />
      </mesh>
      <mesh rotation-y={Math.PI} position={[0, 0, -0.01]}>
        <planeGeometry args={[2.25 , 3.6]} />
        <meshBasicMaterial map={backTexture} side={2} />
      </mesh>
    </group>
  );
}

export default function FlipCard({ front, name = "the card", rotation = [0, 0, 0], position = [0, 0, 0], floatOffset = 0 }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  const handleClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setStartAnimation(true);
      setTimeout(() => {
        setIsFlipped((prev) => !prev);
      }, 100);
    }
  };

  return (
    <div
      className="relative mx-2 w-[225px] h-[360px] cursor-pointer border border-purple-400 rounded-lg shadow-md hover:shadow-purple-600 transition-shadow duration-300"
      onClick={handleClick}
    >
      <Canvas className="w-full h-full rounded-lg" camera={{ position: [0, 0, 5] }}>
        <group rotation={rotation} position={position}>
          <RotatingCard
            frontImage={front || "./front.jpg"}
            backImage="./images/Home/TheLover-02.png"
            isFlipped={isFlipped}
            startAnimation={startAnimation}
            floatOffset={floatOffset}
            onFlipComplete={() => {
              setIsAnimating(false);
              setStartAnimation(false);
            }}
          />
        </group>
        <ambientLight intensity={0.6} />
      </Canvas>
      {isFlipped && (
        <div className="absolute left-1/2 top-full mt-2 transform -translate-x-1/2 text-center w-max px-2">
          <p className="text-sm text-purple-200 font-semibold whitespace-nowrap drop-shadow-md">
            {name}
          </p>
        </div>
      )}
    </div>
  );  
}
