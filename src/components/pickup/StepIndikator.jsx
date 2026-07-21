export default function StepIndikator({ langkah, stepAktif }) {
  return (
    <div className="mb-8 flex items-center">
      {langkah.map((label, i) => (
        <div key={label} className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition ${
                i < stepAktif
                  ? "bg-tunas-500 text-white"
                  : i === stepAktif
                  ? "bg-hutan-800 text-tunas-100"
                  : "bg-tunas-100 text-hutan-400"
              }`}
            >
              {i < stepAktif ? "✓" : i + 1}
            </span>
            <span
              className={`hidden w-20 text-center text-xs sm:block ${
                i <= stepAktif ? "font-semibold text-hutan-800" : "text-hutan-400"
              }`}
            >
              {label}
            </span>
          </div>
          {i < langkah.length - 1 && (
            <span className={`mx-2 h-0.5 flex-1 ${i < stepAktif ? "bg-tunas-500" : "bg-tunas-100"}`} />
          )}
        </div>
      ))}
    </div>
  );
}
