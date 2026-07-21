export default function CaraKerjaSection() {
  const langkah = [
    {
      nomor: "01",
      judul: "Sampah Dikumpulkan",
      desc: "Sekolah, hotel, restoran, UMKM, dan dapur MBG mengajukan pickup lewat aplikasi.",
    },
    {
      nomor: "02",
      judul: "Diproses Maggot BSF",
      desc: "Larva Black Soldier Fly mengurai sampah organik menjadi biomassa dalam hitungan hari.",
    },
    {
      nomor: "03",
      judul: "Jadi Pakan & Pupuk",
      desc: "Maggot segar, pakan fermentasi, dan pupuk kasgot siap dipasarkan.",
    },
    {
      nomor: "04",
      judul: "Dijual di Marketplace",
      desc: "Nilai ekonomi hasil penjualan kembali mengalir ke mitra dan operasional pengelolaan.",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <div className="max-w-2xl">
        <span className="label-bagian">Bagaimana Cara Kerjanya</span>
        <h2 className="mt-3 text-3xl font-extrabold">Empat Langkah Menutup Siklus Sampah</h2>
        <p className="mt-2 text-hutan-600">
          Setiap kilogram sampah organik yang diserahkan mitra melewati proses yang sama, dari
          penjemputan hingga kembali menjadi nilai ekonomi.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {langkah.map((l, i) => (
          <div key={l.nomor} className="relative">
            <div className="kartu h-full">
              <span className="font-display text-3xl font-extrabold text-tunas-300">{l.nomor}</span>
              <h3 className="mt-3 font-display font-bold text-hutan-900">{l.judul}</h3>
              <p className="mt-2 text-sm text-hutan-600">{l.desc}</p>
            </div>
            {i < langkah.length - 1 && (
              <span className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-xl text-bara-500 lg:block">
                →
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-lg bg-bara-100 px-5 py-3">
        <span className="text-lg">↻</span>
        <p className="text-sm font-semibold text-bara-600">
          Siklus ini berulang terus-menerus — semakin banyak mitra, semakin besar dampaknya.
        </p>
      </div>
    </section>
  );
}
