import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Trail, Line, Text3D, GradientTexture } from "@react-three/drei";
import * as THREE from "three";

const planet_texture = [
  "./planet_texture/Mecury_texture.jpeg", 
  "./planet_texture/Venus_texture.jpeg", 
  "./planet_texture/Earth_texture.jpeg", 
  "./planet_texture/Moon_texture.jpg",  
  "./planet_texture/Mars_texture.jpeg", 
  "./planet_texture/Jupiter_texture.jpeg", 
  "./planet_texture/Saturn_texture.jpeg", 
  "./planet_texture/Uranus_texture.jpeg", 
  "./planet_texture/Neptune_texture.jpeg"
]

function Sun({ lightRef }) {
  const texture = useLoader(THREE.TextureLoader, "./planet_texture/Sun_texture.jpeg");
  const sunRef = useRef();
  useFrame(({clock}) => {
    sunRef.current.rotation.y = clock.getElapsedTime() * 0.1;
  })
  return (
      <mesh ref={sunRef} position={[0, 0, 0]}>
          <pointLight 
        position={[0, 0, 0]} 
        intensity={20} 
        distance={300}
        decay={0.15}  
        color="white"
      />
        <sphereGeometry args={[36, 64, 64]} />
        <meshBasicMaterial map={texture} />
      </mesh>
  );
}


function Planet({ texturePath, position, size, isMoon = false }) {
  const texture = useLoader(THREE.TextureLoader, texturePath);
  const planetRef = useRef();
  const trailRef = useRef();
  const orbitPath = [...Array(101).keys()].map(i => {
    const angle = (i / 100) * Math.PI * 2;
    return [Math.sin(angle) * position[0], 0, Math.cos(angle) * position[0]];
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const orbitRadius = position[0];
    const speed = isMoon ? 2 : 1 / Math.sqrt(orbitRadius);
    planetRef.current.position.x = Math.sin(t * speed) * orbitRadius;
    planetRef.current.position.z = Math.cos(t * speed) * orbitRadius;
    planetRef.current.rotation.y += 0.02;
    const worldPos = new THREE.Vector3();
    planetRef.current.getWorldPosition(worldPos);

    // Apply world position to the trailRef
    trailRef.current.position.copy(worldPos);
  });

  return (
    <>
      <Trail local width={10} length={20} color={"yellow"} attenuation={(t) => t * t} target={trailRef}/>
      <Line points={orbitPath} color="white" lineWidth={0.5} />
      <mesh ref={trailRef} visible={false} />
      <mesh ref={planetRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </>
  );
}

function CameraLightSync({ lightRef }) {
  useFrame(({ camera }) => {
    if (lightRef.current) {
      lightRef.current.position.copy(camera.position);
    }
  });
  return null;
}

export default function Scene() {
  const lightRef = useRef();
  return (
    <div className="w-[screen] h-[400px]">
      <Canvas className="w-full h-full bg-black" shadows camera={{ position: [0, 100, 0], up: [0, 10, 0]}}>
        <group rotation={[Math.PI / 1.5, Math.PI / 36, -Math.PI / 6]} position={[-50, 0, 0]}>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Sun lightRef={lightRef} />
          <Planet texturePath={planet_texture[0]} position={[50, 0, 0]} size={1} />
          <Planet texturePath={planet_texture[1]} position={[60, 0, 0]} size={1.5} />
          <Planet texturePath={planet_texture[2]} position={[70, 0, 0]} size={2} />
          <Planet texturePath={planet_texture[3]} position={[70, 3, 0]} size={0.5} />
          <Planet texturePath={planet_texture[4]} position={[80, 0, 0]} size={1.2} />
          <Planet texturePath={planet_texture[5]} position={[90, 0, 0]} size={4} />
          <Planet texturePath={planet_texture[6]} position={[100, 0, 0]} size={3.5} />
          <Planet texturePath={planet_texture[7]} position={[110, 0, 0]} size={3} />
          <Planet texturePath={planet_texture[8]} position={[125, 0, 0]} size={2.8} />
          <ambientLight intensity={0.2} />
          <CameraLightSync lightRef={lightRef} />
          <group rotation={[Math.PI / 1.5, -Math.PI / 36, -Math.PI /6]}>
            <Text3D font={"./helvetiker_bold.typeface.json"} size={18} height={5} position={[36, 36, -72]}>
                Enigma
                <meshStandardMaterial color="white" emissive="purple"/>
            </Text3D>
          </group>
        </group>
      </Canvas>
    </div>
  );
}