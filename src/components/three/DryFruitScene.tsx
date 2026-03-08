import { Canvas, useFrame } from '@react-three/fiber';
// @ts-ignore
import { Float, Environment, Sparkles, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function GlassOrb({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.y += 0.003;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        {/* @ts-ignore */}
        <MeshDistortMaterial color={color} roughness={0.1} metalness={0.3} distort={0.2} speed={2} transparent opacity={0.85} />
      </mesh>
    </Float>
  );
}

function SoftCube({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
      meshRef.current.rotation.z += 0.004;
    }
  });
  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale} castShadow>
        <boxGeometry args={[0.7, 0.7, 0.7, 4, 4, 4]} />
        {/* @ts-ignore */}
        <MeshWobbleMaterial color={color} roughness={0.2} metalness={0.15} factor={0.3} speed={1.5} />
      </mesh>
    </Float>
  );
}

function Torus({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25 + 1) * 0.15;
      meshRef.current.rotation.y += 0.005;
    }
  });
  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale} castShadow>
        <torusGeometry args={[0.35, 0.15, 16, 32]} />
        {/* @ts-ignore */}
        <meshStandardMaterial color={color} roughness={0.15} metalness={0.25} />
      </mesh>
    </Float>
  );
}

function Capsule({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.35) * 0.2;
      meshRef.current.rotation.y += 0.004;
    }
  });
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.1}>
      <mesh ref={meshRef} position={position} scale={scale} castShadow>
        <capsuleGeometry args={[0.2, 0.5, 8, 16]} />
        {/* @ts-ignore */}
        <MeshDistortMaterial color={color} roughness={0.2} metalness={0.2} distort={0.15} speed={1.5} />
      </mesh>
    </Float>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.08;
    }
  });

  const objects = useMemo(() => [
    { type: 'orb', position: [-2.8, 1.2, -0.5] as [number, number, number], color: '#6E86AB', scale: 0.9 },
    { type: 'orb', position: [3, -0.8, -1] as [number, number, number], color: '#E9D9C9', scale: 1.1 },
    { type: 'cube', position: [2.2, 1.8, 0.5] as [number, number, number], color: '#D4A574', scale: 0.7 },
    { type: 'cube', position: [-1.8, -1.5, 0.8] as [number, number, number], color: '#8BAA7C', scale: 0.6 },
    { type: 'torus', position: [0.5, 2.2, -0.5] as [number, number, number], color: '#6E86AB', scale: 1 },
    { type: 'torus', position: [-2.5, -0.5, -0.3] as [number, number, number], color: '#C9956C', scale: 0.8 },
    { type: 'capsule', position: [1.5, -1.8, 0.2] as [number, number, number], color: '#E9D9C9', scale: 0.9 },
    { type: 'capsule', position: [-0.8, 1, 1] as [number, number, number], color: '#D4A574', scale: 0.7 },
    { type: 'orb', position: [0, -2, -0.8] as [number, number, number], color: '#8BAA7C', scale: 0.5 },
    { type: 'cube', position: [-0.3, -0.3, 1.5] as [number, number, number], color: '#6E86AB', scale: 0.4 },
  ], []);

  return (
    <group ref={groupRef}>
      {objects.map((obj, index) => {
        switch (obj.type) {
          case 'orb': return <GlassOrb key={index} position={obj.position} color={obj.color} scale={obj.scale} />;
          case 'cube': return <SoftCube key={index} position={obj.position} color={obj.color} scale={obj.scale} />;
          case 'torus': return <Torus key={index} position={obj.position} color={obj.color} scale={obj.scale} />;
          case 'capsule': return <Capsule key={index} position={obj.position} color={obj.color} scale={obj.scale} />;
          default: return null;
        }
      })}
      <Sparkles count={60} scale={12} size={1.5} speed={0.3} color="#6E86AB" opacity={0.3} />
      <Sparkles count={30} scale={10} size={2} speed={0.2} color="#E9D9C9" opacity={0.4} />
    </group>
  );
}

export default function DryFruitScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#E9D9C9" />
      <pointLight position={[5, -5, 5]} intensity={0.3} color="#6E86AB" />
      <pointLight position={[0, 5, 0]} intensity={0.2} color="#ffffff" />
      <Scene />
      <Environment preset="studio" />
    </Canvas>
  );
}
