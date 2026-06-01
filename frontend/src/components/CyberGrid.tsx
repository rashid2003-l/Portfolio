"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CyberGrid() {
  const gridRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.position.z =
        Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <group ref={gridRef} position={[0, -3.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper
        args={[50, 50, "#ffffff", "#0a0a0a"]}
        // @ts-ignore
        material-transparent={true}
        material-opacity={0.04}
      />
    </group>
  );
}
