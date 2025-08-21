# Dashboard Eskul Programming - Type Definitions

## Core Type Definitions

### Student Interface
```typescript
export interface Siswa {
  id: string;
  nama: string;
  kelasId: string;
  jurusan: string;
  nomorInduk: string;
  aktif: boolean;
}
```

### Attendance Interface
```typescript
export interface Absensi {
  id: string;
  siswaId: string;
  kelasId: string;
  tanggal: string;
  status: 'hadir' | 'absen' | 'izin';
  waktu: string;
}
```

### Project Interface
```typescript
export interface Project {
  id: string;
  siswaId: string;
  kelasId: string;
  namaProject: string;
  fileUrl: string;
  nilai: number;
  tanggalUpload: string;
}
```

### Material Interface
```typescript
export interface Materi {
  id: string;
  kelasId: string;
  minggu: number;
  judul: string;
  deskripsi: string;
  linkVideo?: string;
  filePath?: string;
}
```

### Weekly Progress Interface
```typescript
export interface ProgressMingguan {
  id: string;
  kelasId: string;
  minggu: number;
  tanggalMulai: string;
  tanggalSelesai: string;
  materiSelesai: boolean[];
  catatan: string;
}
```

### Class Configuration Interface
```typescript
export interface KelasConfig {
  nama: string;
  kapasitas: number;
  aktif: boolean;
}
```

### State Management Types
```typescript
export interface EskulState {
  siswa: Record<string, Siswa>;
  absensi: Record<string, Absensi[]>;
  projects: Record<string, Project[]>;
  materi: Record<string, Materi[]>;
  kelasAktif: string;
}

export interface EskulActions {
  setKelasAktif: (kelasId: string) => void;
  tambahSiswa: (siswa: Siswa) => void;
  updateSiswa: (id: string, siswa: Partial<Siswa>) => void;
  hapusSiswa: (id: string) => void;
  absenSiswa: (absensi: Absensi) => void;
  updateAbsensi: (id: string, absensi: Partial<Absensi>) => void;
  uploadProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  hapusProject: (id: string) => void;
  tambahMateri: (materi: Materi) => void;
  updateMateri: (id: string, materi: Partial<Materi>) => void;
  hapusMateri: (id: string) => void;
  exportKehadiran: (kelasId: string) => void;
  exportNilai: (kelasId: string) => void;
  exportMateri: (kelasId: string) => void;
}
```

### Storage Keys
```typescript
export const STORAGE_KEYS = {
  SISWA: 'dashboard-eskul-v1-siswa',
  ABSENSI: 'dashboard-eskul-v1-absensi',
  PROJECTS: 'dashboard-eskul-v1-projects',
  MATERI: 'dashboard-eskul-v1-materi',
  KELAS_AKTIF: 'dashboard-eskul-v1-kelas-aktif'
} as const;
```

### Class Constants
```typescript
export const KELOMPOK_KELAS = {
  'X-RPL-1': { nama: 'Kelas X RPL 1', kapasitas: 30 },
  'X-RPL-2': { nama: 'Kelas X RPL 2', kapasitas: 30 },
  'X-TKJ-1': { nama: 'Kelas X TKJ 1', kapasitas: 30 },
  'X-TKJ-2': { nama: 'Kelas X TKJ 2', kapasitas: 30 },
  'X-MM-1': { nama: 'Kelas X Multimedia 1', kapasitas: 30 },
  'X-MM-2': { nama: 'Kelas X Multimedia 2', kapasitas: 30 },
  'XI-RPL-1': { nama: 'Kelas XI RPL 1', kapasitas: 30 },
  'XI-TKJ-1': { nama: 'Kelas XI TKJ 1', kapasitas: 30 },
} as const;

export const KELAS_AKTIF = Object.keys(KELOMPOK_KELAS) as Array<keyof typeof KELOMPOK_KELAS>;
```

### QR Code Format
```typescript
export interface QRData {
  kelasId: string;
  tanggal: string;
  timestamp: number;
  type: 'absensi';
}
```

### Export Formats
```typescript
export interface ExportData {
  namaFile: string;
  data: any[];
  headers: string[];
  type: 'kehadiran' | 'nilai' | 'materi';
}