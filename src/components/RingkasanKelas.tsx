import { useEskulStore } from '../stores/eskulStore';

const RingkasanKelas = () => {
  const kelasAktif = useEskulStore((s) => s.kelasAktif);
  const siswaCount = useEskulStore(
    (s) => Object.values(s.siswa).filter((si) => si.kelasId === kelasAktif).length
  );
  const hadirCount = useEskulStore((s) => (s.absensi[kelasAktif] || []).length);

  return (
    <div className="my-4">
      <h2 className="text-lg font-semibold mb-2">Ringkasan Kelas</h2>
      <p>Total Siswa: {siswaCount}</p>
      <p>Jumlah Hadir Hari Ini: {hadirCount}</p>
    </div>
  );
};

export default RingkasanKelas;
