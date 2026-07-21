import { jenisSampahOpsi } from "../../utils/constants";
export default function LangkahJenisSampah({ form, ubah }) {
  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm font-semibold text-hutan-800">
        Jenis Sampah
        <select
          value={form.jenisSampah}
          onChange={ubah("jenisSampah")}
          className="rounded-lg border border-tunas-100 px-4 py-2.5 font-normal outline-none focus:border-tunas-500"
        >
          {jenisSampahOpsi.map((opsi) => (
            <option key={opsi}>{opsi}</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-semibold text-hutan-800">
        Perkiraan Berat (kg)
        <input
          type="number"
          min="1"
          value={form.perkiraanBerat}
          onChange={ubah("perkiraanBerat")}
          placeholder="Contoh: 120"
          className="rounded-lg border border-tunas-100 px-4 py-2.5 font-normal outline-none focus:border-tunas-500"
        />
      </label>
    </div>
  );
}
