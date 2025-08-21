import { useEskulStore } from "@/stores/eskulStore";
import { KELOMPOK_KELAS } from "@/config/kelas";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users } from "lucide-react";

const RingkasanKelas = () => {
  const { kelasAktif, siswa } = useEskulStore((state) => ({
    kelasAktif: state.kelasAktif,
    siswa: state.siswa,
  }));

  if (!kelasAktif) {
    return null; // Should not happen due to logic in DashboardUtama, but good practice
  }

  const namaKelas = KELOMPOK_KELAS[kelasAktif].nama;
  const siswaDiKelas = Object.values(siswa).filter(s => s.kelasId === kelasAktif);
  const jumlahSiswa = siswaDiKelas.length;
  // Placeholder for attendance data
  const kehadiranHariIni = "N/A";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ringkasan Kelas: {namaKelas}</CardTitle>
        <CardDescription>Data dan statistik untuk kelas yang dipilih.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Siswa
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jumlahSiswa}</div>
              <p className="text-xs text-muted-foreground">
                Siswa terdaftar di kelas ini
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Kehadiran Hari Ini
              </CardTitle>
              {/* Icon placeholder */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kehadiranHariIni}</div>
              <p className="text-xs text-muted-foreground">
                Data absensi belum tersedia
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default RingkasanKelas;
