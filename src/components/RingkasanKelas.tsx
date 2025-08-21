import { Card } from './ui/card';
import { useEskulStore } from '../stores/eskulStore';

const RingkasanKelas = () => {
  const kelasAktif = useEskulStore((s) => s.kelasAktif);
  const siswa = useEskulStore((s) =>
    Object.values(s.siswa).filter((si) => si.kelasId === kelasAktif)
  );
  const absensi = useEskulStore((s) => s.absensi[kelasAktif] || []);

  if (!kelasAktif) return null;

  return (
    <Card className="p-4 space-y-1">
      <p className="font-semibold">Ringkasan Kelas {kelasAktif}</p>
      <p>Jumlah Siswa: {siswa.length}</p>
      <p>Total Absensi: {absensi.length}</p>
    </Card>
  );
};

export default RingkasanKelas;
