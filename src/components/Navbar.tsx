import { useState } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Agency", href: "#agency" },
  { label: "Contact", href: "#contact" },
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
            className="min-w-0 truncate text-lg font-black tracking-tighter text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
          >
            NOVA<span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">.</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="group relative inline-block text-sm font-medium text-gray-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 block h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 md:inline-flex"
            >
              Start Project
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-white md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-4 flex flex-col gap-1 border-t border-white/10 pt-4 md:hidden">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-2 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-white px-5 py-2.5 text-center text-sm font-bold text-black active:scale-95"
            >
              Start Project
            </a>
          </div>
        )}
      </motion.nav>
    </header>
  );
}
