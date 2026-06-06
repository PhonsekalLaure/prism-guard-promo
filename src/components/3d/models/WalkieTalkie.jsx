import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

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
    <mesh position={[x, y, 0.26]}>
      <boxGeometry args={[0.32, 0.022, 0.01]} />
      <meshBasicMaterial color="#021226" />
    </mesh>
  );
}

function PulseRing({ delay = 0, color = '#e6b215', speed = 1.2 }) {
  const ref = useRef();
  useFrame((state) => {
    const t = ((state.clock.elapsedTime * speed + delay) % 2.4) / 2.4;
    ref.current.scale.setScalar(1.0 + t * 2.2);
    ref.current.material.opacity = (1 - t) * 0.45;
  });
  return (
    <mesh ref={ref} position={[0, 0, -0.1]}>
      <torusGeometry args={[1.0, 0.018, 16, 80]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} depthWrite={false} />
    </mesh>
  );
}

export default function WalkieTalkie({ mouseRef }) {
  const groupRef      = useRef();
  const antennaRef    = useRef();
  const signalGroupRef = useRef();
  const screenRef     = useRef();

  useFrame((state, delta) => {
    const mouse = mouseRef?.current;

    const hoverLerp = 1 - Math.pow(0.001, delta);
    const idleLerp  = 1 - Math.pow(0.05,  delta);

    if (mouse?.hovering) {
      const targetY = mouse.x * 0.6;
      const targetX = -mouse.y * 0.35;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * hoverLerp;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * hoverLerp;
      groupRef.current.rotation.z += (0        - groupRef.current.rotation.z) * hoverLerp;
    } else {
      const idleY = Math.sin(state.clock.elapsedTime * 0.5) * 0.25;
      const idleZ = Math.sin(state.clock.elapsedTime * 0.35) * 0.06;
      groupRef.current.rotation.y += (idleY - groupRef.current.rotation.y) * idleLerp;
      groupRef.current.rotation.x += (0     - groupRef.current.rotation.x) * idleLerp;
      groupRef.current.rotation.z += (idleZ - groupRef.current.rotation.z) * idleLerp;
    }


    // Antenna slight sway
    antennaRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.04;

    // Screen flicker
    const flicker = 0.6 + Math.sin(state.clock.elapsedTime * 4) * 0.15;
    screenRef.current.material.emissiveIntensity = flicker;
  });

  return (
    <group>

      {/* ── WALKIE BODY — tilts with mouse/idle ── */}
      <group ref={groupRef} scale={1.18} position={[0, -0.28, 0]}>

        {/* Main body — rounded dark metal */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.1, 2.6, 0.42]} />
          <meshPhysicalMaterial
            color="#0a1628"
            metalness={0.95}
            roughness={0.18}
            emissive="#0a2240"
            emissiveIntensity={0.2}
            clearcoat={0.5}
            clearcoatRoughness={0.2}
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

        {/* Antenna */}
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

          {/* Signal rings from antenna tip */}
          <group position={[0, 1.57, 0]} ref={signalGroupRef}>
            <SignalRing radius={0.28} delay={0.0} />
            <SignalRing radius={0.28} delay={0.7} />
            <SignalRing radius={0.28} delay={1.4} />
          </group>
        </group>

        {/* Screen */}
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

        {/* Speaker grille */}
        {[-0.56, -0.46, -0.36, -0.26, -0.16, -0.06].map((y, i) => (
          <SpeakerHole key={i} x={0} y={y} />
        ))}
        {/* Speaker grill border */}
        <mesh position={[0, -0.32, 0.215]}>
          <boxGeometry args={[0.44, 0.72, 0.01]} />
          <meshBasicMaterial color="#e6b215" transparent opacity={0.15} />
        </mesh>

        {/* PTT button */}
        <mesh position={[-0.63, 0.2, 0]}>
          <boxGeometry args={[0.1, 0.42, 0.3]} />
          <meshStandardMaterial color="#e6b215" metalness={0.8} roughness={0.2} emissive="#e6b215" emissiveIntensity={0.2} />
        </mesh>

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

        {/* LED indicators */}
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

      </group> {/* end walkie body */}

      {/* ── ATMOSPHERIC PULSES ── Rings that expand outward behind the walkie talkie ── */}
      <PulseRing delay={0.0} color="#4ade80" speed={1.0} />
      <PulseRing delay={0.8} color="#e6b215" speed={1.0} />
      <PulseRing delay={1.6} color="#22d3ee" speed={1.0} />

    </group>
  );
}
