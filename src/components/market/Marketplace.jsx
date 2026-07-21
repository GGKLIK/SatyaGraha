import { useMemo, useState } from "react";
import { produkPasar } from "../../data/mockData";
import { hitungBiayaLayanan } from "../../utils/format";
import { useToast } from "../../context/ToastContext";
import ProductCard from "./ProductCard";
import CartDrawer from "./CartDrawer";
import Checkout from "./Checkout";
import KonfirmasiPembelian from "./KonfirmasiPembelian";

export default function Marketplace({ user, onBukaLogin, onNavigasi }) {
  const [kataKunci, setKataKunci] = useState("");
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [keranjang, setKeranjang] = useState([]);
  const [keranjangTerbuka, setKeranjangTerbuka] = useState(false);
  const [tahap, setTahap] = useState("katalog");
  const [transaksiTerakhir, setTransaksiTerakhir] = useState(null);
  const { showToast } = useToast();

  const kategori = ["Semua", "Maggot", "Pakan Ternak", "Pupuk", "Ikan"];

  const produkTersaring = useMemo(() => {
    return produkPasar.filter((p) => {
      const cocokKategori = kategoriAktif === "Semua" || p.kategori === kategoriAktif;
      const cocokPencarian = p.nama.toLowerCase().includes(kataKunci.trim().toLowerCase());
      return cocokKategori && cocokPencarian;
    });
  }, [kategoriAktif, kataKunci]);

  const totalItemKeranjang = keranjang.reduce((sum, i) => sum + i.jumlah, 0);

  const tanganiTambahKeranjang = (produk) => {
    if (!user) {
      onBukaLogin();
      return;
    }
    setKeranjang((daftar) => {
      const sudahAda = daftar.find((i) => i.produk.id === produk.id);
      if (sudahAda) {
        return daftar.map((i) =>
          i.produk.id === produk.id ? { ...i, jumlah: Math.min(produk.stok, i.jumlah + 1) } : i
        );
      }
      return [...daftar, { produk, jumlah: 1 }];
    });
    setKeranjangTerbuka(true);
    showToast(`"${produk.nama}" ditambahkan ke keranjang.`);
  };

  const ubahJumlah = (produkId, jumlahBaru) => {
    setKeranjang((daftar) => daftar.map((i) => (i.produk.id === produkId ? { ...i, jumlah: jumlahBaru } : i)));
  };

  const hapusDariKeranjang = (produkId) => {
    setKeranjang((daftar) => daftar.filter((i) => i.produk.id !== produkId));
  };

  const lanjutCheckout = () => {
    setKeranjangTerbuka(false);
    setTahap("checkout");
  };

  const tanganiBayar = (alamat, metode) => {
    const subtotal = keranjang.reduce((sum, i) => sum + i.produk.harga * i.jumlah, 0);
    const biayaLayanan = hitungBiayaLayanan(subtotal);

    const transaksi = {
      id: `trx-${Math.floor(1000 + Math.random() * 9000)}`,
      tanggal: new Date().toISOString().slice(0, 10),
      item: keranjang,
      subtotal,
      biayaLayanan,
      total: subtotal + biayaLayanan,
      alamat,
      metode,
    };
    setTransaksiTerakhir(transaksi);
    setKeranjang([]);
    setTahap("konfirmasi");
    showToast("Pembayaran berhasil, pesanan Anda sedang diproses.");
  };

  const kembaliBelanja = () => {
    setTahap("katalog");
    setTransaksiTerakhir(null);
  };

  if (tahap === "checkout") {
    return (
      <Checkout item={keranjang} user={user} onKembali={() => setTahap("katalog")} onBayarSekarang={tanganiBayar} />
    );
  }

  if (tahap === "konfirmasi" && transaksiTerakhir) {
    return (
      <KonfirmasiPembelian
        transaksi={transaksiTerakhir}
        onKembaliBelanja={kembaliBelanja}
        onLihatProfil={() => onNavigasi("profil")}
      />
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="label-bagian w-fit">Marketplace</span>
          <h1 className="mt-3 text-3xl font-extrabold">Belanja Hasil Olahan Sampah Organik</h1>
          <p className="mt-1 max-w-2xl text-hutan-600">
            Setiap pembelian di sini turut mendukung mitra penghasil sampah dan operasional
            pengelolaan sampah organik menjadi maggot, pakan ternak, dan pupuk.
          </p>
        </div>

        <button
          onClick={() => (user ? setKeranjangTerbuka(true) : onBukaLogin())}
          className="btn-sekunder relative !px-5 !py-2.5 text-sm"
        >
          🛒 Keranjang
          {totalItemKeranjang > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-bara-500 text-[11px] font-bold text-white">
              {totalItemKeranjang}
            </span>
          )}
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={kataKunci}
          onChange={(e) => setKataKunci(e.target.value)}
          placeholder="Cari produk, mis. 'maggot' atau 'pupuk'"
          className="w-full max-w-sm rounded-full border border-tunas-100 px-5 py-2.5 text-sm outline-none focus:border-tunas-500"
        />
        <div className="flex flex-wrap gap-2">
          {kategori.map((k) => (
            <button
              key={k}
              onClick={() => setKategoriAktif(k)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                kategoriAktif === k
                  ? "border-hutan-800 bg-hutan-800 text-white"
                  : "border-tunas-100 text-hutan-700 hover:bg-tunas-100/60"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {produkTersaring.length === 0 ? (
        <div className="kartu text-center">
          <p className="font-semibold text-hutan-700">Produk tidak ditemukan.</p>
          <p className="mt-1 text-sm text-hutan-500">Coba kata kunci atau kategori lain.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {produkTersaring.map((produk) => (
            <ProductCard key={produk.id} produk={produk} onTambahKeranjang={tanganiTambahKeranjang} />
          ))}
        </div>
      )}

      <CartDrawer
        terbuka={keranjangTerbuka}
        item={keranjang}
        onTutup={() => setKeranjangTerbuka(false)}
        onUbahJumlah={ubahJumlah}
        onHapus={hapusDariKeranjang}
        onLanjutCheckout={lanjutCheckout}
      />
    </div>
  );
}
