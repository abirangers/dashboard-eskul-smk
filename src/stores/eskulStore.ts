import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Absensi, Materi, Project, Siswa } from '../types/eskul.types';
import { exportKehadiran, exportNilai } from '../utils/export';

interface EskulState {
  siswa: Record<string, Siswa>;
  absensi: Record<string, Absensi[]>;
  projects: Record<string, Project[]>;
  materi: Record<string, Materi[]>;
  kelasAktif: string;
  setKelasAktif: (kelasId: string) => void;
  tambahSiswa: (siswa: Siswa) => void;
  absenSiswa: (absensi: Absensi) => void;
  uploadProject: (project: Project) => void;
  tambahMateri: (materi: Materi) => void;
  exportKehadiran: (kelasId: string) => void;
  exportNilai: (kelasId: string) => void;
}

export const useEskulStore = create<EskulState>()(
  persist(
    (set, get) => ({
      siswa: {},
      absensi: {},
      projects: {},
      materi: {},
      kelasAktif: '',
      setKelasAktif: (kelasId) => set({ kelasAktif: kelasId }),
      tambahSiswa: (siswa) => set((state) => ({ siswa: { ...state.siswa, [siswa.id]: siswa } })),
      absenSiswa: (absensi) => set((state) => ({
        absensi: {
          ...state.absensi,
          [absensi.kelasId]: [...(state.absensi[absensi.kelasId] || []), absensi]
        }
      })),
      uploadProject: (project) => set((state) => ({
        projects: {
          ...state.projects,
          [project.kelasId]: [...(state.projects[project.kelasId] || []), project]
        }
      })),
      tambahMateri: (materi) => set((state) => ({
        materi: {
          ...state.materi,
          [materi.kelasId]: [...(state.materi[materi.kelasId] || []), materi]
        }
      })),
      exportKehadiran: (kelasId) => {
        const data = get().absensi[kelasId] || [];
        exportKehadiran(kelasId, data);
      },
      exportNilai: (kelasId) => {
        const data = get().projects[kelasId] || [];
        exportNilai(kelasId, data);
      },
    }),
    { name: 'dashboard-eskul-v1' }
  )
);
