import { TAHAPAN_PICKUP } from "../utils/constants";
export default function Tracking({ daftarPickup }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <span className="label-bagian">Tracking</span>
      <h1 className="mt-3 text-3xl font-extrabold">Lacak Status Penjemputan</h1>
      <p className="mt-2 text-hutan-600">
        Pantau setiap tahap penjemputan sampah organik Anda, dari pengajuan hingga menjadi produk jadi.
      </p>

      {daftarPickup.length === 0 ? (
        <div className="kartu mt-8 text-center">
          <p className="font-semibold text-hutan-700">Belum ada pengajuan pickup.</p>
          <p className="mt-1 text-sm text-hutan-500">Ajukan penjemputan pertama Anda di menu "Ajukan Pickup".</p>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-6">
          {daftarPickup
            .slice()
            .sort((a, b) => new Date(b.tanggalPengajuan) - new Date(a.tanggalPengajuan))
            .map((p) => (
              <KartuTracking key={p.id} pickup={p} />
            ))}
        </div>
      )}
    </div>
  );
}

function KartuTracking({ pickup }) {
  const persentase = Math.round((pickup.tahapIndex / (TAHAPAN_PICKUP.length - 1)) * 100);
  const sudahSelesai = pickup.tahapIndex === TAHAPAN_PICKUP.length - 1;

  return (
    <div className="kartu">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-tunas-100 pb-4">
        <div>
          <p className="font-display font-bold text-hutan-900">{pickup.jenisSampah}</p>
          <p className="text-sm text-hutan-500">
            {pickup.perkiraanBerat} kg • {pickup.alamat}
          </p>
          <p className="text-xs text-hutan-400">
            Jadwal: {pickup.tanggalPenjemputan} • {pickup.jamPenjemputan}
          </p>
        </div>
        <div className="text-right">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              sudahSelesai ? "bg-tunas-100 text-hutan-700" : "bg-bara-100 text-bara-600"
            }`}
          >
            {TAHAPAN_PICKUP[pickup.tahapIndex]}
          </span>
          <p className="mt-1 text-xs text-hutan-500">Petugas: {pickup.petugas}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs text-hutan-500">
          <span>Progres</span>
          <span>{persentase}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-tunas-100">
          <div
            className={`h-full rounded-full transition-all ${sudahSelesai ? "bg-tunas-500" : "bg-bara-500"}`}
            style={{ width: `${persentase}%` }}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col">
        {TAHAPAN_PICKUP.map((label, i) => {
          const tercapai = i <= pickup.tahapIndex;
          const aktifSaatIni = i === pickup.tahapIndex;
          const waktu = pickup.riwayatWaktu?.[i];
          const inilahTahapTerakhir = i === TAHAPAN_PICKUP.length - 1;

          return (
            <div key={label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                    tercapai
                      ? aktifSaatIni
                        ? "bg-bara-500 text-white ring-4 ring-bara-100"
                        : "bg-tunas-500 text-white"
                      : "bg-tunas-100 text-hutan-400"
                  }`}
                >
                  {tercapai && !aktifSaatIni ? "✓" : i + 1}
                </span>
                {!inilahTahapTerakhir && (
                  <span
                    className={`w-0.5 flex-1 ${i < pickup.tahapIndex ? "bg-tunas-500" : "bg-tunas-100"}`}
                    style={{ minHeight: "2.25rem" }}
                  />
                )}
              </div>
              <div className="pb-6">
                <p className={`font-display text-sm font-bold ${tercapai ? "text-hutan-900" : "text-hutan-400"}`}>
                  {label}
                  {aktifSaatIni && !sudahSelesai && (
                    <span className="ml-2 rounded-full bg-bara-100 px-2 py-0.5 text-[10px] font-semibold text-bara-600">
                      Sedang Berlangsung
                    </span>
                  )}
                </p>
                <p className={`text-xs ${tercapai ? "text-hutan-500" : "text-hutan-400"}`}>
                  {waktu ? waktu.replace(" ", " • ") : "Menunggu tahap sebelumnya"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
