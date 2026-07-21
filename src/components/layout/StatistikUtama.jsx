import { statistikDampak } from "../../data/mockData";

export default function StatistikUtama() {
  const daftarStatistik = [
    { angka: `${statistikDampak.totalMitraAktif}+`, label: "Mitra Aktif" },
    { angka: `${(statistikDampak.totalSampahDiproses / 1000).toFixed(1)} ton`, label: "Sampah Diproses" },
    { angka: `${(statistikDampak.totalMaggotDihasilkan / 1000).toFixed(1)} ton`, label: "Maggot Dihasilkan" },
    { angka: `${statistikDampak.totalEmisiKarbonDicegah} ton`, label: "CO₂e Dicegah" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-5 pb-14">
      <div className="rounded-xl2 bg-hutan-800 px-6 py-8 shadow-card sm:px-10">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {daftarStatistik.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-extrabold text-white">{s.angka}</p>
              <p className="mt-1 text-xs text-tunas-100/80">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
