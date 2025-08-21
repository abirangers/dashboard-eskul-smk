export interface Siswa {
  id: string;
  nama: string;
  kelasId: string;
  jurusan: string;
  nomorInduk: string;
  aktif: boolean;
}

export interface Absensi {
  id: string;
  siswaId: string;
  kelasId: string;
  tanggal: string; // YYYY-MM-DD
  status: 'hadir' | 'absen' | 'izin';
  waktu: string; // HH:mm
}

export interface Project {
  id: string;
  siswaId: string;
  kelasId: string;
  namaProject: string;
  fileUrl: string;
  nilai: number;
  tanggalUpload: string; // YYYY-MM-DD
}

export interface Materi {
  id: string;
  kelasId: string;
  minggu: number;
  judul: string;
  deskripsi: string;
  linkVideo?: string;
  filePath?: string;
}

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
  absenSiswa: (absensi: Absensi) => void;
  tambahMateri: (materi: Materi) => void;
  uploadProject: (project: Project) => void;
}

export type EskulStore = EskulState & EskulActions;
