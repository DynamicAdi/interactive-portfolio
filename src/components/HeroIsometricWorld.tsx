import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../utils/audio';
import { CursorState } from '../types';
import { ChevronDown, Compass, Box, RefreshCw } from 'lucide-react';

interface HeroProps {
  setCursorState: (state: CursorState) => void;
}

// Letter voxel patterns (5x7 grid per letter for crisp architectural 3D voxel typography)
const FONT_5x7: Record<string, number[][]> = {
  S: [
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0]
  ],
  A: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1]
  ],
  M: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1]
  ],
  R: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1]
  ],
  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0]
  ],
  H: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1]
  ],
  P: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0]
  ],
  I: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1]
  ],
  L: [
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1]
  ]
};

export const HeroIsometricWorld: React.FC<HeroProps> = ({ setCursorState }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [cameraElevation, setCameraElevation] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    scene.fog = new THREE.FogExp2(0x050505, 0.008);

    // Isometric Camera setup (Orthographic or True Isometric Perspective)
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(45, aspect, 1, 2000);
    // Initial isometric vantage
    const initialCamPos = new THREE.Vector3(120, 140, 160);
    camera.position.copy(initialCamPos);
    camera.lookAt(0, 10, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x222222, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(150, 250, 120);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 600;
    dirLight.shadow.camera.left = -150;
    dirLight.shadow.camera.right = 150;
    dirLight.shadow.camera.top = 150;
    dirLight.shadow.camera.bottom = -150;
    scene.add(dirLight);

    // Accent Orangered Signal Light
    const orangePoint = new THREE.PointLight(0xff3b00, 3, 200, 1.2);
    orangePoint.position.set(0, 45, 0);
    scene.add(orangePoint);

    // Secondary Blue-White Rim Light
    const rimLight = new THREE.PointLight(0x4466aa, 1.5, 300, 2);
    rimLight.position.set(-100, 50, -100);
    scene.add(rimLight);

    // Ground Plane with Grid
    const floorSize = 400;
    const gridHelper = new THREE.GridHelper(floorSize, 40, 0xff3b00, 0x1f1f1f);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // Shadow catcher floor
    const floorGeo = new THREE.PlaneGeometry(floorSize, floorSize);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x070707,
      roughness: 0.85,
      metalness: 0.1,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.1;
    floor.receiveShadow = true;
    scene.add(floor);

    // Materials
    const voxelSize = 2.4;
    const voxelSpacing = 2.5;

    const samarthMaterial = new THREE.MeshStandardMaterial({
      color: 0xff3b00,
      roughness: 0.25,
      metalness: 0.35,
      emissive: 0xff3b00,
      emissiveIntensity: 0.08,
    });

    const patilMaterial = new THREE.MeshStandardMaterial({
      color: 0xf2f2f2,
      roughness: 0.3,
      metalness: 0.4,
    });

    const cubeGeo = new THREE.BoxGeometry(voxelSize, voxelSize * 1.8, voxelSize);

    // Group for all typography
    const typographyGroup = new THREE.Group();
    scene.add(typographyGroup);

    // Helper to generate a 3D word
    const create3DWord = (word: string, material: THREE.Material, zOffset: number, startX: number) => {
      const wordGroup = new THREE.Group();
      let currentX = startX;

      for (let w = 0; w < word.length; w++) {
        const char = word[w];
        const grid = FONT_5x7[char];
        if (!grid) {
          currentX += 4 * voxelSpacing;
          continue;
        }

        const letterGroup = new THREE.Group();
        for (let row = 0; row < 7; row++) {
          for (let col = 0; col < 5; col++) {
            if (grid[row][col] === 1) {
              const mesh = new THREE.Mesh(cubeGeo, material);
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              // Invert row so top is at top
              const y = (6 - row) * (voxelSize * 1.8) + (voxelSize * 0.9);
              const x = col * voxelSpacing;
              mesh.position.set(x, y, 0);
              letterGroup.add(mesh);
            }
          }
        }
        letterGroup.position.set(currentX, 0, zOffset);
        wordGroup.add(letterGroup);
        currentX += 6 * voxelSpacing;
      }
      return wordGroup;
    };

    // Calculate centering for SAMARTH and PATIL
    // "SAMARTH" has 7 letters -> ~ 7 * 6 * 2.5 = 105 width
    const samarthGroup = create3DWord('SAMARTH', samarthMaterial, -25, -55);
    // "PATIL" has 5 letters -> ~ 5 * 6 * 2.5 = 75 width
    const patilGroup = create3DWord('PATIL', patilMaterial, 20, -40);

    typographyGroup.add(samarthGroup);
    typographyGroup.add(patilGroup);

    // Add Architectural Cubes & Monoliths scattered on the grid
    const decoGroup = new THREE.Group();
    const decoMat = new THREE.MeshStandardMaterial({
      color: 0x181818,
      roughness: 0.4,
      metalness: 0.6,
    });
    const orangeDecoMat = new THREE.MeshStandardMaterial({
      color: 0xff3b00,
      roughness: 0.1,
      metalness: 0.8,
      emissive: 0xff3b00,
      emissiveIntensity: 0.4,
    });

    const decoCubes: THREE.Mesh[] = [];
    for (let i = 0; i < 35; i++) {
      const sx = (Math.random() - 0.5) * 260;
      const sz = (Math.random() - 0.5) * 260;
      // Skip center area
      if (Math.abs(sx) < 65 && Math.abs(sz) < 55) continue;

      const height = Math.random() * 25 + 4;
      const width = Math.random() > 0.8 ? 8 : 4;
      const geo = new THREE.BoxGeometry(width, height, width);
      const isBeacon = Math.random() > 0.85;
      const mesh = new THREE.Mesh(geo, isBeacon ? orangeDecoMat : decoMat);
      mesh.position.set(sx, height / 2, sz);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      decoGroup.add(mesh);
      decoCubes.push(mesh);
    }
    scene.add(decoGroup);

    // Floating pixel dust / particles
    const particleCount = 200;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount * 3; p += 3) {
      pPositions[p] = (Math.random() - 0.5) * 200;
      pPositions[p + 1] = Math.random() * 80 + 2;
      pPositions[p + 2] = (Math.random() - 0.5) * 200;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xff3b00,
      size: 1.8,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Interaction & Mouse tracking
    let targetCamX = initialCamPos.x;
    let targetCamY = initialCamPos.y;
    let targetCamZ = initialCamPos.z;
    let scrollProg = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      setMousePos({ x: normX, y: normY });

      // Subtle camera parallax
      targetCamX = initialCamPos.x + normX * 45;
      targetCamZ = initialCamPos.z + normY * 35;
    };

    const handleScroll = () => {
      const st = window.scrollY;
      const vh = window.innerHeight;
      scrollProg = Math.min(1.5, st / vh);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Scroll camera trajectory (dives through the 3D typography towards the next section)
      const scrollCamZ = initialCamPos.z - scrollProg * 140;
      const scrollCamY = initialCamPos.y - scrollProg * 60 + cameraElevation;
      const scrollCamX = initialCamPos.x - scrollProg * 50;

      camera.position.x += (targetCamX - (initialCamPos.x - scrollCamX) - camera.position.x) * 0.05;
      camera.position.y += (scrollCamY - camera.position.y) * 0.05;
      camera.position.z += (scrollCamZ - camera.position.z) * 0.05;

      const lookTarget = new THREE.Vector3(0, 10 - scrollProg * 15, -scrollProg * 40);
      camera.lookAt(lookTarget);

      // Subtle oscillation on lights & letters
      orangePoint.position.x = Math.sin(elapsed * 0.8) * 40;
      orangePoint.position.z = Math.cos(elapsed * 0.8) * 40;
      orangePoint.intensity = 2.5 + Math.sin(elapsed * 3) * 0.5;

      // Pulse floating cubes slightly
      decoCubes.forEach((cube, idx) => {
        if (idx % 4 === 0) {
          cube.position.y = (cube.geometry as THREE.BoxGeometry).parameters.height / 2 + Math.sin(elapsed * 2 + idx) * 1.5;
        }
      });

      // Float particles
      const posAttr = pGeo.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      for (let i = 1; i < arr.length; i += 3) {
        arr[i] += Math.sin(elapsed + i) * 0.03;
      }
      posAttr.needsUpdate = true;

      // Update wireframe state
      samarthMaterial.wireframe = wireframeMode;
      patilMaterial.wireframe = wireframeMode;
      decoMat.wireframe = wireframeMode;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [wireframeMode, cameraElevation]);

  const resetCamera = () => {
    sound.playGlitch();
    setCameraElevation(0);
  };

  const elevateCamera = () => {
    sound.playClick(1400);
    setCameraElevation((prev) => (prev >= 60 ? 0 : prev + 25));
  };

  const toggleWireframe = () => {
    sound.playTick(1100);
    setWireframeMode(!wireframeMode);
  };

  return (
    <section
      id="hero-3d"
      className="relative w-full h-[100vh] min-h-[700px] overflow-hidden bg-[#050505] flex items-center justify-center select-none"
      onMouseEnter={() => setCursorState('DRAG')}
      onMouseLeave={() => setCursorState('DEFAULT')}
    >
      {/* 3D Canvas Viewport */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Swiss Editorial Top & Corner Overlays */}
      <div className="absolute top-16 left-6 md:left-12 z-20 pointer-events-none">
        <div className="border-l-2 border-[#FF3B00] pl-3 py-1">
          <div className="font-silkscreen text-[11px] text-[#FF3B00] tracking-widest uppercase">
            // HERO CONCEPT 02: ISOMETRIC 3D GRID WORLD
          </div>
          <div className="pixel-mono text-[#888888] mt-0.5">
            EXTRUDED ARCHITECTURAL TYPOGRAPHY SYSTEM
          </div>
        </div>
      </div>

      {/* Manifesto Rotated Stamp Badge */}
      <div className="manifesto-stamp absolute top-48 left-6 md:left-10 z-20 pointer-events-none hidden md:block">
        <div className="pixel-mono text-[8px] mb-1 text-[#FF3B00]">MANIFESTO_V.02</div>
        <div className="text-xs md:text-sm font-bold italic tracking-tighter text-[#666666]/70 leading-tight">
          I DON'T JUST WRITE CODE.<br />
          I BUILD DIGITAL EXPERIENCES.
        </div>
      </div>

      {/* Top Right: Realtime Telemetry HUD & Current Focus */}
      <div className="absolute top-16 right-6 md:right-12 z-20 hidden md:block pointer-events-none font-pixel text-xs text-[#666666] text-right space-y-1.5">
        <div className="pixel-mono">COORDS: X[{mousePos.x.toFixed(2)}] Y[{mousePos.y.toFixed(2)}]</div>
        <div className="pixel-mono">VANTAGE: ISOMETRIC 45° ORTHO-PERSPECTIVE</div>
        <div className="pixel-mono text-[#FF3B00]">RENDER: THREE.JS GLSL INSTANCED</div>

        <div className="pt-3 w-56 ml-auto">
          <div className="pixel-mono mb-1 text-[#888]">CURRENT_FOCUS</div>
          <div className="text-[10px] text-[#666666] leading-tight font-pixel">
            EXPERIMENTAL INTERACTION DESIGN &amp; 3D WEB ARCHITECTURE. EXPLORING THE BOUNDARIES OF PIXEL-PERFECT CHAOS.
          </div>
        </div>
      </div>

      {/* Bottom-Left Stack of Pixel Box Tags */}
      <div className="absolute bottom-20 left-6 md:left-12 z-20 hidden md:flex flex-col gap-1.5 pointer-events-auto">
        <div className="pixel-box"><span className="text-[#F2F2F2]">THREE.JS</span></div>
        <div className="pixel-box"><span className="text-[#F2F2F2]">GSAP_SCROLL</span></div>
        <div className="pixel-box"><span className="text-[#F2F2F2]">REACT_FIBER</span></div>
      </div>

      {/* Matrix Globe Radar Simulation Widget */}
      <div className="matrix-globe-sim absolute right-6 md:right-16 bottom-20 z-20 hidden lg:flex w-40 h-40 border border-dashed border-[#555] rounded-full items-center justify-center pointer-events-none bg-[#050505]/40 backdrop-blur-xs">
        <div className="pixel-mono absolute -top-2.5 bg-[#050505] px-2 text-[#FF3B00] text-[9px]">DATA_SPHERE</div>
        <svg width="120" height="120" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="none" stroke="#444" strokeDasharray="2 4" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#FF3B00" strokeWidth="0.6" />
          <path d="M10 50 Q 50 10 90 50" stroke="#555" fill="none" opacity="0.6" />
          <path d="M10 50 Q 50 90 90 50" stroke="#555" fill="none" opacity="0.6" />
          <circle cx="30" cy="30" r="2" fill="#FF3B00" className="animate-ping" />
          <circle cx="70" cy="60" r="2" fill="#FF3B00" />
          <circle cx="50" cy="80" r="2" fill="#FF3B00" />
        </svg>
        <div className="absolute bottom-2 right-3 pixel-mono text-[8px] text-[#888]">SCANNING...</div>
      </div>

      {/* Interactive Control Deck (Sharp Swiss Border Buttons) */}
      <div className="absolute bottom-16 left-6 md:left-48 z-20 flex flex-wrap items-center gap-2">
        <button
          onClick={toggleWireframe}
          onMouseEnter={() => {
            setCursorState('INTERACT');
            sound.playTick();
          }}
          onMouseLeave={() => setCursorState('DEFAULT')}
          className={`px-2.5 py-1 pixel-mono text-[10px] border transition-colors ${
            wireframeMode
              ? 'border-[#FF3B00] bg-[#FF3B00] text-black font-bold'
              : 'border-[#1A1A1A] bg-[#0D0D0D]/90 text-[#F2F2F2] hover:border-[#FF3B00]'
          }`}
        >
          <span className="flex items-center space-x-1.5">
            <Box className="w-3 h-3 text-[#FF3B00]" />
            <span>[ {wireframeMode ? 'WIREFRAME: ON' : 'WIREFRAME: OFF'} ]</span>
          </span>
        </button>

        <button
          onClick={elevateCamera}
          onMouseEnter={() => {
            setCursorState('INTERACT');
            sound.playTick();
          }}
          onMouseLeave={() => setCursorState('DEFAULT')}
          className="px-2.5 py-1 pixel-mono text-[10px] border border-[#1A1A1A] bg-[#0D0D0D]/90 text-[#F2F2F2] hover:border-[#FF3B00] transition-colors"
        >
          <span className="flex items-center space-x-1.5">
            <Compass className="w-3 h-3 text-[#FF3B00]" />
            <span>[ ELEVATE +{cameraElevation}° ]</span>
          </span>
        </button>

        <button
          onClick={resetCamera}
          onMouseEnter={() => {
            setCursorState('INTERACT');
            sound.playTick();
          }}
          onMouseLeave={() => setCursorState('DEFAULT')}
          className="p-1 pixel-mono border border-[#1A1A1A] bg-[#0D0D0D]/90 text-[#888888] hover:text-[#FF3B00] hover:border-[#FF3B00] transition-colors"
          title="Reset Camera"
        >
          <RefreshCw className="w-3 h-3" />
        </button>
      </div>

      {/* Bottom Fixed-Style Swiss Technical Footer Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 border-t border-[#1A1A1A] flex items-center justify-between px-4 md:px-8 bg-[#050505]/95 backdrop-blur-md z-20">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <span className="status-dot"></span>
            <span className="pixel-mono text-[#AAAAAA]">INITIALIZING SYSTEM... 100% COMPLETE</span>
          </div>
          <div className="pixel-mono text-[#666666] hidden sm:inline-block">LATENCY: 12MS</div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="pixel-mono text-white border-b border-[#FF3B00] pb-0.5 tracking-wider font-bold">
            LET'S BUILD SOMETHING WEIRD
          </div>
          <div className="w-6 h-6 border border-[#555] flex items-center justify-center hover:border-[#FF3B00] transition-colors">
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H1M11 1V11" stroke="#FF3B00" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
