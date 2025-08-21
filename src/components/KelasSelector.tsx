import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { KELAS_AKTIF, KELOMPOK_KELAS } from '../config/kelas';
import { useEskulStore } from '../stores/eskulStore';

const KelasSelector = () => {
  const kelasAktif = useEskulStore((s) => s.kelasAktif);
  const setKelasAktif = useEskulStore((s) => s.setKelasAktif);

  return (
    <Select value={kelasAktif} onValueChange={setKelasAktif}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Pilih Kelas" />
      </SelectTrigger>
      <SelectContent>
        {KELAS_AKTIF.map((k) => (
          <SelectItem key={k} value={k}>
            {KELOMPOK_KELAS[k].nama}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default KelasSelector;
