import { GlobeHub } from '../types';


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