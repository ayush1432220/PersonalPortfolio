import React, { useEffect, useRef } from "react";
import { rafLoop, rafThrottle, clamp } from "../lib/animations";
import { usePrefersReducedMotion } from "./DesignSystem";
import { useTheme } from "./ThemeProvider";

/**
 * "Neural Constellation" — hand-written Canvas2D node network.
 *
 * Nodes drift on their own velocity. Any two nodes closer than `connectionDistance`
 * get a line whose alpha falls off with distance, so the mesh appears to knit and
 * unknit itself as nodes pass each other. Two interactions layer on top:
 *
 *  - Cursor: nodes within `POINTER_RADIUS` are pulled gently toward the pointer and
 *    their links brighten, so the mesh "wakes up" locally around the cursor.
 *  - Scroll: scroll delta is converted into a decaying vertical drift applied to
 *    every node, so fast scrolling visibly pushes the field and then settles.
 *
 * Tuning knobs live in the props + the CONFIG block below.
 */

const CONFIG = {
  // How far apart two nodes can be (px) and still be linked.
  CONNECTION_DISTANCE: 130,
  // Pointer influence radius (px) and pull strength.
  POINTER_RADIUS: 160,
  POINTER_PULL: 26,
  // How strongly scroll velocity pushes the field, and how fast that push decays.
  SCROLL_PUSH: 0.05,
  SCROLL_DECAY: 0.92,
  // Node drift speed range (px/sec).
  MIN_SPEED: 4,
  MAX_SPEED: 18,
  NODE_RADIUS: 1.6,
  // One node per this many square px of canvas (lower = denser).
  AREA_PER_NODE: 14000,
  MAX_NODES: 90,
};

/** Palette per theme. Light mode needs darker, more opaque strokes to stay visible. */
const PALETTE = {
  dark: { node: "168, 85, 247", link: "34, 211, 238", nodeAlpha: 0.75, linkAlpha: 0.5 },
  light: { node: "109, 40, 217", link: "8, 145, 178", nodeAlpha: 0.65, linkAlpha: 0.4 },
};

export default function NeuralConstellation({
  density = 1,
  opacity = 0.6,
  className = "",
}) {
  const canvasRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const palette = PALETTE[theme] || PALETTE.dark;
    let width = 0;
    let height = 0;
    let nodes = [];

    // Pointer position in canvas space; -Infinity means "pointer not over this canvas".
    const pointer = { x: -Infinity, y: -Infinity };
    let scrollPush = 0;
    let lastScrollY = window.scrollY;

    /**
     * Node count scales with canvas area, then gets cut back on touch devices and
     * low-core machines so weaker hardware isn't asked to draw the same mesh.
     */
    const computeNodeCount = () => {
      const area = width * height;
      const cores = navigator.hardwareConcurrency || 4;
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      let count = (area / CONFIG.AREA_PER_NODE) * density;
      if (isCoarse) count *= 0.5;
      if (cores <= 4) count *= 0.6;
      return Math.round(clamp(count, 12, CONFIG.MAX_NODES));
    };

    const createNodes = () => {
      const count = computeNodeCount();
      nodes = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed =
          CONFIG.MIN_SPEED + Math.random() * (CONFIG.MAX_SPEED - CONFIG.MIN_SPEED);
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        };
      });
    };

    const resize = () => {
      // Cap DPR at 2 — beyond that we pay 3-4x the fill cost for no visible gain.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createNodes();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Links first so nodes sit on top of them.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = CONFIG.CONNECTION_DISTANCE;
          if (distSq > maxDist * maxDist) continue;

          const dist = Math.sqrt(distSq);
          // Fade the link out as the pair separates.
          let alpha = (1 - dist / maxDist) * palette.linkAlpha;

          // Links near the pointer brighten and thicken — the "wake up" effect.
          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2;
          const pdx = midX - pointer.x;
          const pdy = midY - pointer.y;
          const pointerDist = Math.sqrt(pdx * pdx + pdy * pdy);
          const nearPointer =
            pointerDist < CONFIG.POINTER_RADIUS
              ? 1 - pointerDist / CONFIG.POINTER_RADIUS
              : 0;
          alpha += nearPointer * 0.45;

          ctx.strokeStyle = `rgba(${palette.link}, ${clamp(alpha, 0, 1)})`;
          ctx.lineWidth = 0.6 + nearPointer * 1.1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = `rgba(${palette.node}, ${palette.nodeAlpha})`;
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, CONFIG.NODE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const update = (dt) => {
      // Decay the scroll impulse so the field settles after the user stops.
      scrollPush *= CONFIG.SCROLL_DECAY;

      for (const node of nodes) {
        node.x += node.vx * dt;
        node.y += node.vy * dt + scrollPush;

        // Pointer attraction, strongest at the centre of the influence radius.
        const dx = pointer.x - node.x;
        const dy = pointer.y - node.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < CONFIG.POINTER_RADIUS * CONFIG.POINTER_RADIUS && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const pull = (1 - dist / CONFIG.POINTER_RADIUS) * CONFIG.POINTER_PULL;
          node.x += (dx / dist) * pull * dt;
          node.y += (dy / dist) * pull * dt;
        }

        // Wrap around the edges so the field never empties out.
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;
      }
    };

    resize();
    // Paint one frame synchronously so the canvas is never blank before the first
    // rAF tick (also covers re-setup after a theme change or a resize).
    draw();

    // Reduced motion: paint one static frame, attach nothing else.
    if (prefersReducedMotion) {
      draw();
      const staticResize = rafThrottle(() => {
        resize();
        draw();
      });
      window.addEventListener("resize", staticResize);
      return () => {
        staticResize.cancel();
        window.removeEventListener("resize", staticResize);
      };
    }

    const handleResize = rafThrottle(resize);
    const handlePointerMove = rafThrottle((event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    });
    const handlePointerLeave = () => {
      pointer.x = -Infinity;
      pointer.y = -Infinity;
    };
    const handleScroll = rafThrottle(() => {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      // Clamp so a jump-to-anchor doesn't fling the whole field off-canvas.
      scrollPush = clamp(scrollPush + delta * CONFIG.SCROLL_PUSH, -14, 14);
    });

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);

    // Only run the loop while the canvas is actually on screen AND the tab is visible.
    let stopLoop = null;
    let onScreen = false;

    const startLoop = () => {
      if (stopLoop || document.hidden || !onScreen) return;
      stopLoop = rafLoop((dt) => {
        update(dt);
        draw();
      });
    };
    const pauseLoop = () => {
      if (stopLoop) stopLoop();
      stopLoop = null;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) startLoop();
        else pauseLoop();
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const handleVisibility = () => {
      if (document.hidden) pauseLoop();
      else startLoop();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      pauseLoop();
      observer.disconnect();
      handleResize.cancel();
      handlePointerMove.cancel();
      handleScroll.cancel();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [density, prefersReducedMotion, theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
      style={{ opacity }}
    />
  );
}
