import { motion } from "framer-motion";
import { BrainCircuit, Cloud, Cpu, Network, Server, Wrench } from "lucide-react";
import imgServer from "@/assets/img/service-server.webp.asset.json";
import imgNetwork from "@/assets/img/service-network.webp.asset.json";
import imgDevices from "@/assets/img/service-devices.webp.asset.json";
import imgManaged from "@/assets/img/service-managed.webp.asset.json";
import imgIsp from "@/assets/img/service-isp.webp.asset.json";
import imgAi from "@/assets/img/service-ai-4.webp.asset.json";

const SERVICES = [
  {
    icon: Server,
    title: "Pengadaan Server/Part/Upgrade & Data Center",
    copy: "Solusi server enterprise dan data center yang aman, scalable, dan terpercaya untuk kebutuhan bisnis Anda.",
    img: imgServer.url,
    position: "object-center",
  },
  {
    icon: Network,
    title: "Network & Router Enterprise",
    copy: "Implementasi jaringan dan router enterprise berkualitas tinggi untuk konektivitas optimal perusahaan.",
    img: imgNetwork.url,
    position: "object-center",
  },
  {
    icon: Cpu,
    title: "Pengadaan Perangkat IT",
    copy: "Penyediaan perangkat IT terlengkap untuk kebutuhan korporasi, instansi pemerintah, dan pendidikan.",
    img: imgDevices.url,
    position: "object-center",
  },
  {
    icon: Wrench,
    title: "Managed Service IT",
    copy: "Layanan pengelolaan infrastruktur IT profesional dengan SLA terjamin untuk operasional bisnis yang lancar.",
    img: imgManaged.url,
    position: "object-top",
  },
  {
    icon: Cloud,
    title: "Internet Service Provider (ISP)",
    copy: "Layanan internet dedicated berkecepatan tinggi dan stabil untuk perusahaan dan korporasi.",
    img: imgIsp.url,
    position: "object-center",
  },
  {
    icon: BrainCircuit,
    title: "Solusi AI Anda",
    copy: "Solusi untuk pengadaan AI Based Hardware, AI Training, Implementasi, Consulting & Pembuatan Aplikasi.",
    img: imgAi.url,
    position: "object-center",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative w-full py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
            Layanan Kami
          </span>
          <h2 className="mt-4 text-4xl leading-tight font-black tracking-tighter text-white sm:text-5xl">
            Layanan Infrastruktur IT Profesional
          </h2>
          <p className="mt-4 text-base leading-relaxed font-light text-gray-400">
            Solusi lengkap jasa server dan network enterprise untuk mendukung transformasi digital
            bisnis Anda
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, copy, img, position }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-colors hover:border-white/20"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={img}
                  alt={title}
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={750}
                  className={`h-full w-full object-cover ${position} transition-transform duration-700 group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1128] via-[#0c1128]/30 to-transparent" />
                <div className="absolute top-3 right-3 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/40 backdrop-blur-md">
                  <Icon className="text-white" size={20} aria-hidden="true" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-xl leading-snug font-black tracking-tighter text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed font-light text-gray-400">{copy}</p>
              </div>
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-purple-500/10 blur-[80px]" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
