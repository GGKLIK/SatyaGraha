import { testimoniMitra } from "../data/mockData";
import Hero from "./layout/Hero";
import StatistikUtama from "./layout/StatistikUtama";
import CaraKerjaSection from "./layout/CaraKerjaSection";
import PartnerSection from "./partner/PartnerSection";
export default function Beranda({ user, onNavigasi, onBukaLogin }) {
  return (
    <div>
      <Hero user={user} onNavigasi={onNavigasi} onBukaLogin={onBukaLogin} />
      <StatistikUtama />
      <CaraKerjaSection />
      <PartnerSection />

      {/* Testimoni */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <span className="label-bagian">Kata Mitra Kami</span>
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {testimoniMitra.map((t) => (
            <div key={t.id} className="kartu">
              <p className="text-hutan-700">&ldquo;{t.kutipan}&rdquo;</p>
              <p className="mt-4 font-display font-bold text-hutan-900">{t.nama}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
