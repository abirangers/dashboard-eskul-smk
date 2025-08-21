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
