import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BatteryCharging,
  Cable,
  Gauge,
  Globe,
  HardDrive,
  Radar,
  ScanSearch,
  ShieldAlert,
  Wifi,
} from "lucide-react";

const TOOLS = [
  {
    icon: BatteryCharging,
    name: "UPS Calculator",
    copy: "Calculate UPS requirements for your infrastructure",
    href: "https://mentarisatria.net.id/tools/ups-calculator.php",
  },
  {
    icon: Wifi,
    name: "Wifi Plan",
    copy: "Plan your wireless network coverage",
    href: "https://mentarisatria.net.id/tools/wifi-planner/",
  },
  {
    icon: Cable,
    name: "Cable Building",
    copy: "Calculate cable requirements for your project",
    href: "https://mentarisatria.net.id/tools/cable-calculator/",
  },
  {
    icon: Globe,
    name: "Check IP",
    copy: "Check IP address details and geolocation",
    href: "https://mentarisatria.net.id/tools/check-ip/",
  },
  {
    icon: ScanSearch,
    name: "MAC Lookup",
    copy: "Lookup MAC address vendor information",
    href: "https://mentarisatria.net.id/tools/mac-lookup/",
  },
  {
    icon: Gauge,
    name: "Server Perf",
    copy: "Simulate and test server performance",
    href: "https://mentarisatria.net.id/tools/server-performance/",
  },
  {
    icon: Radar,
    name: "Port Scanner",
    copy: "Scan host for open ports",
    href: "https://mentarisatria.net.id/tools/port-scanner/",
  },
  {
    icon: ShieldAlert,
    name: "Pen-Test",
    copy: "Penetration testing tools suite",
    href: "https://mentarisatria.net.id/tools/pen-test/",
  },
  {
    icon: HardDrive,
    name: "RAID Calc",
    copy: "Calculate RAID storage configurations",
    href: "https://mentarisatria.net.id/tools/raid-calculator/",
  },
];

export default function Tools() {
  return (
    <section id="tools" className="relative w-full py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-14 max-w-2xl"
        >
          <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
            Tools &amp; Teknologi
          </span>
          <h2 className="mt-4 text-4xl leading-tight font-black tracking-tighter text-foreground sm:text-5xl">
            Network Tools
          </h2>
          <p className="mt-4 text-base leading-relaxed font-light text-muted-foreground">
            Professional IT utilities at your fingertips
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {TOOLS.map(({ icon: Icon, name, copy, href }, i) => (
            <motion.a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.07 }}
              className="group relative block overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-foreground/25"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-foreground/15 bg-foreground/5">
                  <Icon className="text-foreground" size={20} aria-hidden="true" />
                </div>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-5 text-base leading-snug font-black tracking-tight text-foreground">
                {name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed font-light text-muted-foreground">{copy}</p>
              <div className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-blue-500/10 blur-[70px] transition-opacity duration-500 group-hover:bg-blue-500/20" />
            </motion.a>
          ))}
        </div>

        <p className="mt-8 text-center text-xs font-light text-muted-foreground">
          Hover over any tool to learn more
        </p>
      </div>
    </section>
  );
}
