export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  client?: string;
  role: string;
  description: string;
  metrics: string[];
  techStack: string[];
  image: string;
  accentColor: string;
  githubUrl?: string;
  liveUrl?: string;
  specs: {
    fps: string;
    shaders: string;
    drawCalls: string;
    compression: string;
  };
}

export interface GlobeHub {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'CORE_NODE' | 'CREATIVE_LAB' | 'IDEA_STREAM' | 'TECH_HUB';
  status: 'ACTIVE' | 'TRANSMITTING' | 'SYNCED';
  dataPacket: string;
  country: string;
  ping: string;
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'CORE' | 'GRAPHICS' | 'SYSTEM' | 'DESIGN';
  level: string;
  experience: string;
  description: string;
  connections: string[];
  command: string;
}

export interface ProcessStep {
  id: string;
  num: string;
  name: string;
  subtitle: string;
  description: string;
  rule: string;
  codeSnippet: string;
  telemetry: {
    friction: string;
    energy: string;
    output: string;
  };
}

export type CursorState = 'DEFAULT' | 'VIEW' | 'OPEN' | 'DRAG' | 'EXPLORE' | 'INTERACT' | 'VIEW_PROJECT' | 'EXECUTE';
