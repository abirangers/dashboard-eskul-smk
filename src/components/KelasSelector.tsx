import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { KELOMPOK_KELAS } from '@/config/kelas';
import { useEskulStore } from '@/stores/eskulStore';

export default function KelasSelector() {
  const kelasAktif = useEskulStore((s) => s.kelasAktif);
  const setKelasAktif = useEskulStore((s) => s.setKelasAktif);

  return (
    <Select value={kelasAktif} onValueChange={setKelasAktif}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Pilih Kelas" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(KELOMPOK_KELAS).map(([id, k]) => (
          <SelectItem key={id} value={id}>
            {k.nama}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
