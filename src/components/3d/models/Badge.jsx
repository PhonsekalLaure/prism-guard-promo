import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function StarGeo() {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    const r = i % 2 === 0 ? 0.36 : 0.17;
    pts.push(new THREE.Vector2(Math.cos(a) * r, Math.sin(a) * r));
  }
  const shape = new THREE.Shape(pts);
  return new THREE.ShapeGeometry(shape);
}

function RotatingStar() {
  const ref = useRef();
  const geo = StarGeo();
  useFrame((_, delta) => { ref.current.rotation.z += delta * 0.45; });
  return (
    <mesh ref={ref} geometry={geo} position={[0, 0.48, 0.064]}>
      <meshStandardMaterial color="#e6b215" emissive="#e6b215" emissiveIntensity={0.9} />
    </mesh>
  );
}

export default function Badge() {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state, delta) => {
    // Gentle pendulum — badge being held/displayed
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.28;
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.38) * 0.04;
    // Rings on fixed tilted planes
    ring1Ref.current.rotation.z += delta * 0.4;
    ring2Ref.current.rotation.z -= delta * 0.25;
  });

  return (
    <group ref={groupRef} scale={1.1}>

      {/* Gold frame border */}
      <mesh>
        <boxGeometry args={[1.65, 2.38, 0.07]} />
        <meshStandardMaterial color="#e6b215" metalness={1} roughness={0.08} emissive="#e6b215" emissiveIntensity={0.18} />
      </mesh>

      {/* Dark body */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[1.5, 2.22, 0.1]} />
        <meshPhysicalMaterial color="#06162a" metalness={0.9} roughness={0.15} emissive="#0a2444" emissiveIntensity={0.35} />
      </mesh>

      {/* Top clip */}
      <mesh position={[0, 1.28, 0.04]}>
        <boxGeometry args={[0.46, 0.2, 0.15]} />
        <meshStandardMaterial color="#e6b215" metalness={1} roughness={0.1} />
      </mesh>

      {/* ── HOLOGRAPHIC PANEL ── */}
      <mesh position={[0, 0.42, 0.1]}>
        <planeGeometry args={[1.05, 0.78]} />
        <meshPhysicalMaterial
          color="#0a2a1a"
          transmission={0.6}
          transparent opacity={0.45}
          roughness={0.05}
          emissive="#4ade80"
          emissiveIntensity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Panel border */}
      <mesh position={[0, 0.42, 0.098]}>
        <boxGeometry args={[1.12, 0.86, 0.01]} />
        <meshBasicMaterial color="#4ade80" transparent opacity={0.3} />
        </mesh>

      {/* ── STAR ── */}
      <RotatingStar />

      {/* ── ID DATA BARS ── */}
      {[-0.36, -0.52, -0.66, -0.8].map((y, i) => (
        <mesh key={i} position={[0, y, 0.1]}>
          <planeGeometry args={[i === 0 ? 0.85 : 0.58, 0.028]} />
          <meshBasicMaterial color={i === 0 ? '#e6b215' : '#4ade80'} transparent opacity={i === 0 ? 0.85 : 0.35} />
        </mesh>
      ))}

      {/* PRAISE SECURITY text simulation (horizontal lines) */}
      {[-0.36, -0.48].map((y, i) => (
        <mesh key={`t${i}`} position={[0.02, y - 0.06, 0.101]}>
          <planeGeometry args={[0.5, 0.014]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
        </mesh>
      ))}

      {/* ── ORBITING RINGS ── */}
      <group rotation={[0.5, 0, 0]} ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[1.9, 0.016, 12, 128]} />
          <meshStandardMaterial color="#e6b215" emissive="#e6b215" emissiveIntensity={0.45} metalness={1} roughness={0.1} />
        </mesh>
      </group>
      <group rotation={[-0.3, 0, 0.6]} ref={ring2Ref}>
        <mesh>
          <torusGeometry args={[2.2, 0.009, 12, 128]} />
          <meshBasicMaterial color="#4ade80" transparent opacity={0.28} />
        </mesh>
      </group>
    </group>
  );
}
