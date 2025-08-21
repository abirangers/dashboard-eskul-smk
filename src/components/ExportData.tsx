import { Button } from '@/components/ui/button';
import { useEskulStore } from '@/stores/eskulStore';
import { Download } from 'lucide-react';

export default function ExportData() {
  const { kelasAktif, exportKehadiran } = useEskulStore();
  return (
    <Button onClick={() => exportKehadiran(kelasAktif)} className="flex items-center gap-2">
      <Download className="w-4 h-4" /> Export Kehadiran
    </Button>
  );
}
