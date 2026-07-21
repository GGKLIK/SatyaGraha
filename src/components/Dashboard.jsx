import { statistikDampak, daftarMitra } from "../data/mockData";
import { TAHAPAN_PICKUP } from "../utils/constants";
import { formatRupiahSingkat } from "../utils/format";
export default function Dashboard({ user, daftarPickup }) {
  const totalBeratUser = daftarPickup.reduce((total, p) => total + (p.perkiraanBerat || 0), 0);
  const emisiDicegahUser = (totalBeratUser * user.emisiKarbonPerKg).toFixed(1);
  const jumlahPickupSelesai = daftarPickup.filter((p) => p.tahapIndex === TAHAPAN_PICKUP.length - 1).length;

  const komposisiOutput = [
    { label: "Maggot", nilai: statistikDampak.totalMaggotDihasilkan, warna: "bg-tunas-500" },
    { label: "Pupuk", nilai: statistikDampak.totalPupukDihasilkan, warna: "bg-bara-500" },
  ];
  const nilaiMaks = Math.max(...komposisiOutput.map((k) => k.nilai));

  const riwayatAktivitas = [...daftarPickup].sort(
    (a, b) => new Date(b.tanggalPengajuan) - new Date(a.tanggalPengajuan)
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-8">
        <span className="label-bagian">Dashboard</span>
        <h1 className="mt-3 text-3xl font-extrabold">Selamat Datang, {user.nama.split(" ")[0]}</h1>
        <p className="mt-1 text-hutan-600">Berikut ringkasan dampak dan aktivitas Anda di Satyagraha.</p>
      </div>

      {/* Dashboard Impact */}
      <section className="mb-8 rounded-xl2 bg-gradient-to-br from-hutan-900 to-hutan-700 p-6 text-white shadow-card sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <span className="label-bagian !bg-white/10 !text-tunas-100">Dashboard Impact</span>
            <h2 className="mt-3 text-2xl font-extrabold">Pusat Dampak Lingkungan Satyagraha</h2>
            <p className="mt-1 max-w-md text-sm text-tunas-100/80">
              Metrik ini mencakup seluruh platform — bukti nyata bahwa setiap pickup, pembelian, dan
              donasi berubah menjadi dampak lingkungan yang terukur.
            </p>
          </div>
          <ImpactScoreBadge skor={statistikDampak.impactScore} />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <MetrikImpact angka={`${(statistikDampak.totalSampahDiproses / 1000).toFixed(1)} ton`} label="Sampah Diolah" />
          <MetrikImpact angka={`${statistikDampak.totalEmisiKarbonDicegah} ton`} label="CO₂e Dicegah" />
          <MetrikImpact angka={`${(statistikDampak.totalMaggotDihasilkan / 1000).toFixed(1)} ton`} label="Maggot Dihasilkan" />
          <MetrikImpact angka={`${(statistikDampak.totalPupukDihasilkan / 1000).toFixed(1)} ton`} label="Pupuk Diproduksi" />
          <MetrikImpact angka={statistikDampak.totalProdukTerjual.toLocaleString("id-ID")} label="Produk Terjual" />
          <MetrikImpact angka={formatRupiahSingkat(statistikDampak.totalDonasiTerkumpul)} label="Total Donasi" />
        </div>
      </section>

      {/* Kartu statistik utama pribadi */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <KartuStat label="Total Sampah Diproses" nilai={`${totalBeratUser.toLocaleString("id-ID")} kg`} />
        <KartuStat label="Jumlah Pickup" nilai={daftarPickup.length} />
        <KartuStat label="Emisi CO₂ Dicegah" nilai={`${emisiDicegahUser} kg`} aksen />
        <KartuStat label="Skor Kontribusi" nilai={`${user.skorKontribusi}/100`} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="kartu lg:col-span-2">
          <h2 className="font-display font-bold">Skor Kontribusi Lingkungan</h2>
          <p className="mt-1 text-sm text-hutan-600">
            Dihitung dari konsistensi pengajuan pickup dan volume sampah yang diserahkan.
          </p>
          <div className="mt-5">
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-semibold text-hutan-700">Skor Anda</span>
              <span className="font-semibold text-hutan-900">{user.skorKontribusi}/100</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-tunas-100">
              <div className="h-full rounded-full bg-hutan-800" style={{ width: `${user.skorKontribusi}%` }} />
            </div>
          </div>

          <h3 className="mt-6 font-display text-sm font-bold text-hutan-800">Komposisi Output Platform</h3>
          <div className="mt-3 flex flex-col gap-4">
            {komposisiOutput.map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-semibold text-hutan-700">{item.label}</span>
                  <span className="text-hutan-500">{item.nilai.toLocaleString("id-ID")} kg</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-tunas-100">
                  <div
                    className={`h-full rounded-full ${item.warna}`}
                    style={{ width: `${(item.nilai / nilaiMaks) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-lg bg-tunas-100/60 px-3 py-2 text-xs text-hutan-700">
            Platform terus berkembang seiring bertambahnya mitra & transaksi baru.
          </p>
        </div>

        <div className="kartu lg:col-span-3">
          <h2 className="font-display font-bold">Riwayat Aktivitas</h2>
          <p className="mt-1 text-sm text-hutan-600">
            {jumlahPickupSelesai} dari {daftarPickup.length} pengajuan telah selesai diproses.
          </p>
          {riwayatAktivitas.length === 0 ? (
            <p className="mt-4 text-sm text-hutan-500">Belum ada aktivitas. Ajukan pickup pertama Anda.</p>
          ) : (
            <div className="mt-4 flex flex-col divide-y divide-tunas-100">
              {riwayatAktivitas.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-tunas-100 text-sm">
                      ♻
                    </span>
                    <div>
                      <p className="font-semibold text-hutan-900">{p.jenisSampah}</p>
                      <p className="text-xs text-hutan-500">
                        {p.perkiraanBerat} kg • Diajukan {p.tanggalPengajuan}
                      </p>
                    </div>
                  </div>
                  <StatusPill tahapIndex={p.tahapIndex} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {user.peran === "admin" && (
        <div className="kartu mt-6">
          <h2 className="font-display font-bold">Ringkasan Mitra Terdaftar</h2>
          <p className="mt-1 text-sm text-hutan-600">Total {daftarMitra.length} mitra tercatat di sistem.</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {daftarMitra.map((m) => (
              <div key={m.id} className="flex items-center justify-between rounded-lg border border-tunas-100 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-hutan-900">{m.nama}</p>
                  <p className="text-xs text-hutan-500">{m.jenis} • {m.lokasi}</p>
                </div>
                <span className="text-sm font-semibold text-hutan-700">{m.rataRataSampahPerHari} kg/hari</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ImpactScoreBadge({ skor }) {
  return (
    <div
      className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full"
      style={{ background: `conic-gradient(#FF8C42 ${skor * 3.6}deg, rgba(255,255,255,0.15) 0deg)` }}
    >
      <div className="absolute inset-[6px] flex flex-col items-center justify-center rounded-full bg-hutan-900">
        <p className="font-display text-2xl font-extrabold text-white">{skor}</p>
        <p className="text-[10px] text-tunas-100/70">Impact Score</p>
      </div>
    </div>
  );
}

function MetrikImpact({ angka, label }) {
  return (
    <div className="rounded-lg bg-white/10 px-3 py-4 text-center">
      <p className="font-display text-lg font-extrabold text-white sm:text-xl">{angka}</p>
      <p className="mt-1 text-[11px] text-tunas-100/80">{label}</p>
    </div>
  );
}

function KartuStat({ label, nilai, aksen }) {
  return (
    <div className="kartu !p-4">
      <p className="text-xs text-hutan-500">{label}</p>
      <p className={`mt-1 font-display text-xl font-extrabold ${aksen ? "text-bara-600" : "text-hutan-900"}`}>
        {nilai}
      </p>
    </div>
  );
}

function StatusPill({ tahapIndex }) {
  const selesai = tahapIndex === TAHAPAN_PICKUP.length - 1;
  const gaya = selesai ? "bg-tunas-100 text-hutan-700" : "bg-bara-100 text-bara-600";
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${gaya}`}>{TAHAPAN_PICKUP[tahapIndex]}</span>;
}
