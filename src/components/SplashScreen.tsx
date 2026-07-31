import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { useT } from "@/i18n/context";

const SESSION_KEY = "msg-splash-shown";
const MIN_DURATION = 450;
const MAX_DURATION = 7000;

/** Resolves when the page bundle, assets and fonts are ready. */
function whenAppReady(): Promise<void> {
  const tasks: Promise<unknown>[] = [];

  tasks.push(
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise<void>((resolve) =>
          window.addEventListener("load", () => resolve(), { once: true }),
        ),
  );

  const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
  if (fonts?.ready) tasks.push(fonts.ready.catch(() => undefined));

  return Promise.all(tasks).then(() => undefined);
}

export default function SplashScreen() {
  const t = useT();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const startedAt = useRef(0);

  useEffect(() => {
    setMounted(true);
    let shown = false;
    try {
      shown = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      shown = false;
    }
    if (shown) return;

    setVisible(true);
    startedAt.current = performance.now();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let cancelled = false;
    let hideTimer = 0;

    const finish = () => {
      if (cancelled) return;
      const elapsed = performance.now() - startedAt.current;
      const wait = Math.max(0, MIN_DURATION - elapsed);
      setReady(true);
      hideTimer = window.setTimeout(() => {
        if (cancelled) return;
        setVisible(false);
        try {
          window.sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* ignore */
        }
      }, wait);
    };

    whenAppReady().then(finish);
    // Safety net: never trap the user if something never settles.
    const failsafe = window.setTimeout(finish, MAX_DURATION);

    return () => {
      cancelled = true;
      window.clearTimeout(hideTimer);
      window.clearTimeout(failsafe);
      document.body.style.overflow = prevOverflow;
    };
  }, [reduced]);

  const release = () => {
    document.body.style.overflow = "";
  };

  if (!mounted) return null;


  return (
    <AnimatePresence onExitComplete={release}>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: reduced ? 1 : 1.04 }}
          transition={{ duration: reduced ? 0.25 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background"
        >
          {/* tech grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(circle at 50% 50%, black 0%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 0%, transparent 70%)",
            }}
          />

          {/* accent glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"
          />

          {/* scanline sweep */}
          {!reduced && (
            <motion.div
              aria-hidden
              initial={{ y: "-60%", opacity: 0 }}
              animate={{ y: "60%", opacity: [0, 1, 0] }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-blue-400/25 to-transparent"
            />
          )}

          <div className="relative flex flex-col items-center gap-5 px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: reduced ? 1 : 0.86, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: reduced ? 0.2 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Logo priority sizes="72px" className="h-14 w-auto sm:h-16" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: reduced ? 0 : 0.12 }}
              className="flex flex-col items-center gap-1.5"
            >
              <span className="text-lg font-black tracking-[0.18em] text-foreground sm:text-xl">
                MENTARI SATRIA
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  .
                </span>
              </span>
              <span className="text-[11px] font-light uppercase tracking-[0.32em] text-muted-foreground">
                {t.ui.splashTagline}
              </span>
            </motion.div>

            <div
              className="mt-2 h-[3px] w-40 overflow-hidden rounded-full bg-foreground/10"
              role="status"
              aria-label={t.ui.splashLoading}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduced ? 0.4 : 1.05, ease: [0.4, 0, 0.2, 1] }}
                className="h-full w-full origin-left rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
