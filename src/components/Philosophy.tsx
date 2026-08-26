import { useEffect, useRef } from "react";
import { useGsap } from "../lib/motion";

const BLOCKS = [
  ["DESIGN", "SHOULD", "MOVE."],
  ["CODE", "SHOULD", "FEEL."],
  ["BREAK", "RULES", "BUILD BETTER."]
];

export function Philosophy() {
  const wordsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let raf = 0;
    let lastScrollY = window.scrollY;
    let velocity = 0;
    let smoothVelocity = 0;

    const animate = () => {
      const scrollY = window.scrollY;

      // Calculate scroll velocity
      velocity = scrollY - lastScrollY;

      // Smooth velocity
      smoothVelocity +=
        (velocity - smoothVelocity) * 0.15;

      // Moderate skew — strong but not crazy
      const skew = Math.max(
        -10,
        Math.min(10, smoothVelocity * 1.2)
      );

      // Small vertical stretch only
      const scaleY =
        1 + Math.min(0.06, Math.abs(smoothVelocity) * 0.004);

      wordsRef.current.forEach((word) => {
        if (!word) return;

        word.style.transform = `
          skewY(${skew}deg)
          scaleY(${scaleY})
        `;

        word.style.filter = `blur(${
          Math.min(1.5, Math.abs(skew) * 0.08)
        }px)`;
      });

      lastScrollY = scrollY;

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);

      wordsRef.current.forEach((word) => {
        if (!word) return;

        word.style.transform = "";
        word.style.filter = "";
      });
    };
  }, []);

  const ref = useGsap(({ gsap, root }) => {
    const blocks = root.querySelectorAll(".ph-b");

    gsap.to(blocks, {
      xPercent: (i: number) => (i % 2 === 0 ? -8 : 8),

      ease: "none",

      scrollTrigger: {
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-primary py-32 md:py-48"
    >
      {/* Label */}
      <div className="mb-10 px-5 md:px-8">
        <span className="mono text-[11px] text-primary-foreground">
          PHILOSOPHY
        </span>
      </div>

      {/* Typography */}
      <div>
        {BLOCKS.map((block, bi) => (
          <div
            key={bi}
            className={`ph-b px-5 md:px-8 my-16 md:my-12 ${
              bi === 1 ? "text-right" : "text-left"
            }`}
          >
            {block.map((word, wi) =>  {
              const index = bi * BLOCKS[0].length + wi;

              return (
                /*
                 * Extra vertical space prevents
                 * skew from getting clipped.
                 */
                <div
                  key={word}
                  className="relative py-[0.08em]"
                >
                  <div
                    ref={(el) => {
                      if (el) {
                        wordsRef.current[index] = el;
                      }
                    }}
                    className="will-change-transform"
                  >
                    <h2 className="text-[clamp(48px,13vw,180px)] px-20 font-bold leading-[0.85] tracking-[-0.04em] text-primary-foreground">
                      {word}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}