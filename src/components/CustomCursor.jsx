import React, { useEffect, useRef, useState } from "react";
import { createSpring, rafLoop, isCoarsePointer } from "../lib/animations";
import { usePrefersReducedMotion } from "./DesignSystem";

/**
 * Hand-written custom cursor with a spring trail.
 *
 * Three layers, each chasing the raw pointer position through its own spring:
 *   - dot   : very stiff → sits essentially on the pointer
 *   - ring  : medium     → lags slightly, grows over interactive elements
 *   - trail : soft       → drifts well behind, giving the sense of inertia
 *
 * All three are positioned by writing `transform` straight to the DOM inside one
 * rAF loop. Nothing here goes through React state per frame — the only state is
 * "is the cursor visible" and "are we over something interactive", which change
 * rarely.
 */

const TRAIL_COUNT = 3;

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRefs = useRef([]);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  // Kept in a ref (not state) so the rAF loop reads it without re-subscribing.
  const hoveredRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion || isCoarsePointer()) return;

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // Stiffer spring = tighter follow. Each trail dot gets progressively looser.
    const dot = { x: createSpring({ stiffness: 1200, damping: 45 }), y: createSpring({ stiffness: 1200, damping: 45 }) };
    const ring = { x: createSpring({ stiffness: 320, damping: 26 }), y: createSpring({ stiffness: 320, damping: 26 }) };
    const ringScale = createSpring({ stiffness: 260, damping: 22 });
    ringScale.set(1);
    const trails = Array.from({ length: TRAIL_COUNT }, (_, i) => ({
      x: createSpring({ stiffness: 200 - i * 45, damping: 22 }),
      y: createSpring({ stiffness: 200 - i * 45, damping: 22 }),
    }));

    const handleMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);

    const handleOver = (event) => {
      const target = event.target;
      hoveredRef.current = !!(
        target.closest?.("button") ||
        target.closest?.("a") ||
        target.closest?.("input") ||
        target.closest?.("textarea")
      );
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseover", handleOver, { passive: true });

    const stop = rafLoop((dt) => {
      const hovered = hoveredRef.current;

      const dx = dot.x.step(pointer.x, dt);
      const dy = dot.y.step(pointer.y, dt);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dx - 3}px, ${dy - 3}px, 0)`;
      }

      const rx = ring.x.step(pointer.x, dt);
      const ry = ring.y.step(pointer.y, dt);
      const rs = ringScale.step(hovered ? 1.8 : 1, dt);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0) scale(${rs.toFixed(3)})`;
        ringRef.current.style.borderColor = hovered
          ? "rgba(236, 72, 153, 0.7)"
          : "rgba(168, 85, 247, 0.45)";
      }

      trails.forEach((trail, i) => {
        const tx = trail.x.step(pointer.x, dt);
        const ty = trail.y.step(pointer.y, dt);
        const node = trailRefs.current[i];
        if (node) {
          const size = 6 - i * 1.2;
          node.style.transform = `translate3d(${tx - size / 2}px, ${ty - size / 2}px, 0)`;
        }
      });
    });

    return () => {
      stop();
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseover", handleOver);
    };
  }, [isVisible, prefersReducedMotion]);

  if (prefersReducedMotion || !isVisible) return null;

  return (
    <>
      {/* Soft trailing dots, drawn behind the ring. */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          aria-hidden="true"
          className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-cyan-400 hidden md:block"
          style={{
            width: `${6 - i * 1.2}px`,
            height: `${6 - i * 1.2}px`,
            opacity: 0.35 - i * 0.09,
          }}
        />
      ))}

      {/* Outer ring — expands over interactive elements. */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-50 w-8 h-8 rounded-full border bg-purple-500/10 backdrop-blur-[1px] hidden md:block"
        style={{ borderColor: "rgba(168, 85, 247, 0.45)" }}
      />

      {/* Precision dot — rides the pointer. */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-50 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] hidden md:block"
      />
    </>
  );
}
