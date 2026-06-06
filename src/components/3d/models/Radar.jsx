import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SweepFan() {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = -state.clock.elapsedTime * 2.5;
  });

  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    const angle = Math.PI / 3;
    const r = 1.8;
    shape.absarc(0, 0, r, 0, angle, false);
    shape.lineTo(0, 0);
    return new THREE.ShapeGeometry(shape, 32);
  }, []);

  return (
    <group ref={ref} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
      <mesh geometry={geo}>
        <meshBasicMaterial
          color="#4ade80"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      <line>
        <bufferGeometry setFromPoints={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(1.8, 0, 0)]} />
        <lineBasicMaterial color="#4ade80" transparent opacity={0.8} />
      </line>
    </group>
  );
}

function PingDot({ position, delay }) {
  const ref = useRef();
  useFrame((state) => {
    const t = ((state.clock.elapsedTime + delay) % 2.5) / 2.5;
    ref.current.scale.setScalar(0.5 + t * 1.5);
    ref.current.material.opacity = (1 - t) * 0.9;
  });
  return (
    <mesh ref={ref} position={position}>
      <ringGeometry args={[0.04, 0.08, 16]} />
      <meshBasicMaterial color="#4ade80" transparent opacity={0.9} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function Radar({ mouseRef }) {
  const groupRef = useRef();
  const dishRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state, delta) => {
    const mouse = mouseRef?.current;
    const hoverLerp = 1 - Math.pow(0.001, delta);
    const idleLerp  = 1 - Math.pow(0.05,  delta);

    if (mouse?.hovering) {
      const targetY = mouse.x * 0.6;
      const targetX = -mouse.y * 0.4;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * hoverLerp;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * hoverLerp;
    } else {
      groupRef.current.rotation.y += (0 - groupRef.current.rotation.y) * idleLerp;
      groupRef.current.rotation.x += (0 - groupRef.current.rotation.x) * idleLerp;
      dishRef.current.rotation.x += (Math.sin(state.clock.elapsedTime * 0.5) * 0.05 - dishRef.current.rotation.x) * idleLerp;
    }

    ring1Ref.current.rotation.z += delta * 0.25;
    ring2Ref.current.rotation.z -= delta * 0.15;
  });

  return (
    <group ref={groupRef} scale={1.5}>
      <group ref={dishRef}>
        {/* Base plate */}
        <mesh position={[0, -0.06, 0]}>
          <cylinderGeometry args={[1.9, 1.9, 0.08, 64]} />
          <meshPhysicalMaterial color="#021226" metalness={0.8} roughness={0.3} emissive="#093269" emissiveIntensity={0.2} />
        </mesh>

        {/* Dark tinted dish surface */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.88, 1.88, 0.04, 64]} />
          <meshBasicMaterial color="#093269" transparent opacity={0.5} />
        </mesh>

        {/* Grid rings */}
        {[0.55, 1.0, 1.45, 1.85].map((r, i) => (
          <mesh key={i} position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[r, 0.008, 16, 96]} />
            <meshBasicMaterial color="#4ade80" transparent opacity={i === 3 ? 0.7 : 0.3} />
          </mesh>
        ))}

        {/* Grid cross lines */}
        {[0, Math.PI / 2, Math.PI / 4, (3 * Math.PI) / 4].map((angle, i) => {
          const pts = [
            new THREE.Vector3(Math.cos(angle) * 1.88, 0.05, Math.sin(angle) * 1.88),
            new THREE.Vector3(-Math.cos(angle) * 1.88, 0.05, -Math.sin(angle) * 1.88),
          ];
          return (
            <line key={i} geometry={new THREE.BufferGeometry().setFromPoints(pts)}>
              <lineBasicMaterial color="#4ade80" transparent opacity={0.2} />
            </line>
          );
        })}

        {/* Radar sweep fan */}
        <SweepFan />

        {/* Center pole & orb */}
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.6, 8]} />
          <meshStandardMaterial color="#e6b215" metalness={1} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.65, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={3} />
        </mesh>

        {/* Gold outer bevel rim */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.9, 0.055, 16, 96]} />
          <meshStandardMaterial color="#e6b215" metalness={1} roughness={0.1} emissive="#e6b215" emissiveIntensity={0.3} />
        </mesh>

        {/* Outer glow rings (orbiting) */}
        <group ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <torusGeometry args={[2.4, 0.012, 16, 128]} />
            <meshBasicMaterial color="#e6b215" transparent opacity={0.25} />
          </mesh>
        </group>
        <group ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <torusGeometry args={[2.7, 0.008, 16, 128]} />
            <meshBasicMaterial color="#4ade80" transparent opacity={0.15} />
          </mesh>
        </group>

        {/* Ping pulses */}
        {[
          [[0.8, 0.06, 0.6], 0.0],
          [[-0.5, 0.06, 1.1], 0.8],
          [[1.1, 0.06, -0.7], 1.5],
          [[-1.0, 0.06, -0.5], 2.1],
        ].map(([pos, delay], i) => (
          <PingDot key={i} position={pos} delay={delay} rotation={[Math.PI / 2, 0, 0]} />
        ))}
      </group>
    </group>
  );
}
