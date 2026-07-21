export default function LangkahReview({ form }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-hutan-600">Periksa kembali detail pengajuan sebelum mengirim.</p>
      <BarisReview label="Jenis Sampah" nilai={form.jenisSampah} />
      <BarisReview label="Perkiraan Berat" nilai={`${form.perkiraanBerat} kg`} />
      <BarisReview label="Alamat" nilai={form.alamat} />
      <BarisReview label="Jadwal" nilai={`${form.tanggalPenjemputan} • ${form.jamPenjemputan}`} />
      <BarisReview label="Catatan" nilai={form.catatan || "-"} terakhir />
    </div>
  );
}

function BarisReview({ label, nilai, terakhir }) {
  return (
    <div className={`flex justify-between gap-3 py-2 text-sm ${terakhir ? "" : "border-b border-tunas-100"}`}>
      <span className="text-hutan-500">{label}</span>
      <span className="text-right font-semibold text-hutan-900">{nilai}</span>
    </div>
  );
}
