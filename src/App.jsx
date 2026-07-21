import { useState } from "react";
import Header from "./components/header/Header";
import Footer from "./components/layout/Footer";
import LoginModal from "./components/login/LoginModal";
import Beranda from "./components/Beranda";
import Tentang from "./components/Tentang";
import Edukasi from "./components/Edukasi";
import Dashboard from "./components/Dashboard";
import PickupForm from "./components/pickup/PickupForm";
import Tracking from "./components/Tracking";
import Marketplace from "./components/market/Marketplace";
import Donasi from "./components/Donasi";
import Profil from "./components/Profil";
import { daftarPickupAwal } from "./data/mockData";
import { useToast } from "./context/ToastContext";

export default function App() {
  const [user, setUser] = useState(null);
  const [halaman, setHalaman] = useState("beranda");
  const [loginTerbuka, setLoginTerbuka] = useState(false);
  const [daftarPickup, setDaftarPickup] = useState(daftarPickupAwal);
  const { showToast } = useToast();

  const halamanPublik = ["beranda", "tentang", "edukasi"];

  const navigasi = (idHalaman) => {
    if (!halamanPublik.includes(idHalaman) && !user) {
      setLoginTerbuka(true);
      return;
    }
    setHalaman(idHalaman);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tanganiLoginBerhasil = (akun) => {
    setUser(akun);
    setLoginTerbuka(false);
    setHalaman("dashboard");
    showToast(`Selamat datang kembali, ${akun.nama.split(" ")[0]}!`);
  };

  const tanganiLogout = () => {
    setUser(null);
    setHalaman("beranda");
    showToast("Anda telah keluar dari akun.");
  };

  const tanganiAjukanPickup = (pickupBaru) => {
    setDaftarPickup((daftar) => [{ ...pickupBaru, mitraId: user.id }, ...daftar]);
    return pickupBaru;
  };

  const pickupMilikUser = user ? daftarPickup.filter((p) => p.mitraId === user.id) : [];

  const renderHalaman = () => {
    switch (halaman) {
      case "beranda":
        return <Beranda user={user} onNavigasi={navigasi} onBukaLogin={() => setLoginTerbuka(true)} />;
      case "tentang":
        return <Tentang />;
      case "edukasi":
        return <Edukasi />;
      case "dashboard":
        return user ? <Dashboard user={user} daftarPickup={pickupMilikUser} /> : null;
      case "pickup":
        return user ? <PickupForm user={user} onAjukan={tanganiAjukanPickup} onNavigasi={navigasi} /> : null;
      case "tracking":
        return user ? <Tracking daftarPickup={pickupMilikUser} /> : null;
      case "market":
        return <Marketplace user={user} onBukaLogin={() => setLoginTerbuka(true)} onNavigasi={navigasi} />;
      case "donasi":
        return <Donasi user={user} />;
      case "profil":
        return user ? <Profil user={user} daftarPickup={pickupMilikUser} /> : null;
      default:
        return <Beranda user={user} onNavigasi={navigasi} onBukaLogin={() => setLoginTerbuka(true)} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        user={user}
        halamanAktif={halaman}
        onNavigasi={navigasi}
        onBukaLogin={() => setLoginTerbuka(true)}
        onLogout={tanganiLogout}
      />

      <main className="flex-1">
        <div key={halaman} className="animate-fade-in">
          {renderHalaman()}
        </div>
      </main>

      <Footer onNavigasi={navigasi} />

      <LoginModal
        terbuka={loginTerbuka}
        onTutup={() => setLoginTerbuka(false)}
        onBerhasilLogin={tanganiLoginBerhasil}
      />
    </div>
  );
}
