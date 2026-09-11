'use client';
import { useRef, useState, useSyncExternalStore, Suspense } from 'react';
import Image from 'next/image';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const emptySubscribe = () => () => {};

function checkWebgl(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

// 3D Procedural Surgical Light Dome & Instrument Workstation Model
function SurgicalDomeModel({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle continuous ambient rotation
      groupRef.current.rotation.y += delta * (isHovered ? 0.4 : 0.15);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* Central Light Head Housing */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[1.6, 1.9, 0.4, 32]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.15} metalness={0.7} />
      </mesh>

      {/* Titanium Edge Trim Ring */}
      <mesh position={[0, 0.25, 0]} ref={ringRef}>
        <torusGeometry args={[1.85, 0.08, 16, 64]} />
        <meshStandardMaterial color="#059669" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Optical LED Emitters Pattern (6 surrounding lenses + 1 center) */}
      <mesh position={[0, 0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.35, 32]} />
        <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={1.5} />
      </mesh>

      {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * 1.05;
        const z = Math.sin(rad) * 1.05;
        return (
          <group key={idx} position={[x, 0.18, z]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.25, 24]} />
              <meshStandardMaterial color="#6ee7b7" emissive="#059669" emissiveIntensity={1.2} />
            </mesh>
            <mesh position={[0, 0.05, 0]}>
              <ringGeometry args={[0.25, 0.32, 24]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        );
      })}

      {/* Center Sterile Positioning Handle */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.45, 16]} />
        <meshStandardMaterial color="#047857" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Articulated Suspension Arm Bracket */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.3, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.95, -0.4]} rotation={[Math.PI / 4, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.9, 16]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function MedicalDeviceViewer() {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [isHovered, setIsHovered] = useState(false);
  const webglSupported = isClient ? checkWebgl() : true;

  if (!isClient) {
    return (
      <div className="w-full h-80 md:h-[420px] rounded-3xl bg-emerald-950/40 border border-emerald-500/20 animate-pulse flex items-center justify-center">
        <span className="text-xs text-emerald-400 font-mono">Initializing 3D Medical Engine...</span>
      </div>
    );
  }

  // Graceful fallback for non-WebGL / low-end mobile devices
  if (!webglSupported) {
    return (
      <div className="relative w-full h-80 md:h-[420px] rounded-3xl overflow-hidden border border-emerald-500/30 bg-emerald-950/50 shadow-2xl flex items-center justify-center p-6">
        <div className="relative w-full h-full max-w-sm">
          <Image
            src="/images/products/ot-examination-lights/led-ot-lights/hero.webp"
            alt="EKOSYS High-Performance Medical Equipment"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 420px"
            priority
          />
        </div>
        <div className="absolute bottom-4 left-4 bg-emerald-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-400/30 text-[11px] text-emerald-200">
          Precision Surgical Illumination • ISO 13485 Certified
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-80 md:h-[420px] rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-b from-emerald-950/60 via-slate-900/80 to-slate-950/90 shadow-2xl backdrop-blur-md group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 2.2, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 5]} intensity={2.5} castShadow />
        <directionalLight position={[-5, 3, -5]} intensity={0.8} color="#34d399" />
        <pointLight position={[0, -0.5, 0]} intensity={1.8} color="#10b981" distance={5} />

        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
            <SurgicalDomeModel isHovered={isHovered} />
          </Float>
          <ContactShadows position={[0, -1.2, 0]} opacity={0.6} scale={6} blur={2.5} far={4} color="#047857" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
          rotateSpeed={0.8}
          autoRotate={!isHovered}
          autoRotateSpeed={0.8}
        />
      </Canvas>

      {/* Floating Status Badges */}
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-emerald-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-400/30">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-[11px] font-semibold text-emerald-100 tracking-wide">
          Interactive 3D Preview
        </span>
      </div>

      <div className="absolute bottom-4 right-4 text-[10px] text-emerald-300/80 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700/50">
        Drag to Orbit • 360° Inspection
      </div>
    </div>
  );
}
