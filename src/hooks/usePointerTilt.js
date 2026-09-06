import { useEffect, useRef } from "react";
import { createSpring, rafLoop, rafThrottle, mapRange, clamp, isCoarsePointer } from "../lib/animations";
import { usePrefersReducedMotion } from "../components/DesignSystem";

/**
 * Perspective tilt driven by pointer position.
 *
 * Maps the pointer's position inside the element to rotateX/rotateY, then eases
 * toward that target with the shared spring so the card settles instead of
 * snapping. The transform is written directly to the node — deliberately not
 * through React state, since that would re-render on every mousemove.
 *
 * @param {object}  options
 * @param {number}  options.max        peak rotation in degrees at the element's edge
 * @param {number}  options.scale      scale applied while hovering (1 = none)
 * @param {number}  options.perspective px of perspective; lower = more dramatic
 */
export function usePointerTilt({ max = 12, scale = 1, perspective = 900 } = {}) {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    // Tilt is a hover affordance — meaningless on touch, unwanted under reduced motion.
    if (!el || prefersReducedMotion || isCoarsePointer()) return;

    // One spring per axis, plus one for the hover scale, so they settle independently.
    const rotX = createSpring({ stiffness: 140, damping: 16 });
    const rotY = createSpring({ stiffness: 140, damping: 16 });
    const scaleSpring = createSpring({ stiffness: 160, damping: 20 });
    scaleSpring.set(1);

    let targetX = 0;
    let targetY = 0;
    let targetScale = 1;
    let active = false;

    const handleMove = rafThrottle((event) => {
      const rect = el.getBoundingClientRect();
      // Normalise pointer position to -1..1 across each axis of the element.
      const px = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      const py = clamp((event.clientY - rect.top) / rect.height, 0, 1);
      // Y position drives rotateX (inverted: pointer high = card tips back).
      targetX = mapRange(py, 0, 1, max, -max);
      targetY = mapRange(px, 0, 1, -max, max);
    });

    const handleEnter = () => {
      active = true;
      targetScale = scale;
    };

    const handleLeave = () => {
      active = false;
      targetX = 0;
      targetY = 0;
      targetScale = 1;
    };

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mousemove", handleMove, { passive: true });
    el.addEventListener("mouseleave", handleLeave);

    const stop = rafLoop((dt) => {
      const x = rotX.step(targetX, dt);
      const y = rotY.step(targetY, dt);
      const s = scaleSpring.step(targetScale, dt);

      // Skip the write once everything has effectively settled at rest.
      if (!active && Math.abs(x) < 0.01 && Math.abs(y) < 0.01 && Math.abs(s - 1) < 0.001) {
        el.style.transform = "";
        return;
      }

      el.style.transform = `perspective(${perspective}px) rotateX(${x.toFixed(3)}deg) rotateY(${y.toFixed(3)}deg) scale(${s.toFixed(4)})`;
    });

    return () => {
      stop();
      handleMove.cancel();
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      el.style.transform = "";
    };
  }, [max, scale, perspective, prefersReducedMotion]);

  return ref;
}
