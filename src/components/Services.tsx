import { motion } from "framer-motion";
import { LineChart, PenTool, Sparkles, TrendingUp } from "lucide-react";

const SERVICES = [
  {
    icon: PenTool,
    title: "UI/UX Design",
    copy: "Interfaces engineered around intent — research, flows, and pixel-exact systems that make complex products feel effortless.",
  },
  {
    icon: Sparkles,
    title: "Visual Graphic",
    copy: "Identity, motion, and art direction that gives your brand a look nobody else can borrow.",
  },
  {
    icon: LineChart,
    title: "Strategy",
    copy: "Positioning, roadmaps, and measurable design decisions grounded in how your market actually behaves.",
  },
  {
    icon: TrendingUp,
    title: "Business Growth",
    copy: "Conversion-focused experiments, funnels, and iteration loops that turn traffic into durable revenue.",
  },
];

export default function Services() {
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
          <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
            What we do
          </span>
          <h2 className="mt-4 text-4xl leading-tight font-black tracking-tighter text-white sm:text-5xl">
            Services Built Specifically for your Business
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map(({ icon: Icon, title, copy }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-colors hover:border-white/20"
            >
              <div className="absolute top-0 right-0 grid h-24 w-24 place-items-center rounded-bl-[6rem] bg-white/5 transition-colors group-hover:bg-white/10">
                <Icon className="mt-2 mr-2 text-white" size={26} aria-hidden="true" />
              </div>
              <div className="max-w-[80%]">
                <h3 className="text-2xl font-black tracking-tighter text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed font-light text-gray-400">{copy}</p>
              </div>
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-purple-500/10 blur-[80px]" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
