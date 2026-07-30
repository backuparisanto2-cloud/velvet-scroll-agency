import { motion } from "framer-motion";
import { Camera, CreditCard, Globe2, Hexagon, ShoppingBag, Tv } from "lucide-react";

const CLIENTS = [
  { icon: Camera, name: "Instagram" },
  { icon: ShoppingBag, name: "Shopify" },
  { icon: Hexagon, name: "HubSpot" },
  { icon: Tv, name: "CNBC" },
  { icon: Globe2, name: "BUSINESS INSIDER" },
  { icon: CreditCard, name: "stripe" },
];

export default function Clients() {
  const track = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section aria-label="Our clients" className="relative w-full py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mx-auto mb-14 flex max-w-6xl flex-col items-center gap-4 px-4 sm:px-6 lg:px-8"
      >
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold tracking-widest text-gray-300 uppercase backdrop-blur-md">
          Interested
        </span>
        <h2 className="text-center text-3xl font-black tracking-tighter text-white sm:text-4xl">
          Trusted by 300+ businesses
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
          {track.map(({ icon: Icon, name }, i) => (
            <div
              key={`${name}-${i}`}
              className="flex shrink-0 items-center gap-3 text-gray-400 transition-colors hover:text-white"
            >
              <Icon size={26} aria-hidden="true" />
              <span className="text-lg font-semibold tracking-tight whitespace-nowrap">{name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
