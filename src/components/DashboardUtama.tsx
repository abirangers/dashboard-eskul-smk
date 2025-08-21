import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { useEskulStore } from '@/stores/eskulStore';
import type { Siswa } from '@/types/eskul.types';
import { KelasSelector } from './KelasSelector';
import AbsensiQR from './AbsensiQR';
import ExportData from './ExportData';

export default function DashboardUtama() {
  const { kelasAktif, siswa, tambahSiswa } = useEskulStore();
  const [nama, setNama] = useState('');
  const daftarSiswa: Siswa[] = siswa[kelasAktif] || [];

  const handleAdd = () => {
    if (!nama.trim()) return;
    tambahSiswa(kelasAktif, {
      id: Date.now().toString(),
      nama,
      kelasId: kelasAktif,
      jurusan: '',
      nomorInduk: '',
      aktif: true,
    });
    setNama('');
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <CardTitle className="text-xl">Dashboard Eskul</CardTitle>
          <KelasSelector />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Nama siswa"
              value={nama}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNama(e.target.value)}
            />
            <Button onClick={handleAdd} className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Tambah
            </Button>
          </div>
          <div className="space-y-1">
            {daftarSiswa.map((s) => (
              <div key={s.id} className="text-sm border rounded p-2">
                {s.nama}
              </div>
            ))}
            {daftarSiswa.length === 0 && (
              <p className="text-sm text-muted-foreground">Belum ada siswa di kelas ini.</p>
            )}
          </div>
          <ExportData />
        </CardContent>
      </Card>
      <AbsensiQR />
    </div>
  );
}
