/**
 * Hand-written animation primitives.
 *
 * Everything in here is dependency-free and framework-agnostic. The goal is that
 * every hand-built motion in this site (cursor trail, pointer tilt, magnetic
 * buttons, canvas nodes) shares one easing "feel" by running through the same
 * spring integrator, rather than each effect inventing its own timing.
 */

/** Linear interpolation: 0 → a, 1 → b. */
export const lerp = (a, b, t) => a + (b - a) * t;

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/** Remap `value` from one range to another (used to map pointer position → rotation degrees). */
export const mapRange = (value, inMin, inMax, outMin, outMax) =>
  outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);

/**
 * Damped-spring integrator.
 *
 * Models `mass * accel = -stiffness * displacement - damping * velocity`, integrated
 * per frame with the real elapsed time so motion stays consistent whether the
 * display runs at 60Hz or 144Hz.
 *
 * Higher `stiffness` = snappier pull toward the target.
 * Higher `damping`   = less overshoot/wobble (damping ≈ 2*sqrt(stiffness*mass) is critical damping).
 *
 * Returns a stateful stepper; each call advances one frame and returns the new position.
 */
export function createSpring({ stiffness = 120, damping = 18, mass = 1 } = {}) {
  let position = 0;
  let velocity = 0;

  return {
    /** @param {number} target @param {number} dt seconds elapsed since last frame */
    step(target, dt) {
      // Clamp dt so a background tab / long frame can't launch the spring into orbit.
      const step = Math.min(dt, 1 / 30);
      const displacement = position - target;
      const acceleration = (-stiffness * displacement - damping * velocity) / mass;
      velocity += acceleration * step;
      position += velocity * step;
      return position;
    },
    /** Jump straight to a value without animating (used on first paint / resize). */
    set(value) {
      position = value;
      velocity = 0;
      return position;
    },
    get value() {
      return position;
    },
  };
}

/**
 * Shared requestAnimationFrame driver.
 *
 * Passes delta-time in seconds so callers integrate against real time.
 * Returns a stop() function — always call it on unmount.
 */
export function rafLoop(callback) {
  let frameId = null;
  let lastTime = performance.now();
  let running = true;

  const tick = (now) => {
    if (!running) return;
    const dt = (now - lastTime) / 1000;
    lastTime = now;
    callback(dt, now);
    frameId = requestAnimationFrame(tick);
  };

  frameId = requestAnimationFrame(tick);

  return () => {
    running = false;
    if (frameId !== null) cancelAnimationFrame(frameId);
  };
}

/**
 * Coalesces bursty events (mousemove/scroll fire far faster than we can paint)
 * down to at most one call per animation frame. Keeps only the latest arguments,
 * which is what we want for "where is the pointer now" style handlers, and avoids
 * doing layout-reading work multiple times per frame.
 */
export function rafThrottle(fn) {
  let frameId = null;
  let lastArgs = null;

  const throttled = (...args) => {
    lastArgs = args;
    if (frameId !== null) return;
    frameId = requestAnimationFrame(() => {
      frameId = null;
      fn(...lastArgs);
    });
  };

  throttled.cancel = () => {
    if (frameId !== null) cancelAnimationFrame(frameId);
    frameId = null;
  };

  return throttled;
}

/** True when the visitor asked the OS to reduce motion. Plain (non-React) check. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** True for touch/pen input, where hover-driven pointer effects don't apply. */
export const isCoarsePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
