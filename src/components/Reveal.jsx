import React from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

/**
 * Scroll-triggered entrance wrapper.
 *
 * Exists as a component (rather than calling the hook inline) because hooks
 * can't be called inside a .map() — each item needs its own observer.
 *
 * Reveals are deliberately ONE-SHOT: `useRevealOnScroll` disconnects its observer
 * after firing, so scrolling back and forth past a section doesn't re-run the
 * entrance every time (which reads as a glitch). The one intentional exception is
 * the Skills grid, which remounts on filter change to re-stagger — see SkillSection.
 *
 * Under reduced motion the hook reports revealed immediately, so content simply
 * appears with no transform.
 *
 * @param {number}  delay      seconds to wait before this item animates (used for stagger)
 * @param {string}  from       "up" | "left" | "right" | "scale"
 * @param {number}  distance   px travelled for directional variants
 * @param {boolean} immediate  skip the observer and animate on mount
 */
export default function Reveal({
  children,
  delay = 0,
  from = "up",
  distance = 16,
  duration = 0.55,
  immediate = false,
  className = "",
}) {
  const [ref, isRevealed] = useRevealOnScroll({ immediate });

  const hiddenTransform = {
    up: `translateY(${distance}px)`,
    left: `translateX(-${distance}px)`,
    right: `translateX(${distance}px)`,
    scale: "scale(0.96)",
  }[from];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? "none" : hiddenTransform,
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}s`,
        willChange: isRevealed ? "auto" : "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
