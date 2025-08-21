import KelasSelector from '@/components/KelasSelector';
import RingkasanKelas from '@/components/RingkasanKelas';
import { useEskulStore } from '@/stores/eskulStore';

export default function DashboardUtama() {
  const kelasAktif = useEskulStore((s) => s.kelasAktif);

  return (
    <div className="p-6 space-y-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Dashboard Eskul Programming</h1>
        <KelasSelector />
      </header>
      <RingkasanKelas />
      <p className="text-sm text-muted-foreground">
        Data tersimpan secara lokal menggunakan localStorage. Kelas aktif: {kelasAktif}
      </p>
    </div>
  );
}
