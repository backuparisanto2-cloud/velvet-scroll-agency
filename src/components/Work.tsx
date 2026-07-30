import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    name: "Pixzen",
    tag: "Brand & Product",
    copy: "A creative suite rebuilt around a single, calm canvas.",
    img: "https://strvid.nyc3.cdn.digitaloceanspaces.com/motionitems/1781522720269-Pixzen.webp",
  },
  {
    name: "Wander",
    tag: "Travel Platform",
    copy: "Trip planning that feels like daydreaming, not admin.",
    img: "https://strvid.nyc3.cdn.digitaloceanspaces.com/motionitems/1781631791578-Wander_Hero.webp",
  },
  {
    name: "Agentify",
    tag: "AI SaaS",
    copy: "An agent console dense with data yet quiet to read.",
    img: "https://strvid.nyc3.cdn.digitaloceanspaces.com/motionitems/1781671943344-Agentify_Hero.webp",
  },
  {
    name: "Future",
    tag: "Editorial",
    copy: "A carousel-led story format built for long attention.",
    img: "https://strvid.nyc3.cdn.digitaloceanspaces.com/motionitems/1781679053418-Future_Carousel.webp",
  },
  {
    name: "Genova",
    tag: "Fintech",
    copy: "Trust rendered in typography, spacing, and restraint.",
    img: "https://strvid.nyc3.cdn.digitaloceanspaces.com/motionitems/1781670271708-Genova_Hero.webp",
  },
];

export default function Work() {
  const [active, setActive] = useState(0);

  return (
    <section id="work" className="relative w-full py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"
        >
          <h2 className="min-w-0 text-4xl font-black tracking-tighter text-white sm:text-5xl">
            Our Works
          </h2>
          <a
            href="#work"
            className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-gray-300 transition-colors hover:text-white"
          >
            View All Projects
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </motion.div>

        <div className="flex h-auto flex-col gap-3 md:h-[400px] md:flex-row">
          {PROJECTS.map((p, i) => {
            const isActive = active === i;
            return (
              <motion.article
                key={p.name}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                animate={{ flexGrow: isActive ? 4 : 0.8 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="group relative h-72 min-w-0 shrink cursor-pointer overflow-hidden rounded-3xl border border-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 md:h-full md:basis-0"

              >
                <img
                  src={p.img}
                  alt={`${p.name} — ${p.tag} case study`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="text-xs font-bold tracking-widest text-gray-300 uppercase">
                    {p.tag}
                  </span>
                  <h3 className="mt-1 text-2xl font-black tracking-tighter text-white">{p.name}</h3>
                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                    transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="mt-2 max-w-sm text-sm leading-relaxed font-light text-gray-300">
                      {p.copy}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-bold text-black transition-transform duration-200 hover:scale-105 active:scale-95">
                      View Case Study <ArrowUpRight size={14} />
                    </span>
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
