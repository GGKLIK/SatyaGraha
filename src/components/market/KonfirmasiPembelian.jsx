import { formatRupiah } from "../../utils/format";

export default function KonfirmasiPembelian({ transaksi, onKembaliBelanja, onLihatProfil }) {
  return (
    <div className="mx-auto max-w-xl px-5 py-14">
      <div className="kartu animate-scale-in text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-tunas-100 text-3xl text-hutan-800">
          ✓
        </span>
        <h1 className="mt-4 font-display text-2xl font-extrabold text-hutan-900">Pembayaran Berhasil</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-hutan-600">
          Pesanan Anda sedang diproses dan akan segera dikirim. Terima kasih telah mendukung ekonomi
          sirkular sampah organik.
        </p>

        <div className="mx-auto mt-6 max-w-sm rounded-lg border border-tunas-100 p-4 text-left text-sm">
          <BarisRingkasan label="ID Transaksi" nilai={transaksi.id} />
          <BarisRingkasan label="Tanggal" nilai={transaksi.tanggal} />
          <BarisRingkasan label="Metode Pembayaran" nilai={transaksi.metode} />
          <BarisRingkasan label="Alamat Kirim" nilai={transaksi.alamat} />
          <BarisRingkasan label="Biaya Produk" nilai={formatRupiah(transaksi.subtotal)} />
          <BarisRingkasan label="Biaya Layanan" nilai={formatRupiah(transaksi.biayaLayanan)} />
          <BarisRingkasan label="Total Biaya yang Dibayarkan" nilai={formatRupiah(transaksi.total)} terakhir />
        </div>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button onClick={onKembaliBelanja} className="btn-primer">
            Belanja Lagi
          </button>
          <button onClick={onLihatProfil} className="btn-sekunder">
            Lihat Riwayat di Profil
          </button>
        </div>
      </div>
    </div>
  );
}

function BarisRingkasan({ label, nilai, terakhir }) {
  return (
    <div className={`flex justify-between gap-3 py-2 ${terakhir ? "" : "border-b border-tunas-100"}`}>
      <span className="text-hutan-500">{label}</span>
      <span className="text-right font-semibold text-hutan-900">{nilai}</span>
    </div>
  );
}
