import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import imgGombong from "@/assets/img/project-pku-gombong.webp";
import imgPlataran from "@/assets/img/project-plataran.webp";
import imgSiaga from "@/assets/img/project-siaga-medika.webp";
import imgIsp from "@/assets/img/service-isp.webp";
import imgMargono from "@/assets/img/project-margono.webp";
import imgTeras from "@/assets/img/project-teras-sudirman.webp";
import { useT } from "@/i18n/context";

const PROJECTS = [
  { img: imgGombong, position: "object-center" },
  { img: imgPlataran, position: "object-center" },
  { img: imgSiaga, position: "object-center" },
  { img: imgIsp, position: "object-center" },
  { img: imgMargono, position: "object-top" },
  { img: imgTeras, position: "object-center" },
];


export default function Work() {
  const t = useT();
  const [active, setActive] = useState(0);

  return (
    <section id="work" className="relative w-full py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex flex-col gap-5 sm:grid sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-4"
        >
          <div className="min-w-0">
            <h2 className="text-4xl font-black tracking-tighter text-foreground sm:text-5xl">
              {t.work.title}{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {t.work.titleAccent}
              </span>
            </h2>
            <p className="mt-3 text-base font-light text-muted-foreground">
              {t.work.desc}
            </p>
          </div>
          <a
            href="https://wa.me/6281212951737?text=Hai%20Mentarisatria%20saya%20ingin%20berkonsultasi%20mengenai"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.work.cta}
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </motion.div>

        <div className="flex h-auto flex-col gap-3 md:h-[400px] md:flex-row">
          {PROJECTS.map((project, i) => {
            const isActive = active === i;
            const p = { ...project, ...t.work.items[i] };
            return (
              <motion.article
                key={p.name}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                animate={{ flexGrow: isActive ? 4 : 0.8 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="group relative h-72 min-w-0 shrink cursor-pointer overflow-hidden rounded-3xl border border-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60 md:h-full md:basis-0"
              >
                <img
                  src={p.img}
                  alt={`${p.name} — ${p.tag}`}
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={800}
                  className={`absolute inset-0 h-full w-full object-cover ${p.position} transition-transform duration-700 group-hover:scale-105 contrast-[1.06] saturate-[1.05] [image-rendering:auto]`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 min-w-0 p-5 sm:p-6">
                  <span className="block text-[10px] font-bold tracking-[0.18em] text-blue-300 uppercase sm:text-[11px]">
                    {p.tag}
                  </span>
                  <h3 className="mt-2 text-base leading-snug font-black tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] sm:text-xl">
                    {p.name}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed font-light text-gray-200 md:hidden">
                    {p.copy}
                  </p>
                  <motion.p
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-2 hidden max-w-md text-sm leading-relaxed font-light text-gray-200 md:block"
                    style={{ pointerEvents: isActive ? "auto" : "none" }}
                  >
                    {p.copy}
                  </motion.p>
                </div>

              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
