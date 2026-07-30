import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import logoSgk from "@/assets/img/logo-sgk-v2.webp.asset.json";

const NAV = [
  { label: "Tentang", href: "#agency" },
  { label: "Layanan", href: "#services" },
  { label: "Tools", href: "#tools" },
  { label: "Portfolio", href: "#work" },
  { label: "Event", href: "#events" },
  { label: "Partner", href: "#partners" },
  { label: "Kontak", href: "#contact" },
];

const LAYANAN = [
  "Server & Data Center",
  "Network & Router Enterprise",
  "Pengadaan Perangkat IT",
  "Managed Service IT",
  "Internet Service Provider",
  "Solusi AI Anda",
];


const WA =
  "https://wa.me/6281212951737?text=Hai%20Mentarisatria%20saya%20ingin%20berkonsultasi%20mengenai";

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-white/5 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start gap-8 pb-20"
        >
          <h2 className="max-w-4xl text-4xl leading-[1.1] font-black tracking-tighter text-white sm:text-6xl lg:text-7xl">
            Siap Transformasi Infrastruktur IT{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Perusahaan Anda?
            </span>
          </h2>
          <p className="max-w-2xl text-base leading-relaxed font-light text-gray-400">
            Konsultasikan kebutuhan jasa server dan network, data center, managed service, dan
            Internet Service Provider dengan tim ahli kami sekarang
          </p>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95"
          >
            Hubungi Kami Sekarang
          </a>
        </motion.div>

        <div className="grid gap-10 border-t border-white/10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo
              sizes="(min-width: 640px) 47px, 42px"
              className="mb-4 h-9 w-auto shrink-0 sm:h-10"
            />
            <div className="text-lg font-black tracking-tighter text-white">
              MENTARI SATRIA
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                .
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed font-light text-gray-400">
              PT Sekawan Global Komunika — perusahaan IT Indonesia untuk infrastruktur IT, data
              center, dan layanan Internet Service Provider.
            </p>
          </div>

          <nav aria-label="Navigasi footer">
            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">Navigasi</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.label}>
                  <a
                    href={n.href}
                    className="text-sm font-light text-gray-300 transition-colors hover:text-white"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">Layanan</h3>
            <ul className="mt-4 space-y-2.5">
              {LAYANAN.map((n) => (
                <li key={n}>
                  <a
                    href="#services"
                    className="text-sm font-light text-gray-300 transition-colors hover:text-white"
                  >
                    {n}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">Kontak</h3>
            <ul className="mt-4 space-y-3 text-sm font-light text-gray-300">
              <li className="flex gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  Jl. Overste Isdiman No.25, Purwokerto, Banyumas, Jawa Tengah 53114
                </span>
              </li>
              <li className="flex gap-2">
                <Phone size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                <a href="tel:+622817920477" className="transition-colors hover:text-white">
                  +62 281 7920477
                </a>
              </li>
              <li className="flex gap-2">
                <Mail size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                <a
                  href="mailto:info@mentarisatria.net.id"
                  className="transition-colors hover:text-white"
                >
                  info@mentarisatria.net.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-light text-gray-600">
            © {new Date().getFullYear()} PT Sekawan Global Komunika. All rights reserved.
          </p>
          <p className="text-xs font-light text-gray-600">
            Senin - Sabtu: 08.00 - 17.00 WIB
          </p>
        </div>
      </div>
    </footer>
  );
}
