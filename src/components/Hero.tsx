import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

import heroVideo from "@/assets/hero-city.mp4.asset.json";

const OUTLINE_IMG =
  "https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/hero_city_outline_fzg37d.jpg";
const REAL_POSTER =
  "https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/hero_city_iglhwn.jpg";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

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
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <h1 className="max-w-4xl text-center text-5xl leading-[1.1] font-black tracking-tighter text-white sm:text-7xl lg:text-8xl">
              Imagine the{" "}
              <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                Future
              </span>
            </h1>
          </div>
        </div>

        {/* Top layer — realistic reveal */}
        <motion.div style={{ clipPath }} className="absolute inset-0">
          <motion.video
            style={{ scale }}
            src={heroVideo.url}
            poster={REAL_POSTER}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label="Photorealistic city skyline at dusk"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <p className="max-w-4xl text-center text-5xl leading-[1.1] font-black tracking-tighter text-white sm:text-7xl lg:text-8xl">
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
