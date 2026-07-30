import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getVisitorStats } from "@/lib/analytics.functions";

const TITLE = "MyStats — Analitik Pengunjung Mentari Satria";
const DESCRIPTION =
  "Dashboard statistik pengunjung situs PT Sekawan Global Komunika: kunjungan, perangkat, lokasi, sumber trafik, dan interaksi.";

export const Route = createFileRoute("/mystats")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MyStats,
  errorComponent: ({ error }) => (
    <div className="p-10 text-center text-sm text-muted-foreground" role="alert">
      Gagal memuat statistik: {error.message}
    </div>
  ),
});

const RANGES = [7, 30, 90] as const;
const PIE_COLORS = ["#60a5fa", "#a855f7", "#34d399", "#f59e0b", "#f472b6"];

type Row = { label: string; value: number };

function Panel({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-5 backdrop-blur-xl ${className}`}
    >
      <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4 backdrop-blur-xl">
      <p className="text-xs font-light uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-black tracking-tighter text-foreground sm:text-3xl">
        {value}
      </p>
    </div>
  );
}

function RankTable({ rows, unit = "kunjungan" }: { rows: Row[]; unit?: string }) {
  if (!rows.length) {
    return <p className="text-sm font-light text-muted-foreground">Belum ada data.</p>;
  }
  const max = rows[0].value || 1;
  return (
    <ul className="space-y-2">
      {rows.slice(0, 8).map((r) => (
        <li key={r.label} className="text-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="truncate font-light text-foreground">{r.label}</span>
            <span className="shrink-0 font-bold text-muted-foreground">
              {r.value} {unit}
            </span>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-foreground/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
              style={{ width: `${Math.round((r.value / max) * 100)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function toCsv(rows: Record<string, string | number>[]) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const escape = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
  return [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
  ].join("\n");
}

function MyStats() {
  const [days, setDays] = useState<number>(30);

  const { data, isLoading, error } = useQuery({
    queryKey: ["visitor-stats", days],
    queryFn: () => getVisitorStats({ data: { days } }),
    refetchInterval: 60000,
  });

  const download = () => {
    if (!data) return;
    const csv = toCsv(data.recent as unknown as Record<string, string | number>[]);
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `mystats-${days}hari.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen w-full bg-background px-4 py-10 text-foreground sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-light uppercase tracking-[0.3em] text-muted-foreground">
              PT. Sekawan Global Komunika
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tighter sm:text-5xl">
              Statistik{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Pengunjung
              </span>
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {RANGES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setDays(r)}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                  days === r
                    ? "border-transparent bg-foreground text-background"
                    : "border-foreground/15 text-muted-foreground hover:text-foreground"
                }`}
              >
                {r} hari
              </button>
            ))}
            <button
              type="button"
              onClick={download}
              className="rounded-full border border-foreground/15 px-4 py-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
            >
              Ekspor CSV
            </button>
          </div>
        </header>

        {isLoading && (
          <p className="mt-10 text-sm font-light text-muted-foreground">Memuat statistik…</p>
        )}
        {error && (
          <p className="mt-10 text-sm text-red-400" role="alert">
            Gagal memuat statistik: {(error as Error).message}
          </p>
        )}

        {data && (
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              <StatCard label="Kunjungan" value={String(data.summary.totalVisits)} />
              <StatCard label="Pengunjung unik" value={String(data.summary.uniqueVisitors)} />
              <StatCard label="Sesi" value={String(data.summary.sessions)} />
              <StatCard label="Rata-rata durasi" value={`${data.summary.avgDuration} dtk`} />
              <StatCard label="Bounce rate" value={`${data.summary.bounceRate}%`} />
              <StatCard label="Rata-rata scroll" value={`${data.summary.avgScroll}%`} />
            </div>

            <Panel title="Kunjungan per hari">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.byDay}>
                    <defs>
                      <linearGradient id="visitFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 11, fill: "currentColor" }}
                      className="text-muted-foreground"
                      tickLine={false}
                      axisLine={false}
                      minTickGap={24}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 11, fill: "currentColor" }}
                      className="text-muted-foreground"
                      tickLine={false}
                      axisLine={false}
                      width={30}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(10,10,20,0.9)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 12,
                        color: "#fff",
                        fontSize: 12,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#818cf8"
                      strokeWidth={2}
                      fill="url(#visitFill)"
                      name="Kunjungan"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Panel>

            <div className="grid gap-6 lg:grid-cols-3">
              <Panel title="Jam ramai (UTC)" className="lg:col-span-2">
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.byHour}>
                      <XAxis
                        dataKey="label"
                        tick={{ fontSize: 10, fill: "currentColor" }}
                        className="text-muted-foreground"
                        tickLine={false}
                        axisLine={false}
                        interval={2}
                      />
                      <YAxis
                        allowDecimals={false}
                        tick={{ fontSize: 11, fill: "currentColor" }}
                        className="text-muted-foreground"
                        tickLine={false}
                        axisLine={false}
                        width={30}
                      />
                      <Tooltip
                        cursor={{ fill: "rgba(255,255,255,0.05)" }}
                        contentStyle={{
                          background: "rgba(10,10,20,0.9)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: 12,
                          color: "#fff",
                          fontSize: 12,
                        }}
                      />
                      <Bar dataKey="value" fill="#60a5fa" radius={[4, 4, 0, 0]} name="Kunjungan" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Panel>

              <Panel title="Perangkat">
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.byDevice}
                        dataKey="value"
                        nameKey="label"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                      >
                        {data.byDevice.map((entry, i) => (
                          <Cell key={entry.label} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: "rgba(10,10,20,0.9)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: 12,
                          color: "#fff",
                          fontSize: 12,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <RankTable rows={data.byDevice} />
              </Panel>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Panel title="Browser">
                <RankTable rows={data.byBrowser} />
              </Panel>
              <Panel title="Sistem operasi">
                <RankTable rows={data.byOs} />
              </Panel>
              <Panel title="Bahasa">
                <RankTable rows={data.byLanguage} />
              </Panel>
              <Panel title="Negara">
                <RankTable rows={data.byCountry} />
              </Panel>
              <Panel title="Kota">
                <RankTable rows={data.byCity} />
              </Panel>
              <Panel title="Sumber trafik">
                <RankTable rows={data.byReferrer} />
              </Panel>
              <Panel title="Kampanye UTM">
                <RankTable rows={data.byCampaign} />
              </Panel>
              <Panel title="Halaman">
                <RankTable rows={data.byPath} />
              </Panel>
              <Panel title="Interaksi / klik">
                <RankTable rows={data.byEvent} unit="klik" />
                {data.byEventLabel.length > 0 && (
                  <div className="mt-4 border-t border-foreground/10 pt-4">
                    <RankTable rows={data.byEventLabel} unit="klik" />
                  </div>
                )}
              </Panel>
            </div>

            <Panel title="50 kunjungan terakhir">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="text-xs uppercase tracking-widest text-muted-foreground">
                    <tr>
                      <th className="py-2 pr-4 font-medium">Waktu</th>
                      <th className="py-2 pr-4 font-medium">Halaman</th>
                      <th className="py-2 pr-4 font-medium">Perangkat</th>
                      <th className="py-2 pr-4 font-medium">Browser / OS</th>
                      <th className="py-2 pr-4 font-medium">Lokasi</th>
                      <th className="py-2 pr-4 font-medium">Sumber</th>
                      <th className="py-2 pr-4 font-medium">Durasi</th>
                      <th className="py-2 font-medium">Scroll</th>
                    </tr>
                  </thead>
                  <tbody className="font-light text-foreground">
                    {data.recent.map((r, i) => (
                      <tr key={`${r.createdAt}-${i}`} className="border-t border-foreground/10">
                        <td className="whitespace-nowrap py-2 pr-4">
                          {new Date(r.createdAt).toLocaleString("id-ID")}
                        </td>
                        <td className="py-2 pr-4">{r.path}</td>
                        <td className="py-2 pr-4">{r.device}</td>
                        <td className="py-2 pr-4">
                          {r.browser} / {r.os}
                        </td>
                        <td className="py-2 pr-4">{r.location}</td>
                        <td className="py-2 pr-4">{r.source}</td>
                        <td className="py-2 pr-4">{r.duration} dtk</td>
                        <td className="py-2">{r.scroll}%</td>
                      </tr>
                    ))}
                    {!data.recent.length && (
                      <tr>
                        <td colSpan={8} className="py-6 text-center text-muted-foreground">
                          Belum ada kunjungan tercatat.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Panel>
          </div>
        )}
      </div>
    </div>
  );
}
