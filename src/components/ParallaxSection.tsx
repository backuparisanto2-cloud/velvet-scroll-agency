import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

type Props = {
  children: ReactNode;
  /** Parallax depth in pixels. Higher = travels further. */
  strength?: number;
  /** Fade in/out along with the parallax travel. */
  fade?: boolean;
  className?: string;
};

/**
 * Wraps a section and gives it a smooth, spring-damped parallax as it
 * scrolls through the viewport. Purely transform-based (no layout shift)
 * and disabled entirely when the user prefers reduced motion.
 */
export default function ParallaxSection({
  children,
  strength = 60,
  fade = true,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.4,
    restDelta: 0.001,
  });

  const y = useTransform(smooth, [0, 1], [strength, -strength]);
  const opacity = useTransform(smooth, [0, 0.18, 0.85, 1], [0.35, 1, 1, 0.45]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, opacity: fade ? opacity : 1, willChange: "transform" }}>
        {children}
      </motion.div>
    </div>
  );
}
