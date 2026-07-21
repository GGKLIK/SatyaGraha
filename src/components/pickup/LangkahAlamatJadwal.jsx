import { jamPenjemputanOpsi } from "../../utils/constants";
export default function LangkahAlamatJadwal({ form, ubah, tanggalMinimal }) {
  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm font-semibold text-hutan-800">
        Alamat Penjemputan
        <textarea
          value={form.alamat}
          onChange={ubah("alamat")}
          rows={2}
          placeholder="Contoh: Jl. Kawi No. 12, Klojen, Malang"
          className="rounded-lg border border-tunas-100 px-4 py-2.5 font-normal outline-none focus:border-tunas-500"
        />
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-hutan-800">
          Tanggal Penjemputan
          <input
            type="date"
            min={tanggalMinimal}
            value={form.tanggalPenjemputan}
            onChange={ubah("tanggalPenjemputan")}
            className="rounded-lg border border-tunas-100 px-4 py-2.5 font-normal outline-none focus:border-tunas-500"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-hutan-800">
          Jam Penjemputan
          <select
            value={form.jamPenjemputan}
            onChange={ubah("jamPenjemputan")}
            className="rounded-lg border border-tunas-100 px-4 py-2.5 font-normal outline-none focus:border-tunas-500"
          >
            {jamPenjemputanOpsi.map((jam) => (
              <option key={jam}>{jam}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
