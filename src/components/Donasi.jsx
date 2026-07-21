import { useMemo, useState } from "react";
import { programDonasi, daftarDonasi } from "../data/mockData";
import { formatRupiah } from "../utils/format";
import { useToast } from "../context/ToastContext";
export default function Donasi({ user }) {
  const [programList, setProgramList] = useState(programDonasi);
  const [riwayat, setRiwayat] = useState(daftarDonasi);
  const [programTerpilih, setProgramTerpilih] = useState(null);
  const [jumlah, setJumlah] = useState("");
  const [namaDonatur, setNamaDonatur] = useState(user?.nama || "");
  const [terkirim, setTerkirim] = useState(false);
  const [mengirim, setMengirim] = useState(false);
  const [error, setError] = useState("");
  const { showToast } = useToast();

  const nominalCepat = [25000, 50000, 100000, 250000];

  const totalTerkumpulSemuaProgram = programList.reduce((sum, p) => sum + p.danaTerkumpul, 0);
  const totalTargetSemuaProgram = programList.reduce((sum, p) => sum + p.targetDana, 0);
  const persentaseKeseluruhan = Math.round((totalTerkumpulSemuaProgram / totalTargetSemuaProgram) * 100);

  const leaderboard = useMemo(() => {
    const peta = new Map();
    riwayat.forEach((d) => peta.set(d.namaDonatur, (peta.get(d.namaDonatur) || 0) + d.jumlah));
    return Array.from(peta.entries())
      .map(([nama, total]) => ({ nama, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [riwayat]);

  const tanganiDonasi = (e) => {
    e.preventDefault();
    if (!namaDonatur.trim() || !jumlah || Number(jumlah) < 1000) {
      setError("Isi nama dan nominal donasi (minimal Rp1.000) dengan benar.");
      return;
    }
    setError("");
    setMengirim(true);

    setTimeout(() => {
      const programDipilih = programList.find((p) => p.id === programTerpilih);

      setRiwayat((daftar) => [
        {
          id: `dns-${Math.floor(1000 + Math.random() * 9000)}`,
          donaturId: user?.id || null,
          namaDonatur,
          jumlah: Number(jumlah),
          program: programDipilih ? programDipilih.nama : "Dukungan Umum",
          tanggal: new Date().toISOString().slice(0, 10),
          pesan: "",
        },
        ...daftar,
      ]);

      if (programDipilih) {
        setProgramList((daftar) =>
          daftar.map((p) => (p.id === programDipilih.id ? { ...p, danaTerkumpul: p.danaTerkumpul + Number(jumlah) } : p))
        );
      }

      setMengirim(false);
      setTerkirim(true);
      showToast("Terima kasih! Donasi Anda telah kami terima.");
      setJumlah("");
      setTimeout(() => setTerkirim(false), 4000);
    }, 500);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="label-bagian">Donasi</span>
          <h1 className="mt-3 text-3xl font-extrabold">Dukung Pengolahan Sampah Organik</h1>
          <p className="mt-2 max-w-2xl text-hutan-600">
            Donasi Anda membantu memperluas fasilitas budidaya maggot, mensubsidi penjemputan UMKM,
            dan mendanai edukasi masyarakat.
          </p>
        </div>
        <a href="#form-donasi" className="btn-primer !px-6">
          Donasi Sekarang
        </a>
      </div>

      <div className="mt-8 rounded-xl2 bg-hutan-800 px-6 py-8 shadow-card sm:px-10">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          <div className="text-center">
            <p className="font-display text-3xl font-extrabold text-white">{formatRupiah(totalTerkumpulSemuaProgram)}</p>
            <p className="mt-1 text-xs text-tunas-100/80">Total Dana Terkumpul</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl font-extrabold text-white">{riwayat.length}</p>
            <p className="mt-1 text-xs text-tunas-100/80">Jumlah Donatur</p>
          </div>
          <div className="col-span-2 text-center sm:col-span-1">
            <p className="font-display text-3xl font-extrabold text-white">{persentaseKeseluruhan}%</p>
            <p className="mt-1 text-xs text-tunas-100/80">Dari Total Target Program</p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="flex flex-col gap-4 lg:col-span-3">
          <h2 className="font-display text-xl font-bold">Program Donasi Aktif</h2>
          {programList.map((prog) => {
            const persentase = Math.min(100, Math.round((prog.danaTerkumpul / prog.targetDana) * 100));
            return (
              <div key={prog.id} className="kartu">
                <h3 className="font-display font-bold text-hutan-900">{prog.nama}</h3>
                <p className="mt-1 text-sm text-hutan-600">{prog.deskripsi}</p>
                <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-tunas-100">
                  <div className="h-full rounded-full bg-bara-500" style={{ width: `${persentase}%` }} />
                </div>
                <div className="mt-2 flex justify-between text-xs text-hutan-500">
                  <span>{formatRupiah(prog.danaTerkumpul)} terkumpul ({persentase}%)</span>
                  <span>Target {formatRupiah(prog.targetDana)}</span>
                </div>
                <button
                  onClick={() => setProgramTerpilih(prog.id)}
                  className={`mt-4 w-full rounded-full py-2 text-sm font-semibold transition ${
                    programTerpilih === prog.id
                      ? "bg-hutan-800 text-white"
                      : "border-2 border-hutan-800 text-hutan-800 hover:bg-hutan-800 hover:text-white"
                  }`}
                >
                  {programTerpilih === prog.id ? "Program Dipilih" : "Pilih Program Ini"}
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="kartu">
            <h3 className="font-display font-bold">Leaderboard Donatur</h3>
            <p className="mt-1 text-xs text-hutan-500">Total donasi tertinggi dari seluruh program.</p>
            <div className="mt-4 flex flex-col gap-3">
              {leaderboard.map((d, i) => (
                <div key={d.nama} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                        i === 0
                          ? "bg-bara-500 text-white"
                          : i === 1
                          ? "bg-hutan-800 text-white"
                          : i === 2
                          ? "bg-tunas-500 text-white"
                          : "bg-tunas-100 text-hutan-700"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm font-semibold text-hutan-800">{d.nama}</span>
                  </div>
                  <span className="text-sm font-semibold text-hutan-900">{formatRupiah(d.total)}</span>
                </div>
              ))}
            </div>
          </div>

          <div id="form-donasi" className="kartu scroll-mt-24">
            <h3 className="font-display font-bold">Formulir Donasi</h3>
            {terkirim ? (
              <p className="mt-4 animate-fade-in rounded-lg bg-tunas-100 px-4 py-3 text-sm font-semibold text-hutan-800">
                Terima kasih! Donasi Anda telah kami terima.
              </p>
            ) : (
              <form onSubmit={tanganiDonasi} className="mt-4 flex flex-col gap-3">
                <p className="text-xs font-semibold text-hutan-600">
                  Program: {programTerpilih ? programList.find((p) => p.id === programTerpilih)?.nama : "Dukungan Umum"}
                </p>
                {error && (
                  <p className="rounded-lg bg-bara-100 px-3 py-2 text-xs font-medium text-bara-600">{error}</p>
                )}
                <input
                  required
                  value={namaDonatur}
                  onChange={(e) => setNamaDonatur(e.target.value)}
                  placeholder="Nama Anda"
                  className="rounded-lg border border-tunas-100 px-4 py-2.5 text-sm outline-none focus:border-tunas-500"
                />
                <div className="grid grid-cols-2 gap-2">
                  {nominalCepat.map((n) => (
                    <button
                      type="button"
                      key={n}
                      onClick={() => setJumlah(String(n))}
                      className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                        jumlah === String(n)
                          ? "border-hutan-800 bg-hutan-800 text-white"
                          : "border-tunas-100 text-hutan-700 hover:bg-tunas-100/60"
                      }`}
                    >
                      {formatRupiah(n)}
                    </button>
                  ))}
                </div>
                <input
                  required
                  type="number"
                  min="1000"
                  value={jumlah}
                  onChange={(e) => setJumlah(e.target.value)}
                  placeholder="Atau masukkan nominal lain"
                  className="rounded-lg border border-tunas-100 px-4 py-2.5 text-sm outline-none focus:border-tunas-500"
                />
                <button type="submit" disabled={mengirim} className="btn-primer w-full !py-2.5 text-sm">
                  {mengirim ? "Memproses..." : "Donasi Sekarang"}
                </button>
              </form>
            )}
          </div>

          <div className="kartu">
            <h3 className="font-display font-bold">Donasi Terbaru</h3>
            <div className="mt-3 flex flex-col divide-y divide-tunas-100">
              {riwayat
                .slice()
                .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
                .slice(0, 8)
                .map((d) => (
                  <div key={d.id} className="py-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-hutan-900">{d.namaDonatur}</span>
                      <span className="font-semibold text-bara-600">{formatRupiah(d.jumlah)}</span>
                    </div>
                    <p className="text-xs text-hutan-500">{d.program} • {d.tanggal}</p>
                    {d.pesan && <p className="mt-1 text-xs italic text-hutan-600">&ldquo;{d.pesan}&rdquo;</p>}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
