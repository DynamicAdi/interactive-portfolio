import { useGsap } from "../lib/motion";
import { Marker } from "./Marker";

const PROJECTS = [
  {
    n: "01",
    title: "VOID ENGINE",
    cat: "WEBGL / REALTIME",
    year: "2025",
    tech: "THREE.JS · GLSL · REACT",
    align: "left",
  },
  {
    n: "02",
    title: "FOIL PRESS",
    cat: "EDITORIAL / MOTION",
    year: "2025",
    tech: "GSAP · LENIS · NEXT.JS",
    align: "right",
  },
  {
    n: "03",
    title: "BLOCK OS",
    cat: "INTERFACE SYSTEM",
    year: "2024",
    tech: "TYPESCRIPT · CANVAS",
    align: "left",
  },
] as const;

/**
 * Deterministic pseudo-random float in [0,1) from an integer seed + salt.
 * Same index always produces the same "personality," so a card's look
 * never flickers between renders — and a 4th, 5th, Nth project added
 * later just gets its own personality automatically, with no new code.
 */
function rand(seed: number, salt = 0) {
  const x = Math.sin(seed * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Which visual family a card gets. A card whose own category/stack reads
 * as "code" (webgl, realtime, canvas, a system) gets the flip-matrix;
 * anything without that signal falls back to a stable per-index seed,
 * so new projects always resolve to *something* without new rules.
 */
function pickFamily(p: { cat: string; tech: string }, index: number): "matrix" | "lines" {
  const signal = `${p.cat} ${p.tech}`.toLowerCase();
  const codeLike = /(webgl|realtime|canvas|typescript|glsl|shader|system)/.test(signal);
  if (codeLike) return "matrix";
  return rand(index, 30) > 0.55 ? "matrix" : "lines";
}

/**
 * Family 1 — a field of rotated hairlines, parametrized per card via
 * rand(index, salt): count, angle, drift direction, speed, spacing.
 */
function LineFieldVisual({ index }: { index: number }) {
  const lineCount = 5 + Math.floor(rand(index, 1) * 4); // 5–8 lines
  const baseAngle = -28 + rand(index, 2) * 56; // -28..28 deg
  const dir = rand(index, 3) > 0.5 ? 1 : -1;
  const speed = 0.7 + rand(index, 4) * 0.9; // 0.7–1.6x
  const accentEven = rand(index, 5) > 0.5;
  const spread = 0.7 + rand(index, 6) * 0.5; // 0.7–1.2, line spacing

  const lines = Array.from({ length: lineCount }, (_, i) => i);

  return (
    <div className="wk-visual group absolute inset-0 overflow-hidden bg-background">
      <svg className="h-full w-full" viewBox="0 0 100 125" preserveAspectRatio="none">
        <g style={{ transform: `rotate(${baseAngle}deg)`, transformOrigin: "50% 50%" }}>
          {lines.map((i) => {
            const t = lines.length > 1 ? i / (lines.length - 1) : 0.5;
            const y = 62.5 + (t - 0.5) * 125 * spread;
            const isAccent = accentEven ? i % 2 === 0 : i % 2 === 1;
            return (
              <line
                key={i}
                className={`wk-visual-line transition-opacity duration-500 group-hover:opacity-100 ${
                  isAccent ? "text-primary opacity-90" : "text-muted-foreground opacity-30"
                }`}
                x1="-40"
                x2="140"
                y1={y}
                y2={y}
                stroke="currentColor"
                strokeWidth={isAccent ? 0.6 : 0.3}
                data-speed={speed * (i % 2 === 0 ? 1 : 0.65)}
                data-dir={i % 2 === 0 ? dir : -dir}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}

/**
 * Family 2 — a flip-dot box grid, like a split-flap display. At rest it's
 * just a plain grid of boxes (color alternates black/white per card).
 * On hover, every box flips at once (with a slight diagonal wave delay):
 * the boxes that fall inside the numeral's pixel pattern land on white,
 * everything else lands on orangered — so the number is formed by which
 * boxes flip which way, not printed as text on top.
 */

// classic 5x7 dot-matrix digit font — "1" = lit pixel
const DIGIT_FONT: Record<string, string[]> = {
  "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
  "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  "3": ["11111", "00010", "00100", "00010", "00001", "10001", "01110"],
  "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
  "6": ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
  "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  "9": ["01110", "10001", "10001", "01111", "00001", "00010", "01100"],
};

const GRID_COLS = 15;
const GRID_ROWS = 19; // ~4:5, matches the card's aspect ratio

function isDigitPixel(row: number, col: number, digits: string): boolean {
  const digitW = 5;
  const gap = 1;
  const blockW = digits.length * digitW + (digits.length - 1) * gap;
  const blockH = 7;
  const startCol = Math.floor((GRID_COLS - blockW) / 2);
  const startRow = Math.floor((GRID_ROWS - blockH) / 2);

  const r = row - startRow;
  if (r < 0 || r >= blockH) return false;

  const cLocal = col - startCol;
  if (cLocal < 0 || cLocal >= blockW) return false;

  const digitIndex = Math.floor(cLocal / (digitW + gap));
  const colInDigit = cLocal % (digitW + gap);
  if (colInDigit >= digitW) return false; // the 1-col gap between digits

  const glyph = DIGIT_FONT[digits[digitIndex]];
  if (!glyph) return false;
  return glyph[r][colInDigit] === "1";
}

function FlipMatrixVisual({ index, number }: { index: number; number: string }) {
  const idleIsBlack = index % 2 === 0; // card 1: black boxes, card 2: white, card 3: black...

  const boxes = Array.from({ length: GRID_ROWS * GRID_COLS }, (_, i) => {
    const row = Math.floor(i / GRID_COLS);
    const col = i % GRID_COLS;
    return { row, col, lit: isDigitPixel(row, col, number) };
  });

  return (
    <div className="wk-visual group absolute inset-0 overflow-hidden bg-black" style={{ perspective: "800px" }}>
      <div
        className="grid h-full w-full gap-[2px] p-[2px]"
        style={{
          gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
        }}
      >
        {boxes.map(({ row, col, lit }, i) => (
          <div key={i} className="relative [transform-style:preserve-3d]">
            <div
              className="absolute inset-0 transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
              style={{ transitionDelay: `${(row + col) * 6}ms` }}
            >
              {/* front face — idle state */}
              <div
                className={`absolute inset-0 [backface-visibility:hidden] ${
                  idleIsBlack ? "border border-black bg-[#333333]" : "border border-black/10 bg-white"
                }`}
              />
              {/* back face — hover state: white where the numeral lives, orangered elsewhere */}
              <div
                className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]"
                style={{ background: lit ? "#ffffff" : "orangered" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Work() {
  const ref = useGsap(({ gsap }) => {
    gsap.utils.toArray<HTMLElement>(".wk-item").forEach((item) => {
      const visual = item.querySelector(".wk-visual");
      const lines = item.querySelectorAll<SVGLineElement>(".wk-visual-line");

      // scroll-linked parallax on the whole visual block — applies to either family
      gsap.fromTo(
        visual,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true },
        },
      );

      // ambient drift for the hairline family only (no-op for flip-matrix cards)
      lines.forEach((line) => {
        const lineSpeed = parseFloat(line.dataset.speed || "1");
        const lineDir = parseFloat(line.dataset.dir || "1");
        gsap.to(line, {
          x: 8 * lineDir,
          duration: 3.2 / lineSpeed,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      gsap.from(visual, {
        scale: 1.1,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: item, start: "top 85%" },
      });

      gsap.from(item.querySelectorAll(".wk-reveal"), {
        yPercent: 110,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: item, start: "top 78%" },
      });
    });
  });

  return (
    <section ref={ref} id="work" className="relative px-5 py-28 md:px-8 md:py-40">
      <Marker index="05" title="SELECTED WORK" note="03 OF 12 ARCHIVED" />
      <div className="space-y-28 md:space-y-44">
        {PROJECTS.map((p, i) => {
          return (
            <article key={p.n} className="wk-item grid gap-6 md:grid-cols-12">
              <div
                className={`relative overflow-hidden edge md:col-span-5 ${
                  p.align === "right" ? "md:order-2 md:col-start-8" : ""
                }`}
                data-cursor="VIEW PROJECT"
              >
                <div className="aspect-[4/5] overflow-hidden">
                    <FlipMatrixVisual index={i} number={p.n} />
                </div>
                <span className={`mono absolute left-0 top-0 ${i % 2 === 0 ? "bg-white p-3.5" : "bg-black p-4"} text-[10px] text-primary`}>
                  {p.n}
                </span>
              </div>

              <div
                className={`flex flex-col justify-end md:col-span-7 ${
                  p.align === "right" ? "md:order-1 md:col-start-1" : ""
                }`}
              >
                <div className="overflow-hidden">
                  <h3 className="wk-reveal text-[clamp(40px,7vw,96px)]">{p.title}</h3>
                </div>
                <div className="mt-5 space-y-2 border-t border-border pt-4">
                  <div className="wk-reveal mono flex justify-between text-[10px] text-muted-foreground">
                    <span>CATEGORY</span>
                    <span className="text-foreground">{p.cat}</span>
                  </div>
                  <div className="wk-reveal mono flex justify-between text-[10px] text-muted-foreground">
                    <span>YEAR</span>
                    <span className="text-primary">{p.year}</span>
                  </div>
                  <div className="wk-reveal mono flex justify-between text-[10px] text-muted-foreground">
                    <span>STACK</span>
                    <span className="text-foreground">{p.tech}</span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}