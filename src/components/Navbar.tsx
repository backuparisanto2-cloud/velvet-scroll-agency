import { useState } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoSgk from "@/assets/img/logo-sgk.webp.asset.json";

const NAV_ITEMS = [
  { label: "Tentang", href: "#agency" },
  { label: "Layanan", href: "#services" },
  { label: "Tools", href: "#tools" },
  { label: "Portfolio", href: "#work" },
  { label: "Event", href: "#events" },
  { label: "Partner", href: "#partners" },
  { label: "Kontak", href: "#contact" },
];


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, 50], [0.02, 0.08]);
  const background = useMotionTemplate`rgba(255,255,255,${bgOpacity})`;
  const blur = useTransform(scrollY, [0, 50], [8, 24]);
  const backdropFilter = useMotionTemplate`blur(${blur}px)`;

  return (
    <header className="fixed top-6 left-0 z-50 w-full px-4 sm:px-6 lg:px-8">
      <motion.nav
        style={{ background, backdropFilter }}
        className={`mx-auto flex max-w-5xl flex-col border border-white/10 px-5 py-3 transition-[border-radius] duration-300 ${
          open ? "rounded-3xl" : "rounded-full"
        }`}
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:flex md:justify-between">
          <a
            href="#top"
            className="flex min-w-0 items-center gap-2.5 text-lg font-black tracking-tighter text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
          >
            <img
              src={logoSgk.url}
              alt="Logo PT Sekawan Global Komunika"
              width={735}
              height={624}
              decoding="async"
              className="h-8 w-auto shrink-0"
            />
            <span className="truncate">
              MENTARI SATRIA
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                .
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-sm font-light text-gray-300 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="https://wa.me/6281212951737?text=Hai%20Mentarisatria%20saya%20ingin%20berkonsultasi%20mengenai"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition-transform duration-200 hover:scale-105 active:scale-95 md:inline-block"
          >
            Konsultasi Gratis
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-white md:hidden"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>

        {open && (
          <ul className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 md:hidden">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-sm font-light text-gray-300 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://wa.me/6281212951737?text=Hai%20Mentarisatria%20saya%20ingin%20berkonsultasi%20mengenai"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black"
              >
                Konsultasi Gratis
              </a>
            </li>
          </ul>
        )}
      </motion.nav>
    </header>
  );
}
