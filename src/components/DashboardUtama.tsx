import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import KelasSelector from "./KelasSelector";
import ManajemenSiswa from "./ManajemenSiswa";
import AbsensiQR from "./AbsensiQR";
import MateriMingguan from "./MateriMingguan";
import UploadProject from "./UploadProject";
import ExportData from "./ExportData";
import { useEskulStore } from "@/stores/eskulStore";

const DashboardUtama = () => {
  const kelasAktif = useEskulStore((state) => state.kelasAktif);

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard Eskul Programming</h1>
        <p className="text-muted-foreground">Manajemen kelas, absensi, dan nilai untuk guru SMK.</p>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Pengaturan Kelas</CardTitle>
                    <CardDescription>Pilih kelas yang akan dikelola.</CardDescription>
                </CardHeader>
                <CardContent>
                    <KelasSelector />
                </CardContent>
            </Card>
            {kelasAktif && <ExportData />}
        </div>

        <div className="md:col-span-2">
            {kelasAktif ? (
                <div className="space-y-8">
                    <AbsensiQR />
                    <ManajemenSiswa />
                    <MateriMingguan />
                    <UploadProject />
                </div>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Selamat Datang!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Silakan pilih kelas terlebih dahulu dari menu di samping untuk melihat ringkasan dan memulai manajemen.</p>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
};

export default DashboardUtama;
