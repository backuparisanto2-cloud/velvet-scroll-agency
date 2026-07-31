import { motion } from "framer-motion";
import { useT } from "@/i18n/context";
import cisco from "@/assets/img/logo-cisco.webp";
import gigabyte from "@/assets/img/logo-gigabyte.webp";
import ruijie from "@/assets/img/logo-ruijie.webp";
import dell from "@/assets/img/logo-dell.webp";
import hp from "@/assets/img/logo-hp.webp";
import ruckus from "@/assets/img/logo-ruckus.webp";
import netviel from "@/assets/img/logo-netviel.webp";
import wps from "@/assets/img/logo-wps.webp";
import fortinet from "@/assets/img/logo-fortinet.webp";
import sangfor from "@/assets/img/logo-sangfor.webp";
import apjii from "@/assets/img/logo-apjii.webp";
import apc from "@/assets/img/logo-apc.webp";

const PARTNERS = [
  { name: "Cisco", src: cisco },
  { name: "Gigabyte", src: gigabyte },
  { name: "Ruijie", src: ruijie },
  { name: "Dell", src: dell },
  { name: "HP", src: hp },
  { name: "Ruckus", src: ruckus },
  { name: "Netviel", src: netviel },
  { name: "WPS", src: wps },
  { name: "Fortinet", src: fortinet },
  { name: "Sangfor", src: sangfor },
  { name: "APJII", src: apjii },
  { name: "APC", src: apc },
];

export default function Clients() {
  const t = useT();
  return (
    <section id="partners" aria-label="Technology Partners" className="relative w-full py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex flex-col items-center gap-4"
        >
          <span className="rounded-full border border-foreground/10 bg-foreground/5 px-4 py-1.5 text-xs font-bold tracking-widest text-muted-foreground uppercase backdrop-blur-md">
            {t.partners.badge}
          </span>
          <h2 className="text-center text-3xl font-black tracking-tighter text-foreground sm:text-4xl">
            {t.partners.title}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {t.partners.titleAccent}
            </span>
          </h2>
        </motion.div>

        <ul className="grid grid-cols-3 gap-4 sm:gap-5 md:grid-cols-4 lg:grid-cols-6">
          {PARTNERS.map((p, i) => (
            <motion.li
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.06 }}
              className="group grid aspect-square place-items-center rounded-3xl border border-foreground/10 bg-foreground/[0.04] p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-foreground/25 hover:bg-foreground/[0.08]"
            >
              <img
                src={p.src}
                alt={`${p.name} logo`}
                loading="lazy"
                decoding="async"
                width={200}
                height={100}
                className="max-h-12 w-full object-contain opacity-80 invert transition-opacity duration-300 group-hover:opacity-100 dark:opacity-70 dark:invert-0"
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
