import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Stars, Trail, Line, Text3D, useTexture, Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const planet_texture = [
  "./planet_texture/Mecury_texture.jpeg", 
  "./planet_texture/Venus_texture.jpeg", 
  "./planet_texture/Earth_texture.jpeg", 
  "./planet_texture/Mars_texture.jpeg", 
  "./planet_texture/Jupiter_texture.jpeg", 
  "./planet_texture/Saturn_texture.jpeg", 
  "./planet_texture/Uranus_texture.jpeg", 
  "./planet_texture/Neptune_texture.jpeg"
]

const Sun = () => {
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


function Planet({ texturePath, position, size }) {
  const texture = useLoader(THREE.TextureLoader, texturePath);
  const planetRef = useRef();
  const initialAngle = Math.random() * Math.PI * 2;
  const trailRef = useRef();
  const orbitRadius = position[0];
  const orbitPath = [...Array(101).keys()].map(i => {
    const angle = (i / 100) * Math.PI * 2;
    return [Math.sin(angle) * position[0], 0, Math.cos(angle) * position[0]];
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    planetRef.current.position.x = Math.sin(initialAngle + t * 1 / Math.sqrt(orbitRadius)) * orbitRadius;
    planetRef.current.position.z = Math.cos(initialAngle + t * 1 / Math.sqrt(orbitRadius)) * orbitRadius;
    planetRef.current.rotation.y += 0.02;
    const worldPos = new THREE.Vector3();
    planetRef.current.getWorldPosition(worldPos);

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

function Background() {
  const texture = useTexture("/planet_texture/Background.jpg");

  return (
    <mesh scale={[-1, 1, 1]} rotation={[0, - Math.PI / 2, 0]}>
      <sphereGeometry args={[250, 200, 200]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

const RotatingStars = () => {
  const close_stars = useRef()
  const far_stars = useRef()
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let lastX = 0
    let lastY = 0

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * -2

      setVelocity({ x: (x - lastX) * 2, y: (y - lastY) * 2 }) // Increase effect

      lastX = x
      lastY = y
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame(() => {
    setVelocity((prev) => ({ x: prev.x * 0.99, y: prev.y * 0.99})) 
    close_stars.current.rotation.x += velocity.y * 0.2
    close_stars.current.rotation.y += velocity.x * 0.2

    far_stars.current.rotation.x -= velocity.y * 0.1 // Opposite movement
    far_stars.current.rotation.y -= velocity.x * 0.1

    close_stars.current.rotation.x = close_stars.current.rotation.y += 0.0003
    far_stars.current.rotation.x = far_stars.current.rotation.y -= 0.0003
  })

  return (
    <>
      <group ref={close_stars} position={[-50, 0, 0]}>
        <Stars radius={0} depth={80} count={50} factor={5} saturation={0} fade/>
      </group>
      <group ref={far_stars}>
        <Stars radius={80} depth={20} count={200} factor={8} fade />
      </group>
    </>
  )
}

export default function Scene() {
  const lightRef = useRef();
  return (
    <div className="w-screen h-[700px] pt-20 pb-20">
      <Canvas className="w-full h-full bg-black" shadows camera={{ position: [0, 200, 0], up: [0, 10, 0]}}>
        <RotatingStars />
        <group rotation={[Math.PI / 1.5, Math.PI / 36, -Math.PI / 6]} position={[-50, 0, 0]}>
          <Sun lightRef={lightRef} />
          <Planet texturePath={planet_texture[0]} position={[50, 0, 0]} size={1} />
          <Planet texturePath={planet_texture[1]} position={[60, 0, 0]} size={1.5} />
          <Planet texturePath={planet_texture[2]} position={[70, 0, 0]} size={2} />
          <Planet texturePath={planet_texture[3]} position={[80, 0, 0]} size={1.2} />
          <Planet texturePath={planet_texture[4]} position={[90, 0, 0]} size={4} />
          <Planet texturePath={planet_texture[5]} position={[100, 0, 0]} size={3.5} />
          <Planet texturePath={planet_texture[6]} position={[110, 0, 0]} size={3} />
          <Planet texturePath={planet_texture[7]} position={[125, 0, 0]} size={2.8} />
          <Background />
          <CameraLightSync lightRef={lightRef} />
          <group rotation={[Math.PI / 1.5, 0, -Math.PI / 7]}>
            <Text3D 
              font={"./helvetiker_bold.typeface.json"} 
              size={30} 
              height={1} 
              position={[36, 36, -72]} 
            >
                Enigma
                <meshStandardMaterial color="white" metalness={0.7} roughness={0.1} />
            </Text3D>
          </group>
        </group>
      </Canvas>
    </div>
  );
}