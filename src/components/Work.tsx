import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import imgGombong from "@/assets/img/project-pku-gombong.webp.asset.json";
import imgPlataran from "@/assets/img/project-plataran.webp.asset.json";
import imgSiaga from "@/assets/img/project-siaga-medika.webp.asset.json";
import imgIsp from "@/assets/img/service-isp.webp.asset.json";
import imgMargono from "@/assets/img/project-margono.webp.asset.json";
import imgTeras from "@/assets/img/project-teras-sudirman.webp.asset.json";

const PROJECTS = [
  {
    name: "RSU PKU Muhammadiyah Gombong",
    tag: "Implementasi UPS 5000VA Data Center",
    copy: "Pengadaan UPS untuk Server, Network Access Storage, Core Router Data Center",
    img: imgGombong.url,
    position: "object-center",
  },
  {
    name: "Plataran Makassar",
    tag: "Implementasi Network & Hospitality",
    copy: "Instalasi Network Access Point, IP Camera, UPS & Rack Server",
    img: imgPlataran.url,
    position: "object-center",
  },
  {
    name: "RS Siaga Medika Banyumas",
    tag: "Implementasi Data Center",
    copy: "Pengadaan Server, Network Access Storage, Core Router Data Center",
    img: imgSiaga.url,
    position: "object-center",
  },
  {
    name: "Internet Service Provider Korporat",
    tag: "ISP Solution",
    copy: "Layanan Internet ISP dan Intranet untuk Gymnest Purwokerto",
    img: imgIsp.url,
    position: "object-center",
  },
  {
    name: "RSUD Margono Soekarjo",
    tag: "Managed Service IT Perusahaan",
    copy: "Instalasi dan Perbaikan Kabel Fiber Optic Antar Gedung",
    img: imgMargono.url,
    position: "object-top",
  },
  {
    name: "Teras Menara Sudirman Jakarta",
    tag: "Access Point, Wifi & Surveillance",
    copy: "Pengadaan Access Point, Wifi, Camera Surveillance",
    img: imgTeras.url,
    position: "object-center",
  },
];


export default function Work() {
  const [active, setActive] = useState(0);

  return (
    <section id="work" className="relative w-full py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"
        >
          <div className="min-w-0">
            <h2 className="text-4xl font-black tracking-tighter text-white sm:text-5xl">
              Portfolio Project
            </h2>
            <p className="mt-3 text-base font-light text-gray-400">
              Berbagai project infrastruktur IT yang telah kami selesaikan dengan sukses
            </p>
          </div>
          <a
            href="https://wa.me/6281212951737?text=Hai%20Mentarisatria%20saya%20ingin%20berkonsultasi%20mengenai"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-gray-300 transition-colors hover:text-white"
          >
            Diskusikan Project
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </motion.div>

        <div className="flex h-auto flex-col gap-3 md:h-[400px] md:flex-row">
          {PROJECTS.map((p, i) => {
            const isActive = active === i;
            return (
              <motion.article
                key={p.name}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                animate={{ flexGrow: isActive ? 4 : 0.8 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="group relative h-72 min-w-0 shrink cursor-pointer overflow-hidden rounded-3xl border border-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 md:h-full md:basis-0"
              >
                <img
                  src={p.img}
                  alt={`${p.name} — ${p.tag}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="text-[11px] font-bold tracking-widest text-blue-300 uppercase">
                    {p.tag}
                  </span>
                  <h3 className="mt-1.5 text-xl leading-tight font-black tracking-tighter text-white">
                    {p.name}
                  </h3>
                  <motion.p
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-2 max-w-md text-sm leading-relaxed font-light text-gray-300"
                  >
                    {p.copy}
                  </motion.p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
