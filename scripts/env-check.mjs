#!/usr/bin/env node
/**
 * env:check — validasi variabel lingkungan wajib sebelum build / preview.
 * Jalankan manual: npm run env:check
 * Otomatis dipanggil oleh prebuild & prepreview.
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const ENV_FILES = [".env", ".env.local", ".env.production"];

function parseEnvFile(path) {
  const out = {};
  if (!existsSync(path)) return out;
  for (const raw of readFileSync(path, "utf8").split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

const fileEnv = {};
for (const f of ENV_FILES) Object.assign(fileEnv, parseEnvFile(resolve(process.cwd(), f)));
const env = { ...fileEnv, ...process.env };

const PLACEHOLDER = /<project-ref>|xxxxxxxx|your[-_]?|changeme|replace[-_]?me/i;

const REQUIRED = [
  {
    key: "SUPABASE_URL",
    hint: "URL project backend (contoh: https://abcd1234.supabase.co)",
    validate: (v) => /^https:\/\/.+\..+/.test(v) || "harus berupa URL https yang valid",
  },
  {
    key: "SUPABASE_PUBLISHABLE_KEY",
    hint: "Publishable/anon key backend",
    validate: (v) => v.length > 20 || "terlalu pendek, sepertinya bukan key valid",
  },
  {
    key: "VITE_SUPABASE_URL",
    hint: "Sama dengan SUPABASE_URL, dipakai di sisi browser",
    validate: (v) => /^https:\/\/.+\..+/.test(v) || "harus berupa URL https yang valid",
  },
  {
    key: "VITE_SUPABASE_PUBLISHABLE_KEY",
    hint: "Sama dengan SUPABASE_PUBLISHABLE_KEY, dipakai di sisi browser",
    validate: (v) => v.length > 20 || "terlalu pendek, sepertinya bukan key valid",
  },
];

const OPTIONAL = [
  { key: "NODE_ENV", hint: "production saat deploy" },
  { key: "PORT", hint: "port server SSR (default 3000)" },
  { key: "NITRO_PRESET", hint: "node-server untuk deploy NGINX sendiri" },
];

const errors = [];
const warnings = [];

for (const { key, hint, validate } of REQUIRED) {
  const value = env[key];
  if (!value) {
    errors.push(`${key} — belum diisi. ${hint}`);
    continue;
  }
  if (PLACEHOLDER.test(value)) {
    errors.push(`${key} — masih berisi placeholder dari .env.example. ${hint}`);
    continue;
  }
  const res = validate?.(value);
  if (res !== true && res !== undefined) errors.push(`${key} — ${res}`);
}

if (env.SUPABASE_URL && env.VITE_SUPABASE_URL && env.SUPABASE_URL !== env.VITE_SUPABASE_URL) {
  warnings.push("SUPABASE_URL dan VITE_SUPABASE_URL berbeda — pastikan memang disengaja.");
}
for (const { key, hint } of OPTIONAL) {
  if (!env[key]) warnings.push(`${key} tidak diset (opsional) — ${hint}`);
}

const ok = (s) => `\u001b[32m✔\u001b[0m ${s}`;
const bad = (s) => `\u001b[31m✖\u001b[0m ${s}`;
const warn = (s) => `\u001b[33m!\u001b[0m ${s}`;

console.log("\nCek variabel lingkungan (env:check)\n");
for (const { key } of REQUIRED) {
  const failed = errors.find((e) => e.startsWith(key));
  console.log(failed ? bad(failed) : ok(`${key} OK`));
}
for (const w of warnings) console.log(warn(w));

if (errors.length) {
  console.error(
    `\n${errors.length} variabel wajib belum benar. Salin .env.example menjadi .env lalu isi nilainya sebelum build/preview.\n`,
  );
  process.exit(1);
}

console.log("\nSemua variabel wajib terisi. Siap build & deploy.\n");
