import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { EskulStore } from '../types/eskul.types';
import { KELOMPOK_KELAS } from '../config/kelas';

// Generate a unique ID
const generateId = () => `id_${new Date().getTime()}_${Math.random().toString(36).substr(2, 9)}`;

export const useEskulStore = create<EskulStore>()(
  persist(
    (set, get) => ({
      // STATE
      siswa: {},
      absensi: {},
      projects: {},
      materi: {},
      kelasAktif: null,

      // ACTIONS
      setKelasAktif: (kelasId) => set({ kelasAktif: kelasId }),

      tambahSiswa: (siswa) => {
        const newId = generateId();
        const newSiswa = { ...siswa, id: newId };
        set((state) => ({
          siswa: {
            ...state.siswa,
            [newId]: newSiswa,
          },
        }));
      },

      updateSiswa: (id, siswaUpdate) => {
        set((state) => ({
          siswa: {
            ...state.siswa,
            [id]: { ...state.siswa[id], ...siswaUpdate },
          },
        }));
      },

      hapusSiswa: (id) => {
        set((state) => {
          const newSiswa = { ...state.siswa };
          delete newSiswa[id];
          // Also remove related data
          const newAbsensi = { ...state.absensi };
          delete newAbsensi[id];
          const newProjects = { ...state.projects };
          delete newProjects[id];
          return { siswa: newSiswa, absensi: newAbsensi, projects: newProjects };
        });
      },

      absenSiswa: (absensiData) => {
        const newId = generateId();
        const newAbsensi = { ...absensiData, id: newId };
        set((state) => ({
          absensi: {
            ...state.absensi,
            [newAbsensi.siswaId]: [...(state.absensi[newAbsensi.siswaId] || []), newAbsensi],
          },
        }));
      },

      uploadProject: (projectData) => {
        const newId = generateId();
        const newProject = { ...projectData, id: newId };
        set((state) => ({
          projects: {
            ...state.projects,
            [newProject.siswaId]: [...(state.projects[newProject.siswaId] || []), newProject],
          },
        }));
      },

      tambahMateri: (materiData) => {
        const newId = generateId();
        const newMateri = { ...materiData, id: newId };
        const kelasId = newMateri.kelasId as keyof typeof KELOMPOK_KELAS;
        set((state) => ({
          materi: {
            ...state.materi,
            [kelasId]: [...(state.materi[kelasId] || []), newMateri],
          },
        }));
      },

      // Dummy export functions, will be implemented properly with the export component
      exportKehadiran: (kelasId) => {
        console.log(`Exporting attendance for class: ${kelasId}`);
        // Logic to be implemented in utils/export.ts and called here
        const state = get();
        // Filter students for the class
        const studentsInClass = Object.values(state.siswa).filter(s => s.kelasId === kelasId);
        const attendanceData = studentsInClass.map(student => {
            const studentAttendance = state.absensi[student.id] || [];
            return {
                nama: student.nama,
                nomorInduk: student.nomorInduk,
                ...studentAttendance.reduce((acc, record) => {
                    acc[record.tanggal] = record.status;
                    return acc;
                }, {} as Record<string, string>)
            }
        });
        console.log(attendanceData);
      },

      exportNilai: (kelasId) => {
        console.log(`Exporting grades for class: ${kelasId}`);
        const state = get();
        const studentsInClass = Object.values(state.siswa).filter(s => s.kelasId === kelasId);
        const projectData = studentsInClass.map(student => {
            const studentProjects = state.projects[student.id] || [];
            return {
                nama: student.nama,
                nomorInduk: student.nomorInduk,
                ...studentProjects.reduce((acc, project) => {
                    acc[project.namaProject] = project.nilai;
                    return acc;
                }, {} as Record<string, number>)
            }
        });
        console.log(projectData);
      },
    }),
    {
      name: 'dashboard-eskul-storage-v1', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
