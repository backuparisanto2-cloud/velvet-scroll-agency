import { motion } from "framer-motion";
import {
  Activity,
  DatabaseBackup,
  HardDrive,
  Router,
  Server,
  Shield,
  Terminal,
  Wifi,
} from "lucide-react";

const TOOLS = [
  {
    icon: Router,
    name: "Mikrotik & Cisco",
    copy: "Routing, switching, dan BGP untuk jaringan korporat.",
  },
  {
    icon: Shield,
    name: "Fortinet & Sonicwall",
    copy: "Firewall dan keamanan perimeter enterprise.",
  },
  {
    icon: Server,
    name: "VMware & Proxmox",
    copy: "Virtualisasi server dan konsolidasi data center.",
  },
  {
    icon: Terminal,
    name: "Windows Server & Linux",
    copy: "Administrasi sistem operasi server dan layanan inti.",
  },
  {
    icon: Wifi,
    name: "Ruckus & Ruijie",
    copy: "Wireless controller dan access point berkapasitas tinggi.",
  },
  {
    icon: DatabaseBackup,
    name: "Veeam Backup",
    copy: "Backup, replikasi, dan disaster recovery terjadwal.",
  },
  {
    icon: Activity,
    name: "Zabbix & Grafana",
    copy: "Monitoring performa jaringan dan server 24/7.",
  },
  {
    icon: HardDrive,
    name: "HPE & Dell Storage",
    copy: "Storage enterprise, SAN, dan upgrade kapasitas.",
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
          <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
            Tools &amp; Teknologi
          </span>
          <h2 className="mt-4 text-4xl leading-tight font-black tracking-tighter text-white sm:text-5xl">
            Tools yang Kami Gunakan
          </h2>
          <p className="mt-4 text-base leading-relaxed font-light text-gray-400">
            Perangkat dan platform kelas enterprise yang kami andalkan untuk membangun serta
            merawat infrastruktur IT klien
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {TOOLS.map(({ icon: Icon, name, copy }, i) => (
            <motion.article
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.07 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
            >
              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/15 bg-white/5">
                <Icon className="text-white" size={20} aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-base leading-snug font-black tracking-tight text-white">
                {name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed font-light text-gray-400">{copy}</p>
              <div className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-blue-500/10 blur-[70px] transition-opacity duration-500 group-hover:bg-blue-500/20" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
