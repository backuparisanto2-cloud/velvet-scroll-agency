import { motion } from "framer-motion";
import { Dribbble, Github, Instagram, Linkedin } from "lucide-react";

const NAV = ["Services", "Work", "Agency", "Contact"];
const RESOURCES = ["Case Studies", "Process", "Careers", "Journal"];
const SOCIALS = [
  { icon: Instagram, label: "Instagram" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Dribbble, label: "Dribbble" },
  { icon: Github, label: "GitHub" },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative w-full border-t border-white/5 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start gap-8 pb-20"
        >
          <h2 className="max-w-3xl text-5xl leading-[1.1] font-black tracking-tighter text-white sm:text-7xl lg:text-8xl">
            Let&apos;s create something{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              epic.
            </span>
          </h2>
          <a
            href="mailto:hello@novastudio.com"
            className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95"
          >
            Start a Project
          </a>
        </motion.div>

        <div className="grid gap-10 border-t border-white/10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-lg font-black tracking-tighter text-white">
              NOVA
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                .
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed font-light text-gray-400">
              A design and engineering studio building premium digital products worldwide.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">Navigate</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n}>
                  <a
                    href={`#${n.toLowerCase()}`}
                    className="text-sm font-light text-gray-300 transition-colors hover:text-white"
                  >
                    {n}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">Resources</h3>
            <ul className="mt-4 space-y-2.5">
              {RESOURCES.map((n) => (
                <li key={n}>
                  <a
                    href="#work"
                    className="text-sm font-light text-gray-300 transition-colors hover:text-white"
                  >
                    {n}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">Social</h3>
            <div className="mt-4 flex gap-3">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#contact"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-gray-300 backdrop-blur-md transition-all hover:scale-105 hover:border-white/30 hover:text-white active:scale-95"
                >
                  <Icon size={17} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-light text-gray-600">
            © {new Date().getFullYear()} Nova Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#contact" className="text-xs text-gray-600 transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#contact" className="text-xs text-gray-600 transition-colors hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
