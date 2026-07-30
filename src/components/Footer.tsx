import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useT } from "@/i18n/context";

const NAV = [
  { key: "about", href: "#agency" },
  { key: "services", href: "#services" },
  { key: "tools", href: "#tools" },
  { key: "work", href: "#work" },
  { key: "events", href: "#events" },
  { key: "partners", href: "#partners" },
  { key: "contact", href: "#contact" },
] as const;


const WA =
  "https://wa.me/6281212951737?text=Hai%20Mentarisatria%20saya%20ingin%20berkonsultasi%20mengenai";

export default function Footer() {
  const t = useT();
  return (
    <footer className="relative w-full border-t border-foreground/5 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start gap-8 pb-20"
        >
          <h2 className="max-w-4xl text-4xl leading-[1.1] font-black tracking-tighter text-foreground sm:text-6xl lg:text-7xl">
            {t.footer.ctaTitle}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {t.footer.ctaTitleAccent}
            </span>
          </h2>
          <p className="max-w-2xl text-base leading-relaxed font-light text-muted-foreground">
            {t.footer.ctaDesc}
          </p>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-foreground px-7 py-3.5 text-sm font-bold text-background transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_20px_var(--tw-shadow-color)] active:scale-95"
          >
            {t.footer.ctaBtn}
          </a>
        </motion.div>

        <div className="grid gap-10 border-t border-foreground/10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo
              sizes="(min-width: 640px) 47px, 42px"
              className="mb-4 h-9 w-auto shrink-0 sm:h-10"
            />
            <div className="text-lg font-black tracking-tighter text-foreground">
              MENTARI SATRIA
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                .
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed font-light text-muted-foreground">
              {t.footer.tagline}
            </p>
          </div>

          <nav aria-label={t.footer.navLabel}>
            <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase">{t.footer.navHeading}</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.key}>
                  <a
                    href={n.href}
                    className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t.nav[n.key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase">{t.footer.servicesHeading}</h3>
            <ul className="mt-4 space-y-2.5">
              {t.footer.services.map((n) => (
                <li key={n}>
                  <a
                    href="#services"
                    className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {n}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase">{t.footer.contactHeading}</h3>
            <ul className="mt-4 space-y-3 text-sm font-light text-muted-foreground">
              <li className="flex gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  Jl. Overste Isdiman No.25, Purwokerto, Banyumas, Jawa Tengah 53114
                </span>
              </li>
              <li className="flex gap-2">
                <Phone size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                <a href="tel:+622817920477" className="transition-colors hover:text-foreground">
                  +62 281 7920477
                </a>
              </li>
              <li className="flex gap-2">
                <Mail size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                <a
                  href="mailto:info@mentarisatria.net.id"
                  className="transition-colors hover:text-foreground"
                >
                  info@mentarisatria.net.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-foreground/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-light text-muted-foreground">
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
          <p className="text-xs font-light text-muted-foreground">
            {t.footer.hours}
          </p>
        </div>
      </div>
    </footer>
  );
}
