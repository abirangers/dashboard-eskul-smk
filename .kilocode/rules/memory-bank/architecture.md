# Dashboard Eskul Programming - System Architecture

## System Architecture Overview
The Dashboard Eskul Programming is built as a single-page React application with localStorage persistence, designed specifically for SMK teachers managing extracurricular programming classes.

## Source Code Structure
```
src/
├── App.tsx                    # Main application component
├── main.tsx                   # Application entry point
├── config/
│   └── kelas.ts              # Class configuration (8 active classes)
├── types/
│   └── eskul.types.ts        # TypeScript type definitions
├── stores/
│   └── eskulStore.ts        # Zustand state management
├── components/
│   ├── DashboardUtama.tsx    # Main dashboard component
│   ├── KelasSelector.tsx   # Class selection component
│   ├── AbsensiQR.tsx       # QR code attendance system
│   ├── ManajemenSiswa.tsx  # Student management
│   ├── UploadProject.tsx   # Project upload & grading
│   ├── MateriMingguan.tsx  # Weekly material upload
│   ├── ExportData.tsx      # Excel export functionality
│   └── RingkasanKelas.tsx  # Class summary dashboard
├── utils/
│   ├── export.ts           # Excel export utilities
│   └── helpers.ts          # General helper functions
└── hooks/
    └── useQRGenerator.ts   # QR code generation hook
```

## Key Technical Decisions
- **No Backend Server**: Uses localStorage for data persistence
- **State Management**: Zustand for simple state management
- **QR Code Generation**: Client-side QR code generation
- **Excel Export**: Client-side Excel file generation
- **Responsive Design**: Mobile-first design approach

## Design Patterns in Use
1. **State Management**: Zustand store pattern for global state
2. **Component Composition**: Modular React components
3. **Type Safety**: Full TypeScript implementation
4. **Data Persistence**: localStorage with fallback
5. **Export Pattern**: Client-side file generation

## Component Relationships
- **DashboardUtama** → Central hub, manages kelasAktif state
- **KelasSelector** → Child component for class selection
- **AbsensiQR** → Takes kelasAktif prop, manages attendance
- **ExportData** → Uses store state to generate Excel files
- **RingkasanKelas** → Displays summary based on current class

## Critical Implementation Paths
1. **Data Flow**: localStorage → Zustand Store → React Components
2. **QR Attendance**: Generate QR → Student scans → Update attendance → localStorage
3. **Excel Export**: Collect data from store → Format → Generate file → Download
4. **Class Management**: Select class → Filter data → Update UI