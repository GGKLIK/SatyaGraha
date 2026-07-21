export default function Footer({ onNavigasi }) {
  return (
    <footer className="border-t border-tunas-100 bg-hutan-900 text-tunas-100">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg font-extrabold text-white">Satyagraha</p>
            <p className="mt-2 text-sm text-tunas-100/70">
              Platform ekonomi sirkular untuk pengelolaan sampah organik menjadi maggot, pakan ternak,
              dan pupuk.
            </p>
          </div>
          <div>
            <p className="font-display font-bold text-white">Jelajahi</p>
            <div className="mt-2 flex flex-col gap-1.5 text-sm text-tunas-100/70">
              <button onClick={() => onNavigasi("beranda")} className="w-fit hover:text-white">Beranda</button>
              <button onClick={() => onNavigasi("tentang")} className="w-fit hover:text-white">Tentang</button>
              <button onClick={() => onNavigasi("edukasi")} className="w-fit hover:text-white">Edukasi</button>
            </div>
          </div>
          <div>
            <p className="font-display font-bold text-white">Kontak</p>
            <p className="mt-2 text-sm text-tunas-100/70">Malang, Jawa Timur, Indonesia</p>
            <p className="text-sm text-tunas-100/70">tes@satyagraha.id</p>
          </div>
        </div>
        <p className="mt-8 border-t border-white/10 pt-5 text-xs text-tunas-100/50">
          © 2026 Satyagraha. Seluruh data pada demo ini merupakan data tiruan.
        </p>
      </div>
    </footer>
  );
}
