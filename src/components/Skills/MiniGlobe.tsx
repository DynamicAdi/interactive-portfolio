import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface GlobeHub {
  name: string;
  lat: number;
  lng: number;
}

interface MiniMatrixGlobeProps {
  /** Points rendered on the globe surface, connected by arcs. */
  hubs?: GlobeHub[];
  className?: string;
}

const DEFAULT_HUBS: GlobeHub[] = [
  { name: 'San Francisco', lat: 37.7749, lng: -122.4194 },
  { name: 'New York', lat: 40.7128, lng: -74.006 },
  { name: 'London', lat: 51.5072, lng: -0.1276 },
  { name: 'Berlin', lat: 52.52, lng: 13.405 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
  { name: 'Mumbai', lat: 19.076, lng: 72.8777 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
];

const FOV_DEG = 45;
const FOV_RAD = (FOV_DEG * Math.PI) / 180;
// How much empty space to leave around the globe inside its own canvas.
// 1.0 = touches the edges exactly. 1.15 = 15% breathing room.
const FIT_MARGIN = 1.15;

// Convert Lat/Lng to 3D Cartesian coordinates on sphere
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

/**
 * Given the canvas's own aspect ratio and the outermost radius of anything
 * we draw (sphere + orbit ring), returns the camera distance that fits it
 * fully in frame — whether the canvas is wide, tall, square, huge, or tiny.
 * This is what stops the globe from ever getting clipped by its container.
 */
function fitCameraDistance(aspect: number, outerRadius: number): number {
  const fitRadius = outerRadius * FIT_MARGIN;
  const verticalHalfNeeded = fitRadius * Math.max(1, 1 / aspect);
  return verticalHalfNeeded / Math.tan(FOV_RAD / 2);
}

/**
 * Self-contained interactive globe: fibonacci dot sphere, wireframe rings,
 * pulsing hub beacons, great-circle connecting arcs, drag-to-rotate physics,
 * gentle auto-orbit. No header, no HUD, no modal, no ticker — just the globe.
 *
 * IMPORTANT: this component always renders the FULL globe, uncropped, no
 * matter what size/shape box you put it in (that's what fitCameraDistance
 * is for). If you want a deliberate "bleeding off the edge" look, do that
 * with CSS on the *wrapper* (oversize it and clip with overflow:hidden) —
 * don't fight the camera for it. See SkillsGlobePage.tsx for that pattern.
 */
export const MiniMatrixGlobe: React.FC<MiniMatrixGlobeProps> = ({
  hubs = DEFAULT_HUBS,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 1;
    const height = container.clientHeight || 1;

    const globeRadius = 34;
    const outerRadius = globeRadius * 1.36; // accounts for the outer orbit ring

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV_DEG, width / height, 0.1, 2000);

    const applyFraming = (w: number, h: number) => {
      const aspect = w / h;
      camera.aspect = aspect;
      const dist = fitCameraDistance(aspect, outerRadius);
      camera.position.set(0, dist * 0.09, dist);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };
    applyFraming(width, height);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Fibonacci dot lattice
    const dotCount = 2200;
    const dotGeo = new THREE.BufferGeometry();
    const dotPositions = new Float32Array(dotCount * 3);
    const dotColors = new Float32Array(dotCount * 3);
    const defaultColor = new THREE.Color(0x333333);
    const brightColor = new THREE.Color(0xf2f2f2);
    const orangeColor = new THREE.Color(0xff4500);

    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < dotCount; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / dotCount);
      const x = globeRadius * Math.sin(phi) * Math.cos(theta);
      const y = globeRadius * Math.cos(phi);
      const z = globeRadius * Math.sin(phi) * Math.sin(theta);

      dotPositions[i * 3] = x;
      dotPositions[i * 3 + 1] = y;
      dotPositions[i * 3 + 2] = z;

      const rand = Math.random();
      const c = rand > 0.96 ? orangeColor : rand > 0.85 ? brightColor : defaultColor;
      dotColors[i * 3] = c.r;
      dotColors[i * 3 + 1] = c.g;
      dotColors[i * 3 + 2] = c.b;
    }

    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    dotGeo.setAttribute('color', new THREE.BufferAttribute(dotColors, 3));

    const dotMat = new THREE.PointsMaterial({
      size: 1.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });
    globeGroup.add(new THREE.Points(dotGeo, dotMat));

    // 2. Wireframe rings
    const ringGeo = new THREE.RingGeometry(globeRadius * 0.99, globeRadius, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x222222, side: THREE.DoubleSide });
    const eqRing = new THREE.Mesh(ringGeo, ringMat);
    eqRing.rotation.x = Math.PI / 2;
    globeGroup.add(eqRing);

    const orbitGeo = new THREE.RingGeometry(globeRadius * 1.35, globeRadius * 1.36, 96);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0xff4500,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const orbitRing = new THREE.Mesh(orbitGeo, orbitMat);
    orbitRing.rotation.x = Math.PI / 3;
    globeGroup.add(orbitRing);

    // 3. Hub nodes + beacons
    const hubMeshes: { mesh: THREE.Mesh; pos: THREE.Vector3 }[] = [];
    const hubMat = new THREE.MeshBasicMaterial({ color: 0xff4500 });
    const hubGlowMat = new THREE.MeshBasicMaterial({ color: 0xff4500, wireframe: true });

    hubs.forEach((hub) => {
      const pos = latLngToVector3(hub.lat, hub.lng, globeRadius);
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 1.4), hubMat);
      mesh.position.copy(pos);
      mesh.lookAt(new THREE.Vector3(0, 0, 0));

      const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.7, 5.5, 8), hubGlowMat);
      beacon.position.copy(pos.clone().multiplyScalar(1.05));
      beacon.quaternion.copy(mesh.quaternion);
      beacon.rotateX(Math.PI / 2);

      globeGroup.add(mesh, beacon);
      hubMeshes.push({ mesh, pos });
    });

    // 4. Great-circle connecting arcs
    const createArc = (v1: THREE.Vector3, v2: THREE.Vector3) => {
      const distance = v1.distanceTo(v2);
      const mid = v1.clone().add(v2).multiplyScalar(0.5);
      const midLength = mid.length();
      mid.normalize().multiplyScalar(midLength + distance * 0.25);
      const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
      const points = curve.getPoints(32);
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({ color: 0xff4500, transparent: true, opacity: 0.4 });
      return new THREE.Line(geo, mat);
    };

    for (let h = 0; h < hubMeshes.length; h++) {
      const next = (h + 1) % hubMeshes.length;
      globeGroup.add(createArc(hubMeshes[h].pos, hubMeshes[next].pos));
    }

    // 5. Drag-to-rotate physics + gentle auto-orbit
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let velY = 0.0025;
    let velX = 0;

    const onDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onMove = (e: PointerEvent) => {
      if (!isDragging) return;
      velY = (e.clientX - prevX) * 0.005;
      velX = (e.clientY - prevY) * 0.005;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onUp = () => {
      isDragging = false;
    };

    container.style.touchAction = 'none';
    container.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      globeGroup.rotation.y += velY;
      globeGroup.rotation.x += velX;

      if (!isDragging) {
        velY += (0.0025 - velY) * 0.05;
        velX += (0 - velX) * 0.05;
      }

      orbitRing.rotation.z = elapsed * 0.2;

      hubMeshes.forEach((hm, idx) => {
        const s = 1 + Math.sin(elapsed * 4 + idx) * 0.25;
        hm.mesh.scale.set(s, s, s);
      });

      renderer.render(scene, camera);
    };
    animate();

    // Watches the container's own box (not just window resize) so the
    // globe reframes correctly even when its size changes because of a
    // CSS/layout change rather than the browser window resizing.
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const nw = entry.contentRect.width || 1;
      const nh = entry.contentRect.height || 1;
      applyFraming(nw, nh);
      renderer.setSize(nw, nh);
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      container.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      cancelAnimationFrame(animId);
      renderer.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [hubs]);

  return <div ref={containerRef} className={`cursor-grab active:cursor-grabbing ${className}`} />;
};