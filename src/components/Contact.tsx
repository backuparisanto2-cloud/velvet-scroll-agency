import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useT } from "@/i18n/context";

const ADDRESS =
  "Jl. Overste Isdiman No.25, Jatiwinangun, Purwokerto Lor, Kec. Purwokerto Tim., Kabupaten Banyumas, Jawa Tengah 53114";

const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;

export default function Contact() {
  const t = useT();
  return (
    <section id="contact" className="relative w-full py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-14 max-w-2xl"
        >
          <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">{t.contact.eyebrow}</span>
          <h2 className="mt-4 text-4xl leading-tight font-black tracking-tighter text-foreground sm:text-5xl">
            {t.contact.title}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {t.contact.titleAccent}
            </span>
          </h2>
          <p className="mt-4 text-base font-light text-muted-foreground">
            {t.contact.desc}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid gap-5"
          >
            <div className="flex gap-4 rounded-3xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-md">
              <MapPin className="mt-0.5 shrink-0 text-foreground" size={20} aria-hidden="true" />
              <div>
                <h3 className="text-base font-black tracking-tighter text-foreground">{t.contact.addressTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed font-light text-muted-foreground">
                  Jl. Overste Isdiman No.25, Jatiwinangun
                  <br />
                  Purwokerto Lor, Kec. Purwokerto Tim.
                  <br />
                  Kabupaten Banyumas, Jawa Tengah 53114
                  <br />
                  Indonesia
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-3xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-md">
              <Phone className="mt-0.5 shrink-0 text-foreground" size={20} aria-hidden="true" />
              <div>
                <h3 className="text-base font-black tracking-tighter text-foreground">{t.contact.phoneTitle}</h3>
                <div className="mt-2 flex flex-col gap-1 text-sm font-light">
                  <a
                    href="tel:+622817920477"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    +62 281 7920477
                  </a>
                  <a
                    href="https://wa.me/6281212951737"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    +62 812 1295 1737 (WhatsApp)
                  </a>
                </div>
              </div>
            </div>

            <div className="flex gap-4 rounded-3xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-md">
              <Mail className="mt-0.5 shrink-0 text-foreground" size={20} aria-hidden="true" />
              <div>
                <h3 className="text-base font-black tracking-tighter text-foreground">{t.contact.emailTitle}</h3>
                <a
                  href="mailto:info@mentarisatria.net.id"
                  className="mt-2 inline-block text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
                >
                  info@mentarisatria.net.id
                </a>
              </div>
            </div>

            <div className="flex gap-4 rounded-3xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-md">
              <Clock className="mt-0.5 shrink-0 text-foreground" size={20} aria-hidden="true" />
              <div>
                <h3 className="text-base font-black tracking-tighter text-foreground">{t.contact.hoursTitle}</h3>
                <p className="mt-2 text-sm font-light text-muted-foreground">
                  {t.contact.hours}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="min-h-[420px] overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/5 backdrop-blur-md"
          >
            <iframe
              title={t.contact.mapTitle}
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[420px] w-full border-0"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
