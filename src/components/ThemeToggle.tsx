import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/i18n/context";
import { useT } from "@/i18n/context";

const STORAGE_KEY = "msg-theme";

function applyTheme(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const t = useT();
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const next = stored === "light" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? t.ui.toLight : t.ui.toDark}
      title={theme === "dark" ? t.ui.toLight : t.ui.toDark}
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-foreground/15 bg-foreground/5 text-foreground transition-colors hover:bg-foreground/10 ${className}`}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  const t = useT();

  return (
    <div
      role="group"
      aria-label={t.ui.language}
      className={`flex shrink-0 items-center gap-0.5 rounded-full border border-foreground/15 bg-foreground/5 p-0.5 ${className}`}
    >
      {(["id", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase transition-colors ${
            lang === code
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
