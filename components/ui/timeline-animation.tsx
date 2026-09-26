"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
  type RefObject,
} from "react";

/**
 * TimelineContent — the staggered entrance components/ui/testimonial.tsx is
 * built on.
 *
 * WRITTEN HERE, NOT INSTALLED. The testimonial component imports this path but
 * the file was not part of the supplied code, and nothing in the registry
 * provides it.
 *
 * NO ANIMATION LIBRARY, DELIBERATELY. This used to be built on `motion`
 * (framer-motion). That library was the single most expensive thing on the home
 * page: a 60.7 KB chunk, 34.1 KB of it never executed, loaded on first paint so
 * that one section could fade in. Lighthouse attributed 219 ms of long-task
 * time to it directly and it was a large share of a 2,990 ms total blocking
 * time. The same effect is three CSS properties and an IntersectionObserver, so
 * that is what it is now. `motion` is no longer a dependency of this site.
 *
 * ONE SHARED TRIGGER, MANY DELAYS. Every card passes the SAME `timelineRef` —
 * the section element — and its own `animationNum`, so one observer watches the
 * group and each child staggers off the shared trigger. Giving each card its
 * own observer would let them fire independently and the stagger would fall
 * apart the moment two cards crossed the fold on different frames.
 *
 * ONCE, DELIBERATELY. The entrance plays a single time. Re-running it every
 * time the section scrolls back into view turns polish into a section that will
 * not sit still.
 *
 * REDUCED MOTION IS HANDLED HERE, NOT IN CSS. app/globals.css neutralises CSS
 * animations under `prefers-reduced-motion`, but a media query cannot reach
 * inline styles. When the preference is set the content renders in its final
 * state immediately — visible, in place, unblurred — rather than animating
 * faster.
 *
 * REMOVED PROP: `customVariants`. It took a framer `Variants` object and there
 * is no framer any more. Both call sites passed the same fade-up-and-unblur it
 * now does by default, so nothing was lost. Stagger is still per-card via
 * `animationNum`; if a caller ever needs a genuinely different curve, add a
 * named preset here rather than a prop that only one library could satisfy.
 */
type TimelineContentProps<T extends ElementType> = {
  children: ReactNode;
  /** Index in the stagger. Multiplied by `stagger` for this item's delay. */
  animationNum: number;
  /** The shared element whose visibility starts the whole sequence. */
  timelineRef: RefObject<HTMLElement | null>;
  className?: string;
  /** Element to render. Defaults to a div. */
  as?: T;
  /** Replay every time the section re-enters view. Off by default. */
  once?: boolean;
  /** Fraction of the trigger that must be visible before firing. */
  amount?: number;
  /** Seconds between consecutive `animationNum` values. */
  stagger?: number;
} & Omit<
  ComponentPropsWithoutRef<T>,
  "children" | "className" | "as" | "ref" | "style"
>;

const DURATION = 0.5;

export function TimelineContent<T extends ElementType = "div">({
  children,
  animationNum,
  timelineRef,
  className,
  as,
  once = true,
  amount = 0.1,
  stagger = 0.4,
  ...rest
}: TimelineContentProps<T>) {
  const [isInView, setIsInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  // Guards the first paint: until the effects have run we cannot know whether
  // reduced motion is set, and starting at opacity 0 on a machine that wants no
  // motion would flash the section out and back in.
  const mounted = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    mounted.current = true;
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    // A single observer per child, but all of them watch the SAME element, so
    // they resolve on the same frame and the stagger stays ordered.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold: amount },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [timelineRef, once, amount]);

  const Tag = (as ?? "div") as ElementType;

  if (reduced) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  const delay = animationNum * stagger;
  const style: CSSProperties = {
    opacity: isInView ? 1 : 0,
    transform: isInView ? "translateY(0)" : "translateY(-20px)",
    filter: isInView ? "blur(0px)" : "blur(10px)",
    transition: [
      `opacity ${DURATION}s ease ${delay}s`,
      `transform ${DURATION}s ease ${delay}s`,
      `filter ${DURATION}s ease ${delay}s`,
    ].join(", "),
    willChange: isInView ? undefined : "opacity, transform, filter",
  };

  return (
    <Tag className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}

export default TimelineContent;
