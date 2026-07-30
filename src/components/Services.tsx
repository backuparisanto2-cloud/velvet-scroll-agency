import { motion } from "framer-motion";
import { BrainCircuit, Cloud, Cpu, Network, Server, Wrench } from "lucide-react";
import imgServer from "@/assets/img/service-server.webp.asset.json";
import imgNetwork from "@/assets/img/service-network.webp.asset.json";
import imgDevices from "@/assets/img/service-devices.webp.asset.json";
import imgManaged from "@/assets/img/service-managed.webp.asset.json";
import imgIsp from "@/assets/img/service-isp.webp.asset.json";
import imgAi from "@/assets/img/service-ai-4.webp.asset.json";
import { useT } from "@/i18n/context";

const SERVICES = [
  { icon: Server, img: imgServer.url, position: "object-center" },
  { icon: Network, img: imgNetwork.url, position: "object-center" },
  { icon: Cpu, img: imgDevices.url, position: "object-center" },
  { icon: Wrench, img: imgManaged.url, position: "object-top" },
  { icon: Cloud, img: imgIsp.url, position: "object-center" },
  { icon: BrainCircuit, img: imgAi.url, position: "object-center" },
];

export default function Services() {
  const t = useT();
  return (
    <section id="services" className="relative w-full py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
            {t.services.eyebrow}
          </span>
          <h2 className="mt-4 text-4xl leading-tight font-black tracking-tighter text-foreground sm:text-5xl">
            {t.services.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed font-light text-muted-foreground">
            {t.services.desc}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, img, position }, i) => {
            const { title, copy } = t.services.items[i];
            return (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/5 backdrop-blur-md transition-colors hover:border-foreground/20"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={img}
                  alt={title}
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={750}
                  className={`h-full w-full object-cover ${position} [image-rendering:auto] contrast-[1.06] saturate-[1.05] transition-transform duration-700 group-hover:scale-[1.03]`}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/70 to-transparent" />
                <div className="absolute top-3 right-3 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/40 backdrop-blur-md">
                  <Icon className="text-white" size={20} aria-hidden="true" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-xl leading-snug font-black tracking-tighter text-foreground">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed font-light text-muted-foreground">{copy}</p>
              </div>
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-purple-500/10 blur-[80px]" />
            </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
