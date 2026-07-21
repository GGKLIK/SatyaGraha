import { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext(null);
export function ToastProvider({ children }) {
  const [daftarToast, setDaftarToast] = useState([]);

  const showToast = useCallback((pesan, tipe = "sukses") => {
    const id = Date.now() + Math.random();
    setDaftarToast((daftar) => [...daftar, { id, pesan, tipe }]);
    setTimeout(() => {
      setDaftarToast((daftar) => daftar.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const tutupToast = (id) => setDaftarToast((daftar) => daftar.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[100] flex flex-col items-center gap-2 px-4">
        {daftarToast.map((t) => (
          <div
            key={t.id}
            className={`animate-slide-up pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl2 px-4 py-3 text-sm font-semibold shadow-card ${
              t.tipe === "error" ? "bg-bara-600 text-white" : "bg-hutan-800 text-white"
            }`}
          >
            <span>{t.tipe === "error" ? "⚠" : "✓"}</span>
            <span className="flex-1">{t.pesan}</span>
            <button onClick={() => tutupToast(t.id)} className="text-white/70 hover:text-white" aria-label="Tutup notifikasi">
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast harus dipakai di dalam <ToastProvider>");
  return ctx;
}
