import React, { useEffect, useLayoutEffect, useRef } from "react";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Loads gsap + ScrollTrigger on the client and runs `setup` inside a context. */
export function useGsap(
  setup: (ctx: {
    gsap: typeof import("gsap").gsap;
    ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
    root: HTMLElement;
  }) => void,
  deps: unknown[] = [],
) {
  const ref = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;
    let alive = true;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      if (!alive || !ref.current) return;
      ctx = gsap.context(() => setup({ gsap, ScrollTrigger, root: ref.current! }), ref.current);
      ScrollTrigger.refresh();
    })();

    return () => {
      alive = false;
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ref as React.RefObject<any>;
}

/** Splits text into per-character spans for animation. */
export function splitChars(text: string) {
  return text.split("");
}
