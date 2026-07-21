import { formatRupiah } from "../../utils/format";

export default function CartDrawer({ terbuka, item, onTutup, onUbahJumlah, onHapus, onLanjutCheckout }) {
  if (!terbuka) return null;

  const total = item.reduce((sum, i) => sum + i.produk.harga * i.jumlah, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-hutan-950/50 animate-fade-in">
      <div className="animate-slide-in-right flex h-full w-full max-w-md flex-col bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-tunas-100 px-6 py-4">
          <h2 className="font-display text-lg font-bold">Keranjang Belanja</h2>
          <button onClick={onTutup} className="rounded-full p-1 text-hutan-500 hover:bg-hutan-800/5" aria-label="Tutup keranjang">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {item.length === 0 ? (
            <p className="mt-10 text-center text-sm text-hutan-500">Keranjang Anda masih kosong.</p>
          ) : (
            <div className="flex flex-col divide-y divide-tunas-100">
              {item.map(({ produk, jumlah }) => (
                <div key={produk.id} className="flex gap-3 py-4">
                  <img src={produk.gambar} alt={produk.nama} className="h-16 w-16 shrink-0 rounded-lg bg-tunas-100/40 object-contain p-1" />
                  <div className="flex flex-1 flex-col">
                    <p className="text-sm font-semibold text-hutan-900">{produk.nama}</p>
                    <p className="text-xs text-hutan-500">{formatRupiah(produk.harga)} / {produk.satuan}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUbahJumlah(produk.id, Math.max(1, jumlah - 1))}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-tunas-100 text-sm hover:bg-tunas-100/60"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{jumlah}</span>
                        <button
                          onClick={() => onUbahJumlah(produk.id, Math.min(produk.stok, jumlah + 1))}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-tunas-100 text-sm hover:bg-tunas-100/60"
                        >
                          +
                        </button>
                      </div>
                      <button onClick={() => onHapus(produk.id)} className="text-xs font-semibold text-bara-600 hover:underline">
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {item.length > 0 && (
          <div className="border-t border-tunas-100 px-6 py-4">
            <div className="mb-3 flex justify-between text-sm">
              <span className="font-semibold text-hutan-700">Total</span>
              <span className="font-display text-lg font-extrabold text-hutan-900">{formatRupiah(total)}</span>
            </div>
            <button onClick={onLanjutCheckout} className="btn-primer w-full">
              Lanjut ke Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
