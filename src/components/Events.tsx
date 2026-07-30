import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import event2022 from "@/assets/img/event-2022.webp.asset.json";
import eventHpe from "@/assets/img/event-hpe.webp.asset.json";
import eventDell from "@/assets/img/event-dell.webp.asset.json";
import eventRuijie from "@/assets/img/event-ruijie.webp.asset.json";
import { useT } from "@/i18n/context";

const EVENTS = [
  { img: event2022.url, position: "object-center" },
  { img: eventHpe.url, position: "object-center" },
  { img: eventDell.url, position: "object-top" },
  { img: eventRuijie.url, position: "object-center" },
];

export default function Events() {
  const t = useT();
  return (
    <section id="events" className="relative w-full py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-14 max-w-2xl"
        >
          <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
            {t.events.eyebrow}
          </span>
          <h2 className="mt-4 text-4xl leading-tight font-black tracking-tighter text-foreground sm:text-5xl">
            {t.events.title}
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {EVENTS.map((item, i) => {
            const e = { ...item, ...t.events.items[i] };
            return (
            <motion.article
              key={e.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/5 backdrop-blur-md transition-colors hover:border-foreground/20"
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={e.img}
                  alt={e.title}
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={750}
                  className={`h-full w-full object-cover ${e.position} transition-transform duration-700 group-hover:scale-105`}
                />
              </div>
              <div className="p-7">
                <h3 className="text-lg leading-snug font-black tracking-tighter text-foreground">
                  {e.title}
                </h3>
                <p className="mt-3 flex items-center gap-2 text-sm font-light text-muted-foreground">
                  <CalendarDays size={15} aria-hidden="true" />
                  {e.place}
                </p>
              </div>
            </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
