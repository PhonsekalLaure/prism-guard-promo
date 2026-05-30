import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SignalRing({ radius, delay }) {
  const ref = useRef();
  useFrame((state) => {
    const t = ((state.clock.elapsedTime + delay) % 2.2) / 2.2;
    ref.current.scale.setScalar(0.3 + t * 1.4);
    ref.current.material.opacity = (1 - t) * 0.7;
  });
  return (
    <mesh ref={ref} rotation={[0, 0, Math.PI / 2]}>
      <torusGeometry args={[radius, 0.012, 12, 64]} />
      <meshBasicMaterial color="#4ade80" transparent opacity={0.7} />
    </mesh>
  );
}

function SpeakerHole({ x, y }) {
  return (
    <mesh position={[x, y, 0.22]}>
      <boxGeometry args={[0.32, 0.022, 0.01]} />
      <meshBasicMaterial color="#021226" />
    </mesh>
  );
}

export default function WalkieTalkie() {
  const groupRef = useRef();
  const antennaRef = useRef();
  const signalGroupRef = useRef();
  const screenRef = useRef();

  useFrame((state, delta) => {
    // Gentle floating tilt — like it's being held
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.25;
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.35) * 0.06;
    // Antenna slight sway
    antennaRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.04;
    // Screen flicker
    const flicker = 0.6 + Math.sin(state.clock.elapsedTime * 4) * 0.15;
    screenRef.current.material.emissiveIntensity = flicker;
  });

  return (
    <group ref={groupRef} scale={0.92}>

      {/* ── BODY ── */}
      {/* Main body — rounded dark metal */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.1, 2.6, 0.42]} />
        <meshPhysicalMaterial
          color="#0a1628"
          metalness={0.9}
          roughness={0.2}
          emissive="#0a2240"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Gold side trim strips */}
      <mesh position={[0.57, 0, 0]}>
        <boxGeometry args={[0.04, 2.6, 0.44]} />
        <meshStandardMaterial color="#e6b215" metalness={1} roughness={0.1} emissive="#e6b215" emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[-0.57, 0, 0]}>
        <boxGeometry args={[0.04, 2.6, 0.44]} />
        <meshStandardMaterial color="#e6b215" metalness={1} roughness={0.1} emissive="#e6b215" emissiveIntensity={0.15} />
      </mesh>

      {/* Top cap */}
      <mesh position={[0, 1.38, 0]}>
        <boxGeometry args={[1.1, 0.16, 0.42]} />
        <meshStandardMaterial color="#e6b215" metalness={1} roughness={0.1} />
      </mesh>

      {/* ── ANTENNA ── */}
      <group ref={antennaRef} position={[0.3, 1.46, 0]}>
        {/* Base knob */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.065, 0.08, 0.18, 12]} />
          <meshStandardMaterial color="#e6b215" metalness={1} roughness={0.1} />
        </mesh>
        {/* Antenna rod */}
        <mesh position={[0, 0.85, 0]}>
          <cylinderGeometry args={[0.022, 0.038, 1.4, 10]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Tip glow */}
        <mesh position={[0, 1.57, 0]}>
          <sphereGeometry args={[0.038, 12, 12]} />
          <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={3} />
        </mesh>

        {/* Signal rings emanating from antenna tip */}
        <group position={[0, 1.57, 0]} ref={signalGroupRef}>
          <SignalRing radius={0.28} delay={0.0} />
          <SignalRing radius={0.28} delay={0.7} />
          <SignalRing radius={0.28} delay={1.4} />
        </group>
      </group>

      {/* ── SCREEN ── */}
      <mesh ref={screenRef} position={[0, 0.72, 0.22]}>
        <planeGeometry args={[0.78, 0.55]} />
        <meshStandardMaterial
          color="#0a2a1a"
          emissive="#4ade80"
          emissiveIntensity={0.6}
          roughness={0.4}
        />
      </mesh>
      {/* Screen border */}
      <mesh position={[0, 0.72, 0.215]}>
        <boxGeometry args={[0.86, 0.63, 0.01]} />
        <meshStandardMaterial color="#e6b215" metalness={1} roughness={0.1} emissive="#e6b215" emissiveIntensity={0.1} />
      </mesh>
      {/* Screen scanlines */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[0, 0.49 + i * 0.1, 0.223]}>
          <planeGeometry args={[0.72, 0.008]} />
          <meshBasicMaterial color="#4ade80" transparent opacity={0.25} />
        </mesh>
      ))}

      {/* ── SPEAKER GRILLE ── */}
      {[-0.56, -0.46, -0.36, -0.26, -0.16, -0.06].map((y, i) => (
        <SpeakerHole key={i} x={0} y={y} />
      ))}
      {/* Speaker grill border */}
      <mesh position={[0, -0.32, 0.215]}>
        <boxGeometry args={[0.44, 0.72, 0.01]} />
        <meshBasicMaterial color="#e6b215" transparent opacity={0.15} />
      </mesh>

      {/* ── PTT BUTTON (left side) ── */}
      <mesh position={[-0.63, 0.2, 0]}>
        <boxGeometry args={[0.1, 0.42, 0.3]} />
        <meshStandardMaterial color="#e6b215" metalness={0.8} roughness={0.2} emissive="#e6b215" emissiveIntensity={0.2} />
      </mesh>

      {/* ── BUTTONS ── */}
      {/* Channel knob */}
      <mesh position={[0, -0.88, 0.24]}>
        <cylinderGeometry args={[0.12, 0.12, 0.06, 16]} />
        <meshStandardMaterial color="#e6b215" metalness={1} roughness={0.1} />
      </mesh>

      {/* Volume knob */}
      <mesh position={[0, -1.1, 0.24]}>
        <cylinderGeometry args={[0.09, 0.09, 0.05, 16]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* LED indicator */}
      <mesh position={[-0.32, 0.4, 0.22]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={2.5} />
      </mesh>
      <mesh position={[-0.32, 0.3, 0.22]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshStandardMaterial color="#e6b215" emissive="#e6b215" emissiveIntensity={1.5} />
      </mesh>

      {/* Bottom strip */}
      <mesh position={[0, -1.38, 0]}>
        <boxGeometry args={[1.1, 0.12, 0.42]} />
        <meshStandardMaterial color="#e6b215" metalness={1} roughness={0.1} />
      </mesh>

      {/* ── ORBITING SIGNAL RING (large, atmospheric) ── */}
      <group rotation={[0.5, 0, 0.2]}>
        <mesh>
          <torusGeometry args={[2.0, 0.012, 12, 128]} />
          <meshBasicMaterial color="#4ade80" transparent opacity={0.18} />
        </mesh>
      </group>
      <group rotation={[-0.3, 0.4, 0]}>
        <mesh>
          <torusGeometry args={[2.35, 0.008, 12, 128]} />
          <meshBasicMaterial color="#e6b215" transparent opacity={0.12} />
        </mesh>
      </group>
    </group>
  );
}
