import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check,
  Copy,
  Download,
  FolderArchive,
  Server,
  ShieldCheck,
  Terminal,
  CheckCircle2,
} from "lucide-react";

const TITLE = "Export & Deploy Apache — Mentari Satria";
const DESCRIPTION =
  "Cara clone repo, build di laptop, mengekspor kode dan aset jadi paket statis, lalu meng-upload-nya ke server Apache (public_html) lengkap dengan konfigurasi .htaccess.";

export const Route = createFileRoute("/apache")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ApacheGuide,
});

function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.03]">
      <div className="flex items-center justify-between border-b border-foreground/10 px-4 py-2">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {label ?? "shell"}
        </span>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          }}
          className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Tersalin" : "Salin"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[13px] leading-relaxed">
        <code className="font-mono text-foreground/90">{code}</code>
      </pre>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="relative border-l border-foreground/10 pl-6 sm:pl-8">
      <span className="absolute -left-[13px] top-0 grid h-6 w-6 place-items-center rounded-full border border-foreground/15 bg-background text-[11px] font-bold text-foreground">
        {n}
      </span>
      <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

const ENV_VARS = [
  {
    label: "VITE_SUPABASE_URL",
    desc: "URL backend. Wajib — ikut ter-bundle ke browser saat build statis.",
  },
  {
    label: "VITE_SUPABASE_PUBLISHABLE_KEY",
    desc: "Kunci publik backend. Wajib. Dilindungi RLS, aman berada di browser.",
  },
  {
    label: "SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY",
    desc: "Salinan nilai di atas. Dipakai skrip validasi & mode SSR (NGINX).",
  },
];

const EXPORT_CMDS = `# Paket siap-upload (HTML + aset) → release/site + ZIP
npm run export

# Paket kode sumber lengkap (tanpa node_modules) → release/mentarisatria-source.zip
npm run export:source`;

const CLONE = `# 1. Clone repo ke laptop
git clone <URL_REPO> mentarisatria
cd mentarisatria

# 2. Pasang dependensi (Node.js 20+)
npm ci

# 3. Siapkan environment
cp .env.example .env    # lalu isi nilai VITE_SUPABASE_*

# 4. Development
npm run dev             # http://localhost:8080`;

const EXPORT_FLOW = `# Build + kemas jadi paket statis
npm run export

# Hasil:
#   release/site/                    ← upload SELURUH isinya ke public_html
#   release/mentarisatria-site.zip   ← versi ZIP untuk cPanel File Manager

# Cek dulu di laptop sebelum upload
npm run preview                      # http://localhost:4173`;

const UPLOAD = `# Opsi A — cPanel File Manager
#   1. Buka File Manager → public_html
#   2. Upload release/mentarisatria-site.zip
#   3. Klik kanan → Extract
#   4. Aktifkan "Show Hidden Files" dan pastikan .htaccess ada

# Opsi B — rsync / SSH
rsync -avz --delete release/site/ user@server:/var/www/html/

# Opsi C — FTP (FileZilla)
#   Server → Site Manager → aktifkan "Show hidden files"
#   Drag seluruh isi release/site ke public_html`;

const HTACCESS = `Options -Indexes
DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Paksa HTTPS (aktifkan bila SSL sudah terpasang)
  # RewriteCond %{HTTPS} !=on
  # RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Halaman hasil prerender: /apache → /apache/index.html
  RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f
  RewriteRule ^(.+?)/?$ /$1/index.html [L]

  RewriteRule ^ /index.html [L]
</IfModule>

<IfModule mod_mime.c>
  AddType image/webp .webp
  AddType image/avif .avif
  AddType video/mp4 .mp4
  AddType font/woff2 .woff2
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml application/json
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\\.(css|js|webp|avif|png|jpe?g|svg|mp4|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.html$">
    Header set Cache-Control "no-cache, must-revalidate"
  </FilesMatch>
</IfModule>

ErrorDocument 404 /index.html`;

const UPDATE = `cd mentarisatria
git pull
npm ci
npm run export
rsync -avz --delete release/site/ user@server:/var/www/html/`;

function ApacheGuide() {
  const [checked, setChecked] = useState<boolean[]>(() => ENV_VARS.map(() => false));
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const toggle = (i: number) =>
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const done = checked.filter(Boolean).length;

  const copyCmd = (id: string, cmd: string) => {
    navigator.clipboard?.writeText(cmd);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 1800);
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <Link
          to="/"
          className="text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Kembali ke beranda
        </Link>

        <header className="mt-6">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <Server size={14} /> Dokumentasi Deployment
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tighter sm:text-5xl">
            Export &amp; Deploy ke{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Apache
            </span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Alurnya: clone ke laptop → development → <code>npm run export</code> → upload folder
            hasilnya ke <code>public_html</code>. Server Apache cukup melayani file statis, tidak
            perlu Node.js sama sekali.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Butuh mode SSR dengan reverse proxy?{" "}
            <Link to="/nginx" className="underline underline-offset-4 hover:text-foreground">
              Lihat panduan NGINX
            </Link>
            .
          </p>
        </header>

        {/* Tombol export */}
        <section className="mt-10 rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-5 sm:p-6">
          <h2 className="text-lg font-bold tracking-tight text-foreground">Export kode &amp; aset</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Pengemasan dilakukan di laptop karena situs statis tidak punya proses server. Tekan
            tombol untuk menyalin perintahnya, jalankan di terminal, lalu file siap unduh ada di
            folder <code>release/</code>.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => copyCmd("site", "npm run export")}
              className="group flex items-start gap-3 rounded-2xl border border-foreground/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4 text-left transition-colors hover:border-foreground/25"
            >
              <span className="mt-0.5 text-blue-400">
                {copiedCmd === "site" ? <Check size={18} /> : <Download size={18} />}
              </span>
              <span>
                <span className="block text-sm font-bold text-foreground">
                  {copiedCmd === "site" ? "Perintah tersalin" : "Export paket situs"}
                </span>
                <span className="mt-0.5 block font-mono text-[11px] text-muted-foreground">
                  npm run export
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  HTML, CSS, JS, gambar &amp; video → <code>release/site</code> + ZIP
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => copyCmd("source", "npm run export:source")}
              className="group flex items-start gap-3 rounded-2xl border border-foreground/10 bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-4 text-left transition-colors hover:border-foreground/25"
            >
              <span className="mt-0.5 text-purple-400">
                {copiedCmd === "source" ? <Check size={18} /> : <FolderArchive size={18} />}
              </span>
              <span>
                <span className="block text-sm font-bold text-foreground">
                  {copiedCmd === "source" ? "Perintah tersalin" : "Export kode sumber"}
                </span>
                <span className="mt-0.5 block font-mono text-[11px] text-muted-foreground">
                  npm run export:source
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  Seluruh kode + <code>src/assets</code>, tanpa node_modules
                </span>
              </span>
            </button>
          </div>

          <div className="mt-4">
            <CodeBlock code={EXPORT_CMDS} label="terminal di laptop" />
          </div>
        </section>

        {/* Checklist env */}
        <section className="mt-8 rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                Checklist environment
              </h2>
              <p className="text-xs text-muted-foreground">
                Untuk build statis hanya variabel di bawah ini yang wajib.
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-foreground">
                {done}/{ENV_VARS.length}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {done === ENV_VARS.length ? "Siap build" : "Belum lengkap"}
              </p>
            </div>
          </div>
          <ul className="space-y-3">
            {ENV_VARS.map((item, i) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="flex w-full items-start gap-3 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-3 text-left transition-colors hover:border-foreground/20"
                >
                  <span
                    className={`mt-0.5 shrink-0 transition-colors ${
                      checked[i] ? "text-emerald-400" : "text-muted-foreground/40"
                    }`}
                  >
                    <CheckCircle2 size={18} />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-bold text-foreground">{item.label}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                      {item.desc}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 space-y-12">
          <Step n={1} title="Clone & development di laptop">
            <p>
              Semua gambar dan video tersimpan di dalam repo (<code>src/assets</code>), jadi hasil
              clone langsung lengkap tanpa perlu mengunduh aset dari mana pun.
            </p>
            <CodeBlock code={CLONE} label="bash" />
          </Step>

          <Step n={2} title="Export paket statis">
            <p>
              Perintah <code>npm run export</code> menjalankan validasi environment, build
              prerender (setiap halaman jadi file HTML), menambahkan <code>.htaccess</code>, lalu
              membuat ZIP siap upload.
            </p>
            <CodeBlock code={EXPORT_FLOW} label="bash" />
          </Step>

          <Step n={3} title="Upload ke Apache">
            <p>
              Isi folder <code>release/site</code> dipindahkan apa adanya ke document root
              (biasanya <code>public_html</code> atau <code>/var/www/html</code>).
            </p>
            <CodeBlock code={UPLOAD} label="bash" />
          </Step>

          <Step n={4} title="Konfigurasi .htaccess">
            <p>
              File ini sudah otomatis disertakan oleh <code>npm run export</code>. Berikut isinya
              bila perlu disesuaikan manual di server.
            </p>
            <CodeBlock code={HTACCESS} label=".htaccess" />
            <p>
              Modul yang perlu aktif di Apache: <code>mod_rewrite</code>, <code>mod_deflate</code>,{" "}
              <code>mod_headers</code>, <code>mod_expires</code>. Pada VPS pastikan{" "}
              <code>AllowOverride All</code> di konfigurasi VirtualHost agar .htaccess dibaca.
            </p>
          </Step>

          <Step n={5} title="Update situs">
            <p>Setiap ada perubahan, ulangi build lalu timpa isi document root.</p>
            <CodeBlock code={UPDATE} label="bash" />
          </Step>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <InfoCard
            icon={<Terminal size={16} />}
            title="Tanpa Node di server"
            body="Semua halaman sudah di-prerender jadi HTML. Apache hanya melayani file statis."
          />
          <InfoCard
            icon={<ShieldCheck size={16} />}
            title="Kunci publik"
            body="Hanya kunci publishable yang ikut ter-bundle, dilindungi RLS. Service-role key tidak dipakai."
          />
          <InfoCard
            icon={<Download size={16} />}
            title="Halaman /mystats"
            body="Analitik berjalan penuh di browser, jadi tetap bekerja pada hosting statis."
          />
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-5">
      <p className="flex items-center gap-2 text-sm font-bold text-foreground">
        {icon}
        {title}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
