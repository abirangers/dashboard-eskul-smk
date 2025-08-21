import { useEskulStore } from '../stores/eskulStore';

const ExportData = () => {
  const kelasAktif = useEskulStore((s) => s.kelasAktif);
  const exportKehadiran = useEskulStore((s) => s.exportKehadiran);
  const exportNilai = useEskulStore((s) => s.exportNilai);

  return (
    <div className="my-4">
      <h2 className="text-lg font-semibold mb-2">Export Data</h2>
      <button
        onClick={() => exportKehadiran(kelasAktif)}
        className="bg-gray-800 text-white px-3 py-2 rounded mr-2"
      >
        Export Kehadiran
      </button>
      <button
        onClick={() => exportNilai(kelasAktif)}
        className="bg-gray-800 text-white px-3 py-2 rounded"
      >
        Export Nilai
      </button>
    </div>
  );
};

export default ExportData;
