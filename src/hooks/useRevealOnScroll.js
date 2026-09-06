import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../components/DesignSystem";

/**
 * Hand-written IntersectionObserver reveal.
 *
 * Returns `[ref, isRevealed]`. Once the element crosses into view it latches to
 * revealed and stops observing — reveals are one-shot, and un-revealing on scroll
 * back up reads as a glitch rather than an effect.
 *
 * Under reduced motion it starts revealed, so content is never left hidden.
 *
 * NOTE: this is for hand-built elements only (e.g. AnimatedText). The existing
 * sections keep their own Framer Motion reveals — deliberately not layering two
 * reveal systems onto the same node.
 */
export function useRevealOnScroll({
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px",
  /** Skip the observer entirely and reveal on mount — for above-the-fold content. */
  immediate = false,
  /**
   * Safety net: force-reveal after this many ms even if the observer never fires.
   * Content must never be left permanently invisible because an observer was
   * throttled, suspended in a background tab, or unsupported.
   */
  fallbackMs = 1200,
} = {}) {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isRevealed, setIsRevealed] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsRevealed(true);
      return;
    }

    // Content that should animate on mount rather than on scroll.
    //
    // rAF gives the browser one frame at the initial state so the transition
    // actually plays — but rAF is suspended entirely in a background/hidden tab,
    // which would leave the element stuck in its hidden state (e.g. progress bars
    // frozen at 0%). The timer is the safety net: it still fires when rAF doesn't,
    // so the worst case is "appears without animating" rather than "never appears".
    if (immediate) {
      const frameId = requestAnimationFrame(() => setIsRevealed(true));
      const timerId = setTimeout(() => setIsRevealed(true), 250);
      return () => {
        cancelAnimationFrame(frameId);
        clearTimeout(timerId);
      };
    }

    const el = ref.current;
    if (!el) return;

    const timeoutId = setTimeout(() => setIsRevealed(true), fallbackMs);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [threshold, rootMargin, prefersReducedMotion, immediate, fallbackMs]);

  return [ref, isRevealed];
}
