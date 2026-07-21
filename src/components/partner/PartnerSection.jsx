import { useState } from "react";
import { daftarMitra } from "../../data/mockData";
import { useToast } from "../../context/ToastContext";

export default function PartnerSection() {
  const [terkirim, setTerkirim] = useState(false);
  const [memuat, setMemuat] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ nama: "", jenis: "Sekolah", lokasi: "", perkiraanSampah: "" });
  const { showToast } = useToast();

  const ubahForm = (field) => (e) => setForm((s) => ({ ...s, [field]: e.target.value }));

  const tanganiDaftar = (e) => {
    e.preventDefault();
    if (!form.nama.trim() || !form.lokasi.trim() || Number(form.perkiraanSampah) <= 0) {
      setError("Lengkapi semua kolom dengan nilai yang valid sebelum mengirim.");
      return;
    }
    setError("");
    setMemuat(true);
    setTimeout(() => {
      setMemuat(false);
      setTerkirim(true);
      showToast(`Pendaftaran "${form.nama}" berhasil dikirim.`);
      setForm({ nama: "", jenis: "Sekolah", lokasi: "", perkiraanSampah: "" });
      setTimeout(() => setTerkirim(false), 4000);
    }, 600);
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <div className="mb-8 max-w-2xl">
        <span className="label-bagian">Mitra Terhubung</span>
        <h2 className="mt-3 text-3xl font-extrabold">Instansi yang Sudah Bergabung</h2>
        <p className="mt-2 text-hutan-600">
          Sekolah, hotel, restoran, UMKM, hingga dapur MBG kini mengubah sampah dapur mereka menjadi
          sumber nilai ekonomi baru bersama Satyagraha.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="overflow-x-auto rounded-xl2 border border-tunas-100">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-hutan-800 text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold">Mitra</th>
                  <th className="px-4 py-3 font-semibold">Jenis</th>
                  <th className="px-4 py-3 font-semibold">Rata-rata/Hari</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {daftarMitra.map((m, i) => (
                  <tr key={m.id} className={i % 2 === 0 ? "bg-white" : "bg-pasir"}>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-hutan-900">{m.nama}</p>
                      <p className="text-xs text-hutan-500">{m.lokasi}</p>
                    </td>
                    <td className="px-4 py-3 text-hutan-700">{m.jenis}</td>
                    <td className="px-4 py-3 text-hutan-700">{m.rataRataSampahPerHari} kg</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          m.statusKontrak === "Aktif"
                            ? "bg-tunas-100 text-hutan-700"
                            : "bg-bara-100 text-bara-600"
                        }`}
                      >
                        {m.statusKontrak}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="kartu">
            <h3 className="font-display text-lg font-bold">Daftarkan Instansi Anda</h3>
            <p className="mt-1 text-sm text-hutan-600">
              Tim kami akan menghubungi Anda untuk verifikasi dan penjadwalan penjemputan pertama.
            </p>

            {terkirim ? (
              <p className="mt-4 animate-fade-in rounded-lg bg-tunas-100 px-4 py-3 text-sm font-semibold text-hutan-800">
                Pendaftaran terkirim! Tim kami akan menghubungi Anda dalam 1x24 jam.
              </p>
            ) : (
              <form onSubmit={tanganiDaftar} className="mt-4 flex flex-col gap-3">
                {error && (
                  <p className="rounded-lg bg-bara-100 px-3 py-2 text-xs font-medium text-bara-600">{error}</p>
                )}
                <input
                  required
                  value={form.nama}
                  onChange={ubahForm("nama")}
                  placeholder="Nama instansi"
                  className="rounded-lg border border-tunas-100 px-4 py-2.5 text-sm outline-none focus:border-tunas-500"
                />
                <select
                  value={form.jenis}
                  onChange={ubahForm("jenis")}
                  className="rounded-lg border border-tunas-100 px-4 py-2.5 text-sm outline-none focus:border-tunas-500"
                >
                  <option>Sekolah</option>
                  <option>Hotel</option>
                  <option>Restoran</option>
                  <option>UMKM</option>
                  <option>Dapur MBG</option>
                </select>
                <input
                  required
                  value={form.lokasi}
                  onChange={ubahForm("lokasi")}
                  placeholder="Lokasi (kecamatan/kota)"
                  className="rounded-lg border border-tunas-100 px-4 py-2.5 text-sm outline-none focus:border-tunas-500"
                />
                <input
                  required
                  type="number"
                  min="1"
                  value={form.perkiraanSampah}
                  onChange={ubahForm("perkiraanSampah")}
                  placeholder="Perkiraan sampah per hari (kg)"
                  className="rounded-lg border border-tunas-100 px-4 py-2.5 text-sm outline-none focus:border-tunas-500"
                />
                <button type="submit" disabled={memuat} className="btn-primer w-full !py-2.5 text-sm">
                  {memuat ? "Mengirim..." : "Kirim Pendaftaran"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
