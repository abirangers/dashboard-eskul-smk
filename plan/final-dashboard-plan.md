# Final Dashboard Eskul Programming - Sesuai Konteks SMK

## 🎯 Realistic Scope untuk Guru SMK

### Konteks Aktual
- **Target**: Kelas X dan XI (XII fokus ujian)
- **Jurusan**: RPL, TKJ, Multimedia, PKM
- **Struktur**: 4 jurusan × 2 kelas = 8 kelas aktif
- **Peserta**: Bebas dari semua jurusan
- **Fokus**: Praktikal untuk guru, tidak terlalu kompleks

## 🏗️ Arsitektur yang Realistis

### Sederhana tapi Efektif
```
DashboardEskul/
├── components/
│   ├── DashboardUtama.tsx          # Satu komponen utama
│   ├── ManajemenKelas.tsx        # Kelola 8 kelas
│   ├── AbsensiQR.tsx             # Absensi sederhana
│   ├── NilaiSederhana.tsx        # Project + Kehadiran
│   └── MateriKelas.tsx           # Upload materi
├── hooks/
│   ├── useLocalData.ts           # localStorage saja
│   └── useQRGenerator.ts         # QR untuk absensi
├── types/
│   └── eskul.types.ts            # Tipe yang dibutuhkan
└── utils/
    ├── constants.ts               # Konfigurasi kelas
    └── helpers.ts                 # Fungsi utilitas
```

## 📊 Struktur Kelas yang Realistis

### Konfigurasi Kelas
```typescript
// src/config/kelas.ts
export const KELOMPOK_KELAS = {
  'X-RPL-1': { nama: 'Kelas X RPL 1', kapasitas: 30 },
  'X-RPL-2': { nama: 'Kelas X RPL 2', kapasitas: 30 },
  'X-TKJ-1': { nama: 'Kelas X TKJ 1', kapasitas: 30 },
  'X-TKJ-2': { nama: 'Kelas X TKJ 2', kapasitas: 30 },
  'X-MM-1': { nama: 'Kelas X Multimedia 1', kapasitas: 30 },
  'X-MM-2': { nama: 'Kelas X Multimedia 2', kapasitas: 30 },
  'XI-RPL-1': { nama: 'Kelas XI RPL 1', kapasitas: 30 },
  'XI-TKJ-1': { nama: 'Kelas XI TKJ 1', kapasitas: 30 },
};

// Hanya untuk kelas X dan XI aktif
export const KELAS_AKTIF = Object.keys(KELOMPOK_KELAS);
```

## 🎯 Fitur Utama yang Realistis

### 1. Absensi Sederhana
- **QR Code untuk absensi** (bisa pakai kamera HP)
- **Manual fallback** untuk siswa tanpa HP
- **Real-time counter** kehadiran per kelas

### 2. Penilaian Praktis
- **Project**: Upload file/foto project
- **Kehadiran**: Otomatis dari absensi
- **Sederhana**: Tidak perlu quiz online

### 3. Materi Terstruktur
- **Upload materi mingguan**
- **Link tutorial YouTube**
- **Resource download**

### 4. Progress Tracking
- **Progress mingguan** (12 minggu)
- **Individu dan kelas**
- **Export ke Excel untuk rapor**

## 💾 Teknologi yang Realistis

### Stack yang Praktis
- **Frontend**: React + TypeScript (sudah ada)
- **Storage**: localStorage (tidak perlu server)
- **Export**: Excel/CSV (download langsung)
- **QR**: Library sederhana

### Tidak Perlu
- ❌ Database server
- ❌ Authentication kompleks
- ❌ Real-time backend
- ❌ Cloud storage mahal

## 🎯 User Journey Guru

### Flow Utama
1. **Setup Awal** (5 menit)
   - Pilih kelas yang aktif
   - Import daftar siswa dari Excel
   - Atur jadwal mingguan

2. **Pertemuan Mingguan** (2 menit)
   - Generate QR code untuk absensi
   - Siswa scan → absensi otomatis
   - Upload materi hari ini

3. **Akhir Bulan** (1 menit)
   - Export data kehadiran
   - Export nilai project
   - Siap untuk rapor

## 📱 UI/UX yang Guru-Friendly

### Dashboard Utama
```
┌─────────────────────────────────────┐
│ Dashboard Eskul Programming          │
│ Guru: [Nama Anda]                  │
├─────────────────────────────────────┤
│ 📊 Ringkasan Hari Ini             │
│ • Kelas Aktif: 8                  │
│ • Siswa Terdaftar: 240            │
│ • Kehadiran Hari Ini: 85%          │
├─────────────────────────────────────┤
│ 🏫 Kelas yang Aktif [Dropdown]      │
│ [Pilih Kelas] → [X-RPL-1]         │
├─────────────────────────────────────┤
│ ⚡ Aksi Cepat                      │
│ [Absensi QR] [Upload Materi]    │
│ [Export Data]                     │
└─────────────────────────────────────┘
```

### Halaman Absensi
```
┌─────────────────────────────────────┐
│ Absensi Kelas X-RPL-1             │
│ Hari: Senin, 21 Agustus 2024     │
│ Materi: HTML Dasar                │
├─────────────────────────────────────┤
│ 📱 QR Code: [Gambar QR]           │
│ "Scan untuk absen"                │
├─────────────────────────────────────┤
│ 📋 Daftar Hadir:                  │
│ ☐ Ahmad - Belum absen            │
│ ✅ Budi - Hadir                  │
│ ✅ Citra - Hadir                 │
└─────────────────────────────────────┘
```

## 🎯 Fitur Teknis yang Realistis

### 1. localStorage Strategy
```typescript
// Simpan semua data di localStorage
const STORAGE_KEY = 'dashboard-eskul-v1';

interface AppData {
  siswa: Record<string, Siswa>;
  absensi: Record<string, AbsensiHarian>;
  materi: Materi[];
  progress: ProgressMingguan[];
}
```

### 2. QR Code Sederhana
```typescript
// Generate QR untuk absensi
const generateQR = (kelasId: string, tanggal: string) => {
  const data = `${kelasId}|${tanggal}|${Date.now()}`;
  return QRCode.toDataURL(data);
};
```

### 3. Export Excel Langsung
```typescript
// Export data untuk rapor
const exportKehadiran = (kelasId: string) => {
  const data = getDataFromLocalStorage();
  const worksheet = XLSX.utils.json_to_sheet(data.absensi);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Kehadiran");
  XLSX.writeFile(workbook, `kehadiran-${kelasId}.xlsx`);
};
```

## 🗓️ Timeline Realistis (2 minggu)

### Minggu 1: Core Features
- **Hari 1-2**: Setup project, konfigurasi 8 kelas
- **Hari 3-4**: Absensi QR + manual
- **Hari 5-7**: Upload materi + nilai project

### Minggu 2: Polish & Export
- **Hari 8-10**: Export Excel, UI improvement
- **Hari 11-12**: Testing & bug fix
- **Hari 13-14**: Dokumentasi untuk guru

## 🎯 Keputusan Teknologi yang Praktis

### Yang Dipakai
- ✅ localStorage (tidak perlu server)
- ✅ QR Code library kecil (qrcode.js)
- ✅ Excel export (sheet.js)
- ✅ React + TypeScript (sudah familiar)

### Yang Tidak Dipakai
- ❌ Database server
- ❌ Authentication kompleks
- ❌ Real-time backend
- ❌ Cloud storage mahal

## 🚀 Next Steps yang Realistis

1. **Mulai dengan localStorage dulu**
2. **Test dengan 1 kelas dulu**
3. **Tambah QR code untuk absensi**
4. **Export Excel untuk rapor**
5. **Kalau berhasil, baru tambah fitur lain**

## 📋 Checklist Implementasi

### Phase 1: Dasar (3 hari)
- [ ] Setup 8 kelas di konfigurasi
- [ ] Absensi manual + QR
- [ ] Upload materi sederhana

### Phase 2: Fitur Guru (2 hari)
- [ ] Export Excel kehadiran
- [ ] Export Excel nilai project
- [ ] UI yang guru-friendly

### Phase 3: Polish (2 hari)
- [ ] Testing dengan data nyata
- [ ] Dokumentasi untuk guru
- [ ] Bug fix dan improvement

## 🎯 Ringkasan
Dashboard ini dirancang khusus untuk guru SMK yang praktis, tidak ribet, dan bisa langsung dipakai tanpa setup server. Fokus pada yang penting: absensi, nilai, dan materi untuk eskul programming.