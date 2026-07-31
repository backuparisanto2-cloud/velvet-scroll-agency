import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useT } from "@/i18n/context";

import heroVideoSm from "@/assets/hero-city-640.mp4";
import heroVideoLg from "@/assets/hero-city-1280.mp4";
import heroPoster from "@/assets/hero-city-poster.jpg";

const OUTLINE_IMG =
  "https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/hero_city_outline_fzg37d.jpg";

/** Picks the lightest source that still looks sharp on the current device. */
function pickSource() {
  if (typeof window === "undefined") return heroVideoLg;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (conn?.saveData) return heroVideoSm;
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  // Only use the 640p source when the physical pixel width really is small;
  // high-DPI phones get the 1280p source so the video stays sharp.
  return window.innerWidth * dpr <= 640 ? heroVideoSm : heroVideoLg;
}

export default function Hero() {
  const t = useT();
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
          <div className="absolute inset-0 bg-white/70 dark:bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/25 to-white/85 dark:from-black/60 dark:via-transparent dark:to-black/70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6">
            <p className="text-center text-xs font-semibold tracking-[0.2em] text-slate-700 uppercase drop-shadow-[0_1px_6px_rgba(255,255,255,0.9)] sm:text-sm dark:text-gray-200 dark:drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {t.hero.eyebrow}
            </p>
            <h1 className="max-w-5xl text-center text-4xl leading-[1.1] font-black tracking-tighter text-slate-900 drop-shadow-[0_1px_10px_rgba(255,255,255,0.85)] sm:text-6xl lg:text-7xl dark:text-white dark:drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]">
              {t.hero.sketchTitle}{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-200 dark:to-purple-200">
                {t.hero.sketchTitleAccent}
              </span>
            </h1>
          </div>
        </div>

        {/* Top layer — realistic reveal */}
        <motion.div style={{ clipPath }} className="absolute inset-0">
          <motion.video
            style={{ scale }}
            src={src}
            poster={heroPoster}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Photorealistic city skyline at dusk"
            className="h-full w-full object-cover"
          />
          {/* Premium legibility stack: vertical falloff + centre scrim + vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/45 to-white/85 dark:from-black/65 dark:via-black/25 dark:to-black/75" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.25)_45%,rgba(255,255,255,0.75)_100%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(12,17,40,0.55)_0%,rgba(12,17,40,0.15)_45%,rgba(12,17,40,0.7)_100%)]" />
          <div className="absolute inset-0 backdrop-saturate-125 backdrop-contrast-110 sm:backdrop-blur-[1px]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6">
            <p className="text-center text-xs font-semibold tracking-[0.2em] text-slate-700 uppercase drop-shadow-[0_1px_6px_rgba(255,255,255,0.9)] sm:text-sm dark:text-gray-200 dark:drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              {t.hero.eyebrow}
            </p>
            <p className="max-w-5xl text-center text-4xl leading-[1.1] font-black tracking-tighter text-slate-900 drop-shadow-[0_1px_12px_rgba(255,255,255,0.85)] sm:text-6xl lg:text-7xl dark:text-white dark:drop-shadow-[0_2px_28px_rgba(0,0,0,0.7)]">
              {t.hero.title}{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-500">
                {t.hero.titleAccent}
              </span>
            </p>
            <p className="max-w-2xl text-center text-sm leading-relaxed font-light text-slate-700 drop-shadow-[0_1px_6px_rgba(255,255,255,0.9)] sm:text-base dark:text-gray-200 dark:drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {t.hero.desc}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/6281212951737?text=Hai%20Mentarisatria%20saya%20ingin%20berkonsultasi%20mengenai"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-slate-900 px-7 py-3.5 text-sm font-bold text-white transition-transform duration-200 hover:scale-105 active:scale-95 dark:bg-white dark:text-black"
              >
                {t.hero.cta1}
              </a>
              <a
                href="#contact"
                className="rounded-full border border-slate-900/20 bg-white/60 px-7 py-3.5 text-sm font-bold text-slate-900 backdrop-blur-md transition-transform duration-200 hover:scale-105 active:scale-95 dark:border-white/25 dark:bg-white/10 dark:text-white"
              >
                {t.hero.cta2}
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-xs font-bold tracking-widest text-slate-700 uppercase dark:text-gray-300">
            {t.hero.scroll}
          </span>
          <ChevronDown
            className="animate-bounce text-slate-900 dark:text-white"
            size={22}
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  );
}
