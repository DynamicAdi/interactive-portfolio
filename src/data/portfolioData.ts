import { Project, GlobeHub, SkillNode, ProcessStep } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'chronos-engine',
    number: '01',
    title: 'CHRONOS_VOXEL.SYS',
    tagline: 'Procedural 4D Spacetime Shader & Interactive Simulation',
    category: 'CREATIVE COMPUTING / WEBGL',
    year: '2025',
    client: 'KINETIC LABS ZURICH',
    role: 'Lead Graphics Engineer',
    description: 'An architectural experiment in raymarching non-Euclidean manifolds in real-time within the browser. Features dynamic volumetric lighting, compute shaders, and spatial audio synthesis.',
    metrics: ['60 FPS on mobile GPUs', '128k raymarched voxels', 'Zero asset downloads (100% procedural GLSL)'],
    techStack: ['WebGL 2.0', 'GLSL Shaders', 'Three.js', 'Web Audio API', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#FF3B00',
    githubUrl: 'https://github.com/samarthpatil/chronos-voxel',
    liveUrl: 'https://chronos.samarthpatil.dev',
    specs: {
      fps: '60.0 FPS',
      shaders: '14 Custom GLSL Passes',
      drawCalls: '2 Calls / Frame',
      compression: 'Brotli 18.2KB'
    }
  },
  {
    id: 'monolith-os',
    number: '02',
    title: 'MONOLITH // ARCHITECT',
    tagline: 'Spatial Digital OS for High-Density Architectural Blueprints',
    category: 'SPATIAL UI / THREE.JS',
    year: '2025',
    client: 'ATELIER BAUHAUS',
    role: 'Creative Developer & UI Architect',
    description: 'A dark monolithic workspace exploring Swiss typographic precision combined with real-time 3D isometric building sectioning. Users interact with orthographic building slices using kinetic gestures.',
    metrics: ['Sub-16ms latency', '100% custom vector rasterizer', 'Pioneered zero-dependency kinetic physics'],
    techStack: ['Next.js', 'React Three Fiber', 'GSAP ScrollTrigger', 'Tailwind CSS', 'Web Workers'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#FFFFFF',
    githubUrl: 'https://github.com/samarthpatil/monolith-os',
    liveUrl: 'https://monolith.samarthpatil.dev',
    specs: {
      fps: '60.0 FPS',
      shaders: 'Isometric Depth Pass',
      drawCalls: '18 Calls / Frame',
      compression: 'Gzip 42.1KB'
    }
  },
  {
    id: 'quantum-grid',
    number: '03',
    title: 'NEURAL TENSOR MATRIX',
    tagline: 'High-Throughput Global Node Visualizer & Realtime Telemetry',
    category: 'DATA VISUALIZATION / SYSTEMS',
    year: '2024',
    client: 'GLOBAL AI ARCHIVE',
    role: 'Full-Stack Creative Engineer',
    description: 'Real-time WebSocket streaming visualizer mapping multi-terabyte parameter activations across 42 global datacenters. Custom instanced mesh rendering handles 1,000,000 live data vectors simultaneously.',
    metrics: ['1,000,000 instanced nodes', '12ms stream delta', 'Memory footprint < 64MB'],
    techStack: ['TypeScript', 'Three.js Instancing', 'WebSockets', 'Tailwind', 'Rust WASM'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#FF3B00',
    githubUrl: 'https://github.com/samarthpatil/neural-tensor-matrix',
    liveUrl: 'https://matrix.samarthpatil.dev',
    specs: {
      fps: '59.8 FPS',
      shaders: 'Instanced Instancing V2',
      drawCalls: '1 Single Instanced Call',
      compression: 'Rust WASM 89KB'
    }
  },
  {
    id: 'strata-synth',
    number: '04',
    title: 'STRATA // AUDIOVOX',
    tagline: 'Generative Spectrogram Synthesizer & Kinetic Vinyl Lathe',
    category: 'EXPERIMENTAL AUDIO / GENERATIVE',
    year: '2024',
    client: 'INDEPENDENT RELEASE',
    role: 'Solo Creator',
    description: 'An audiovisual instrument transforming visual geometric primitives into rich polymorphic soundscapes. Built with additive frequency modulation and custom FFT spectrum visualizers.',
    metrics: ['Polyphony: 32 voices', 'Zero audio latency', 'Featured on Awwwards & FWA of the Day'],
    techStack: ['Web Audio API', 'Canvas 2D Context', 'GSAP', 'Next.js', 'FFT Shaders'],
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#FF3B00',
    githubUrl: 'https://github.com/samarthpatil/strata-audiovox',
    liveUrl: 'https://strata.samarthpatil.dev',
    specs: {
      fps: '60.0 FPS',
      shaders: 'FFT Heatmap Distortion',
      drawCalls: 'Direct Canvas2D GPU context',
      compression: 'Pure Vanilla JS 14KB'
    }
  },
  {
    id: 'cyber-vault',
    number: '05',
    title: 'ZERO-K ARCHIVE',
    tagline: 'Encrypted Decentralized Artifact Vault with 3D Keygen',
    category: 'CRYPTOGRAPHY / 3D WEB',
    year: '2024',
    client: 'PROTOCOL ZERO',
    role: 'Lead UI/UX & WebGL Dev',
    description: 'A brutalist cryptographic vault requiring users to align 3D isometric lock tumblers to decrypt sensitive decentralized artifacts. Incorporates tactile haptic feedback and CRT distortion filters.',
    metrics: ['AES-256 client decrypt', '100% SVG/WebGL hybrid', '200k+ global unique visitors'],
    techStack: ['Three.js', 'Web Crypto API', 'Tailwind CSS', 'Lenis Smooth Scroll', 'Vite'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#FFFFFF',
    githubUrl: 'https://github.com/samarthpatil/zero-k-archive',
    liveUrl: 'https://zerok.samarthpatil.dev',
    specs: {
      fps: '60.0 FPS',
      shaders: 'CRT Scanline + Barrel Bloom',
      drawCalls: '6 Calls / Frame',
      compression: 'Zero Bloat 28KB'
    }
  }
];

export const GLOBE_HUBS: GlobeHub[] = [
  {
    id: 'hub-tokyo',
    name: 'TOKYO // NODE_01',
    lat: 35.6762,
    lng: 139.6503,
    type: 'CORE_NODE',
    status: 'ACTIVE',
    dataPacket: 'NEO-SHIBUYA REALTIME GLSL TRANSMITTER',
    country: 'JAPAN',
    ping: '22ms'
  },
  {
    id: 'hub-zurich',
    name: 'ZURICH // SWISS_LAB',
    lat: 47.3769,
    lng: 8.5417,
    type: 'CREATIVE_LAB',
    status: 'TRANSMITTING',
    dataPacket: 'TYPOGRAPHIC GRID REFINEMENT UNIT',
    country: 'SWITZERLAND',
    ping: '14ms'
  },
  {
    id: 'hub-sf',
    name: 'SAN FRANCISCO // SILICON_GRID',
    lat: 37.7749,
    lng: -122.4194,
    type: 'TECH_HUB',
    status: 'ACTIVE',
    dataPacket: 'GPU COMPUTE ORCHESTRATION STREAM',
    country: 'USA',
    ping: '38ms'
  },
  {
    id: 'hub-bengaluru',
    name: 'BENGALURU // INNOVATION_CORE',
    lat: 12.9716,
    lng: 77.5946,
    type: 'CORE_NODE',
    status: 'ACTIVE',
    dataPacket: 'PRIMARY ARCHITECTURAL COMMAND CENTER',
    country: 'INDIA',
    ping: '4ms'
  },
  {
    id: 'hub-london',
    name: 'LONDON // DIGITAL_NODE',
    lat: 51.5074,
    lng: -0.1278,
    type: 'IDEA_STREAM',
    status: 'SYNCED',
    dataPacket: 'GLOBAL SPATIAL INTERACTION ARCHIVE',
    country: 'UK',
    ping: '19ms'
  },
  {
    id: 'hub-berlin',
    name: 'BERLIN // SOUND_SYNTH',
    lat: 52.5200,
    lng: 13.4050,
    type: 'CREATIVE_LAB',
    status: 'ACTIVE',
    dataPacket: 'ALGORITHMIC AUDIO LATHE PROTOCOL',
    country: 'GERMANY',
    ping: '16ms'
  },
  {
    id: 'hub-singapore',
    name: 'SINGAPORE // QUANTUM_ROUTER',
    lat: 1.3521,
    lng: 103.8198,
    type: 'TECH_HUB',
    status: 'TRANSMITTING',
    dataPacket: 'CROSS-CONTINENTAL PACKET RELAY',
    country: 'SINGAPORE',
    ping: '28ms'
  },
  {
    id: 'hub-nyc',
    name: 'NEW YORK // MONOLITH',
    lat: 40.7128,
    lng: -74.0060,
    type: 'IDEA_STREAM',
    status: 'SYNCED',
    dataPacket: 'EDITORIAL GROTESQUE DISPATCH TOWER',
    country: 'USA',
    ping: '31ms'
  }
];

export const SKILL_NODES: SkillNode[] = [
  {
    id: 'nextjs',
    name: 'NEXT.JS 15 / REACT',
    category: 'CORE',
    level: '99%',
    experience: '5+ Years',
    description: 'Server Components, streaming SSR, dynamic route handlers, high-throughput caching architectures.',
    connections: ['typescript', 'gsap', 'node'],
    command: 'npx create-next-app@latest --app'
  },
  {
    id: 'typescript',
    name: 'TYPESCRIPT',
    category: 'CORE',
    level: '98%',
    experience: '6+ Years',
    description: 'Strict type inference, AST transformations, zero-runtime overhead schemas, mathematical vectors.',
    connections: ['threejs', 'nextjs', 'node'],
    command: 'tsc --strict --noEmit --target ES2022'
  },
  {
    id: 'threejs',
    name: 'THREE.JS / WEBGL',
    category: 'GRAPHICS',
    level: '95%',
    experience: '4+ Years',
    description: 'Instanced meshes, custom GLSL shader pipelines, post-processing buffers, raymarching & spatial 3D cameras.',
    connections: ['creative-coding', 'gsap', 'typescript'],
    command: 'gl.createShader(gl.FRAGMENT_SHADER)'
  },
  {
    id: 'gsap',
    name: 'GSAP / SCROLLTRIGGER',
    category: 'GRAPHICS',
    level: '98%',
    experience: '5+ Years',
    description: 'Kinetic physics timelines, scroll pinning, velocity skewing, split-text kinematics, buttery smooth 60fps.',
    connections: ['nextjs', 'threejs', 'ui-ux'],
    command: 'gsap.timeline().to(".element", { skewX: 12 })'
  },
  {
    id: 'creative-coding',
    name: 'CREATIVE CODING & GLSL',
    category: 'GRAPHICS',
    level: '94%',
    experience: '4+ Years',
    description: 'Fractional Brownian motion, Voronoi noise, cellular automata, reaction-diffusion physics, particle attractors.',
    connections: ['threejs', 'ui-ux'],
    command: 'vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;'
  },
  {
    id: 'node',
    name: 'NODE.JS / EXPRESS',
    category: 'SYSTEM',
    level: '92%',
    experience: '5+ Years',
    description: 'High-concurrency microservices, WebSocket engines, Web Workers concurrency, low-latency API layers.',
    connections: ['typescript', 'nextjs'],
    command: 'node --experimental-strip-types server.ts'
  },
  {
    id: 'ui-ux',
    name: 'SWISS UI/UX ARCHITECTURE',
    category: 'DESIGN',
    level: '96%',
    experience: '6+ Years',
    description: 'International Typographic Style, modular 8pt/12pt baseline grids, high-contrast dark optics, intentional friction.',
    connections: ['gsap', 'nextjs'],
    command: 'grid-template-columns: repeat(12, 1fr);'
  },
  {
    id: 'perf-opt',
    name: 'PERFORMANCE ENGINEERING',
    category: 'SYSTEM',
    level: '97%',
    experience: '5+ Years',
    description: 'Zero jank render loops, GPU memory budgeting, WebGL context loss handling, sub-second LCP metrics.',
    connections: ['threejs', 'nextjs', 'node'],
    command: 'window.performance.mark("render_cycle");'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'step-think',
    num: '01',
    name: 'THINK',
    subtitle: 'DECONSTRUCT THE PROBLEM',
    description: 'Every profound digital work begins by stripping away the standard internet boilerplate. I analyze spatial constraints, information density, and the emotional resonance of the user.',
    rule: 'Never default to standard conventions. Question every border, button, and layout.',
    codeSnippet: `const concept = new SpatialArchitecture({
  dimensions: 3,
  conventions: null, // Reject SaaS clichés
  clarity: 1.0,
  gravity: false
});`,
    telemetry: {
      friction: '0.00 μ',
      energy: '98.4 J',
      output: 'PURE ARCHITECTURE'
    }
  },
  {
    id: 'step-break',
    num: '02',
    name: 'BREAK',
    subtitle: 'INTENTIONAL IMPERFECTION',
    description: 'Perfection in software is lifeless. I inject controlled chaos: typography that intentionally ruptures the grid, unexpected physics skew, and pixelated micro-glitches.',
    rule: 'Calculated imperfection is the hallmark of real craftsmanship.',
    codeSnippet: `function injectControlledChaos(grid: Grid) {
  grid.subdivide(12);
  grid.displaceRandomCell({ axis: 'Z', delta: 42 });
  return grid.corruptGracefully();
}`,
    telemetry: {
      friction: '0.84 μ',
      energy: '142.1 J',
      output: 'RAW DISTORTION'
    }
  },
  {
    id: 'step-design',
    num: '03',
    name: 'DESIGN',
    subtitle: 'SWISS INTERNATIONAL SYSTEM',
    description: 'Constructing rigid mathematical grids, aggressive contrast hierarchies, oversized grotesque headings, and monospaced diagnostic telemetry.',
    rule: 'Form follows function, but form must evoke awe.',
    codeSnippet: `:root {
  --swiss-grid-unit: 8px;
  --contrast-ratio: 21:1;
  --signal-color: #FF3B00;
  --font-display: 'Syne', sans-serif;
}`,
    telemetry: {
      friction: '0.12 μ',
      energy: '110.0 J',
      output: 'RIGID GEOMETRY'
    }
  },
  {
    id: 'step-build',
    num: '04',
    name: 'BUILD',
    subtitle: 'HARDCORE CODE CRAFTSMANSHIP',
    description: 'Architecting rock-solid TypeScript systems, custom WebGL render loops, zero-dependency shaders, and low-latency state machines.',
    rule: 'Clean, typed, mathematically sound code is non-negotiable.',
    codeSnippet: `class RenderPipeline implements IRenderer {
  private vbo: WebGLBuffer;
  public render(delta: number): FrameStats {
    // Zero garbage allocation during draw tick
    return this.flushInstancedBatch();
  }
}`,
    telemetry: {
      friction: '0.04 μ',
      energy: '210.5 J',
      output: 'ZERO ALLOC RUNTIME'
    }
  },
  {
    id: 'step-animate',
    num: '05',
    name: 'ANIMATE',
    subtitle: 'PHYSICS & CINEMATIC SCROLLING',
    description: 'Wiring GSAP ScrollTrigger, Lenis momentum scrolling, camera paths through 3D typography, and reactive velocity transforms.',
    rule: 'Design should move. Code should feel.',
    codeSnippet: `gsap.to(camera.position, {
  scrollTrigger: {
    trigger: "#hero-3d",
    scrub: 1.2,
    start: "top top",
    end: "bottom top"
  },
  z: -250,
  ease: "power3.inOut"
});`,
    telemetry: {
      friction: '0.01 μ',
      energy: '190.2 J',
      output: '60FPS BUTTERY KINETICS'
    }
  },
  {
    id: 'step-repeat',
    num: '06',
    name: 'REPEAT',
    subtitle: 'RELENTLESS REFINEMENT',
    description: 'Auditing every microsecond, trimming draw calls, testing across touch and desktop resolutions, iterating until the experience feels unforgettable.',
    rule: 'The work is never done until it makes the visitor question what the web can be.',
    codeSnippet: `while (developer.isAwake) {
  portfolio.refineMicroInteractions();
  benchmarks.assert(fps >= 60);
  console.log("THIS DOESN'T FEEL LIKE A PORTFOLIO.");
}`,
    telemetry: {
      friction: '0.00 μ',
      energy: '∞ J',
      output: 'NEXT LEVEL'
    }
  }
];

export const PHILOSOPHY_STATEMENTS = [
  {
    lead: 'DESIGN SHOULD',
    highlight: 'MOVE.',
    sub: 'Static screens are relics of print. The digital medium is alive with time, inertia, and momentum.'
  },
  {
    lead: 'CODE SHOULD',
    highlight: 'FEEL.',
    sub: 'Software without tactile feedback is cold. We craft micro-haptics, spatial audio, and magnetic gravity.'
  },
  {
    lead: 'BREAK RULES.',
    highlight: 'BUILD BETTER.',
    sub: 'Conventions exist to be studied, mastered, and then intentionally shattered to create true wonder.'
  }
];

export const TIMELINE_EXPERIENCE = [
  {
    year: '2022',
    status: 'INITIALIZED',
    title: 'THE GENESIS COMMENCE',
    desc: 'Began deconstructing the browser. Deep dive into WebGL, mathematical canvas rendering, and low-level JavaScript performance.'
  },
  {
    year: '2023',
    status: 'BUILT THINGS',
    title: 'COMMERCIAL PRODUCTION & EXPERIMENTS',
    desc: 'Shipped high-traffic web applications, bespoke brand systems, and custom shader visualizers for global creative studios.'
  },
  {
    year: '2024',
    status: 'BROKE THINGS',
    title: 'THE EXPERIMENTAL REVOLUTION',
    desc: 'Pushed the boundaries of non-standard UI. Released open-source 3D tools, generative audio instruments, and won international recognitions.'
  },
  {
    year: '2025',
    status: 'LEVELED UP',
    title: 'SPATIAL & ARCHITECTURAL SYSTEMS',
    desc: 'Designed full spatial computing interfaces, high-throughput node matrices, and Swiss international design architectures.'
  },
  {
    year: '2026',
    status: 'STILL BUILDING',
    title: 'THE NEXT DIGITAL ERA',
    desc: 'Exploring the boundary where code, 3D geometry, and human interaction collapse into pure art. Available for high-impact select projects.'
  }
];
