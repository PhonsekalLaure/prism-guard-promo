import { useRef, useMemo } from 'react';
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
  useFrame((_, delta) => { ref.current.rotation.z += delta * 0.5; });
  return (
    <mesh ref={ref} geometry={geo} position={[0, 0.48, 0.064]}>
      <meshPhysicalMaterial
        color="#e6b215"
        metalness={1}
        roughness={0.05}
        emissive="#e6b215"
        emissiveIntensity={1.0}
        clearcoat={1}
        clearcoatRoughness={0.04}
        envMapIntensity={3}
      />
    </mesh>
  );
}

// Small orbiting star that flies around the badge
function OrbitingStar({ orbitRadius, orbitSpeed, orbitTilt, startAngle, sc = 0.12 }) {
  const ref = useRef();
  const angleRef = useRef(startAngle);

  const geo = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const a = (i * Math.PI) / 5 - Math.PI / 2;
      const r = i % 2 === 0 ? 1 : 0.46;
      pts.push(new THREE.Vector2(Math.cos(a) * r, Math.sin(a) * r));
    }
    return new THREE.ShapeGeometry(new THREE.Shape(pts));
  }, []);

  useFrame((_, delta) => {
    angleRef.current += delta * orbitSpeed;
    const x = Math.cos(angleRef.current) * orbitRadius;
    const z = Math.sin(angleRef.current) * orbitRadius;
    const y = Math.sin(angleRef.current + orbitTilt) * orbitRadius * 0.3;
    ref.current.position.set(x, y, z);
    ref.current.rotation.z += delta * 1.5;
  });

  return (
    <group ref={ref} scale={sc}>
      <mesh geometry={geo}>
        <meshPhysicalMaterial
          color="#e6b215"
          metalness={1}
          roughness={0.05}
          emissive="#e6b215"
          emissiveIntensity={0.9}
          clearcoat={1}
          clearcoatRoughness={0.04}
          envMapIntensity={3}
        />
      </mesh>
    </group>
  );
}

// Holographic scan line that sweeps up the badge face
function ScanLine() {
  const ref = useRef();
  useFrame((state) => {
    const t = ((state.clock.elapsedTime * 0.45) % 1);
    ref.current.position.y = -1.1 + t * 2.4;
    ref.current.material.opacity = 0.06 + Math.sin(t * Math.PI) * 0.1;
  });
  return (
    <mesh ref={ref} position={[0, 0, 0.12]}>
      <planeGeometry args={[1.55, 0.012]} />
      <meshBasicMaterial color="#4ade80" transparent opacity={0.08} />
    </mesh>
  );
}

export default function Badge({ mouseRef }) {
  const groupRef  = useRef(); // badge body — tilts with mouse
  const ring1Ref  = useRef(); // rings live OUTSIDE badge group
  const ring2Ref  = useRef();
  const ring3Ref  = useRef();
  const glowRef   = useRef();

  useFrame((state, delta) => {
    const mouse = mouseRef?.current;
    const hoverLerp = 1 - Math.pow(0.001, delta);
    const idleLerp  = 1 - Math.pow(0.05,  delta);

    if (mouse?.hovering) {
      const targetY = mouse.x * 0.7;
      const targetX = -mouse.y * 0.4;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * hoverLerp;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * hoverLerp;
      groupRef.current.rotation.z += (0        - groupRef.current.rotation.z) * hoverLerp;
    } else {
      const idleY = Math.sin(state.clock.elapsedTime * 0.55) * 0.28;
      const idleZ = Math.sin(state.clock.elapsedTime * 0.38) * 0.04;
      groupRef.current.rotation.y += (idleY - groupRef.current.rotation.y) * idleLerp;
      groupRef.current.rotation.x += (0     - groupRef.current.rotation.x) * idleLerp;
      groupRef.current.rotation.z += (idleZ - groupRef.current.rotation.z) * idleLerp;
    }

    // Globe-style ring spin — each on its own axis, matching Globe.jsx pattern
    ring1Ref.current.rotation.z += delta * 0.22;
    ring2Ref.current.rotation.x += delta * 0.28;
    ring3Ref.current.rotation.z -= delta * 0.16;

    // Atmospheric glow pulse
    const p = Math.sin(state.clock.elapsedTime * 1.6) * 0.5 + 0.5;
    glowRef.current.material.opacity = 0.03 + p * 0.05;
  });

  return (
    <group>

      {/* ── BADGE BODY — tilts with mouse/idle ── */}
      <group ref={groupRef} scale={1.1}>

        {/* Outer atmospheric glow */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[3.0, 32, 32]} />
          <meshBasicMaterial color="#e6b215" transparent opacity={0.04} side={THREE.BackSide} />
        </mesh>

        {/* Outer gold border — raised bevel */}
        <mesh position={[0, 0, -0.01]}>
          <boxGeometry args={[1.72, 2.46, 0.06]} />
          <meshPhysicalMaterial
            color="#c8950a"
            metalness={1}
            roughness={0.05}
            emissive="#e6b215"
            emissiveIntensity={0.15}
            clearcoat={1}
            clearcoatRoughness={0.04}
            envMapIntensity={4}
            reflectivity={1}
          />
        </mesh>

        {/* Inner gold frame */}
        <mesh>
          <boxGeometry args={[1.65, 2.38, 0.07]} />
          <meshPhysicalMaterial
            color="#e6b215"
            metalness={1}
            roughness={0.06}
            emissive="#e6b215"
            emissiveIntensity={0.2}
            clearcoat={1}
            clearcoatRoughness={0.05}
            envMapIntensity={3}
            reflectivity={1}
            iridescence={0.3}
            iridescenceIOR={1.4}
          />
        </mesh>

        {/* Dark body */}
        <mesh position={[0, 0, 0.04]}>
          <boxGeometry args={[1.5, 2.22, 0.1]} />
          <meshPhysicalMaterial
            color="#06162a"
            metalness={0.9}
            roughness={0.15}
            emissive="#0a2444"
            emissiveIntensity={0.4}
            clearcoat={0.3}
          />
        </mesh>

        {/* Top clip */}
        <mesh position={[0, 1.28, 0.04]}>
          <boxGeometry args={[0.46, 0.2, 0.15]} />
          <meshPhysicalMaterial
            color="#e6b215"
            metalness={1}
            roughness={0.08}
            clearcoat={1}
            clearcoatRoughness={0.05}
            envMapIntensity={3}
          />
        </mesh>

        {/* Gold top horizontal accent bar */}
        <mesh position={[0, 0.88, 0.11]}>
          <boxGeometry args={[1.38, 0.022, 0.005]} />
          <meshBasicMaterial color="#e6b215" transparent opacity={0.6} />
        </mesh>

        {/* Holographic panel */}
        <mesh position={[0, 0.42, 0.1]}>
          <planeGeometry args={[1.05, 0.78]} />
          <meshPhysicalMaterial
            color="#0a2a1a"
            transmission={0.65}
            transparent
            opacity={0.5}
            roughness={0.04}
            emissive="#4ade80"
            emissiveIntensity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Panel border */}
        <mesh position={[0, 0.42, 0.098]}>
          <boxGeometry args={[1.12, 0.86, 0.01]} />
          <meshBasicMaterial color="#4ade80" transparent opacity={0.35} />
        </mesh>
        {/* Panel inner scanlines */}
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[0, 0.08 + i * 0.1, 0.101]}>
            <planeGeometry args={[0.98, 0.006]} />
            <meshBasicMaterial color="#4ade80" transparent opacity={0.12} />
          </mesh>
        ))}

        {/* Holographic scan sweep */}
        <ScanLine />

        {/* Rotating star emblem */}
        <RotatingStar />

        {/* ID data bars */}
        {[-0.36, -0.52, -0.66, -0.8].map((y, i) => (
          <mesh key={i} position={[0, y, 0.1]}>
            <planeGeometry args={[i === 0 ? 0.85 : 0.58, 0.028]} />
            <meshBasicMaterial color={i === 0 ? '#e6b215' : '#4ade80'} transparent opacity={i === 0 ? 0.85 : 0.35} />
          </mesh>
        ))}

        {/* Text line simulations */}
        {[-0.36, -0.48].map((y, i) => (
          <mesh key={`t${i}`} position={[0.02, y - 0.06, 0.101]}>
            <planeGeometry args={[0.5, 0.014]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
          </mesh>
        ))}

        {/* Orbiting stars — fly around the badge */}
        <OrbitingStar orbitRadius={1.9} orbitSpeed={0.6}  orbitTilt={0.4}  startAngle={0}             sc={0.13} />
        <OrbitingStar orbitRadius={2.2} orbitSpeed={0.38} orbitTilt={-0.7} startAngle={Math.PI * 0.7} sc={0.1} />
        <OrbitingStar orbitRadius={1.7} orbitSpeed={0.82} orbitTilt={1.1}  startAngle={Math.PI * 1.3} sc={0.09} />
        <OrbitingStar orbitRadius={2.4} orbitSpeed={0.28} orbitTilt={0.3}  startAngle={Math.PI * 1.8} sc={0.11} />

      </group> {/* end badge body */}

      {/* ── ORBITING RINGS ── Globe-style: fixed tilt on parent, inner mesh
           rotation=[PI/2,0,0] stands the torus upright on its tilted plane.
           Each ring spins on a different axis so they orbit distinctly.    ── */}
      <group ref={ring1Ref} rotation={[0.5, 0, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.95, 0.018, 12, 128]} />
          <meshStandardMaterial color="#e6b215" emissive="#e6b215" emissiveIntensity={0.5} metalness={1} roughness={0.08} />
        </mesh>
      </group>

      <group ref={ring2Ref} rotation={[0, 0, 0.7]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.2, 0.01, 12, 128]} />
          <meshBasicMaterial color="#4ade80" transparent opacity={0.3} />
        </mesh>
      </group>

      <group ref={ring3Ref} rotation={[-0.3, 0, -0.5]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.55, 0.007, 12, 128]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.35} />
        </mesh>
      </group>

    </group>
  );
}
