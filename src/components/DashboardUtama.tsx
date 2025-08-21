import KelasSelector from './KelasSelector';
import AbsensiQR from './AbsensiQR';
import ExportData from './ExportData';
import RingkasanKelas from './RingkasanKelas';
import ManajemenSiswa from './ManajemenSiswa';
import UploadProject from './UploadProject';
import MateriMingguan from './MateriMingguan';

const DashboardUtama = () => {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard Eskul Programming</h1>
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
