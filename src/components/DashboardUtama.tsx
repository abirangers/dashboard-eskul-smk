import KelasSelector from './KelasSelector';
import AbsensiQR from './AbsensiQR';
import ManajemenSiswa from './ManajemenSiswa';
import UploadProject from './UploadProject';
import MateriMingguan from './MateriMingguan';
import ExportData from './ExportData';
import RingkasanKelas from './RingkasanKelas';

const DashboardUtama = () => {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard Eskul Programming</h1>
      <KelasSelector />
      <RingkasanKelas />
      <AbsensiQR />
      <ManajemenSiswa />
      <UploadProject />
      <MateriMingguan />
      <ExportData />
    </div>
  );
};

export default DashboardUtama;
