export default function LangkahCatatan({ form, ubah }) {
  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm font-semibold text-hutan-800">
        Catatan Tambahan (opsional)
        <textarea
          value={form.catatan}
          onChange={ubah("catatan")}
          rows={4}
          placeholder="Contoh: akses masuk dari pintu belakang, hubungi satpam sebelum tiba"
          className="rounded-lg border border-tunas-100 px-4 py-2.5 font-normal outline-none focus:border-tunas-500"
        />
      </label>
      <p className="text-xs text-hutan-500">Langkah ini boleh dilewati apabila tidak ada catatan khusus.</p>
    </div>
  );
}
