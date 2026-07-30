import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import Work from "@/components/Work";
import About from "@/components/About";
import Footer from "@/components/Footer";

const TITLE = "Nova Studio — Digital Design & Product Agency";
const DESCRIPTION =
  "Nova Studio is a senior design and engineering agency crafting premium interfaces, brand systems, and growth-focused digital products.";
const OG_IMAGE = "https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/hero_city_iglhwn.jpg";

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
      <Navbar />
      <main>
        <Hero />
        <Clients />
        <Services />
        <Work />
        <About />
      </main>
      <Footer />
    </div>
  );
}
