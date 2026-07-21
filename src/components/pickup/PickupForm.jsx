import { useState } from "react";
import { useToast } from "../../context/ToastContext";
import StepIndikator from "./StepIndikator";
import KonfirmasiPickup from "./KonfirmasiPickup";
import LangkahJenisSampah from "./LangkahJenisSampah";
import LangkahAlamatJadwal from "./LangkahAlamatJadwal";
import LangkahCatatan from "./LangkahCatatan";
import LangkahReview from "./LangkahReview";

const LANGKAH = ["Jenis Sampah", "Jadwal", "Catatan", "Konfirmasi"];
const hariIniISO = () => new Date().toISOString().slice(0, 10);

const nilaiAwal = {
  jenisSampah: "Sisa Sayur & Buah",
  perkiraanBerat: "",
  alamat: "",
  tanggalPenjemputan: "",
  jamPenjemputan: "08:00",
  catatan: "",
};

export default function PickupForm({ user, onAjukan, onNavigasi }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(nilaiAwal);
  const [error, setError] = useState("");
  const [memuat, setMemuat] = useState(false);
  const [pickupTerkirim, setPickupTerkirim] = useState(null);
  const { showToast } = useToast();

  const ubah = (field) => (e) => setForm((s) => ({ ...s, [field]: e.target.value }));

  const validasiStep = () => {
    if (step === 0) {
      if (!form.perkiraanBerat || Number(form.perkiraanBerat) <= 0) {
        return "Masukkan perkiraan berat sampah yang valid (lebih dari 0 kg).";
      }
    }
    if (step === 1) {
      if (!form.alamat.trim()) return "Alamat penjemputan wajib diisi.";
      if (!form.tanggalPenjemputan) return "Pilih tanggal penjemputan.";
      if (form.tanggalPenjemputan < hariIniISO()) return "Tanggal penjemputan tidak boleh sebelum hari ini.";
    }
    return "";
  };

  const lanjut = () => {
    const pesanError = validasiStep();
    if (pesanError) {
      setError(pesanError);
      return;
    }
    setError("");
    setStep((s) => Math.min(s + 1, LANGKAH.length - 1));
  };

  const kembali = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  };

  const ajukanPickup = () => {
    setMemuat(true);
    setError("");

    const sekarang = new Date();
    const timestamp = `${hariIniISO()} ${sekarang.getHours().toString().padStart(2, "0")}:${sekarang
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const pickupBaru = {
      id: `pkp-${Math.floor(1000 + Math.random() * 9000)}`,
      tanggalPengajuan: hariIniISO(),
      tanggalPenjemputan: form.tanggalPenjemputan,
      jamPenjemputan: form.jamPenjemputan,
      alamat: form.alamat,
      jenisSampah: form.jenisSampah,
      perkiraanBerat: Number(form.perkiraanBerat),
      catatan: form.catatan,
      tahapIndex: 0,
      petugas: "-",
      riwayatWaktu: [timestamp],
    };

    setTimeout(() => {
      onAjukan(pickupBaru);
      setPickupTerkirim(pickupBaru);
      setMemuat(false);
      showToast("Pengajuan pickup berhasil dikirim!");
    }, 500);
  };

  const ajukanLagi = () => {
    setForm(nilaiAwal);
    setStep(0);
    setPickupTerkirim(null);
  };

  if (pickupTerkirim) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-10">
        <div className="animate-scale-in">
          <KonfirmasiPickup
            pickup={pickupTerkirim}
            onLihatTracking={() => onNavigasi("tracking")}
            onAjukanLagi={ajukanLagi}
          />
        </div>
      </div>
    );
  }

  const langkahKomponen = [
    <LangkahJenisSampah form={form} ubah={ubah} />,
    <LangkahAlamatJadwal form={form} ubah={ubah} tanggalMinimal={hariIniISO()} />,
    <LangkahCatatan form={form} ubah={ubah} />,
    <LangkahReview form={form} />,
  ];

  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <span className="label-bagian">Ajukan Pickup</span>
      <h1 className="mt-3 text-3xl font-extrabold">Jadwalkan Penjemputan Sampah</h1>
      <p className="mt-2 text-hutan-600">Lengkapi 4 langkah berikut untuk mengajukan penjemputan.</p>

      <div className="kartu mt-6">
        <StepIndikator langkah={LANGKAH} stepAktif={step} />

        {error && (
          <p className="mb-4 animate-fade-in rounded-lg bg-bara-100 px-3 py-2 text-sm font-medium text-bara-600">
            {error}
          </p>
        )}

        <div key={step} className="animate-fade-in">
          {langkahKomponen[step]}
        </div>

        {/* Navigasi step */}
        <div className="mt-6 flex justify-between gap-3">
          <button
            onClick={kembali}
            disabled={step === 0 || memuat}
            className="btn-sekunder !px-5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Kembali
          </button>

          {step < LANGKAH.length - 1 ? (
            <button onClick={lanjut} className="btn-primer !px-6">
              Lanjut
            </button>
          ) : (
            <button onClick={ajukanPickup} disabled={memuat} className="btn-primer !px-6">
              {memuat ? "Mengirim..." : "Ajukan Sekarang"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
