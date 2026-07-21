export default function Hero({ user, onNavigasi, onBukaLogin }) {
  const mulaiSekarang = () => {
    if (user) onNavigasi("pickup");
    else onBukaLogin();
  };

  return (
    <section className="mx-auto max-w-6xl px-5 pb-6 pt-14">
      <div className="mx-auto max-w-3xl text-center">
        <span className="label-bagian">Platform Ekonomi Sirkular</span>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
          Sampah Organik Bukan Akhir, tapi Awal Nilai Baru.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-hutan-600">
          Satyagraha menghubungkan dapur MBG, sekolah, hotel, restoran, dan UMKM dengan pengelola
          sampah untuk mengubah sisa makanan menjadi maggot, pakan ternak, dan pupuk organik —
          seluruhnya dikelola secara digital.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button onClick={mulaiSekarang} className="btn-primer">
            Belanja Sekarang
          </button>
          <button onClick={() => onNavigasi("tentang")} className="btn-sekunder">
            Pelajari Prosesnya
          </button>
        </div>
      </div>
    </section>
  );
}
