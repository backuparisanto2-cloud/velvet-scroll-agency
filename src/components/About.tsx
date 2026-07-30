import { motion } from "framer-motion";

const STATS = [
  { value: "10+", label: "Years Experience" },
  { value: "150+", label: "Global Clients" },
];

export default function About() {
  return (
    <section id="agency" className="relative w-full overflow-hidden py-32">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
            The Agency
          </span>
          <h2 className="mt-4 text-4xl leading-[1.1] font-black tracking-tighter text-white sm:text-5xl lg:text-6xl">
            Design is not just what it looks like. It&apos;s how it feels.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col justify-center gap-8"
        >
          <p className="text-base leading-relaxed font-light text-gray-300">
            We are a small, senior studio working with founders and product teams who care about
            craft. Every engagement starts with the messy part — the strategy, the constraints, the
            things nobody wants to write down — and ends with an interface that carries the weight
            of the idea.
          </p>
          <p className="text-base leading-relaxed font-light text-gray-400">
            No handoff theatre, no template libraries. Just a team that ships work it would be
            happy to sign.
          </p>

          <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-4xl font-black tracking-tighter text-transparent sm:text-5xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs font-bold tracking-widest text-gray-400 uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
