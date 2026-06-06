import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const EDGES = [
  [[0,1.5,0],[1.2,0,0]], [[0,1.5,0],[-1.2,0,0]],
  [[0,1.5,0],[0,0,1.2]], [[0,1.5,0],[0,0,-1.2]],
  [[0,-1.5,0],[1.2,0,0]], [[0,-1.5,0],[-1.2,0,0]],
  [[0,-1.5,0],[0,0,1.2]], [[0,-1.5,0],[0,0,-1.2]],
  [[1.2,0,0],[0,0,1.2]], [[0,0,1.2],[-1.2,0,0]],
  [[-1.2,0,0],[0,0,-1.2]], [[0,0,-1.2],[1.2,0,0]],
];

function GlowEdge({ start, end }) {
  const pts = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  return (
    <line geometry={geo}>
      <lineBasicMaterial color="#e6b215" transparent opacity={0.55} />
    </line>
  );
}

function FloatCrystal({ pos, sc, speeds }) {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.x += delta * speeds[0];
    ref.current.rotation.y += delta * speeds[1];
    ref.current.position.y = pos[1] + Math.sin(state.clock.elapsedTime * speeds[2] + speeds[3]) * 0.12;
  });
  return (
    <mesh ref={ref} position={[...pos]} scale={sc}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshPhysicalMaterial
        color="#e6b215"
        metalness={1}
        roughness={0.06}
        transmission={0.15}
        emissive="#e6b215"
        emissiveIntensity={0.2}
        clearcoat={1}
        clearcoatRoughness={0.05}
        envMapIntensity={3}
      />
    </mesh>
  );
}

export default function Prism({ mouseRef }) {
  const groupRef = useRef();
  const coreRef = useRef();
  const wireRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state, delta) => {
    const mouse = mouseRef?.current;

    const hoverLerp = 1 - Math.pow(0.001, delta);
    const idleLerp  = 1 - Math.pow(0.05,  delta);

    if (mouse?.hovering) {
      const targetY = mouse.x * 0.9;
      const targetX = -mouse.y * 0.6;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * hoverLerp;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * hoverLerp;
    } else {
      groupRef.current.rotation.y += delta * 0.22;
      groupRef.current.rotation.x += (Math.sin(state.clock.elapsedTime * 0.3) * 0.12 - groupRef.current.rotation.x) * idleLerp;
    }

    // Wireframe counter-rotates on its own
    wireRef.current.rotation.y -= delta * 0.12;
    wireRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;

    // Core inner gentle bob
    coreRef.current.rotation.y += delta * 0.15;

    // Rings spin on their own planes
    ring1Ref.current.rotation.z += delta * 0.3;
    ring2Ref.current.rotation.x += delta * 0.18;
  });

  return (
    <group ref={groupRef} scale={1.3}>
      {/* Core octahedron */}
      <group ref={coreRef}>
        <mesh>
          <octahedronGeometry args={[1.4, 0]} />
          <meshPhysicalMaterial
            color="#021226"
            metalness={0.95}
            roughness={0.04}
            transmission={0.55}
            thickness={2.5}
            envMapIntensity={2}
            emissive="#0a2444"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* Wireframe + edges */}
      <group ref={wireRef}>
        {EDGES.map(([s, e], i) => <GlowEdge key={i} start={s} end={e} />)}
        <mesh>
          <octahedronGeometry args={[1.42, 0]} />
          <meshBasicMaterial color="#e6b215" wireframe transparent opacity={0.12} />
        </mesh>
      </group>

      {/* Orbiting rings on fixed tilted planes */}
      <group rotation={[Math.PI / 2, 0, 0]} ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[2.0, 0.018, 12, 128]} />
          <meshStandardMaterial color="#e6b215" emissive="#e6b215" emissiveIntensity={0.55} metalness={1} roughness={0.1} />
        </mesh>
      </group>
      <group rotation={[0.6, 0, 0.5]} ref={ring2Ref}>
        <mesh>
          <torusGeometry args={[2.35, 0.01, 12, 128]} />
          <meshBasicMaterial color="#4ade80" transparent opacity={0.28} />
        </mesh>
      </group>

      {/* Orbiting mini crystals */}
      <FloatCrystal pos={[2.1, 0.4, 0.2]} sc={0.42} speeds={[0.4, 0.5, 0.7, 0]} />
      <FloatCrystal pos={[-1.9, -0.3, 0.6]} sc={0.3} speeds={[0.5, 0.3, 1.0, 1.5]} />
      <FloatCrystal pos={[0.3, 2.0, -0.8]} sc={0.25} speeds={[0.3, 0.7, 0.8, 3.0]} />

      {/* Gold center core — no green dot */}
      <mesh>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshPhysicalMaterial
          color="#e6b215"
          metalness={1}
          roughness={0.0}
          emissive="#e6b215"
          emissiveIntensity={3}
          clearcoat={1}
        />
      </mesh>
    </group>
  );
}
