import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Preload } from '@react-three/drei';
import Shield from './models/Shield';
import Globe from './models/Globe';
import Prism from './models/Prism';
import WalkieTalkie from './models/WalkieTalkie';
import Badge from './models/Badge';
import { Suspense } from 'react';
import * as THREE from 'three';

const modelMap = {
  shield: Shield,
  globe: Globe,
  prism: Prism,
  walkie: WalkieTalkie,
  badge: Badge,
};

export default function Scene3D({ objectType }) {
  const Model = modelMap[objectType] || Prism;

  // Walkie talkie needs different camera angle
  const isWalkie = objectType === 'walkie';
  const cameraPos = isWalkie ? [0, 0.5, 7.5] : [0, 0, 6];

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: cameraPos, fov: 48 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,
        }}
        style={{ background: 'transparent' }}
      >
        {/* Rich lighting palette matching gold/navy/green */}
        <ambientLight intensity={0.35} />
        <directionalLight position={[8, 10, 6]} intensity={2.2} color="#ffffff" />
        <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#4ade80" />
        <pointLight position={[0, 4, 3]} intensity={1.8} color="#e6b215" />
        <pointLight position={[0, -4, -2]} intensity={0.6} color="#093269" />
        <spotLight position={[4, 8, 4]} angle={0.35} penumbra={1} intensity={2.5} color="#e6b215" />

        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
            <Model />
          </Float>
          <Preload all />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2 + 0.25}
          minPolarAngle={Math.PI / 2 - 0.25}
        />
      </Canvas>
    </div>
  );
}
