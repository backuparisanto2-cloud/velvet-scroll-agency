import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Copy, Server, Terminal, ShieldCheck, RefreshCw, CheckCircle2 } from "lucide-react";

const TITLE = "Panduan Build & Deploy NGINX — Mentari Satria";
const DESCRIPTION =
  "Langkah lengkap build produksi dan deploy website Mentari Satria di server sendiri dengan NGINX sebagai reverse proxy, termasuk konfigurasi SSL, cache aset, dan systemd service.";

export const Route = createFileRoute("/nginx")({
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
  component: NginxGuide,
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

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
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
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function CheckList({
  items,
  checked,
  onToggle,
}: {
  items: { label: string; desc: string }[];
  checked: boolean[];
  onToggle: (i: number) => void;
}) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i}>
          <button
            type="button"
            onClick={() => onToggle(i)}
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
  );
}


const BUILD = `# 1. Clone & install
git clone <URL_REPO> mentarisatria
cd mentarisatria
npm ci

# 2. Siapkan environment (.env)
cp .env.example .env
# Isi minimal:
#   SUPABASE_URL=https://<project-ref>.supabase.co
#   SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
#   VITE_SUPABASE_URL=https://<project-ref>.supabase.co
#   VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx

# 3. Build produksi
npm run build          # hasil: dist/client (aset) + dist/server (SSR)`;

const ENV_VARS = [
  {
    label: "SUPABASE_URL",
    desc: "Project URL Supabase. Dibaca oleh SSR, analytics, dan auth middleware.",
  },
  {
    label: "SUPABASE_PUBLISHABLE_KEY",
    desc: "Kunci publik/anon Supabase. Wajib untuk analytics dan client Supabase.",
  },
  {
    label: "VITE_SUPABASE_URL",
    desc: "Sama dengan SUPABASE_URL. Vite membundel ke browser saat build.",
  },
  {
    label: "VITE_SUPABASE_PUBLISHABLE_KEY",
    desc: "Sama dengan SUPABASE_PUBLISHABLE_KEY. Dibundel ke browser.",
  },
  {
    label: "SUPABASE_SERVICE_ROLE_KEY",
    desc: "Opsional. Hanya diperlukan jika fitur admin memanggil supabaseAdmin.",
  },
  {
    label: "NODE_ENV & PORT",
    desc: "Runtime SSR. NODE_ENV=production, PORT=3000 (disesuaikan service).",
  },
  {
    label: "NITRO_PRESET",
    desc: "Build saja. Gunakan NITRO_PRESET=node-server agar output bisa dijalankan Node.",
  },
];


const NODE_PRESET = `# Build untuk runtime Node (bukan Cloudflare)
# Windows PowerShell:  $env:NITRO_PRESET="node-server"; npm run build
NITRO_PRESET=node-server npm run build

# Jalankan server SSR di port 3000
node dist/server/index.mjs`;

const SYSTEMD = `[Unit]
Description=Mentari Satria Website (TanStack Start SSR)
After=network.target

[Service]
Type=simple
WorkingDirectory=/var/www/mentarisatria
Environment=NODE_ENV=production
Environment=PORT=3000
EnvironmentFile=/var/www/mentarisatria/.env
ExecStart=/usr/bin/node dist/server/index.mjs
Restart=always
RestartSec=5
User=www-data

[Install]
WantedBy=multi-user.target`;

const SYSTEMD_CMD = `sudo cp mentarisatria.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now mentarisatria
sudo systemctl status mentarisatria`;

const NGINX_SSR = `server {
    listen 80;
    server_name mentarisatria.net.id www.mentarisatria.net.id;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name mentarisatria.net.id www.mentarisatria.net.id;

    ssl_certificate     /etc/letsencrypt/live/mentarisatria.net.id/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mentarisatria.net.id/privkey.pem;

    root /var/www/mentarisatria/dist/client;

    # Kompresi
    gzip on;
    gzip_types text/css application/javascript image/svg+xml application/json;
    gzip_min_length 1024;

    client_max_body_size 20m;

    # Aset ber-hash: cache permanen, dilayani langsung oleh NGINX
    location /assets/ {
        access_log off;
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # File statis di public/ (favicon, og-image, robots.txt, video)
    location ~* \\.(png|jpg|jpeg|webp|avif|svg|ico|mp4|webm|woff2|txt|xml)$ {
        expires 30d;
        add_header Cache-Control "public";
        try_files $uri @ssr;
    }

    # Semua sisanya diteruskan ke server SSR Node
    location / {
        try_files $uri @ssr;
    }

    location @ssr {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade           $http_upgrade;
        proxy_set_header Connection        "upgrade";
        proxy_read_timeout 60s;
        proxy_buffering off;
    }
}`;

const NGINX_ENABLE = `sudo nano /etc/nginx/sites-available/mentarisatria
sudo ln -s /etc/nginx/sites-available/mentarisatria /etc/nginx/sites-enabled/
sudo nginx -t          # cek konfigurasi
sudo systemctl reload nginx

# SSL gratis via Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d mentarisatria.net.id -d www.mentarisatria.net.id`;

const REDEPLOY = `cd /var/www/mentarisatria
git pull
npm ci
NITRO_PRESET=node-server npm run build
sudo systemctl restart mentarisatria
sudo systemctl reload nginx`;

function NginxGuide() {
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
            Build &amp; Deploy dengan{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              NGINX
            </span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Situs ini berbasis TanStack Start (SSR). NGINX dipakai sebagai reverse proxy di
            depan server Node, sekaligus melayani aset statis dan sertifikat SSL.
          </p>
        </header>

        <div className="mt-12 space-y-12">
          <Step n={1} title="Build produksi">
            <p>
              Butuh Node.js 20+ dan npm. Perintah <code>npm run build</code> menghasilkan dua
              folder: <code>dist/client</code> (aset publik) dan <code>dist/server</code>{" "}
              (server SSR).
            </p>
            <CodeBlock code={BUILD} label="bash" />
          </Step>

          <Step n={2} title="Pilih preset Node">
            <p>
              Secara bawaan build memakai preset Cloudflare Workers. Untuk server sendiri
              dengan NGINX, gunakan preset <code>node-server</code> agar dihasilkan entri
              Node yang bisa dijalankan langsung.
            </p>
            <CodeBlock code={NODE_PRESET} label="bash" />
          </Step>

          <Step n={3} title="Jadikan service systemd">
            <p>
              Agar aplikasi otomatis hidup kembali setelah reboot atau crash, daftarkan
              sebagai service. Simpan file berikut sebagai{" "}
              <code>mentarisatria.service</code>.
            </p>
            <CodeBlock code={SYSTEMD} label="mentarisatria.service" />
            <CodeBlock code={SYSTEMD_CMD} label="bash" />
          </Step>

          <Step n={4} title="Konfigurasi NGINX">
            <p>
              Konfigurasi ini melayani aset ber-hash langsung dari disk (cepat, cache 1
              tahun) dan meneruskan sisanya ke server SSR di port 3000.
            </p>
            <CodeBlock code={NGINX_SSR} label="/etc/nginx/sites-available/mentarisatria" />
          </Step>

          <Step n={5} title="Aktifkan & pasang SSL">
            <p>
              Uji konfigurasi sebelum reload agar layanan tidak terputus, lalu terbitkan
              sertifikat gratis dengan Certbot.
            </p>
            <CodeBlock code={NGINX_ENABLE} label="bash" />
          </Step>

          <Step n={6} title="Update / redeploy">
            <p>
              Setiap ada perubahan kode, ulangi build lalu restart service. NGINX cukup
              di-reload bila konfigurasinya berubah.
            </p>
            <CodeBlock code={REDEPLOY} label="bash" />
          </Step>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <InfoCard
            icon={<Terminal size={16} />}
            title="Port aplikasi"
            body="Server SSR berjalan di 127.0.0.1:3000. Jangan buka port ini ke publik — akses hanya lewat NGINX."
          />
          <InfoCard
            icon={<ShieldCheck size={16} />}
            title="Environment"
            body="Simpan kunci di .env pada server, jangan di-commit. Variabel VITE_* ikut ter-bundle ke browser."
          />
          <InfoCard
            icon={<RefreshCw size={16} />}
            title="Halaman /mystats"
            body="Statistik pengunjung memakai IP dari header X-Forwarded-For, jadi header proxy di atas wajib ada."
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
