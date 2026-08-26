import { useRef } from "react";
import { useGsap } from "../lib/motion";

const LINES = ["LET'S", "BUILD", "SOMETHING", "WEIRD."];

const LINKS = [
  { label: "EMAIL", value: "hello@samarthpatil.dev", href: "mailto:hello@samarthpatil.dev" },
  { label: "GITHUB", value: "@samarthpatil", href: "https://github.com" },
  { label: "LINKEDIN", value: "/in/samarthpatil", href: "https://linkedin.com" },
  { label: "X", value: "@samarth_builds", href: "https://x.com" },
];

export function Contact() {
  const cta = useRef<HTMLAnchorElement>(null);

  const ref = useGsap(({ gsap }) => {
    gsap.from(".ct-line", {
      yPercent: 110,
      opacity: 0,
      duration: 1,
      ease: "expo.out",
      stagger: 0.09,
      scrollTrigger: { trigger: ".ct-head", start: "top 85%" },
    });
  });

  const onMove = (e: React.PointerEvent) => {
    const el = cta.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate3d(${dx * 0.2}px, ${dy * 0.4}px, 0) scale(1.06)`;
  };
  const reset = () => {
    if (cta.current) cta.current.style.transform = "translate3d(0,0,0) scale(1)";
  };

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pt-44">
      <span className="mono text-[11px] text-primary">[14] END OF TRANSMISSION</span>
      <div className="ct-head mt-10">
        {LINES.map((l, i) => (
          <div key={l} className="overflow-hidden">
            <h2
              className={`ct-line text-[clamp(50px,15vw,200px)] font-pixel font-bold tracking-tighter leading-none ${i === LINES.length - 1 ? "text-primary" : ""}`}
              style={{ paddingLeft: `${i * 12}vw` }}
            >
              {l}
            </h2>
          </div>
        ))}
      </div>

      <div className="mt-20 flex justify-center py-10" onPointerMove={onMove} onPointerLeave={reset}>
        <a
          ref={cta}
          href="mailto:hello@samarthpatil.dev"
          data-cursor="OPEN"
          className="mono border-2 border-primary px-8 py-6 text-[12px] text-primary transition-[background-color,color,transform] duration-300 ease-out hover:bg-primary hover:text-primary-foreground md:text-[15px]"
        >
          START A CONVERSATION →
        </a>
      </div>

      <div className="mt-16 grid grid-cols-2 border-l border-t border-border md:grid-cols-4">
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            data-cursor="OPEN"
            className="group border-b border-r border-border p-5 transition-colors hover:bg-primary"
          >
            <span className="mono block text-[9px] text-muted-foreground group-hover:text-primary-foreground">
              {l.label}
            </span>
            <span className="mono mt-2 block break-all text-[11px] text-foreground group-hover:text-primary-foreground">
              {l.value}
            </span>
          </a>
        ))}
      </div>

      <footer className="mono mt-14 flex flex-col justify-between gap-3 border-t border-border pt-5 text-[10px] text-muted-foreground md:flex-row">
        <span>© 2026 SAMARTH PATIL</span>
        <span className="text-primary">ARINOVA STUDIO</span>
      </footer>
    </section>
  );
}
