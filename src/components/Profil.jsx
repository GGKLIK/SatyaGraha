import { TAHAPAN_PICKUP } from "../utils/constants";
import { riwayatPembelian, daftarDonasi } from "../data/mockData";
import { formatRupiah } from "../utils/format";
export default function Profil({ user, daftarPickup }) {
  const totalPickupSelesai = daftarPickup.filter((p) => p.tahapIndex === TAHAPAN_PICKUP.length - 1).length;
  const totalBeratDiserahkan = daftarPickup.reduce((total, p) => total + (p.perkiraanBerat || 0), 0);

  const pembelianUser = riwayatPembelian.filter((t) => t.mitraId === user.id);
  const totalBelanja = pembelianUser.reduce((sum, t) => sum + t.total, 0);

  const donasiUser = daftarDonasi.filter((d) => d.donaturId === user.id);
  const totalDonasi = donasiUser.reduce((sum, d) => sum + d.jumlah, 0);

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <span className="label-bagian">Profil</span>
      <h1 className="mt-3 text-3xl font-extrabold">Akun & Riwayat Kontribusi</h1>

      <div className="kartu mt-6 flex flex-wrap items-center gap-4">
        <span className={`flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-white ${user.avatarWarna}`}>
          {user.nama.charAt(0)}
        </span>
        <div>
          <p className="font-display text-lg font-bold text-hutan-900">{user.nama}</p>
          <p className="text-sm text-hutan-600">{user.email}</p>
          <p className="text-xs text-hutan-500">{user.jenisMitra} • {user.lokasi}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <KartuRingkas label="Sampah Diserahkan" nilai={`${totalBeratDiserahkan} kg`} />
        <KartuRingkas label="Pickup Selesai" nilai={totalPickupSelesai} />
        <KartuRingkas label="Total Belanja" nilai={formatRupiah(totalBelanja)} />
        <KartuRingkas label="Total Donasi" nilai={formatRupiah(totalDonasi)} aksen />
      </div>

      <SeksiRiwayat judul="Riwayat Pickup" kosong={daftarPickup.length === 0} pesanKosong="Belum ada pengajuan pickup.">
        {daftarPickup.map((p) => (
          <BarisRiwayat
            key={p.id}
            kiri={p.jenisSampah}
            tengah={`${p.perkiraanBerat} kg`}
            kanan={TAHAPAN_PICKUP[p.tahapIndex]}
            tanggal={p.tanggalPenjemputan || p.tanggalPengajuan}
          />
        ))}
      </SeksiRiwayat>

      <SeksiRiwayat
        judul="Riwayat Pembelian Marketplace"
        kosong={pembelianUser.length === 0}
        pesanKosong="Belum ada transaksi di marketplace."
      >
        {pembelianUser.map((t) => (
          <div key={t.id} className="py-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-hutan-500">{t.tanggal}</span>
              <span className="font-semibold text-hutan-900">{formatRupiah(t.total)}</span>
            </div>
            <p className="text-xs text-hutan-600">
              {t.items.map((it) => `${it.nama} (${it.jumlah} ${it.satuan})`).join(", ")}
            </p>
          </div>
        ))}
      </SeksiRiwayat>

      <SeksiRiwayat judul="Riwayat Donasi" kosong={donasiUser.length === 0} pesanKosong="Belum pernah berdonasi.">
        {donasiUser.map((d) => (
          <BarisRiwayat key={d.id} kiri={d.program} tengah={formatRupiah(d.jumlah)} kanan="" tanggal={d.tanggal} />
        ))}
      </SeksiRiwayat>
    </div>
  );
}

function KartuRingkas({ label, nilai, aksen }) {
  return (
    <div className="kartu !p-4 text-center">
      <p className={`font-display text-xl font-extrabold ${aksen ? "text-bara-600" : "text-hutan-900"}`}>{nilai}</p>
      <p className="mt-1 text-xs text-hutan-500">{label}</p>
    </div>
  );
}

function SeksiRiwayat({ judul, kosong, pesanKosong, children }) {
  return (
    <div className="kartu mt-6">
      <h2 className="font-display font-bold">{judul}</h2>
      {kosong ? (
        <p className="mt-3 text-sm text-hutan-500">{pesanKosong}</p>
      ) : (
        <div className="mt-3 flex flex-col divide-y divide-tunas-100">{children}</div>
      )}
    </div>
  );
}

function BarisRiwayat({ kiri, tengah, kanan, tanggal }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-sm">
      <span className="text-hutan-500">{tanggal}</span>
      <span className="font-semibold text-hutan-900">{kiri}</span>
      <span className="text-hutan-600">{tengah}</span>
      {kanan && <span className="text-xs font-semibold text-hutan-700">{kanan}</span>}
    </div>
  );
}
