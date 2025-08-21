import { useEskulStore } from "@/stores/eskulStore";
import { KELOMPOK_KELAS } from "@/config/kelas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { exportToExcel } from "@/lib/export";

const ExportData = () => {
  const { kelasAktif, siswa, absensi, projects } = useEskulStore((state) => ({
    kelasAktif: state.kelasAktif,
    siswa: state.siswa,
    absensi: state.absensi,
    projects: state.projects,
  }));

  if (!kelasAktif) return null;

  const handleExportKehadiran = () => {
    const siswaDiKelas = Object.values(siswa).filter(s => s.kelasId === kelasAktif);
    if (siswaDiKelas.length === 0) {
      alert("Tidak ada siswa di kelas ini untuk diekspor.");
      return;
    }

    const allDates = [...new Set(Object.values(absensi).flat().filter(a => a.kelasId === kelasAktif).map(a => a.tanggal))].sort();

    const dataToExport = siswaDiKelas.map(s => {
      const studentAttendance = Object.values(absensi).flat().filter(a => a.siswaId === s.id);
      const attendanceByDate = allDates.reduce((acc, date) => {
        const record = studentAttendance.find(a => a.tanggal === date);
        acc[date] = record ? record.status : 'absen';
        return acc;
      }, {} as Record<string, string>);

      return {
        'Nama Siswa': s.nama,
        'Nomor Induk': s.nomorInduk,
        ...attendanceByDate,
      };
    });

    exportToExcel({
      data: dataToExport,
      fileName: `Kehadiran_${KELOMPOK_KELAS[kelasAktif].nama}`,
      sheetName: 'Kehadiran',
    });
  };

  const handleExportNilai = () => {
    const projectsDiKelas = Object.values(projects).flat().filter(p => p.kelasId === kelasAktif);
     if (projectsDiKelas.length === 0) {
      alert("Tidak ada data nilai di kelas ini untuk diekspor.");
      return;
    }

    const dataToExport = projectsDiKelas.map(p => {
        const student = siswa[p.siswaId];
        return {
            'Nama Siswa': student?.nama || 'N/A',
            'Nomor Induk': student?.nomorInduk || 'N/A',
            'Nama Proyek': p.namaProject,
            'Nilai': p.nilai,
            'Tanggal Upload': p.tanggalUpload,
        }
    });

    exportToExcel({
        data: dataToExport,
        fileName: `Nilai_Proyek_${KELOMPOK_KELAS[kelasAktif].nama}`,
        sheetName: 'Nilai Proyek',
    })
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Export Data</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleExportKehadiran} className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Export Kehadiran (.xlsx)
        </Button>
        <Button onClick={handleExportNilai} className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Export Nilai Proyek (.xlsx)
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExportData;
