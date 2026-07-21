import { useState } from "react";
import { akunTiruan } from "../../data/mockData";

export default function LoginModal({ terbuka, onTutup, onBerhasilLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [memuat, setMemuat] = useState(false);

  if (!terbuka) return null;

  const tanganiSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMemuat(true);
    setTimeout(() => {
      const akun = akunTiruan.find(
        (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
      );

      if (!akun) {
        setError("Email atau kata sandi salah. Coba gunakan akun demo di bawah.");
        setMemuat(false);
        return;
      }

      setMemuat(false);
      onBerhasilLogin(akun);
      setEmail("");
      setPassword("");
    }, 400);
  };

  const isiAkunDemo = () => {
    setEmail("mitra@satyagraha.id");
    setPassword("satyagraha123");
    setError("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-hutan-950/60 px-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Formulir masuk akun"
    >
      <div className="w-full max-w-md animate-scale-in rounded-xl2 bg-white p-7 shadow-card">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">Masuk ke Satyagraha</h2>
            <p className="mt-1 text-sm text-hutan-600">
              Kelola pickup, pantau dampak, dan belanja produk hasil olahan sampah.
            </p>
          </div>
          <button onClick={onTutup} className="rounded-full p-1 text-hutan-500 hover:bg-hutan-800/5" aria-label="Tutup formulir masuk">
            ✕
          </button>
        </div>

        <form onSubmit={tanganiSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-hutan-800">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@instansi.id"
              className="rounded-lg border border-tunas-100 px-4 py-2.5 font-normal text-arang outline-none focus:border-tunas-500"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-semibold text-hutan-800">
            Kata Sandi
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata sandi"
              className="rounded-lg border border-tunas-100 px-4 py-2.5 font-normal text-arang outline-none focus:border-tunas-500"
            />
          </label>

          {error && (
            <p className="animate-fade-in rounded-lg bg-bara-100 px-3 py-2 text-sm font-medium text-bara-600">{error}</p>
          )}

          <button type="submit" disabled={memuat} className="btn-primer w-full">
            {memuat ? "Memeriksa akun..." : "Masuk"}
          </button>
        </form>

        <div className="mt-5 rounded-lg bg-tunas-100/60 px-4 py-3 text-xs text-hutan-700">
          <p className="font-semibold">Akun demo untuk mencoba fitur mitra:</p>
          <p className="mt-1">mitra@satyagraha.id / satyagraha123</p>
          <p className="mt-1 text-hutan-500">(akun admin: admin@satyagraha.id / admin123)</p>
          <button onClick={isiAkunDemo} className="mt-2 font-semibold text-bara-600 underline underline-offset-2">
            Isi otomatis
          </button>
        </div>
      </div>
    </div>
  );
}
