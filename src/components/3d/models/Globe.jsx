import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GlobeParticles({ count = 350 }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.55;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return pos;
  }, [count]);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  return (
    <points geometry={geo}>
      <pointsMaterial color="#e6b215" size={0.025} transparent opacity={0.9} />
    </points>
  );
}

function LatLines() {
  const lines = useMemo(() => {
    const result = [];
    const r = 1.52;
    // Latitude rings (horizontal)
    for (let i = 1; i <= 5; i++) {
      const phi = (i / 6) * Math.PI;
      const y = Math.cos(phi) * r;
      const rr = Math.sin(phi) * r;
      const pts = [];
      for (let j = 0; j <= 64; j++) {
        const t = (j / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(t) * rr, y, Math.sin(t) * rr));
      }
      result.push({ pts, color: '#e6b215', opacity: 0.12 });
    }
    // Longitude lines (vertical)
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const pts = [];
      for (let j = 0; j <= 64; j++) {
        const t = (j / 64) * Math.PI;
        pts.push(new THREE.Vector3(
          Math.cos(angle) * Math.sin(t) * r,
          Math.cos(t) * r,
          Math.sin(angle) * Math.sin(t) * r
        ));
      }
      result.push({ pts, color: '#e6b215', opacity: 0.1 });
    }
    return result;
  }, []);

  return (
    <>
      {lines.map(({ pts, color, opacity }, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        return (
          <line key={i} geometry={geo}>
            <lineBasicMaterial color={color} transparent opacity={opacity} />
          </line>
        );
      })}
    </>
  );
}

export default function Globe() {
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state, delta) => {
    // Globe rotates slowly around Y — clean, readable
    coreRef.current.rotation.y += delta * 0.1;

    // Each ring tilted on a fixed axis, rotates on its own plane
    ring1Ref.current.rotation.z += delta * 0.18;
    ring2Ref.current.rotation.x += delta * 0.22;
    ring3Ref.current.rotation.z -= delta * 0.12;
  });

  return (
    <group scale={1.3}>
      {/* Core globe */}
      <group ref={coreRef}>
        <mesh>
          <sphereGeometry args={[1.5, 48, 48]} />
          <meshPhysicalMaterial
            color="#021a38"
            metalness={0.3}
            roughness={0.7}
            emissive="#0a2a50"
            emissiveIntensity={0.25}
          />
        </mesh>
        <LatLines />
        <GlobeParticles count={350} />
        {/* Equator glow band */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.52, 0.012, 12, 128]} />
          <meshBasicMaterial color="#e6b215" transparent opacity={0.65} />
        </mesh>
      </group>

      {/* Orbiting rings — each on a fixed, pre-tilted axis */}
      <group rotation={[0.4, 0, 0]} ref={ring1Ref}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.0, 0.016, 12, 128]} />
          <meshStandardMaterial color="#e6b215" emissive="#e6b215" emissiveIntensity={0.4} metalness={1} roughness={0.1} />
        </mesh>
      </group>
      <group rotation={[0, 0, 0.7]} ref={ring2Ref}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.3, 0.009, 12, 128]} />
          <meshBasicMaterial color="#4ade80" transparent opacity={0.3} />
        </mesh>
      </group>
      <group rotation={[-0.3, 0, -0.5]} ref={ring3Ref}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.55, 0.007, 12, 128]} />
          <meshBasicMaterial color="#093269" transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Atmospheric haze */}
      <mesh>
        <sphereGeometry args={[1.65, 32, 32]} />
        <meshBasicMaterial color="#093269" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
