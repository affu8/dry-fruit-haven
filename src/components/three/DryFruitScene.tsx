import { Canvas, useFrame } from '@react-three/fiber';
// @ts-ignore - drei types mismatch with fiber
import { Float, Environment, Sparkles } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function Almond({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y += 0.005;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} castShadow>
        <sphereGeometry args={[0.4, 16, 8]} />
        {/* @ts-ignore */}
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>
    </Float>
  );
}

function Cashew({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.15;
      meshRef.current.rotation.y += 0.004;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} castShadow>
        <torusGeometry args={[0.3, 0.15, 8, 16, Math.PI]} />
        {/* @ts-ignore */}
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.05} />
      </mesh>
    </Float>
  );
}

function Pistachio({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4 + 1) * 0.12;
      meshRef.current.rotation.y += 0.006;
    }
  });
  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.9}>
      <mesh ref={meshRef} position={position} castShadow>
        <capsuleGeometry args={[0.15, 0.35, 4, 8]} />
        {/* @ts-ignore */}
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.08} />
      </mesh>
    </Float>
  );
}

function Walnut({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.2;
      meshRef.current.rotation.x += 0.003;
    }
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.1}>
      <mesh ref={meshRef} position={position} castShadow>
        <icosahedronGeometry args={[0.4, 0]} />
        {/* @ts-ignore */}
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.02} />
      </mesh>
    </Float>
  );
}

function DryFruitParticles() {
  return <Sparkles count={50} scale={10} size={2} speed={0.4} color="#F7A1B5" opacity={0.4} />;
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const dryFruits = useMemo(() => [
    { type: 'almond', position: [-2.5, 1, 0] as [number, number, number], color: '#D4A574' },
    { type: 'almond', position: [2.8, -0.5, -1] as [number, number, number], color: '#C9956C' },
    { type: 'cashew', position: [2, 1.5, 0.5] as [number, number, number], color: '#F5E6D3' },
    { type: 'cashew', position: [-1.5, -1.2, 0.8] as [number, number, number], color: '#EDD9C0' },
    { type: 'pistachio', position: [0, 2, -0.5] as [number, number, number], color: '#7CB342' },
    { type: 'pistachio', position: [-2.2, -0.8, -0.3] as [number, number, number], color: '#8BC34A' },
    { type: 'walnut', position: [1.2, -1.8, 0.2] as [number, number, number], color: '#8B6914' },
    { type: 'walnut', position: [-0.8, 0.8, 1] as [number, number, number], color: '#9E7B2C' },
  ], []);

  return (
    <group ref={groupRef}>
      {dryFruits.map((fruit, index) => {
        switch (fruit.type) {
          case 'almond': return <Almond key={index} position={fruit.position} color={fruit.color} />;
          case 'cashew': return <Cashew key={index} position={fruit.position} color={fruit.color} />;
          case 'pistachio': return <Pistachio key={index} position={fruit.position} color={fruit.color} />;
          case 'walnut': return <Walnut key={index} position={fruit.position} color={fruit.color} />;
          default: return null;
        }
      })}
      <DryFruitParticles />
    </group>
  );
}

export default function DryFruitScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#F7A1B5" />
      <pointLight position={[5, -5, 5]} intensity={0.3} color="#8E44AD" />
      <Scene />
      <Environment preset="studio" />
    </Canvas>
  );
}
