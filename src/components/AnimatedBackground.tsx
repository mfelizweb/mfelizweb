"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Instances, Instance, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef, useEffect, useState } from "react";
import { Group, MathUtils } from "three";

/* ============================
   Scroll → Zoom de cámara
============================ */
function ScrollCamera() {
  const { camera } = useThree();
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = window.innerHeight * 1.2;
      const value = Math.min(window.scrollY / maxScroll, 1);
      setScroll(value);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame(() => {
    // Zoom suave: 6 → 4
    const targetZ = 6 - scroll * 2;
    camera.position.z += (targetZ - camera.position.z) * 0.08;
  });

  return null;
}

/* ============================
   Cubos flotantes
============================ */
function FloatingInstances() {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.15;
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <Instances limit={100} castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial
          color="#ffff"
          metalness={0.9}
          roughness={0.05}
        />

        {Array.from({ length: 100 }).map((_, i) => (
          <Instance
            key={i}
            position={[
              MathUtils.randFloatSpread(6),
              MathUtils.randFloatSpread(6),
              MathUtils.randFloatSpread(6),
            ]}
            rotation={[
              Math.random() * Math.PI,
              Math.random() * Math.PI,
              Math.random() * Math.PI,
            ]}
            scale={Math.random() * 0.5 + 0.3}
          />
        ))}
      </Instances>
    </group>
  );
}

/* ============================
   Componente principal
============================ */
export default function AnimatedBackground() {
  return (
    <><div className="absolute inset-0 bg-white/40 backdrop-blur-sm" /><div className="absolute inset-0 z-0">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 50 }}
      >
        {/* Fondo */}
        <color attach="background" args={["#ffffff"]} />

        {/* Luces */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />

        {/* Escena */}
        <FloatingInstances />
        <ScrollCamera />

        {/* Controles (sin interferir con scroll) */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false} />

        {/* Postprocesado */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.4}
            luminanceSmoothing={0.8}
            intensity={1.2} />
        </EffectComposer>

        {/* HDRI */}
        <Environment preset="sunset" />
      </Canvas>
    </div></>
  );
}
