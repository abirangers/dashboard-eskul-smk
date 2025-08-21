import * as XLSX from 'xlsx';
import type { Absensi } from '@/types/eskul.types';

export const exportKehadiran = (kelasId: string, data: Absensi[]) => {
  if (!data.length) return;
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Kehadiran');
  XLSX.writeFile(workbook, `kehadiran-${kelasId}.xlsx`);
};
