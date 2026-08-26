import { useState } from "react";
import { Marker } from "./Marker";

const STEPS = [
  { n: "01", t: "THINK", d: "Research, references, constraints. Sketch the system before a single component exists." },
  { n: "02", t: "BREAK", d: "Destroy the safe layout. Find the one idea worth keeping and delete the rest." },
  { n: "03", t: "DESIGN", d: "Swiss grid, brutal type scale, strict tokens. Every value has a reason." },
  { n: "04", t: "BUILD", d: "Typed, componentised, accessible. Performance budget set before the first commit." },
  { n: "05", t: "ANIMATE", d: "GSAP timelines, scroll physics, cursor state. Motion carries meaning, not decoration." },
  { n: "06", t: "REPEAT", d: "Ship, measure, break again. The archive is never finished." },
];

export function Process() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative bg-surface px-5 py-28 md:px-8 md:py-40">
      <Marker index="09" title="PROCESS" note="06 STAGE LOOP" />
      <div className="border-t border-border">
  {STEPS.map((s, i) => {
    const active = open === i;
    const isLeft = i % 2 === 0;

    return (
      <button
        key={s.n}
        onClick={() => setOpen(i)}
        data-cursor={active ? "OPEN" : "VIEW"}
        className="block w-full border-b border-border py-6 text-left transition-colors hover:bg-elevated"
      >
        {/* TITLE ROW */}
        <div className="flex items-baseline gap-5 md:gap-10">
          {/* NUMBER - ALWAYS LEFT */}
          <span
            className={`mono shrink-0 text-[11px] ${
              active ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {s.n}
          </span>

          {/* TITLE - ALTERNATES LEFT / RIGHT */}
          <span
            className={`block flex-1 text-[clamp(32px,7vw,96px)] font-medium uppercase leading-[0.85] tracking-[-0.04em] transition-[color,transform] duration-300 ${
              isLeft ? "text-left" : "text-right"
            }`}
            style={{
              color: active
                ? "var(--primary)"
                : "var(--foreground)",
              transform: active
                ? isLeft
                  ? "translateX(2vw)"
                  : "translateX(-2vw)"
                : "translateX(0)",
            }}
          >
            {s.t}
          </span>
        </div>

        {/* EXPANDABLE DESCRIPTION */}
        <div
          className="grid overflow-hidden transition-[grid-template-rows,opacity] duration-500"
          style={{
            gridTemplateRows: active ? "1fr" : "0fr",
            opacity: active ? 1 : 0,
          }}
        >
          <div className="min-h-0">
            {/* Offset description to line up after number */}
            <div className="pl-[calc(1rem+1.5vw)] md:pl-[calc(1rem+2.5vw)]">
              <div
                className={`mt-4 flex ${
                  isLeft ? "justify-start" : "justify-end"
                }`}
              >
                <p
                  className={`max-w-lg text-sm leading-relaxed text-muted-foreground ${
                    isLeft ? "text-left pl-8" : "text-right pr-10"
                  }`}
                >
                  {s.d}
                </p>
              </div>
            </div>
          </div>
        </div>
      </button>
    );
  })}
</div>
    </section>
  );
}
