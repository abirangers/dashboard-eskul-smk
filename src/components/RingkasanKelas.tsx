import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEskulStore } from '@/stores/eskulStore';
import type { Absensi, Siswa } from '@/types/eskul.types';

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export default function RingkasanKelas() {
  const { kelasAktif, siswa, absensi } = useEskulStore((s) => ({
    kelasAktif: s.kelasAktif,
    siswa: s.siswa,
    absensi: s.absensi,
  }));

  const siswaKelas = (Object.values(siswa) as Siswa[]).filter(
    (s) => s.kelasId === kelasAktif
  );
  const totalSiswa = siswaKelas.length;
  const today = formatDate(new Date());
  const absensiHariIni = (absensi[kelasAktif] || []) as Absensi[];
  const hadir = absensiHariIni.filter((a) => a.tanggal === today && a.status === 'hadir').length;
  const persentase = totalSiswa === 0 ? 0 : Math.round((hadir / totalSiswa) * 100);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Kehadiran Hari Ini</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{persentase}%</p>
          <p className="text-sm text-muted-foreground">
            {hadir} / {totalSiswa} hadir
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Siswa</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalSiswa}</p>
          <p className="text-sm text-muted-foreground">Siswa terdaftar</p>
        </CardContent>
      </Card>
    </div>
  );
}
