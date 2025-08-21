import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { KELOMPOK_KELAS } from '@/config/kelas';
import { useEskulStore } from '@/stores/eskulStore';

export function KelasSelector() {
  const { kelasAktif, setKelasAktif } = useEskulStore();
  return (
    <Select value={kelasAktif} onValueChange={setKelasAktif}>
      <SelectTrigger className="w-full md:w-64">
        <SelectValue placeholder="Pilih Kelas" />
      </SelectTrigger>
      <SelectContent>
        {(Object.entries(KELOMPOK_KELAS) as [string, { nama: string }][]).map(([id, k]) => (
          <SelectItem key={id} value={id}>
            {k.nama}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
