import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Absensi, Siswa } from '@/types/eskul.types';
import { exportKehadiran } from '@/utils/export';

interface EskulState {
  kelasAktif: string;
  siswa: Record<string, Siswa[]>;
  absensi: Record<string, Absensi[]>;
  setKelasAktif: (kelasId: string) => void;
  tambahSiswa: (kelasId: string, siswa: Siswa) => void;
  absenSiswa: (kelasId: string, absensi: Absensi) => void;
  exportKehadiran: (kelasId: string) => void;
}

export const useEskulStore = create<EskulState>()(
  persist(
    (set, get) => ({
      kelasAktif: 'X-RPL-1',
      siswa: {},
      absensi: {},
      setKelasAktif: (kelasId) => set({ kelasAktif: kelasId }),
      tambahSiswa: (kelasId, siswa) =>
        set((state) => ({
          siswa: {
            ...state.siswa,
            [kelasId]: [...(state.siswa[kelasId] || []), siswa],
          },
        })),
      absenSiswa: (kelasId, absensi) =>
        set((state) => ({
          absensi: {
            ...state.absensi,
            [kelasId]: [...(state.absensi[kelasId] || []), absensi],
          },
        })),
      exportKehadiran: (kelasId) => exportKehadiran(kelasId, get().absensi[kelasId] || []),
    }),
    { name: 'dashboard-eskul-v1' }
  )
);
