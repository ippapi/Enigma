import React, { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Stars, Trail, Line, useTexture } from "@react-three/drei";
import RotatingCard from "./rotateCard";

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
    setVelocity((prev) => ({ x: prev.x * 0.95, y: prev.y * 0.95})) 
    close_stars.current.rotation.x += velocity.y * 0.2 + 0.0002
    close_stars.current.rotation.y += velocity.x * 0.2 + 0.0002

    far_stars.current.rotation.x -= velocity.y * 0.1 + 0.0001
    far_stars.current.rotation.y -= velocity.x * 0.1 + 0.0001
  })

  return (
    <>
      <group ref={close_stars}>
        <Stars radius={0} depth={30} count={100} factor={3} saturation={0} fade/>
      </group>
      <group ref={far_stars}>
        <Stars radius={30} depth={50} count={600} factor={5} fade />
      </group>
    </>
  )
};

const Aura = () => {
  const auraRef = useRef();
  const rayRef = useRef();

  const auraMaterial = new THREE.ShaderMaterial({
      uniforms: {
          time: { value: 0.0 },
          color: { value: new THREE.Color(1.0, 0.8, 0.5) },
          intensity: { value: 1.75 }, // Light intensity
          glow: { value: 1.55 }, // Glow effect
      },
      vertexShader: `
          varying vec2 vUv;
          uniform float time;
          
          void main() {
              vUv = uv;
              vec3 pos = position;
              pos.z += sin(time + uv.y * 10.0) * 0.02; // Slight distortion
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
      `,
      fragmentShader: `
          uniform vec3 color;
          uniform float time;
          uniform float intensity;
          uniform float glow;
          varying vec2 vUv;
          
          void main() {
              float radial = length(vUv - 0.5) * 2.0;
              float fade = smoothstep(1.0, 0.35, radial);
              float pulse = sin(90.0 + time * 0.7) * 0.3 + 0.7;
              vec3 finalColor = color * intensity * pulse * fade;
              gl_FragColor = vec4(finalColor, fade * glow);
          }
      `,
      transparent: true
  });

  const raysMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0.0 },
        color: { value: new THREE.Color(1.0, 0.7, 0.4) },
        intensity: { value: 1.2 }
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform vec3 color;
        uniform float time;
        uniform float intensity;
        varying vec2 vUv;
        
        void main() {
            float angle = atan(vUv.y - 0.5, vUv.x - 0.5) + time * 0.5; // Rotating rays
            float noise = fract(sin(dot(vUv.xy + time * 0.1, vec2(12.9898, 78.233))) * 43758.5453); // Adding noise
            float rays = (sin(angle * 20.0 + time) * 0.3 + 0.7) * (0.9 + 0.1 * noise);
            float fade = smoothstep(1.0, 0.2, length(vUv - 0.5) * 2.0);
            
            vec3 finalColor = color * intensity * rays * fade;
            gl_FragColor = vec4(finalColor, fade);
        }
    `,
    transparent: true
});

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;

    if (auraRef.current) {
      auraMaterial.uniforms.time.value = time;
    }

    if (rayRef.current) {
      rayRef.current.material.uniforms.time.value = clock.getElapsedTime();
      rayRef.current.rotation.z = clock.getElapsedTime() * 0.2; // Rotating the rays
    }
  });

  return (<group rotation ={[-Math.PI / 2, 0, 0]}>
      <mesh ref={auraRef} position={[0, 0, -50]}>
        <planeGeometry args={[300, 300]} />
        <primitive attach="material" object={auraMaterial} />
      </mesh>
      <mesh ref={rayRef} position={[0, 0, -60]}>
        <planeGeometry args={[400, 400]} />
        <primitive attach="material" object={raysMaterial} />
      </mesh>
  </group>);
};

export default function Scene() {
  const lightRef = useRef();

  return (
    <div className="w-screen h-screen pt-20 pb-20">
      <Canvas className="w-full h-full bg-transparent" shadows camera={{ position: [0, 200, 0], up: [0, 10, 0]}}>
        <RotatingStars />
        <group>
          <ambientLight intensity={1} />
          <Aura />
          <group rotation ={[Math.PI/2, 0, 0]}>
            <RotatingCard />
          </group>
          <group rotation ={[-Math.PI/2.15, 0, 0]}>
            <Planet texturePath={planet_texture[0]} position={[100, 0, 0]} size={1.5} />
            <Planet texturePath={planet_texture[1]} position={[110, 0, 0]} size={2} />
            <Planet texturePath={planet_texture[2]} position={[120, 0, 0]} size={2.5} />
            <Planet texturePath={planet_texture[3]} position={[130, 0, 0]} size={1.7} />
            <Planet texturePath={planet_texture[4]} position={[140, 0, 0]} size={4.5} />
            <Planet texturePath={planet_texture[5]} position={[150, 0, 0]} size={4.0} />
            <Planet texturePath={planet_texture[6]} position={[160, 0, 0]} size={3.5} />
            <Planet texturePath={planet_texture[7]} position={[170, 0, 0]} size={3.3} />
          </group>
          <CameraLightSync lightRef={lightRef} />
        </group>
      </Canvas>
    </div>
  );
}