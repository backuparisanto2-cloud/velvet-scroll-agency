import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { ShieldCheck, Timer, Users } from "lucide-react";
import { useLanguage } from "@/i18n/context";

const STATS = [
  { value: 200, suffix: "+", decimals: 0 },
  { value: 1000, suffix: "+", decimals: 0 },
  { value: 99.9, suffix: "%", decimals: 1 },
];

const HIGHLIGHT_ICONS = [Users, ShieldCheck, Timer];

function CountUp({
  value,
  suffix,
  decimals,
  start,
  locale,
}: {
  value: number;
  suffix: string;
  decimals: number;
  start: boolean;
  locale: string;
}) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [start, value, reduced]);

  return (
    <span>
      {display.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export default function About() {
  const { t, lang } = useLanguage();
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, { once: true, margin: "-80px" });

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
          <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
            {t.about.eyebrow}
          </span>
          <h2 className="mt-4 text-4xl leading-[1.1] font-black tracking-tighter text-foreground sm:text-5xl lg:text-6xl">
            {t.about.title}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {t.about.titleAccent}
            </span>
          </h2>
          <p className="mt-6 text-base leading-relaxed font-light text-muted-foreground">
            {t.about.lead}
          </p>

          <div ref={statsRef} className="mt-10 grid grid-cols-3 gap-6">
            {STATS.map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-black tracking-tighter text-foreground tabular-nums sm:text-4xl">
                  <CountUp
                    value={s.value}
                    suffix={s.suffix}
                    decimals={s.decimals}
                    start={inView}
                    locale={lang === "en" ? "en-US" : "id-ID"}
                  />
                </div>
                <div className="mt-1 text-xs font-light text-muted-foreground">{t.about.stats[i]}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col justify-center gap-6"
        >
          <p className="text-base leading-relaxed font-light text-muted-foreground">
            {t.about.p1}
          </p>
          <p className="text-base leading-relaxed font-light text-muted-foreground">
            {t.about.p2}
          </p>

          <div className="mt-2 grid gap-4">
            {t.about.highlights.map(({ title, copy }, i) => {
              const Icon = HIGHLIGHT_ICONS[i];
              return (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-foreground/10 bg-foreground/5 p-5 backdrop-blur-md"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-foreground/10 bg-foreground/5 text-foreground">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tighter text-foreground">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed font-light text-muted-foreground">{copy}</p>
                </div>
              </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
