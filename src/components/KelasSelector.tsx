import { useEskulStore } from "@/stores/eskulStore";
import { KELOMPOK_KELAS } from "@/config/kelas";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const KelasSelector = () => {
  const { kelasAktif, setKelasAktif } = useEskulStore((state) => ({
    kelasAktif: state.kelasAktif,
    setKelasAktif: state.setKelasAktif,
  }));

  const handleValueChange = (value: string) => {
    const selectedKelas = value as keyof typeof KELOMPOK_KELAS;
    setKelasAktif(selectedKelas);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="kelas-selector">Pilih Kelas</Label>
      <Select onValueChange={handleValueChange} value={kelasAktif ?? undefined}>
        <SelectTrigger id="kelas-selector" className="w-full">
          <SelectValue placeholder="Pilih kelas..." />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(KELOMPOK_KELAS).map(([id, { nama }]) => (
            <SelectItem key={id} value={id}>
              {nama}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {kelasAktif && (
        <p className="text-sm text-muted-foreground mt-2">
          Kelas aktif: <span className="font-semibold text-primary">{KELOMPOK_KELAS[kelasAktif].nama}</span>
        </p>
      )}
    </div>
  );
};

export default KelasSelector;
