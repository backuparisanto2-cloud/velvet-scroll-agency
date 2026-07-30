import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

import heroVideoSm from "@/assets/hero-city-640.mp4.asset.json";
import heroVideoLg from "@/assets/hero-city-1280.mp4.asset.json";
import heroPoster from "@/assets/hero-city-poster.jpg.asset.json";

const OUTLINE_IMG =
  "https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/hero_city_outline_fzg37d.jpg";

/** Picks the lightest source that still looks sharp on the current device. */
function pickSource() {
  if (typeof window === "undefined") return heroVideoLg.url;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (conn?.saveData) return heroVideoSm.url;
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  // Only use the 640p source when the physical pixel width really is small;
  // high-DPI phones get the 1280p source so the video stays sharp.
  return window.innerWidth * dpr <= 640 ? heroVideoSm.url : heroVideoLg.url;
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState<string | undefined>(undefined);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useEffect(() => {
    setSrc(pickSource());
  }, []);

  const radius = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const clipPath = useMotionTemplate`circle(${radius}% at 50% 50%)`;
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Base layer — sketch outline */}
        <div className="absolute inset-0">
          <motion.img
            style={{ scale }}
            src={OUTLINE_IMG}
            alt="Hand-drawn outline sketch of a future city skyline"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <h1 className="max-w-5xl text-center text-4xl leading-[1.1] font-black tracking-tighter text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)] sm:text-6xl lg:text-7xl">
              Solusi{" "}
              <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                Infrastruktur IT
              </span>
            </h1>
          </div>

        </div>

        {/* Top layer — realistic reveal */}
        <motion.div style={{ clipPath }} className="absolute inset-0">
          <motion.video
            style={{ scale }}
            src={src}
            poster={heroPoster.url}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Photorealistic city skyline at dusk"
            className="h-full w-full object-cover"
          />
          {/* Premium legibility stack: vertical falloff + centre scrim + vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-black/75" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(12,17,40,0.55)_0%,rgba(12,17,40,0.15)_45%,rgba(12,17,40,0.7)_100%)]" />
          <div className="absolute inset-0 backdrop-saturate-125 backdrop-contrast-110 sm:backdrop-blur-[1px]" />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <p className="max-w-4xl text-center text-5xl leading-[1.1] font-black tracking-tighter text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.7)] sm:text-7xl lg:text-8xl">
              Build the{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Reality
              </span>
            </p>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-xs font-bold tracking-widest text-gray-300 uppercase">Scroll</span>
          <ChevronDown className="animate-bounce text-white" size={22} aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
