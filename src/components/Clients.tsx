import { motion } from "framer-motion";

const PARTNERS = [
  "Cisco",
  "Dell",
  "HP",
  "Fortinet",
  "Ruijie",
  "Ruckus",
  "Gigabyte",
  "Sangfor",
  "APC",
  "APJII",
  "Netviel",
  "WPS",
];

export default function Clients() {
  const track = [...PARTNERS, ...PARTNERS];

  return (
    <section aria-label="Technology Partners" className="relative w-full py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mx-auto mb-14 flex max-w-6xl flex-col items-center gap-4 px-4 sm:px-6 lg:px-8"
      >
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold tracking-widest text-gray-300 uppercase backdrop-blur-md">
          Partner
        </span>
        <h2 className="text-center text-3xl font-black tracking-tighter text-white sm:text-4xl">
          Technology Partners
        </h2>
      </motion.div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0c1128] to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0c1128] to-transparent sm:w-40" />

        <motion.div
          className="flex w-max items-center gap-16 pr-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {track.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 text-lg font-semibold tracking-tight whitespace-nowrap text-gray-400 transition-colors hover:text-white"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
