export function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka);
}

export function hitungBiayaLayanan(subtotalProduk) {
  if (subtotalProduk <= 0) return 0;
  const persentase = 0.05; 
  const minimum = 1000;
  const maksimum = 10000;
  return Math.min(maksimum, Math.max(minimum, Math.round(subtotalProduk * persentase)));
}
export function formatRupiahSingkat(angka) {
  if (angka >= 1000000) return `Rp${(angka / 1000000).toFixed(1)} jt`;
  if (angka >= 1000) return `Rp${(angka / 1000).toFixed(0)} rb`;
  return `Rp${angka}`;
}
