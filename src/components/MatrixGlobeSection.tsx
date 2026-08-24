import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLOBE_HUBS } from '../data/portfolioData';
import { GlobeHub, CursorState } from '../types';
import { sound } from '../utils/audio';
import { Globe, Radio, Signal, Wifi, Zap, X } from 'lucide-react';

interface MatrixGlobeProps {
  setCursorState: (state: CursorState) => void;
}

// Convert Lat/Lng to 3D Cartesian coordinates on sphere
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export const MatrixGlobeSection: React.FC<MatrixGlobeProps> = ({ setCursorState }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedHub, setSelectedHub] = useState<GlobeHub | null>(null);
  const [hoveredHub, setHoveredHub] = useState<GlobeHub | null>(null);
  const [activeTheme, setActiveTheme] = useState<'IDEAS' | 'CONNECTIONS' | 'TECH'>('IDEAS');

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Three.js Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 15, 110);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const globeRadius = 38;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Generate Matrix Dots on Sphere (Fibonacci Lattice)
    const dotCount = 2200;
    const dotGeo = new THREE.BufferGeometry();
    const dotPositions = new Float32Array(dotCount * 3);
    const dotColors = new Float32Array(dotCount * 3);
    const defaultColor = new THREE.Color(0x333333);
    const brightColor = new THREE.Color(0xf2f2f2);
    const orangeColor = new THREE.Color(0xff3b00);

    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < dotCount; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / dotCount);
      const x = globeRadius * Math.sin(phi) * Math.cos(theta);
      const y = globeRadius * Math.cos(phi);
      const z = globeRadius * Math.sin(phi) * Math.sin(theta);

      dotPositions[i * 3] = x;
      dotPositions[i * 3 + 1] = y;
      dotPositions[i * 3 + 2] = z;

      // Random highlighted dots
      const rand = Math.random();
      const c = rand > 0.96 ? orangeColor : rand > 0.85 ? brightColor : defaultColor;
      dotColors[i * 3] = c.r;
      dotColors[i * 3 + 1] = c.g;
      dotColors[i * 3 + 2] = c.b;
    }

    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    dotGeo.setAttribute('color', new THREE.BufferAttribute(dotColors, 3));

    const dotMat = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });
    const matrixPoints = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(matrixPoints);

    // 2. Wireframe Rings & Axis Lines
    const ringGeo = new THREE.RingGeometry(globeRadius * 0.99, globeRadius, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x222222, side: THREE.DoubleSide });
    const eqRing = new THREE.Mesh(ringGeo, ringMat);
    eqRing.rotation.x = Math.PI / 2;
    globeGroup.add(eqRing);

    // Outer orbital ring
    const orbitGeo = new THREE.RingGeometry(globeRadius * 1.35, globeRadius * 1.36, 96);
    const orbitMat = new THREE.MeshBasicMaterial({ color: 0xff3b00, side: THREE.DoubleSide, transparent: true, opacity: 0.35 });
    const orbitRing = new THREE.Mesh(orbitGeo, orbitMat);
    orbitRing.rotation.x = Math.PI / 3;
    globeGroup.add(orbitRing);

    // 3. Add Hub Nodes
    const hubMeshes: { mesh: THREE.Mesh; hub: GlobeHub; pos: THREE.Vector3 }[] = [];
    const hubMat = new THREE.MeshBasicMaterial({ color: 0xff3b00 });
    const hubGlowMat = new THREE.MeshBasicMaterial({ color: 0xff3b00, wireframe: true });

    GLOBE_HUBS.forEach((hub) => {
      const pos = latLngToVector3(hub.lat, hub.lng, globeRadius);
      const hubGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
      const mesh = new THREE.Mesh(hubGeo, hubMat);
      mesh.position.copy(pos);
      // Orient normal outwards
      mesh.lookAt(new THREE.Vector3(0, 0, 0));

      // Add radiating beacon
      const beaconGeo = new THREE.CylinderGeometry(0.2, 0.8, 6, 8);
      const beacon = new THREE.Mesh(beaconGeo, hubGlowMat);
      beacon.position.copy(pos.clone().multiplyScalar(1.05));
      beacon.quaternion.copy(mesh.quaternion);
      beacon.rotateX(Math.PI / 2);

      globeGroup.add(mesh);
      globeGroup.add(beacon);
      hubMeshes.push({ mesh, hub, pos });
    });

    // 4. Great Circle Connecting Lines
    const createCurvedArc = (v1: THREE.Vector3, v2: THREE.Vector3) => {
      const distance = v1.distanceTo(v2);
      const mid = v1.clone().add(v2).multiplyScalar(0.5);
      const midLength = mid.length();
      mid.normalize();
      mid.multiplyScalar(midLength + distance * 0.25);

      const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
      const points = curve.getPoints(32);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: 0xff3b00,
        transparent: true,
        opacity: 0.45,
      });
      return new THREE.Line(arcGeo, arcMat);
    };

    for (let h = 0; h < hubMeshes.length; h++) {
      const next = (h + 1) % hubMeshes.length;
      const arc = createCurvedArc(hubMeshes[h].pos, hubMeshes[next].pos);
      globeGroup.add(arc);
    }

    // 5. Drag & Rotate Physics
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0.003; // Constant slow auto-orbit

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      rotationVelocityY = deltaX * 0.005;
      rotationVelocityX = deltaY * 0.005;

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Raycaster for Hovering & Clicking Nodes
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const checkIntersection = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseVector.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVector.y = -((e.clientY - rect.top) / rect.height) * 2 - 1;

      raycaster.setFromCamera(mouseVector, camera);
      const targetMeshes = hubMeshes.map((hm) => hm.mesh);
      const intersects = raycaster.intersectObjects(targetMeshes);

      if (intersects.length > 0) {
        const hit = hubMeshes.find((hm) => hm.mesh === intersects[0].object);
        if (hit) {
          setHoveredHub(hit.hub);
          setCursorState('INTERACT');
        }
      } else {
        setHoveredHub(null);
        setCursorState('DRAG');
      }
    };

    const handleClickNode = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseVector.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVector.y = -((e.clientY - rect.top) / rect.height) * 2 - 1;

      raycaster.setFromCamera(mouseVector, camera);
      const targetMeshes = hubMeshes.map((hm) => hm.mesh);
      const intersects = raycaster.intersectObjects(targetMeshes);

      if (intersects.length > 0) {
        const hit = hubMeshes.find((hm) => hm.mesh === intersects[0].object);
        if (hit) {
          sound.playMatrixPing(Math.floor(Math.random() * 8));
          setSelectedHub(hit.hub);
        }
      }
    };

    container.addEventListener('mousemove', checkIntersection);
    container.addEventListener('click', handleClickNode);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Apply rotation physics with dampening
      globeGroup.rotation.y += rotationVelocityY;
      globeGroup.rotation.x += rotationVelocityX;

      if (!isDragging) {
        rotationVelocityY += (0.003 - rotationVelocityY) * 0.05;
        rotationVelocityX += (0 - rotationVelocityX) * 0.05;
      }

      orbitRing.rotation.z = elapsed * 0.2;

      // Pulse beacon meshes
      hubMeshes.forEach((hm, idx) => {
        const scale = 1 + Math.sin(elapsed * 4 + idx) * 0.25;
        hm.mesh.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
    };

    animate();

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
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', checkIntersection);
      container.removeEventListener('click', handleClickNode);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [setCursorState]);

  return (
    <section
      id="matrix-globe"
      className="relative w-full min-h-screen bg-[#050505] text-[#F2F2F2] border-b border-[#1F1F1F] py-20 px-6 md:px-12 flex flex-col justify-between overflow-hidden select-none"
      onMouseEnter={() => setCursorState('DRAG')}
      onMouseLeave={() => setCursorState('DEFAULT')}
    >
      {/* Top Swiss Header */}
      <div className="max-w-7xl mx-auto w-full z-10 flex flex-wrap items-center justify-between border-b border-[#1F1F1F] pb-4 gap-4">
        <div>
          <div className="font-silkscreen text-xs text-[#FF3B00] uppercase tracking-widest flex items-center space-x-2">
            <span className="w-2 h-2 bg-[#FF3B00] animate-ping" />
            <span>// SECTION 04: INTERACTIVE 3D MATRIX GLOBE</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-[#F2F2F2] mt-1">
            GLOBAL TELEMETRY &amp; NODES
          </h2>
        </div>

        {/* Pillar Switchers */}
        <div className="flex font-pixel text-xs border border-[#1F1F1F] p-1 bg-[#0D0D0D]">
          {(['IDEAS', 'CONNECTIONS', 'TECH'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                sound.playTick(1200);
                setActiveTheme(mode);
              }}
              onMouseEnter={() => {
                setCursorState('INTERACT');
                sound.playTick();
              }}
              onMouseLeave={() => setCursorState('DEFAULT')}
              className={`px-3 py-1.5 transition-colors ${
                activeTheme === mode
                  ? 'bg-[#FF3B00] text-black font-bold'
                  : 'text-[#888888] hover:text-[#F2F2F2]'
              }`}
            >
              {mode === 'IDEAS' && '01 // GLOBAL IDEAS'}
              {mode === 'CONNECTIONS' && '02 // DIGITAL CONNECTIONS'}
              {mode === 'TECH' && '03 // CREATIVE TECH'}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Canvas Stage */}
      <div className="relative w-full h-[65vh] min-h-[480px] my-6 flex items-center justify-center">
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Hovered Node Quick HUD Badge */}
        {hoveredHub && !selectedHub && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/90 border border-[#FF3B00] px-4 py-2 font-pixel text-xs text-[#F2F2F2] backdrop-blur-md flex items-center space-x-3 pointer-events-none shadow-[0_0_20px_rgba(255,59,0,0.3)]">
            <span className="w-2 h-2 bg-[#FF3B00] animate-pulse" />
            <span className="font-bold text-[#FF3B00]">{hoveredHub.name}</span>
            <span className="text-[#666666]">|</span>
            <span>{hoveredHub.country} ({hoveredHub.ping})</span>
            <span className="text-[#888888]">[ CLICK TO DECRYPT ]</span>
          </div>
        )}

        {/* Selected Node Detailed Inspector Modal / Card */}
        {selectedHub && (
          <div className="absolute top-6 right-6 md:right-12 z-30 max-w-md w-full bg-[#0D0D0D] border-2 border-[#FF3B00] p-6 font-pixel text-xs text-[#F2F2F2] shadow-[0_0_40px_rgba(0,0,0,0.9)] animate-fadeIn">
            <div className="flex justify-between items-start border-b border-[#1F1F1F] pb-3 mb-4">
              <div>
                <span className="text-[#FF3B00] text-[10px] uppercase tracking-widest">// NODE TRANSMISSION DECRYPTED</span>
                <h4 className="text-lg font-display font-black text-[#F2F2F2] mt-0.5">{selectedHub.name}</h4>
              </div>
              <button
                onClick={() => setSelectedHub(null)}
                className="p-1 border border-[#333] hover:border-[#FF3B00] text-[#888888] hover:text-[#FF3B00]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between border-b border-[#1A1A1A] pb-2">
                <span className="text-[#666666]">LOCATION:</span>
                <span className="text-[#F2F2F2] font-bold">{selectedHub.country}</span>
              </div>
              <div className="flex justify-between border-b border-[#1A1A1A] pb-2">
                <span className="text-[#666666]">COORDINATES:</span>
                <span className="text-[#FF3B00]">{selectedHub.lat.toFixed(4)}° N, {selectedHub.lng.toFixed(4)}° E</span>
              </div>
              <div className="flex justify-between border-b border-[#1A1A1A] pb-2">
                <span className="text-[#666666]">PACKET_STREAM:</span>
                <span className="text-[#CCCCCC]">{selectedHub.dataPacket}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">LATENCY:</span>
                <span className="text-[#FF3B00] font-bold">{selectedHub.ping} TO HOST</span>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playGlitch();
                setSelectedHub(null);
              }}
              className="mt-5 w-full bg-[#FF3B00] text-black font-bold py-2 text-center hover:bg-[#ff5522] transition-colors"
            >
              [ DISMISS TELEMETRY ]
            </button>
          </div>
        )}
      </div>

      {/* Bottom Status Ticker & Navigation */}
      <div className="max-w-7xl mx-auto w-full z-10 flex flex-wrap items-center justify-between border-t border-[#1F1F1F] pt-4 font-pixel text-xs text-[#666666] gap-2">
        <div className="flex items-center space-x-3">
          <span className="text-[#FF3B00] font-bold">DRAG TO ORBIT 360°</span>
          <span>// 2,200 FIBONACCI MATRIX DOTS</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-[#888888]">ACTIVE NODES: 8 HUBS</span>
          <span className="text-[#FF3B00]">PROTOCOL: ORBITAL GLSL 2.0</span>
        </div>
      </div>
    </section>
  );
};
