"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const SolarSystem = () => {
  const planetRefs = useRef([]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Update planet positions to follow elliptical orbits
    planetRefs.current.forEach((planet, index) => {
      if (planet) {
        const radiusX = (index + 1) * 2.5; // Wider orbit
        const radiusZ = (index + 1) * 1.5; // Elliptical shape
        planet.position.x = -5 + radiusX * Math.cos(time * 0.2);
        planet.position.z = radiusZ * Math.sin(time * 0.2);
        planet.position.y = radiusZ * 0.3 * Math.sin(time * 0.2); // Adds height variation
      }
    });
  });

  return (
    <group rotation={[Math.PI / 6, 0, 0]}>
      {/* Grid Helper for reference */}
      <gridHelper args={[30, 30]} />

      {/* Sun (Left Side) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[10, 32, 32]} />
        <meshStandardMaterial color="yellow" emissive="orange" />
      </mesh>

      {/* Planets */}
      {planets.map((planet, index) => (
        <Planet
          key={index}
          ref={(el) => (planetRefs.current[index] = el)}
          scale={planet.scale}
        />
      ))}
    </group>
  );
};

const Planet = ({ scale }, ref) => (
  <group ref={ref}>
    {/* Planet */}
    <mesh>
      <sphereGeometry args={[scale, 32, 32]} />
      <meshStandardMaterial color="gray" />
    </mesh>

    {/* Orbit Path */}
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[scale * 4, scale * 4.1, 64]} />
      <meshBasicMaterial color="white" transparent opacity={0.5} side={THREE.DoubleSide} />
    </mesh>
  </group>
);

const planets = [
  { name: "Mercury", scale: 0.3 },
  { name: "Venus", scale: 0.5 },
  { name: "Earth", scale: 0.6 },
  { name: "Mars", scale: 0.4 },
  { name: "Jupiter", scale: 1.2 },
  { name: "Saturn", scale: 1.0 },
  { name: "Uranus", scale: 0.8 },
  { name: "Neptune", scale: 0.7 },
];

export default function App() {
  return (
    <div className="w-screen h-screen">
        <Canvas camera={{ position: [0, 10, 25] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <SolarSystem />
            <OrbitControls />
        </Canvas>
    </div>
  );
}
