# Dashboard Eskul Programming - Product Documentation

## Why This Project Exists

### Problem Statement
Guru SMK yang mengajar ekstrakurikuler programming menghadapi tantangan:
- Tidak punya waktu setup sistem kompleks
- Butuh solusi praktis untuk 8 kelas aktif
- Tidak ada budget untuk server/backend
- Perlu export data untuk rapor

### Solution
Dashboard sederhana berbasis React + TypeScript yang:
- Tidak perlu setup server sama sekali
- Langsung bisa digunakan dengan 8 kelas aktif
- Semua data tersimpan di localStorage
- Export Excel untuk kebutuhan rapor

## How It Should Work

### User Journey Guru
1. **Setup Awal (5 menit)**
   - Pilih kelas yang aktif dari 8 kelas tersedia
   - Import daftar siswa dari Excel
   - Atur jadwal mingguan

2. **Pertemuan Mingguan (2 menit)**
   - Generate QR code untuk absensi
   - Siswa scan → absensi otomatis
   - Upload materi hari ini

3. **Akhir Bulan (1 menit)**
   - Export data kehadiran
   - Export nilai project
   - Siap untuk rapor

### Key Features
- **Absensi QR**: Generate QR code untuk absensi siswa
- **Manual Fallback**: Input manual untuk siswa tanpa HP
- **Upload Project**: Siswa upload project + nilai otomatis
- **Materi Mingguan**: Upload materi untuk setiap minggu
- **Export Excel**: Download data untuk rapor

## User Experience Goals
- **Guru-friendly**: Interface sederhana, tidak teknis
- **Praktis**: Semua fitur dalam 2-3 klik
- **Cepat**: Setup 5 menit, penggunaan harian 2 menit
- **Reliable**: Tidak perlu internet untuk fungsi dasar
- **Portable**: Bisa diakses dari mana saja via browser