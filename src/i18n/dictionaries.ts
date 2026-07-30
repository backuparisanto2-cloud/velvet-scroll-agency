export type Lang = "id" | "en";

const id = {
  nav: {
    about: "Tentang",
    services: "Layanan",
    tools: "Tools",
    work: "Portfolio",
    events: "Event",
    partners: "Partner",
    contact: "Kontak",
    cta: "Konsultasi Gratis",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
  },
  hero: {
    eyebrow: "PT. Sekawan Global Komunika - Mentarisatria.net.id",
    sketchTitle: "Solusi",
    sketchTitleAccent: "Infrastruktur IT",
    title: "Server, Internet &",
    titleAccent: "Network Terpercaya",
    desc: "PT Sekawan Global Komunika - Perusahaan IT Indonesia yang menghadirkan layanan jasa infrastruktur IT, Pengadaan Server/Part dan Networking, Data Center, dan Internet Service Provider untuk korporasi anda",
    cta1: "Konsultasi Gratis",
    cta2: "Hubungi Kami",
    scroll: "Scroll",
  },
  about: {
    eyebrow: "Tentang Kami",
    title: "Dipercaya oleh Ratusan Perusahaan",
    lead: "Kami telah melayani berbagai sektor industri termasuk korporasi swasta, instansi pemerintah, lembaga pendidikan, dan organisasi nasional dengan solusi jasa infrastruktur IT terbaik",
    stats: ["Klien Aktif", "Project Selesai", "Uptime Guarantee"],
    p1: "PT Sekawan Global Komunika adalah perusahaan IT Indonesia terkemuka yang bergerak di bidang Internet Service Provider, Project Infrastruktur IT dengan pengalaman lebih dari dua dekade melayani berbagai sektor industri.",
    p2: "Kami mengkhususkan diri dalam penyediaan solusi jasa infrastruktur IT lengkap meliputi Server, Network, Router, Data Center, Pengadaan Perangkat IT, Managed Service, serta layanan Internet Service Provider (ISP) untuk perusahaan, instansi pemerintah, institusi pendidikan, dan korporasi lokal maupun nasional.",
    highlights: [
      {
        title: "Tim Berpengalaman",
        copy: "Didukung oleh tim profesional dengan pengalaman puluhan tahun di industri IT",
      },
      {
        title: "Solusi Scalable & Aman",
        copy: "Infrastruktur yang dapat berkembang sesuai kebutuhan dengan standar keamanan enterprise",
      },
      {
        title: "SLA Profesional",
        copy: "Komitmen Service Level Agreement untuk menjamin uptime dan kualitas layanan terbaik",
      },
    ],
  },
  services: {
    eyebrow: "Layanan Kami",
    title: "Layanan Infrastruktur IT Profesional",
    desc: "Solusi lengkap jasa server dan network enterprise untuk mendukung transformasi digital bisnis Anda",
    items: [
      {
        title: "Pengadaan Server/Part/Upgrade & Data Center",
        copy: "Solusi server enterprise dan data center yang aman, scalable, dan terpercaya untuk kebutuhan bisnis Anda.",
      },
      {
        title: "Network & Router Enterprise",
        copy: "Implementasi jaringan dan router enterprise berkualitas tinggi untuk konektivitas optimal perusahaan.",
      },
      {
        title: "Pengadaan Perangkat IT",
        copy: "Penyediaan perangkat IT terlengkap untuk kebutuhan korporasi, instansi pemerintah, dan pendidikan.",
      },
      {
        title: "Managed Service IT",
        copy: "Layanan pengelolaan infrastruktur IT profesional dengan SLA terjamin untuk operasional bisnis yang lancar.",
      },
      {
        title: "Internet Service Provider (ISP)",
        copy: "Layanan internet dedicated berkecepatan tinggi dan stabil untuk perusahaan dan korporasi.",
      },
      {
        title: "Solusi AI Anda",
        copy: "Solusi untuk pengadaan AI Based Hardware, AI Training, Implementasi, Consulting & Pembuatan Aplikasi.",
      },
    ],
  },
  tools: {
    eyebrow: "Tools & Teknologi",
    title: "Network Tools",
    desc: "Perangkat bantu IT profesional dalam genggaman Anda",
    hint: "Arahkan kursor pada tool untuk info lebih lanjut",
    items: [
      { name: "UPS Calculator", copy: "Hitung kebutuhan UPS untuk infrastruktur Anda" },
      { name: "Wifi Plan", copy: "Rencanakan cakupan jaringan nirkabel Anda" },
      { name: "Cable Building", copy: "Hitung kebutuhan kabel untuk project Anda" },
      { name: "Check IP", copy: "Cek detail alamat IP dan geolokasinya" },
      { name: "MAC Lookup", copy: "Telusuri informasi vendor dari alamat MAC" },
      { name: "Server Perf", copy: "Simulasi dan uji performa server" },
      { name: "Port Scanner", copy: "Pindai port terbuka pada sebuah host" },
      { name: "Pen-Test", copy: "Kumpulan tool penetration testing" },
      { name: "RAID Calc", copy: "Hitung konfigurasi penyimpanan RAID" },
    ],
  },
  work: {
    title: "Portfolio Project",
    desc: "Berbagai project infrastruktur IT yang telah kami selesaikan dengan sukses",
    cta: "Diskusikan Project Anda",
    items: [
      {
        name: "RSU PKU Muhammadiyah Gombong",
        tag: "Implementasi UPS 5000VA Data Center",
        copy: "Pengadaan UPS untuk Server, Network Access Storage, Core Router Data Center",
      },
      {
        name: "Plataran Makassar",
        tag: "Implementasi Network & Hospitality",
        copy: "Instalasi Network Access Point, IP Camera, UPS & Rack Server",
      },
      {
        name: "RS Siaga Medika Banyumas",
        tag: "Implementasi Data Center",
        copy: "Pengadaan Server, Network Access Storage, Core Router Data Center",
      },
      {
        name: "Internet Service Provider Korporat",
        tag: "ISP Solution",
        copy: "Layanan Internet ISP dan Intranet untuk Gymnest Purwokerto",
      },
      {
        name: "RSUD Margono Soekarjo",
        tag: "Managed Service IT Perusahaan",
        copy: "Instalasi dan Perbaikan Kabel Fiber Optic Antar Gedung",
      },
      {
        name: "Teras Menara Sudirman Jakarta",
        tag: "Access Point, Wifi & Surveillance",
        copy: "Pengadaan Access Point, Wifi, Camera Surveillance",
      },
    ],
  },
  events: {
    eyebrow: "Kegiatan",
    title: "Event & Kegiatan",
    items: [
      {
        title: "Optimized Network Huawei, Infoblox & Forcepoint 2022",
        place: "Purwokerto, 16 Juni 2022",
      },
      {
        title: "Data First Modernization & Ransomware Resilience with HPE Solution",
        place: "Wonosobo, 24 Januari 2024",
      },
      {
        title: "IT Transformation For Healthcare Solution - DELL Technologies",
        place: "Purwokerto, 15 Februari 2023",
      },
      {
        title: "Nextgen IT Solutions For Your Organization with Ruijie, Sonicwall & Robustel",
        place: "Cilacap, 21 Agustus 2024",
      },
    ],
  },
  partners: {
    badge: "Partner",
    title: "Technology",
    titleAccent: "Partners",
  },
  contact: {
    eyebrow: "Kontak",
    title: "Hubungi Kami",
    desc: "Kami siap membantu kebutuhan infrastruktur IT Anda",
    addressTitle: "Alamat Kantor",
    phoneTitle: "Telepon",
    emailTitle: "Email",
    hoursTitle: "Jam Operasional",
    hours: "Senin - Sabtu: 08.00 - 17.00 WIB",
    mapTitle: "Lokasi kantor PT Sekawan Global Komunika di Purwokerto",
  },
  footer: {
    ctaTitle: "Siap Transformasi Infrastruktur IT",
    ctaTitleAccent: "Perusahaan Anda?",
    ctaDesc:
      "Konsultasikan kebutuhan jasa server dan network, data center, managed service, dan Internet Service Provider dengan tim ahli kami sekarang",
    ctaBtn: "Hubungi Kami Sekarang",
    tagline:
      "PT Sekawan Global Komunika — perusahaan IT Indonesia untuk infrastruktur IT, data center, dan layanan Internet Service Provider.",
    navHeading: "Navigasi",
    navLabel: "Navigasi footer",
    servicesHeading: "Layanan",
    contactHeading: "Kontak",
    services: [
      "Server & Data Center",
      "Network & Router Enterprise",
      "Pengadaan Perangkat IT",
      "Managed Service IT",
      "Internet Service Provider",
      "Solusi AI Anda",
    ],
    rights: "PT Sekawan Global Komunika. Seluruh hak cipta dilindungi.",
    hours: "Senin - Sabtu: 08.00 - 17.00 WIB",
  },
  ui: {
    toLight: "Aktifkan mode terang",
    toDark: "Aktifkan mode gelap",
    language: "Bahasa",
    whatsapp: "Chat WhatsApp",
  },
} as const;

export type Dict = typeof id;

const en: Dict = {
  nav: {
    about: "About",
    services: "Services",
    tools: "Tools",
    work: "Portfolio",
    events: "Events",
    partners: "Partners",
    contact: "Contact",
    cta: "Free Consultation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    eyebrow: "PT. Sekawan Global Komunika - Mentarisatria.net.id",
    sketchTitle: "IT Infrastructure",
    sketchTitleAccent: "Solutions",
    title: "Trusted Server, Internet &",
    titleAccent: "Network Services",
    desc: "PT Sekawan Global Komunika - an Indonesian IT company delivering IT infrastructure services, server/parts and networking procurement, data centers, and Internet Service Provider solutions for your business",
    cta1: "Free Consultation",
    cta2: "Contact Us",
    scroll: "Scroll",
  },
  about: {
    eyebrow: "About Us",
    title: "Trusted by Hundreds of Companies",
    lead: "We have served a wide range of industries including private corporations, government agencies, educational institutions, and national organisations with best-in-class IT infrastructure services",
    stats: ["Active Clients", "Projects Delivered", "Uptime Guarantee"],
    p1: "PT Sekawan Global Komunika is a leading Indonesian IT company operating as an Internet Service Provider and IT infrastructure project partner, with more than two decades of experience across many industries.",
    p2: "We specialise in complete IT infrastructure services covering servers, networks, routers, data centers, IT device procurement, managed services, and Internet Service Provider (ISP) solutions for enterprises, government agencies, educational institutions, and local as well as national corporations.",
    highlights: [
      {
        title: "Experienced Team",
        copy: "Backed by professionals with decades of hands-on experience in the IT industry",
      },
      {
        title: "Scalable & Secure",
        copy: "Infrastructure that grows with your needs, built to enterprise security standards",
      },
      {
        title: "Professional SLA",
        copy: "A Service Level Agreement commitment that guarantees uptime and service quality",
      },
    ],
  },
  services: {
    eyebrow: "Our Services",
    title: "Professional IT Infrastructure Services",
    desc: "Complete enterprise server and network services to support your digital transformation",
    items: [
      {
        title: "Server/Parts/Upgrade Procurement & Data Center",
        copy: "Secure, scalable, and reliable enterprise server and data center solutions for your business.",
      },
      {
        title: "Enterprise Network & Router",
        copy: "High-quality enterprise network and router implementation for optimal corporate connectivity.",
      },
      {
        title: "IT Device Procurement",
        copy: "Complete IT device supply for corporations, government agencies, and education institutions.",
      },
      {
        title: "Managed IT Service",
        copy: "Professional IT infrastructure management with a guaranteed SLA for smooth operations.",
      },
      {
        title: "Internet Service Provider (ISP)",
        copy: "High-speed, stable dedicated internet services for enterprises and corporations.",
      },
      {
        title: "Your AI Solutions",
        copy: "Solutions for AI-based hardware procurement, AI training, implementation, consulting & app development.",
      },
    ],
  },
  tools: {
    eyebrow: "Tools & Technology",
    title: "Network Tools",
    desc: "Professional IT utilities at your fingertips",
    hint: "Hover over any tool to learn more",
    items: [
      { name: "UPS Calculator", copy: "Calculate UPS requirements for your infrastructure" },
      { name: "Wifi Plan", copy: "Plan your wireless network coverage" },
      { name: "Cable Building", copy: "Calculate cable requirements for your project" },
      { name: "Check IP", copy: "Check IP address details and geolocation" },
      { name: "MAC Lookup", copy: "Lookup MAC address vendor information" },
      { name: "Server Perf", copy: "Simulate and test server performance" },
      { name: "Port Scanner", copy: "Scan host for open ports" },
      { name: "Pen-Test", copy: "Penetration testing tools suite" },
      { name: "RAID Calc", copy: "Calculate RAID storage configurations" },
    ],
  },
  work: {
    title: "Project Portfolio",
    desc: "A selection of IT infrastructure projects we have successfully delivered",
    cta: "Discuss Your Project",
    items: [
      {
        name: "RSU PKU Muhammadiyah Gombong",
        tag: "5000VA Data Center UPS Implementation",
        copy: "UPS procurement for servers, network access storage, and data center core router",
      },
      {
        name: "Plataran Makassar",
        tag: "Network & Hospitality Implementation",
        copy: "Installation of network access points, IP cameras, UPS & server rack",
      },
      {
        name: "RS Siaga Medika Banyumas",
        tag: "Data Center Implementation",
        copy: "Procurement of servers, network access storage, and data center core router",
      },
      {
        name: "Corporate Internet Service Provider",
        tag: "ISP Solution",
        copy: "ISP internet and intranet services for Gymnest Purwokerto",
      },
      {
        name: "RSUD Margono Soekarjo",
        tag: "Corporate Managed IT Service",
        copy: "Installation and repair of fiber optic cabling between buildings",
      },
      {
        name: "Teras Menara Sudirman Jakarta",
        tag: "Access Point, Wifi & Surveillance",
        copy: "Procurement of access points, wifi, and surveillance cameras",
      },
    ],
  },
  events: {
    eyebrow: "Activities",
    title: "Events & Activities",
    items: [
      {
        title: "Optimized Network Huawei, Infoblox & Forcepoint 2022",
        place: "Purwokerto, 16 June 2022",
      },
      {
        title: "Data First Modernization & Ransomware Resilience with HPE Solution",
        place: "Wonosobo, 24 January 2024",
      },
      {
        title: "IT Transformation For Healthcare Solution - DELL Technologies",
        place: "Purwokerto, 15 February 2023",
      },
      {
        title: "Nextgen IT Solutions For Your Organization with Ruijie, Sonicwall & Robustel",
        place: "Cilacap, 21 August 2024",
      },
    ],
  },
  partners: {
    badge: "Partners",
    title: "Technology",
    titleAccent: "Partners",
  },
  contact: {
    eyebrow: "Contact",
    title: "Get in Touch",
    desc: "We are ready to support your IT infrastructure needs",
    addressTitle: "Office Address",
    phoneTitle: "Phone",
    emailTitle: "Email",
    hoursTitle: "Working Hours",
    hours: "Monday - Saturday: 08.00 - 17.00 WIB",
    mapTitle: "PT Sekawan Global Komunika office location in Purwokerto",
  },
  footer: {
    ctaTitle: "Ready to Transform Your Company's",
    ctaTitleAccent: "IT Infrastructure?",
    ctaDesc:
      "Talk to our experts about your server and network services, data center, managed service, and Internet Service Provider needs today",
    ctaBtn: "Contact Us Now",
    tagline:
      "PT Sekawan Global Komunika — an Indonesian IT company for IT infrastructure, data centers, and Internet Service Provider solutions.",
    navHeading: "Navigation",
    navLabel: "Footer navigation",
    servicesHeading: "Services",
    contactHeading: "Contact",
    services: [
      "Server & Data Center",
      "Enterprise Network & Router",
      "IT Device Procurement",
      "Managed IT Service",
      "Internet Service Provider",
      "Your AI Solutions",
    ],
    rights: "PT Sekawan Global Komunika. All rights reserved.",
    hours: "Monday - Saturday: 08.00 - 17.00 WIB",
  },
  ui: {
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
    language: "Language",
    whatsapp: "Chat on WhatsApp",
  },
};

export const DICTIONARIES: Record<Lang, Dict> = { id, en };
