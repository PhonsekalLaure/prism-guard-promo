import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Decal } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Shield outline shape ─────────────────────────────────────────────────── */
function createShieldShape(scale = 1) {
  const s = new THREE.Shape();
  s.moveTo(0, 2.0 * scale);
  s.lineTo(1.5 * scale, 1.4 * scale);
  s.lineTo(1.5 * scale, 0.2 * scale);
  s.bezierCurveTo(1.5 * scale, -0.8 * scale, 0.8 * scale, -1.6 * scale, 0, -2.2 * scale);
  s.bezierCurveTo(-0.8 * scale, -1.6 * scale, -1.5 * scale, -0.8 * scale, -1.5 * scale, 0.2 * scale);
  s.lineTo(-1.5 * scale, 1.4 * scale);
  s.lineTo(0, 2.0 * scale);
  return s;
}

/* ─── Mini star geometry (for corner accents) ──────────────────────────────── */
function createMiniStarGeometry(outerR = 0.13, innerR = 0.06, points = 5) {
  const shape = new THREE.Shape();
  for (let i = 0; i < points * 2; i++) {
    const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    if (i === 0) shape.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    else shape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  shape.closePath();
  return new THREE.ShapeGeometry(shape, 4);
}


/* ─── Corner accent star sparks ────────────────────────────────────────────── */
const miniStarGeo = createMiniStarGeometry(0.13, 0.055, 5);

function CornerStar({ x, y, phaseOffset = 0 }) {
  const meshRef = useRef();
  useFrame((state) => {
    const t = Math.sin(state.clock.elapsedTime * 2.2 + phaseOffset) * 0.5 + 0.5;
    meshRef.current.material.opacity = 0.35 + t * 0.55;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.6 + phaseOffset;
  });
  return (
    <mesh ref={meshRef} geometry={miniStarGeo} position={[x, y, 0.35]}>
      <meshBasicMaterial color="#ffe066" transparent opacity={0.55} depthWrite={false} />
    </mesh>
  );
}

/* ─── Logo decal on shield face ─────────────────────────────────────────────── */
function ShieldLogo() {
  const texture = useTexture('/favicon.png');
  texture.colorSpace = THREE.SRGBColorSpace;
  
  return (
    <Decal
      position={[0, -0.05, 0.01]}
      rotation={[0, 0, 0]}
      scale={2.8}
      map={texture}
    />
  );
}

/* ─── Main shield component ─────────────────────────────────────────────────── */
export default function Shield({ mouseRef }) {
  const groupRef  = useRef();
  const coronaRef = useRef();

  /* Gold outer border geometry */
  const borderGeo = useMemo(() =>
    new THREE.ExtrudeGeometry(createShieldShape(1.12), {
      depth: 0.10,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.06,
      bevelSegments: 8,
    }), []);

  /* Main shield body */
  const shieldGeo = useMemo(() =>
    new THREE.ExtrudeGeometry(createShieldShape(1.0), {
      depth: 0.30,
      bevelEnabled: true,
      bevelThickness: 0.09,
      bevelSize: 0.08,
      bevelSegments: 8,
    }), []);

  /* Flat inner face plate */
  const facePlateGeo = useMemo(() =>
    new THREE.ExtrudeGeometry(createShieldShape(0.83), {
      depth: 0.01,
      bevelEnabled: false,
    }), []);

  /* Back-face corona */
  const coronaGeo = useMemo(() =>
    new THREE.ExtrudeGeometry(createShieldShape(1.18), {
      depth: 0.01,
      bevelEnabled: false,
    }), []);

  useFrame((state, delta) => {
    const mouse = mouseRef?.current;
    const hoverLerp = 1 - Math.pow(0.001, delta);
    const idleLerp  = 1 - Math.pow(0.05,  delta);

    if (mouse?.hovering) {
      groupRef.current.rotation.y += (mouse.x * 0.7  - groupRef.current.rotation.y) * hoverLerp;
      groupRef.current.rotation.x += (-mouse.y * 0.4 - groupRef.current.rotation.x) * hoverLerp;
      groupRef.current.rotation.z += (0              - groupRef.current.rotation.z) * hoverLerp;
    } else {
      const idleY = Math.sin(state.clock.elapsedTime * 0.5) * 0.38;
      groupRef.current.rotation.y += (idleY - groupRef.current.rotation.y) * idleLerp;
      groupRef.current.rotation.x += (0     - groupRef.current.rotation.x) * idleLerp;
      groupRef.current.rotation.z += (Math.sin(state.clock.elapsedTime * 0.3) * 0.05 - groupRef.current.rotation.z) * idleLerp;
    }

    /* Corona pulse */
    const p = Math.sin(state.clock.elapsedTime * 2.0) * 0.5 + 0.5;
    coronaRef.current.material.opacity = 0.18 + p * 0.22;


  });

  return (
    <group ref={groupRef} position={[0, 0.088, 0]} scale={0.88}>

      {/* ── 1. Back corona rim glow ── */}
      <mesh ref={coronaRef} geometry={coronaGeo} position={[0, 0, -0.18]}>
        <meshBasicMaterial
          color="#e6b215"
          transparent
          opacity={0.25}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* ── 2. Gold outer border ── */}
      <mesh geometry={borderGeo} position={[0, 0, -0.10]}>
        <meshPhysicalMaterial
          color="#b8800a"
          metalness={1}
          roughness={0.04}
          envMapIntensity={4}
          emissive="#e6a800"
          emissiveIntensity={0.6}
          clearcoat={1}
          clearcoatRoughness={0.04}
          reflectivity={1}
        />
      </mesh>

      {/* ── 3. Main shield body — deep navy ── */}
      <mesh geometry={shieldGeo} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#1a1f3a"
          metalness={0.85}
          roughness={0.18}
          envMapIntensity={3}
          emissive="#0a0e22"
          emissiveIntensity={1.0}
          clearcoat={1}
          clearcoatRoughness={0.06}
          reflectivity={1}
          iridescence={0.6}
          iridescenceIOR={1.8}
          sheen={0.8}
          sheenColor="#3a5aff"
          sheenRoughness={0.3}
        />
      </mesh>

      {/* ── 4. Dark navy face plate with Logo Decal ── */}
      <mesh geometry={facePlateGeo} position={[0, 0, 0.30]}>
        <meshPhysicalMaterial
          color="#0d1128"
          metalness={0.5}
          roughness={0.35}
          emissive="#101840"
          emissiveIntensity={0.8}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          transparent
          opacity={0.92}
        />
        {/* ── 5. PrismGuard logo decal projected onto the face plate ── */}
        <ShieldLogo />
      </mesh>

      {/* ── 6. Gold horizontal divider ── */}
      <mesh position={[0, 0.42, 0.34]}>
        <boxGeometry args={[2.2, 0.025, 0.01]} />
        <meshBasicMaterial color="#e6b215" transparent opacity={0.7} depthWrite={false} />
      </mesh>



      {/* ── 7. Pentagon corner star accents ── */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
        return (
          <CornerStar
            key={i}
            x={Math.cos(angle) * 1.18}
            y={Math.sin(angle) * 1.05}
            phaseOffset={i * 1.26}
          />
        );
      })}
    </group>
  );
}
