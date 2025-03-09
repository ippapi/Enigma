'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useState, useRef } from 'react';
import { TextureLoader } from 'three';

function RotatingCard({ frontImage, backImage, isFlipped, onFlipComplete }) {
  const cardRef = useRef();
  const [rotationY, setRotationY] = useState(0);
  const targetRotation = isFlipped ? Math.PI : 0;
  const frontTexture = useLoader(TextureLoader, frontImage);
  const backTexture = useLoader(TextureLoader, backImage);

  useFrame(() => {
    if (cardRef.current) {
      setRotationY((prev) => {
        const step = 0.1 * (targetRotation - prev > 0 ? 1 : -1);
        const newRotation = Math.abs(targetRotation - prev) < Math.abs(step) ? targetRotation : prev + step;
        if (newRotation === targetRotation) onFlipComplete();
        return newRotation;
      });
      cardRef.current.rotation.y = rotationY;
    }
  });

  return (
    <group ref={cardRef}>
      {/* Front Side */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[2.5, 4]} />
        <meshBasicMaterial map={frontTexture} side={2} />
      </mesh>
      {/* Back Side */}
      <mesh rotation-y={Math.PI} position={[0, 0, -0.01]}>
        <planeGeometry args={[2.5, 4]} />
        <meshBasicMaterial map={backTexture} side={2} />
      </mesh>
    </group>
  );
}

export default function TarotCard({ frontImage, backImage }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div className="w-64 h-96 cursor-pointer" onClick={handleClick}>
      <Canvas className="w-full h-full" camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <RotatingCard
          frontImage={frontImage}
          backImage={backImage}
          isFlipped={isFlipped}
          onFlipComplete={() => setIsAnimating(false)}
        />
      </Canvas>
    </div>
  );
}
