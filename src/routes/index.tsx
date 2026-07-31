import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import Tools from "@/components/Tools";
import Work from "@/components/Work";
import Events from "@/components/Events";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParallaxSection from "@/components/ParallaxSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import SplashScreen from "@/components/SplashScreen";

const TITLE = "Solusi Infrastruktur IT, Server, Internet & Network Terpercaya";
const DESCRIPTION =
  "PT Sekawan Global Komunika - Perusahaan IT Indonesia yang menghadirkan layanan jasa infrastruktur IT, Pengadaan Server/Part dan Networking, Data Center, dan Internet Service Provider untuk korporasi anda.";
const OG_IMAGE = "https://velvet-scroll-agency.lovable.app/og-image.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-blue-500/30">
      <SplashScreen />
      <div className="splash-gated">
      <Navbar />
      <main>
        <Hero />
        <ParallaxSection strength={70}>
          <About />
        </ParallaxSection>
        <ParallaxSection strength={70}>
          <Services />
        </ParallaxSection>
        <ParallaxSection strength={55}>
          <Tools />
        </ParallaxSection>
        <ParallaxSection strength={70}>
          <Work />
        </ParallaxSection>
        <ParallaxSection strength={55}>
          <Events />
        </ParallaxSection>
        <ParallaxSection strength={40}>
          <Clients />
        </ParallaxSection>
        <ParallaxSection strength={45}>
          <Contact />
        </ParallaxSection>
      </main>

      <ParallaxSection strength={35} fade={false}>
        <Footer />
      </ParallaxSection>

      <WhatsAppButton />
    </div>
  );
}
