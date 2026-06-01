"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import FloatingParticles from "./FloatingParticles";
import NeuralNetwork from "./NeuralNetwork";
import CyberGrid from "./CyberGrid";

/* Smooth camera parallax on mouse */
function MouseCamera() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.8 - camera.position.x) * 0.015;
    camera.position.y += (-mouse.current.y * 0.5 - camera.position.y) * 0.015;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* Single elegant ring — thin, white, slow */
function OrbitRing({ radius, speed, tilt }: { radius: number; speed: number; tilt: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = tilt + clock.getElapsedTime() * speed * 0.3;
      meshRef.current.rotation.y = clock.getElapsedTime() * speed * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[radius, 0.008, 16, 120]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
    </mesh>
  );
}

/* Central subtle sphere */
function CoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 1.5) * 0.03;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.1} />

        <MouseCamera />

        <NeuralNetwork nodeCount={40} radius={4} />
        <OrbitRing radius={2.8} speed={0.15} tilt={0.3} />
        <OrbitRing radius={2.2} speed={-0.1} tilt={-0.5} />
        <OrbitRing radius={3.4} speed={0.08} tilt={1.2} />
        <CoreSphere />
        <FloatingParticles count={250} color="#ffffff" size={0.006} spread={20} />
        <CyberGrid />
      </Suspense>
    </Canvas>
  );
}
