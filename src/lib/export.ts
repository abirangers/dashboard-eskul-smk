import * as XLSX from 'xlsx';
import { format } from 'date-fns';

interface ExportToExcelParams<T> {
  data: T[];
  fileName: string;
  sheetName?: string;
}

export const exportToExcel = <T extends Record<string, unknown>>({
  data,
  fileName,
  sheetName = 'Sheet1',
}: ExportToExcelParams<T>) => {
  if (data.length === 0) {
    alert("Tidak ada data untuk diekspor.");
    return;
  }

  // Create a new workbook and a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Generate a timestamped filename
  const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
  const finalFileName = `${fileName}_${timestamp}.xlsx`;

  // Trigger the download
  XLSX.writeFile(workbook, finalFileName);
};
