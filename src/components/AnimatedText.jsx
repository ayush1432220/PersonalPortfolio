import React from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

/**
 * Staggered text reveal, built from plain CSS transitions.
 *
 * The string is split into word spans (wrapped in an overflow-hidden span so each
 * word slides up from behind its own mask). The stagger is just an incrementing
 * `transition-delay` per word — no animation library, no keyframes.
 *
 * Splitting by word rather than character keeps the text selectable and readable
 * to screen readers word-by-word; the full string is also exposed via aria-label
 * with the pieces hidden, so assistive tech reads one clean sentence.
 *
 * @param {string}  text      the string to animate
 * @param {number}  stagger   seconds between each word starting
 * @param {number}  duration  seconds each word takes
 * @param {string}  as        element tag to render as (h1, h2, p, ...)
 * @param {boolean} immediate reveal on mount instead of on scroll — use for
 *                            above-the-fold text, which shouldn't depend on an
 *                            IntersectionObserver to become visible at all
 */
export default function AnimatedText({
  text,
  stagger = 0.055,
  duration = 0.7,
  delay = 0,
  as: Tag = "span",
  className = "",
  wordClassName = "",
  immediate = false,
}) {
  // `immediate` skips the observer entirely and runs a pure CSS animation instead.
  const [ref, isRevealed] = useRevealOnScroll({ immediate });
  const words = String(text).split(" ");

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          // overflow-hidden gives each word its own mask to rise out of.
          className="inline-block overflow-hidden align-bottom"
        >
          <span
            className={`inline-block will-change-transform ${
              immediate ? "animate-word-rise" : ""
            } ${wordClassName}`}
            style={
              immediate
                ? // CSS-animation path: default state is visible, so a deferred or
                  // disabled animation still leaves the word readable.
                  { animationDelay: `${delay + i * stagger}s`, animationDuration: `${duration}s` }
                : // Scroll path: hidden until revealed, with a timer-based fallback
                  // inside useRevealOnScroll so it can't stay hidden forever.
                  {
                    transform: isRevealed ? "translateY(0)" : "translateY(100%)",
                    opacity: isRevealed ? 1 : 0,
                    transition: `transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1), opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
                    transitionDelay: `${delay + i * stagger}s`,
                  }
            }
          >
            {word}
          </span>
          {/* Preserve the space between words (it would collapse inside inline-block). */}
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
