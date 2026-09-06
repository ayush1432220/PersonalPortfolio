import { useEffect, useRef } from "react";
import { createSpring, rafLoop, rafThrottle, clamp, isCoarsePointer } from "../lib/animations";
import { usePrefersReducedMotion } from "../components/DesignSystem";

/**
 * Magnetic hover: the element drifts toward the cursor once the cursor is within
 * `radius` px of its centre, and springs back to rest when the cursor leaves.
 *
 * Pull falls off linearly with distance, so the element leans hardest when the
 * cursor is right on it and barely moves at the edge of the field — that falloff
 * is what makes it read as attraction rather than as the element just following
 * the mouse. Listens on window (not the element) so the pull starts *before*
 * the cursor actually reaches the button.
 *
 * @param {number} strength how far (px) the element can travel at maximum pull
 * @param {number} radius   px around the element's centre where the pull applies
 */
export function useMagnetic({ strength = 14, radius = 90 } = {}) {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion || isCoarsePointer()) return;

    const springX = createSpring({ stiffness: 170, damping: 15 });
    const springY = createSpring({ stiffness: 170, damping: 15 });

    let targetX = 0;
    let targetY = 0;

    const handleMove = rafThrottle((event) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const dist = Math.hypot(dx, dy);

      if (dist > radius) {
        targetX = 0;
        targetY = 0;
        return;
      }

      // Linear falloff: 1 at the centre → 0 at the edge of the radius.
      const pull = 1 - dist / radius;
      targetX = clamp(dx * pull * (strength / radius) * 4, -strength, strength);
      targetY = clamp(dy * pull * (strength / radius) * 4, -strength, strength);
    });

    window.addEventListener("mousemove", handleMove, { passive: true });

    const stop = rafLoop((dt) => {
      const x = springX.step(targetX, dt);
      const y = springY.step(targetY, dt);

      if (Math.abs(x) < 0.01 && Math.abs(y) < 0.01 && targetX === 0 && targetY === 0) {
        el.style.transform = "";
        return;
      }
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    });

    return () => {
      stop();
      handleMove.cancel();
      window.removeEventListener("mousemove", handleMove);
      el.style.transform = "";
    };
  }, [strength, radius, prefersReducedMotion]);

  return ref;
}
