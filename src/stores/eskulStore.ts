import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { EskulStore, Siswa, Absensi, Materi, Project } from '@/types/eskul.types';

const STORAGE_KEY = 'dashboard-eskul-v1';

export const useEskulStore = create<EskulStore>()(
  persist(
    (set) => ({
      siswa: {},
      absensi: {},
      projects: {},
      materi: {},
      kelasAktif: 'X-RPL-1',
      setKelasAktif: (kelasId: string) => set({ kelasAktif: kelasId }),
      tambahSiswa: (siswa: Siswa) =>
        set((state: EskulStore) => ({ siswa: { ...state.siswa, [siswa.id]: siswa } })),
      absenSiswa: (absensi: Absensi) =>
        set((state: EskulStore) => {
          const arr = state.absensi[absensi.kelasId] || [];
          return {
            absensi: {
              ...state.absensi,
              [absensi.kelasId]: [...arr, absensi],
            },
          };
        }),
      tambahMateri: (materi: Materi) =>
        set((state: EskulStore) => {
          const arr = state.materi[materi.kelasId] || [];
          return {
            materi: {
              ...state.materi,
              [materi.kelasId]: [...arr, materi],
            },
          };
        }),
      uploadProject: (project: Project) =>
        set((state: EskulStore) => {
          const arr = state.projects[project.kelasId] || [];
          return {
            projects: {
              ...state.projects,
              [project.kelasId]: [...arr, project],
            },
          };
        }),
    }),
    {
      name: STORAGE_KEY,
    }
  )
);
