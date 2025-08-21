# 🎯 Dashboard Eskul Programming SMK

Dashboard modern untuk guru SMK yang ngajar ekstrakurikuler programming - praktis, tanpa server, langsung bisa digunakan.

## 🏫 Konteks
- **Target**: Guru SMK yang ngajar eskul programming
- **Kelas Aktif**: 8 kelas (X-RPL-1/2, X-TKJ-1/2, X-MM-1/2, XI-RPL-1, XI-TKJ-1)
- **Jurusan**: RPL, TKJ, Multimedia, PKM
- **Teknologi**: React + TypeScript + localStorage + Vercel

## 🚀 Fitur Utama

### 📱 Absensi Cerdas
- **QR Code**: Siswa scan untuk absen otomatis
- **Manual Fallback**: Untuk siswa tanpa HP
- **Real-time Counter**: Kehadiran per kelas

### 📊 Penilaian Praktis
- **Upload Project**: Siswa upload file/foto project
- **Nilai Otomatis**: Berdasarkan kehadiran + project
- **Export Excel**: Langsung untuk rapor

### 📚 Materi Terstruktur
- **Upload Materi Mingguan**: PDF, video, link tutorial
- **Progress 12 Minggu**: Kurikulum eskul yang jelas
- **Download Resource**: Materi bisa di-download

## 🛠️ Teknologi yang Digunakan
- **Frontend**: React 18 + TypeScript 5
- **State Management**: Zustand (localStorage)
- **Styling**: Tailwind CSS + shadcn/ui
- **QR Code**: qrcode.js
- **Export**: xlsx (Excel export)
- **Deployment**: Vercel (gratis)

## 📦 Instalasi Cepat

```bash
# Clone repository
git clone <repository-url>
cd dashboard-eskul

# Install dependencies
npm install

# Install packages tambahan
npm install zustand qrcode xlsx

# Jalankan development
npm run dev
```

## 🎯 Setup Awal (5 Menit)

1. **Buka aplikasi** di browser
2. **Pilih kelas aktif** dari 8 kelas yang tersedia
3. **Import daftar siswa** dari Excel (jika ada)
4. **Mulai gunakan langsung!**

## 📝 Konfigurasi Kelas

```typescript
// 8 kelas yang sudah dikonfigurasi
const KELOMPOK_KELAS = {
  'X-RPL-1': { nama: 'Kelas X RPL 1', kapasitas: 30 },
  'X-RPL-2': { nama: 'Kelas X RPL 2', kapasitas: 30 },
  'X-TKJ-1': { nama: 'Kelas X TKJ 1', kapasitas: 30 },
  'X-TKJ-2': { nama: 'Kelas X TKJ 2', kapasitas: 30 },
  'X-MM-1': { nama: 'Kelas X Multimedia 1', kapasitas: 30 },
  'X-MM-2': { nama: 'Kelas X Multimedia 2', kapasitas: 30 },
  'XI-RPL-1': { nama: 'Kelas XI RPL 1', kapasitas: 30 },
  'XI-TKJ-1': { nama: 'Kelas XI TKJ 1', kapasitas: 30 },
};
```

## 🚀 Deploy ke Vercel (Gratis)

```bash
# Build untuk production
npm run build

# Deploy ke Vercel
npm install -g vercel
vercel --prod
```

## 📋 Fitur Detail

### Dashboard Utama
- Ringkasan kehadiran harian
- Progress silabus 12 minggu
- Quick actions untuk guru

### Absensi QR
- Generate QR code per pertemuan
- Scan dengan kamera HP
- Alternatif manual untuk siswa tanpa HP

### Manajemen Nilai
- Upload project siswa
- Nilai otomatis berdasarkan kehadiran
- Export ke Excel untuk rapor

### Materi Mingguan
- Upload materi PDF/video
- Link tutorial YouTube
- Download materi untuk siswa

## 🎯 User Journey Guru
1. **Setup Awal (5 menit)**: Pilih kelas → Import siswa → Atur jadwal
2. **Pertemuan Mingguan (2 menit)**: Generate QR → Upload materi
3. **Akhir Bulan (1 menit)**: Export kehadiran → Export nilai → Siap rapor

## 🔧 Development
- **TypeScript**: Strict mode enabled
- **Hot Reload**: Development server dengan Vite
- **Testing**: Manual testing dengan data nyata
- **Performance**: Optimized untuk guru yang praktis

## 📞 Dukungan
Untuk bantuan atau pertanyaan, buka issue di repository atau hubungi tim development.

## 📝 Lisensi
MIT License - Bebas digunakan untuk keperluan pendidikan SMK
