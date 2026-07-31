import logo36 from "@/assets/img/logo-sgk-36h.webp";
import logo72 from "@/assets/img/logo-sgk-72h.webp";
import logo108 from "@/assets/img/logo-sgk-108h.webp";
import logo144 from "@/assets/img/logo-sgk-144h.webp";

const SRCSET = [
  `${logo36} 42w`,
  `${logo72} 85w`,
  `${logo108} 127w`,
  `${logo144} 170w`,
].join(", ");

type LogoProps = {
  className?: string;
  sizes: string;
  priority?: boolean;
};

export function Logo({ className, sizes, priority = false }: LogoProps) {
  return (
    <picture>
      <source type="image/webp" srcSet={SRCSET} sizes={sizes} />
      <img
        src={logo72}
        srcSet={SRCSET}
        sizes={sizes}
        alt="Logo PT Sekawan Global Komunika"
        width={434}
        height={368}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className={className}
      />
    </picture>
  );
}
