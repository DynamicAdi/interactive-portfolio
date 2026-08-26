import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CursorState } from '../types';

// Letter voxel patterns (5x7 grid per letter for crisp architectural 3D voxel typography)
const FONT_5x7: Record<string, number[][]> = {
  S: [
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],

  A: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],

  M: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],

  R: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],

  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],

  H: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],

  P: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
  ],

  I: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
  ],

  L: [
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
};

interface HeroProps {
  setCursorState: (state: CursorState) => void;
}

export const HeroIsometricWorld: React.FC<HeroProps> = ({
  setCursorState,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const getFog = () => {
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        return new THREE.FogExp2(0x050505, 0.0030);
      }

        return new THREE.FogExp2(0x050505, 0.0055);
    }

    const getCameraPosition = () => {
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        return new THREE.Vector3(0, 165, 280);
      }

      return new THREE.Vector3(0, 120, 140);
    };

    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x050505);
    scene.fog = getFog()

    // Camera
    const aspect = width / height;

    const camera = new THREE.PerspectiveCamera(
      45,
      aspect,
      1,
      2000
    );

    let initialCamPos = getCameraPosition();

    camera.position.copy(initialCamPos);
    camera.lookAt(0, 10, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });

    renderer.setSize(width, height);

    // Slightly lower pixel ratio on mobile for better performance
    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        window.innerWidth < 768 ? 1.5 : 2
      )
    );

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(
      0x222222,
      1.5
    );

    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(
      0xffffff,
      2.5
    );

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

    // Accent orange signal light
    const orangePoint = new THREE.PointLight(
      0xff3b00,
      3,
      200,
      1.2
    );

    orangePoint.position.set(0, 45, 0);

    scene.add(orangePoint);

    // Secondary blue-white rim light
    const rimLight = new THREE.PointLight(
      0x4466aa,
      1.5,
      300,
      2
    );

    rimLight.position.set(-100, 50, -100);

    scene.add(rimLight);

    // Ground Plane with Grid
    const floorSize = 400;

    const gridHelper = new THREE.GridHelper(
      floorSize,
      40,
      0xff3b00,
      0x1f1f1f
    );

    gridHelper.position.y = 0;

    scene.add(gridHelper);

    // Shadow catcher floor
    const floorGeo = new THREE.PlaneGeometry(
      floorSize,
      floorSize
    );

    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x070707,
      roughness: 0.85,
      metalness: 0.1,
    });

    const floor = new THREE.Mesh(
      floorGeo,
      floorMat
    );

    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.1;

    floor.receiveShadow = true;

    scene.add(floor);

    // Typography materials
    const voxelSize = 2.4;
    const voxelSpacing = 2.5;

    const samarthMaterial =
      new THREE.MeshStandardMaterial({
        color: 0xff3b00,
        roughness: 0.25,
        metalness: 0.35,
        emissive: 0xff3b00,
        emissiveIntensity: 0.08,
      });

    const patilMaterial =
      new THREE.MeshStandardMaterial({
        color: 0xf2f2f2,
        roughness: 0.3,
        metalness: 0.4,
      });

    const cubeGeo = new THREE.BoxGeometry(
      voxelSize,
      voxelSize * 1.8,
      voxelSize
    );

    // Typography group
    const typographyGroup = new THREE.Group();

    scene.add(typographyGroup);

    // Create a 3D voxel word
    const create3DWord = (
      word: string,
      material: THREE.Material,
      zOffset: number,
      startX: number
    ) => {
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
              const mesh = new THREE.Mesh(
                cubeGeo,
                material
              );

              mesh.castShadow = true;
              mesh.receiveShadow = true;

              const y =
                (6 - row) * (voxelSize * 1.8) +
                voxelSize * 0.9;

              const x = col * voxelSpacing;

              mesh.position.set(x, y, 0);

              letterGroup.add(mesh);
            }
          }
        }

        letterGroup.position.set(
          currentX,
          0,
          zOffset
        );

        wordGroup.add(letterGroup);

        currentX += 6 * voxelSpacing;
      }

      return wordGroup;
    };

    // Create typography
    const samarthGroup = create3DWord(
      'SAMARTH',
      samarthMaterial,
      -20,
      -50
    );

    const patilGroup = create3DWord(
      'PATIL',
      patilMaterial,
      25,
      -30
    );

    typographyGroup.add(samarthGroup);
    typographyGroup.add(patilGroup);

    // Decorative architectural cubes
    const decoGroup = new THREE.Group();

    const decoMat = new THREE.MeshStandardMaterial({
      color: 0x181818,
      roughness: 0.4,
      metalness: 0.6,
    });

    const orangeDecoMat =
      new THREE.MeshStandardMaterial({
        color: 0xff3b00,
        roughness: 0.1,
        metalness: 0.8,
        emissive: 0xff3b00,
        emissiveIntensity: 0.4,
      });

    const decoCubes: THREE.Mesh[] = [];

    for (let i = 0; i < 35; i++) {
      const sx =
        (Math.random() - 0.5) * 260;

      const sz =
        (Math.random() - 0.5) * 260;

      // Skip the central typography area
      if (
        Math.abs(sx) < 65 &&
        Math.abs(sz) < 55
      ) {
        continue;
      }

      const cubeHeight =
        Math.random() * 25 + 4;

      const cubeWidth =
        Math.random() > 0.8 ? 8 : 4;

      const geo = new THREE.BoxGeometry(
        cubeWidth,
        cubeHeight,
        cubeWidth
      );

      const isBeacon =
        Math.random() > 0.85;

      const mesh = new THREE.Mesh(
        geo,
        isBeacon
          ? orangeDecoMat
          : decoMat
      );

      mesh.position.set(
        sx,
        cubeHeight / 2,
        sz
      );

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      decoGroup.add(mesh);
      decoCubes.push(mesh);
    }

    scene.add(decoGroup);

    // Floating particles
    const particleCount =
      window.innerWidth < 768 ? 100 : 200;

    const pGeo = new THREE.BufferGeometry();

    const pPositions = new Float32Array(
      particleCount * 3
    );

    for (
      let p = 0;
      p < particleCount * 3;
      p += 3
    ) {
      pPositions[p] =
        (Math.random() - 0.5) * 200;

      pPositions[p + 1] =
        Math.random() * 80 + 2;

      pPositions[p + 2] =
        (Math.random() - 0.5) * 200;
    }

    pGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(
        pPositions,
        3
      )
    );

    const pMat = new THREE.PointsMaterial({
      color: 0xff3b00,
      size: 1.8,
      transparent: true,
      opacity: 0.75,
    });

    const particles = new THREE.Points(
      pGeo,
      pMat
    );

    scene.add(particles);

    // Camera interaction
    let targetCamX = initialCamPos.x;
    let targetCamY = initialCamPos.y;
    let targetCamZ = initialCamPos.z;

    let scrollProg = 0;

    const handleMouseMove = (
      e: MouseEvent
    ) => {
      // Disable unnecessary mouse parallax on touch/mobile
      if (window.innerWidth < 768) return;

      const rect =
        container.getBoundingClientRect();

      const normX =
        ((e.clientX - rect.left) /
          rect.width) *
          2 -
        1;

      const normY =
        -(
          ((e.clientY - rect.top) /
            rect.height) *
            2 -
          1
        );

      // Subtle camera parallax
      targetCamX =
        initialCamPos.x + normX * 45;

      targetCamZ =
        initialCamPos.z + normY * 35;
    };

    const handleScroll = () => {
      const st = window.scrollY;
      const vh = window.innerHeight;

      scrollProg = Math.min(
        1.5,
        st / vh
      );
    };

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    );

    container.addEventListener(
      'mousemove',
      handleMouseMove
    );

    // Animation loop
    const clock = new THREE.Clock();

    let frameId: number;

    const animate = () => {
      frameId =
        requestAnimationFrame(animate);

      const elapsed =
        clock.getElapsedTime();

      // Scroll camera trajectory
      const scrollCamZ =
        initialCamPos.z -
        scrollProg * 140;

      const scrollCamY =
        initialCamPos.y -
        scrollProg * 60;

      const scrollCamX =
        initialCamPos.x -
        scrollProg * 50;

      camera.position.x +=
        (
          targetCamX -
          (initialCamPos.x - scrollCamX) -
          camera.position.x
        ) *
        0.05;

      camera.position.y +=
        (scrollCamY - camera.position.y) *
        0.05;

      camera.position.z +=
        (scrollCamZ - camera.position.z) *
        0.05;

      const lookTarget =
        new THREE.Vector3(
          0,
          10 - scrollProg * 15,
          -scrollProg * 40
        );

      camera.lookAt(lookTarget);

      // Animate accent light
      orangePoint.position.x =
        Math.sin(elapsed * 0.8) * 40;

      orangePoint.position.z =
        Math.cos(elapsed * 0.8) * 40;

      orangePoint.intensity =
        2.5 +
        Math.sin(elapsed * 3) * 0.5;

      // Pulse decorative cubes
      decoCubes.forEach(
        (cube, idx) => {
          if (idx % 4 === 0) {
            const geometry =
              cube.geometry as THREE.BoxGeometry;

            cube.position.y =
              geometry.parameters.height / 2 +
              Math.sin(
                elapsed * 2 + idx
              ) *
                1.5;
          }
        }
      );

      // Float particles
      const posAttr =
        pGeo.attributes
          .position as THREE.BufferAttribute;

      const arr =
        posAttr.array as Float32Array;

      for (
        let i = 1;
        i < arr.length;
        i += 3
      ) {
        arr[i] +=
          Math.sin(elapsed + i) * 0.03;
      }

      posAttr.needsUpdate = true;

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    // Responsive resize handler
    const handleResize = () => {
      if (!container) return;

      width = container.clientWidth;
      height = container.clientHeight;

      const wasMobile =
        window.innerWidth < 768;

      // Update camera position based on viewport
      initialCamPos = wasMobile
        ? new THREE.Vector3(
            0,
            165,
            240
          )
        : new THREE.Vector3(
            0,
            120,
            140
          );

      // Update parallax targets
      targetCamX = initialCamPos.x;
      targetCamY = initialCamPos.y;
      targetCamZ = initialCamPos.z;

      camera.aspect = width / height;

      camera.updateProjectionMatrix();

      renderer.setSize(
        width,
        height
      );

      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio,
          wasMobile ? 1.5 : 2
        )
      );
    };

    window.addEventListener(
      'resize',
      handleResize
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );

      window.removeEventListener(
        'resize',
        handleResize
      );

      container.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      cancelAnimationFrame(frameId);

      // Dispose geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();

          if (
            Array.isArray(
              object.material
            )
          ) {
            object.material.forEach(
              (material) =>
                material.dispose()
            );
          } else {
            object.material.dispose();
          }
        }
      });

      pGeo.dispose();
      pMat.dispose();

      renderer.dispose();

      if (
        container.contains(
          renderer.domElement
        )
      ) {
        container.removeChild(
          renderer.domElement
        );
      }
    };
  }, []);

  return (
    <section
      id="hero-3d"
      className="
        relative
        w-full
        h-[100svh]
        min-h-[620px]
        overflow-hidden
        bg-[#050505]
        flex
        items-center
        justify-center
        select-none
      "
    >
      {/* 3D Canvas */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Subtle overlay for better text readability */}
      <div
        className="
          absolute
          inset-0
          z-[5]
          bg-gradient-to-t
          from-black/80
          via-black/10
          to-transparent
          pointer-events-none
        "
      />

      {/* Content Overlay */}
      <div
        className="
          absolute
          right-0
          bottom-16
          z-10
          flex
          flex-col
          items-end
          justify-end
          px-6
          pb-10
          sm:px-10
          sm:pb-14
          md:items-start
          md:justify-center
          md:px-16
          md:pb-0
          lg:px-24
          pointer-events-none
        "
      >
        <div
          className="
            w-full
            max-w-md
            text-center
            md:text-right
            pointer-events-auto
          "
        >
          <p
            className="
              mb-3
              text-[10px]
              sm:text-xs
              md:text-sm
              uppercase
              tracking-[0.25em]
              text-[#FF3B00]
            "
          >
            Creative Developer & Designer
          </p>

          <p
            className="
              mb-6
              text-lg
              text-[#B8B8B8]
              sm:text-lg
              font-display
              tracking-widest
            "
          >
            I design and build immersive digital
            experiences that combine creativity,
            technology, and interactive storytelling.
          </p>

          <a
            href="#work"
            onMouseEnter={() =>
              setCursorState('INTERACT')
            }
            onMouseLeave={() =>
              setCursorState('DEFAULT')
            }
            className="
              inline-flex
              items-center
              justify-center
              border
              border-[#FF3B00]
              border-t-transparent
              border-b-transparent
              bg-transparent
              px-5
              py-3
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-white
              transition-all
              duration-300
              sm:px-6
              hover:bg-transparent
              hover:text-[#FF3B00]
            "
          >
            Explore My Work
          </a>
        </div>
      </div>
    </section>
  );
};