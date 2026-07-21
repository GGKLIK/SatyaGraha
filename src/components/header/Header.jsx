import { useState } from "react";
export default function Header({ user, halamanAktif, onNavigasi, onBukaLogin, onLogout }) {
  const [menuMobileTerbuka, setMenuMobileTerbuka] = useState(false);

  const menuPublik = [
    { id: "beranda", label: "Beranda" },
    { id: "tentang", label: "Tentang" },
    { id: "edukasi", label: "Edukasi" },
  ];

  const menuPrivat = [
    { id: "dashboard", label: "Dashboard" },
    { id: "pickup", label: "Ajukan Pickup" },
    { id: "tracking", label: "Tracking" },
    { id: "market", label: "Marketplace" },
    { id: "donasi", label: "Donasi" },
  ];

  const menuAktif = user ? menuPrivat : menuPublik;

  const tautanKelas = (id) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      halamanAktif === id
        ? "bg-tunas-100 text-hutan-800"
        : "text-hutan-700 hover:bg-hutan-800/5"
    }`;

  const pilihMenu = (id) => {
    onNavigasi(id);
    setMenuMobileTerbuka(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-tunas-100 bg-pasir/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        {/* Logo */}
        <button
          onClick={() => pilihMenu("beranda")}
          className="flex items-center gap-2.5 font-display text-xl font-extrabold text-hutan-900"
        >
          <img src="/images/logo-icon.png" alt="Eco Siklus" className="h-10 w-10 object-contain" />
          SatyaGraha
        </button>

        {/* Menu desktop */}
        <nav className="hidden items-center gap-1 md:flex">
          {menuAktif.map((item) => (
            <button key={item.id} onClick={() => pilihMenu(item.id)} className={tautanKelas(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Area akun */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <button
                onClick={() => pilihMenu("profil")}
                className="flex items-center gap-2 rounded-full border border-tunas-100 py-1.5 pl-1.5 pr-4 hover:bg-tunas-100/60"
              >
                <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ${user.avatarWarna}`}>
                  {user.nama.charAt(0)}
                </span>
                <span className="text-sm font-semibold text-hutan-800">{user.nama.split(" ")[0]}</span>
              </button>
              <button onClick={onLogout} className="text-sm font-semibold text-hutan-600 hover:text-bara-600">
                Keluar
              </button>
            </>
          ) : (
            <button onClick={onBukaLogin} className="btn-primer !px-5 !py-2.5 text-sm">
              Masuk
            </button>
          )}
        </div>

        {/* Tombol menu mobile */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-tunas-100 md:hidden"
          onClick={() => setMenuMobileTerbuka((v) => !v)}
          aria-label="Buka menu navigasi"
        >
          <span className="text-xl">{menuMobileTerbuka ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Menu mobile */}
      {menuMobileTerbuka && (
        <div className="border-t border-tunas-100 bg-pasir px-5 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-3">
            {menuAktif.map((item) => (
              <button key={item.id} onClick={() => pilihMenu(item.id)} className={`text-left ${tautanKelas(item.id)}`}>
                {item.label}
              </button>
            ))}
            {user && (
              <button onClick={() => pilihMenu("profil")} className={`text-left ${tautanKelas("profil")}`}>
                Profil
              </button>
            )}
          </nav>
          <div className="mt-3 border-t border-tunas-100 pt-3">
            {user ? (
              <button onClick={onLogout} className="btn-sekunder w-full !py-2.5 text-sm">
                Keluar Akun
              </button>
            ) : (
              <button onClick={onBukaLogin} className="btn-primer w-full !py-2.5 text-sm">
                Masuk
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
