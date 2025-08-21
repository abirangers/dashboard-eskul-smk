import { Button } from './ui/button';
import { useEskulStore } from '../stores/eskulStore';

const ExportData = () => {
  const kelasAktif = useEskulStore((s) => s.kelasAktif);
  const exportKehadiran = useEskulStore((s) => s.exportKehadiran);
  const exportNilai = useEskulStore((s) => s.exportNilai);

  if (!kelasAktif) return null;

  return (
    <div className="flex gap-2">
      <Button onClick={() => exportKehadiran(kelasAktif)}>Export Kehadiran</Button>
      <Button onClick={() => exportNilai(kelasAktif)}>Export Nilai</Button>
    </div>
  );
};

export default ExportData;
