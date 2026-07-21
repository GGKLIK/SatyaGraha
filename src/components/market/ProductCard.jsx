import { formatRupiah } from "../../utils/format";

export default function ProductCard({ produk, onTambahKeranjang }) {
  return (
    <div className="kartu group flex flex-col overflow-hidden !p-0 hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-square w-full overflow-hidden bg-tunas-100/40 p-4">
        <img
          src={produk.gambar}
          alt={produk.nama}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="label-bagian w-fit !bg-hutan-800/5 !text-hutan-700">{produk.kategori}</span>
        <h3 className="font-display text-base font-bold leading-snug">{produk.nama}</h3>
        <p className="line-clamp-2 text-sm text-hutan-600">{produk.deskripsi}</p>

        <div className="mt-1 flex items-center gap-2 text-sm text-hutan-600">
          <span className="font-semibold text-bara-600">★ {produk.rating}</span>
          <span>•</span>
          <span>{produk.terjual} terjual</span>
        </div>

        <div className="mt-2 flex items-end justify-between">
          <div>
            <p className="font-display text-lg font-extrabold text-hutan-900">{formatRupiah(produk.harga)}</p>
            <p className="text-xs text-hutan-500">per {produk.satuan} • stok {produk.stok}</p>
          </div>
        </div>

        <button
          onClick={() => onTambahKeranjang(produk)}
          disabled={produk.stok === 0}
          className="btn-primer mt-2 w-full !py-2.5 text-sm disabled:hover:translate-y-0"
        >
          {produk.stok === 0 ? "Stok Habis" : "Tambah ke Keranjang"}
        </button>
      </div>
    </div>
  );
}
