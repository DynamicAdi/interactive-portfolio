import { IconType } from 'react-icons';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiThreedotjs,
  SiTailwindcss,
  SiRedux,
  SiGraphql,
  SiFramer,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiFigma,
  SiPython,
  SiFirebase,
  SiVercel,
  SiExpress,
  SiHtml5,
  SiCss,
  SiSass,
  SiWebpack,
  SiVite,
} from 'react-icons/si';

export interface Skill {
  /** Label shown under the icon */
  name: string;
  /** Icon component from react-icons (Simple Icons pack) */
  icon: IconType;
}

/**
 * ── EDIT ME ──────────────────────────────────────────────
 * Add / remove / reorder skills here — the page re-renders
 * automatically from this array. To add a new one:
 *   1. Import the icon from 'react-icons/si' (or another pack)
 *   2. Push a new { name, icon } entry below
 *
 * Browse more icons: https://react-icons.github.io/react-icons
 * ─────────────────────────────────────────────────────────
 */
export const SKILLS: Skill[] = [
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Express', icon: SiExpress },
  { name: 'Three.js', icon: SiThreedotjs },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Redux', icon: SiRedux },
  { name: 'GraphQL', icon: SiGraphql },
  { name: 'Framer Motion', icon: SiFramer },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Docker', icon: SiDocker },
  { name: 'Git', icon: SiGit },
  { name: 'Figma', icon: SiFigma },
  { name: 'Python', icon: SiPython },
  { name: 'Firebase', icon: SiFirebase },
  { name: 'Vercel', icon: SiVercel },
  { name: 'HTML5', icon: SiHtml5 },
  { name: 'CSS3', icon: SiCss },
  { name: 'Sass', icon: SiSass },
  { name: 'Webpack', icon: SiWebpack },
  { name: 'Vite', icon: SiVite },
];