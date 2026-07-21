import { materiEdukasi } from "../data/mockData";
export default function Edukasi() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <span className="label-bagian">Edukasi</span>
      <h1 className="mt-3 text-3xl font-extrabold">Pelajari Ekonomi Sirkular Sampah Organik</h1>
      <p className="mt-2 max-w-2xl text-hutan-600">
        Materi singkat untuk membantu mitra dan masyarakat memahami proses pengolahan sampah menjadi
        maggot, pakan ternak, dan pupuk.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {materiEdukasi.map((materi) => (
          <article key={materi.id} className="kartu">
            <span className="label-bagian !bg-bara-100 !text-bara-600">{materi.kategori}</span>
            <h2 className="mt-3 font-display text-lg font-bold text-hutan-900">{materi.judul}</h2>
            <p className="mt-2 text-sm text-hutan-600">{materi.ringkasan}</p>
            <p className="mt-4 text-xs font-semibold text-hutan-500">Waktu baca: {materi.waktuBaca}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
