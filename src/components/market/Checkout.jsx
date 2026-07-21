import { useState } from "react";
import { formatRupiah, hitungBiayaLayanan } from "../../utils/format";

const metodePembayaranOpsi = ["Transfer Bank", "QRIS", "Bayar di Tempat (COD)"];

export default function Checkout({ item, user, onKembali, onBayarSekarang }) {
  const [alamat, setAlamat] = useState("");
  const [metode, setMetode] = useState(metodePembayaranOpsi[0]);
  const [error, setError] = useState("");
  const [memuat, setMemuat] = useState(false);

  const subtotal = item.reduce((sum, i) => sum + i.produk.harga * i.jumlah, 0);
  const biayaLayanan = hitungBiayaLayanan(subtotal);
  const total = subtotal + biayaLayanan;

  const tanganiBayar = (e) => {
    e.preventDefault();
    if (!alamat.trim()) {
      setError("Alamat pengiriman wajib diisi.");
      return;
    }
    setError("");
    setMemuat(true);
    setTimeout(() => {
      setMemuat(false);
      onBayarSekarang(alamat, metode);
    }, 600);
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <button onClick={onKembali} className="text-sm font-semibold text-hutan-600 hover:text-hutan-900">
        ← Kembali ke Marketplace
      </button>
      <h1 className="mt-3 text-3xl font-extrabold">Checkout</h1>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <form onSubmit={tanganiBayar} className="kartu flex flex-col gap-4 lg:col-span-3">
          <div>
            <p className="text-xs text-hutan-500">Dikirim atas nama</p>
            <p className="font-semibold text-hutan-900">{user.nama}</p>
          </div>

          <label className="flex flex-col gap-1.5 text-sm font-semibold text-hutan-800">
            Alamat Pengiriman
            <textarea
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              rows={3}
              placeholder="Masukkan alamat lengkap penerima"
              className="rounded-lg border border-tunas-100 px-4 py-2.5 font-normal outline-none focus:border-tunas-500"
            />
          </label>

          {error && (
            <p className="rounded-lg bg-bara-100 px-3 py-2 text-sm font-medium text-bara-600">{error}</p>
          )}

          <div>
            <p className="mb-2 text-sm font-semibold text-hutan-800">Metode Pembayaran</p>
            <div className="flex flex-col gap-2">
              {metodePembayaranOpsi.map((opsi) => (
                <label
                  key={opsi}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition ${
                    metode === opsi ? "border-hutan-800 bg-tunas-100/40" : "border-tunas-100"
                  }`}
                >
                  <input
                    type="radio"
                    name="metode"
                    checked={metode === opsi}
                    onChange={() => setMetode(opsi)}
                    className="accent-hutan-800"
                  />
                  <span className="font-semibold text-hutan-800">{opsi}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" disabled={memuat} className="btn-primer mt-2 w-full">
            {memuat ? "Memproses Pembayaran..." : "Bayar Sekarang"}
          </button>
        </form>

        {/* Ringkasan pesanan */}
        <div className="kartu lg:col-span-2">
          <h2 className="font-display font-bold">Ringkasan Pesanan</h2>

          <div className="mt-3 flex flex-col divide-y divide-tunas-100">
            {item.map(({ produk, jumlah }) => (
              <div key={produk.id} className="flex gap-3 py-3">
                <img
                  src={produk.gambar}
                  alt={produk.nama}
                  className="h-14 w-14 shrink-0 rounded-lg bg-tunas-100/40 object-contain p-1"
                />
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-sm font-semibold text-hutan-900">{produk.nama}</p>
                  <p className="text-xs text-hutan-500">
                    {jumlah} {produk.satuan} × {formatRupiah(produk.harga)}
                  </p>
                </div>
                <p className="self-center text-sm font-semibold text-hutan-900">
                  {formatRupiah(produk.harga * jumlah)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-col gap-1.5 border-t border-tunas-100 pt-3 text-sm">
            <div className="flex justify-between text-hutan-600">
              <span>Biaya Produk</span>
              <span>{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between text-hutan-600">
              <span>Biaya Layanan</span>
              <span>{formatRupiah(biayaLayanan)}</span>
            </div>
            <div className="mt-1 flex justify-between border-t border-tunas-100 pt-2 font-display text-base font-extrabold text-hutan-900">
              <span>Total Biaya yang Harus Dibayarkan</span>
              <span>{formatRupiah(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
