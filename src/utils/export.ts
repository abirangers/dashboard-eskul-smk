import * as XLSX from 'xlsx';
import type { Absensi, Project } from '../types/eskul.types';

export const exportKehadiran = (kelasId: string, data: Absensi[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Kehadiran');
  XLSX.writeFile(workbook, `kehadiran-${kelasId}.xlsx`);
};

export const exportNilai = (kelasId: string, data: Project[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Nilai');
  XLSX.writeFile(workbook, `nilai-${kelasId}.xlsx`);
};
