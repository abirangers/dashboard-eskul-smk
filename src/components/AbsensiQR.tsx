import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { useQRGenerator } from '@/hooks/useQRGenerator';
import { useEskulStore } from '@/stores/eskulStore';
import type { Siswa } from '@/types/eskul.types';

export default function AbsensiQR() {
  const { kelasAktif, siswa, absenSiswa } = useEskulStore();
  const tanggal = new Date().toISOString().slice(0, 10);
  const qr = useQRGenerator(kelasAktif, tanggal);
  const daftarSiswa: Siswa[] = siswa[kelasAktif] || [];

  const handleCheck = (id: string, checked: boolean) => {
    absenSiswa(kelasAktif, {
      id: `${id}-${tanggal}`,
      siswaId: id,
      kelasId: kelasAktif,
      tanggal,
      status: checked ? 'hadir' : 'absen',
      waktu: new Date().toISOString(),
    });
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Absensi QR {kelasAktif}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {qr && <img src={qr} alt="QR" className="mx-auto w-40 h-40" />}
        <div className="space-y-2">
          {daftarSiswa.map((s: Siswa) => (
            <label key={s.id} className="flex items-center gap-2 text-sm">
              <Checkbox onCheckedChange={(v: CheckedState) => handleCheck(s.id, v === true)} />
              {s.nama}
            </label>
          ))}
          {daftarSiswa.length === 0 && (
            <p className="text-sm text-muted-foreground">Belum ada siswa.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
