// src/types/eskul.types.ts - TERSINKRONISASI

// Core Type Definitions
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
  waktu: string; // HH:mm:ss
}

export interface Project {
  id: string;
  siswaId: string;
  kelasId: string;
  namaProject: string;
  fileUrl: string; // Can be a data URL or a link
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
  filePath?: string; // For local file references
}

// State Management Types
export interface EskulState {
  siswa: Record<string, Siswa>; // Using Record for easy lookup by ID
  absensi: Record<string, Absensi[]>; // Keyed by siswaId
  projects: Record<string, Project[]>; // Keyed by siswaId
  materi: Record<string, Materi[]>; // Keyed by kelasId
  kelasAktif: keyof typeof import('../config/kelas').KELOMPOK_KELAS | null;
}

export interface EskulActions {
  setKelasAktif: (kelasId: EskulState['kelasAktif']) => void;
  // Siswa Actions
  tambahSiswa: (siswa: Siswa) => void;
  updateSiswa: (id: string, siswa: Partial<Siswa>) => void;
  hapusSiswa: (id: string) => void;
  // Absensi Actions
  absenSiswa: (absensi: Absensi) => void;
  // Project Actions
  uploadProject: (project: Project) => void;
  // Materi Actions
  tambahMateri: (materi: Materi) => void;
  // Export Actions
  exportKehadiran: (kelasId: string) => void;
  exportNilai: (kelasId: string) => void;
}

export type EskulStore = EskulState & EskulActions;
