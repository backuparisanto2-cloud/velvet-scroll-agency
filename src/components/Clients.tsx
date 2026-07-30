import { motion } from "framer-motion";
import cisco from "@/assets/img/logo-cisco.webp.asset.json";
import gigabyte from "@/assets/img/logo-gigabyte.webp.asset.json";
import ruijie from "@/assets/img/logo-ruijie.webp.asset.json";
import dell from "@/assets/img/logo-dell.webp.asset.json";
import hp from "@/assets/img/logo-hp.webp.asset.json";
import ruckus from "@/assets/img/logo-ruckus.webp.asset.json";
import netviel from "@/assets/img/logo-netviel.webp.asset.json";
import wps from "@/assets/img/logo-wps.webp.asset.json";
import fortinet from "@/assets/img/logo-fortinet.webp.asset.json";
import sangfor from "@/assets/img/logo-sangfor.webp.asset.json";
import apjii from "@/assets/img/logo-apjii.webp.asset.json";
import apc from "@/assets/img/logo-apc.webp.asset.json";

const PARTNERS = [
  { name: "Cisco", src: cisco.url },
  { name: "Gigabyte", src: gigabyte.url },
  { name: "Ruijie", src: ruijie.url },
  { name: "Dell", src: dell.url },
  { name: "HP", src: hp.url },
  { name: "Ruckus", src: ruckus.url },
  { name: "Netviel", src: netviel.url },
  { name: "WPS", src: wps.url },
  { name: "Fortinet", src: fortinet.url },
  { name: "Sangfor", src: sangfor.url },
  { name: "APJII", src: apjii.url },
  { name: "APC", src: apc.url },
];

export default function Clients() {
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
            Partner
          </span>
          <h2 className="text-center text-3xl font-black tracking-tighter text-foreground sm:text-4xl">
            Technology{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Partners
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
                className="max-h-12 w-full object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-100"
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
