import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Preload } from '@react-three/drei';
import Shield from './models/Shield';
import Globe from './models/Globe';
import Prism from './models/Prism';
import WalkieTalkie from './models/WalkieTalkie';
import Badge from './models/Badge';
import Recruit from './models/Recruit';
import Radar from './models/Radar';
import { Suspense, useRef, useCallback } from 'react';
import * as THREE from 'three';

const modelMap = {
  shield: Shield,
  globe: Globe,
  prism: Prism,
  walkie: WalkieTalkie,
  badge: Badge,
  recruit: Recruit,
  radar: Radar,
};

// Inner component: reads mouseRef directly (a stable ref, safe across renders)
function SceneContent({ Model, mouseRef }) {
  const { camera } = useThree();
  const basePos = useRef(camera.position.clone());
  const currentX = useRef(camera.position.x);
  const currentY = useRef(camera.position.y);

  useFrame((_, delta) => {
    const mouse = mouseRef.current;
    // Use exponential decay for frame-rate independent smoothing
    const lerpFactor = 1 - Math.pow(0.01, delta);
    const targetX = mouse.hovering ? basePos.current.x + mouse.x * 0.35 : basePos.current.x;
    const targetY = mouse.hovering ? basePos.current.y + mouse.y * 0.25 : basePos.current.y;
    currentX.current += (targetX - currentX.current) * lerpFactor;
    currentY.current += (targetY - currentY.current) * lerpFactor;
    camera.position.x = currentX.current;
    camera.position.y = currentY.current;
    camera.lookAt(0, 0, 0);
  });

  return (
    // rotationIntensity=0 — Float's random rotation fought with manual lerp causing jitter
    // Only keep the gentle vertical float bob (floatIntensity)
    <Float speed={1.2} rotationIntensity={0} floatIntensity={0.3}>
      <Model mouseRef={mouseRef} />
    </Float>
  );
}

export default function Scene3D({ objectType }) {
  const Model = modelMap[objectType] || Prism;
  const mouseRef = useRef({ x: 0, y: 0, hovering: false });
  const containerRef = useRef(null);

  // Walkie talkie: lower camera to show the full body
  const isWalkie = objectType === 'walkie';
  const cameraPos = isWalkie ? [0, -0.2, 6.6] : [0, 0, 6];

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseRef.current.x = (e.clientX - cx) / (rect.width / 2);
    mouseRef.current.y = -(e.clientY - cy) / (rect.height / 2);
    mouseRef.current.hovering = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.hovering = false;
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        pointerEvents: 'auto',
        cursor: 'default',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas
        camera={{ position: cameraPos, fov: 48 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.4,
        }}
        style={{ background: 'transparent' }}
      >
        {/* Rich lighting palette — gold/navy/green + extra fill for reflections */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[8, 10, 6]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-5, -3, -5]} intensity={0.6} color="#4ade80" />
        <pointLight position={[0, 4, 3]} intensity={2.0} color="#e6b215" />
        <pointLight position={[0, -4, -2]} intensity={0.7} color="#093269" />
        <spotLight position={[4, 8, 4]} angle={0.35} penumbra={1} intensity={3.0} color="#e6b215" />
        <pointLight position={[6, 2, 2]} intensity={1.2} color="#fff8e0" />
        <pointLight position={[-6, 1, 3]} intensity={0.8} color="#e0f0ff" />

        <Suspense fallback={null}>
          <SceneContent Model={Model} mouseRef={mouseRef} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
