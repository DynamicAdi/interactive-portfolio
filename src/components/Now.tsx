import { Marker } from "./Marker";

const STATUS = [
  "BUILDING COOL THINGS",
  "OPEN TO CREATIVE PROJECTS",
  "EXPERIMENTING WITH 3D",
  "OBSESSED WITH MOTION",
];

export function Now() {
  return (
    <section className="relative px-5 py-28 md:px-8 md:py-36">
      <Marker index="13" title="CURRENT STATUS" note="LIVE FEED" />
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="text-[clamp(40px,8vw,120px)] font-pixel text-gray-200 font-bold">
            NOW
            <span className="text-primary">_</span>
          </h2>
        </div>
        <ul className="space-y-4 md:col-span-6 md:col-start-7">
          {STATUS.map((s, i) => (
            <li key={s} className="flex items-center gap-4 border-b border-border pb-4 pixel-mono">
              <span
                className="blink h-[10px] w-[10px] shrink-0 bg-primary"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
              <span className="mono text-sm text-foreground">{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
