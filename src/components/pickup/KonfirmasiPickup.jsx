export default function KonfirmasiPickup({ pickup, onLihatTracking, onAjukanLagi }) {
  return (
    <div className="kartu text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-tunas-100 text-3xl text-hutan-800">
        ✓
      </span>
      <h2 className="mt-4 font-display text-2xl font-extrabold text-hutan-900">Pengajuan Berhasil Dikirim</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-hutan-600">
        Tim kami akan mengonfirmasi jadwal penjemputan dalam 1x24 jam. Anda dapat memantau statusnya
        kapan saja di menu Tracking.
      </p>

      <div className="mx-auto mt-6 max-w-sm rounded-lg border border-tunas-100 p-4 text-left text-sm">
        <BarisRingkasan label="ID Pengajuan" nilai={pickup.id} />
        <BarisRingkasan label="Jenis Sampah" nilai={pickup.jenisSampah} />
        <BarisRingkasan label="Perkiraan Berat" nilai={`${pickup.perkiraanBerat} kg`} />
        <BarisRingkasan label="Jadwal" nilai={`${pickup.tanggalPenjemputan} • ${pickup.jamPenjemputan}`} />
        <BarisRingkasan label="Alamat" nilai={pickup.alamat} terakhir />
      </div>

      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <button onClick={onLihatTracking} className="btn-primer">
          Lihat Tracking
        </button>
        <button onClick={onAjukanLagi} className="btn-sekunder">
          Ajukan Pickup Lain
        </button>
      </div>
    </div>
  );
}

function BarisRingkasan({ label, nilai, terakhir }) {
  return (
    <div className={`flex justify-between gap-3 py-2 ${terakhir ? "" : "border-b border-tunas-100"}`}>
      <span className="text-hutan-500">{label}</span>
      <span className="text-right font-semibold text-hutan-900">{nilai}</span>
    </div>
  );
}
