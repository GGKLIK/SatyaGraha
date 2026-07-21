import PartnerSection from "./partner/PartnerSection";
export default function Tentang() {
  const sumberPendapatan = [
    {
      judul: "Penjualan Maggot & Pakan Ternak",
      desc: "Maggot BSF segar dan pakan fermentasi dijual ke peternak unggas dan pembudidaya ikan.",
    },
    {
      judul: "Penjualan Pupuk Organik",
      desc: "Kasgot (media bekas maggot) diolah menjadi pupuk padat dan cair untuk pertanian.",
    },
    {
      judul: "Langganan Kepatuhan SPPG",
      desc: "Dapur MBG berlangganan layanan pengelolaan sampah agar memenuhi standar SPPG.",
    },
    {
      judul: "Donasi & Dukungan Program",
      desc: "Masyarakat dapat mendukung perluasan fasilitas dan edukasi lewat menu Donasi.",
    },
  ];

  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 py-14">
        <span className="label-bagian">Tentang Satyagraha</span>
        <h1 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">
          Menghubungkan Penghasil Sampah dengan Pengelola, Menutup Siklus Ekonomi.
        </h1>
        <p className="mt-4 max-w-2xl text-hutan-600">
          Nama Satyagraha kami ambil sebagai semangat "kekuatan kebenaran" — komitmen jangka panjang
          untuk menyelesaikan masalah sampah organik dari akarnya, bukan sekadar memindahkannya.
          Kami percaya sampah dapur yang dikelola dengan benar bisa menjadi sumber pangan ternak,
          kesuburan tanah, dan pendapatan tambahan bagi semua pihak yang terlibat.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-14">
        <h2 className="text-2xl font-extrabold">Model Bisnis & Sumber Pendapatan</h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {sumberPendapatan.map((item) => (
            <div key={item.judul} className="kartu">
              <h3 className="font-display font-bold text-hutan-900">{item.judul}</h3>
              <p className="mt-2 text-sm text-hutan-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <PartnerSection />
    </div>
  );
}
