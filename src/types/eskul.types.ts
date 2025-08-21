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
  tanggal: string;
  status: 'hadir' | 'absen' | 'izin';
  waktu: string;
}

export interface Project {
  id: string;
  siswaId: string;
  kelasId: string;
  namaProject: string;
  fileUrl: string;
  nilai: number;
  tanggalUpload: string;
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

export interface QRData {
  kelasId: string;
  tanggal: string;
  timestamp: number;
  type: 'absensi';
}
