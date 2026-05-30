import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function createShieldShape() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 2.0);
  shape.lineTo(1.5, 1.4);
  shape.lineTo(1.5, 0.2);
  shape.bezierCurveTo(1.5, -0.8, 0.8, -1.6, 0, -2.2);
  shape.bezierCurveTo(-0.8, -1.6, -1.5, -0.8, -1.5, 0.2);
  shape.lineTo(-1.5, 1.4);
  shape.lineTo(0, 2.0);
  return shape;
}

function createStarShape() {
  const star = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? 0.52 : 0.24;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) star.moveTo(x, y);
    else star.lineTo(x, y);
  }
  star.closePath();
  return new THREE.ShapeGeometry(star, 4);
}

function ShieldGlow() {
  const ref = useRef();
  useFrame((state) => {
    const pulse = Math.sin(state.clock.elapsedTime * 1.8) * 0.5 + 0.5;
    ref.current.material.opacity = 0.04 + pulse * 0.06;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[3.0, 32, 32]} />
      <meshBasicMaterial color="#e6b215" transparent opacity={0.05} side={THREE.BackSide} />
    </mesh>
  );
}

function ShieldInnerRune({ dir, color, opacity, radius }) {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.z += delta * dir * 0.4;
  });
  return (
    <group ref={ref} position={[0, -0.1, 0.22]}>
      <mesh>
        <torusGeometry args={[radius, 0.014, 16, 64]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </mesh>
    </group>
  );
}

export default function Shield() {
  const groupRef = useRef();
  const innerRef = useRef();

  const shieldGeo = useMemo(() => {
    const shape = createShieldShape();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.28,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.06,
      bevelSegments: 4,
    });
  }, []);

  const borderGeo = useMemo(() => {
    const shape = createShieldShape();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.14,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 4,
    });
  }, []);

  const starGeo = useMemo(() => createStarShape(), []);

  // Shield shape Y center: (2.0 + -2.2) / 2 = -0.1
  const centerY = -0.1;

  useFrame((state, delta) => {
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.35;
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    innerRef.current.rotation.z += delta * 0.3;
  });

  return (
    <group ref={groupRef} position={[0, centerY * -0.88, 0]} scale={0.88}>
      <ShieldGlow />

      {/* Gold border (behind) */}
      <mesh geometry={borderGeo} position={[0, 0, -0.05]}>
        <meshStandardMaterial
          color="#e6b215"
          metalness={1}
          roughness={0.1}
          emissive="#e6b215"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Main shield body */}
      <mesh geometry={shieldGeo} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#e6b215"
          metalness={0.95}
          roughness={0.12}
          emissive="#e6b215"
          emissiveIntensity={0.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Gold horizontal divider */}
      <mesh position={[0, 0.45, 0.22]}>
        <boxGeometry args={[2.6, 0.022, 0.01]} />
        <meshBasicMaterial color="#e6b215" transparent opacity={0.55} />
      </mesh>

      {/* Inner emblem group — rotates */}
      <group ref={innerRef} position={[0, -0.2, 0.25]}>
        {/* Gold star */}
        <mesh geometry={starGeo}>
          <meshStandardMaterial color="#e6b215" emissive="#e6b215" emissiveIntensity={0.8} />
        </mesh>
        {/* Green center orb */}
        <mesh>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={3} />
        </mesh>
      </group>

      {/* Inner concentric rings */}
      <ShieldInnerRune dir={1}  color="#e6b215" opacity={0.4} radius={0.72} />
      <ShieldInnerRune dir={-1} color="#4ade80" opacity={0.2} radius={0.95} />
    </group>
  );
}
