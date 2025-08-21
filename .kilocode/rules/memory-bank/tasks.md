# Dashboard Eskul Programming - Task Documentation

## Common Development Tasks

### Adding New Class Support

**Files to modify:**
- `src/config/kelas.ts` - Add new class configuration
- `src/types/eskul.types.ts` - Update if new class types needed

**Steps:**
1. Add new class to KELOMPOK_KELAS object
2. Update KELAS_AKTIF array
3. Test class selection functionality

**Example:**
```typescript
// Add to KELOMPOK_KELAS
'XI-MM-1': { nama: 'Kelas XI Multimedia 1', kapasitas: 30 },
```

### Adding New Export Format

**Files to modify:**
- `src/utils/export.ts` - Add new export function
- `src/stores/eskulStore.ts` - Add new export action

**Steps:**
1. Create new export function in export.ts
2. Add new action to store
3. Update component to use new export

**Example:**
```typescript
export const exportProgressMingguan = (kelasId: string) => {
  // Implementation here
};
```

### Implementing New Component

**Files to create/modify:**
- `src/components/[ComponentName].tsx` - New component
- `src/types/eskul.types.ts` - Update types if needed
- `src/stores/eskulStore.ts` - Add new actions if required

**Steps:**
1. Create component file
2. Add to types if new data structure
3. Add to store if state management needed
4. Import and use in DashboardUtama

### QR Code Customization

**Files to modify:**
- `src/hooks/useQRGenerator.ts` - QR generation logic
- `src/components/AbsensiQR.tsx` - QR display component

**Common patterns:**
- Add custom data format: `{kelasId}|{tanggal}|{timestamp}|{customField}`
- Change QR size or styling
- Add validation for scanned QR codes

### LocalStorage Data Migration

**When needed:** When data structure changes

**Files to modify:**
- `src/stores/eskulStore.ts` - Add migration logic
- `src/utils/helpers.ts` - Add migration utilities

**Steps:**
1. Add version check in store initialization
2. Create migration functions
3. Test with existing data

### Excel Export Enhancement

**Files to modify:**
- `src/utils/export.ts` - Export functions
- `src/components/ExportData.tsx` - Export UI

**Enhancement examples:**
- Add custom formatting
- Include formulas
- Add charts
- Multiple sheets support

### Testing Patterns

**Manual testing checklist:**
- [ ] Add new student
- [ ] Take attendance via QR
- [ ] Upload project
- [ ] Export all formats
- [ ] Switch between classes
- [ ] Check localStorage persistence

**Test data setup:**
```typescript
// Use in console for testing
const testData = {
  siswa: { /* test data */ },
  absensi: { /* test data */ }
};
```

### Deployment Checklist

**Pre-deployment:**
- [ ] Test all 8 classes
- [ ] Verify Excel exports
- [ ] Check QR functionality
- [ ] Test on mobile
- [ ] Verify localStorage limits

**Post-deployment:**
- [ ] Test live URL
- [ ] Verify Vercel deployment
- [ ] Check performance metrics
- [ ] Test with real data

### Common Issues & Solutions

**Issue: localStorage full**
- Solution: Implement data cleanup
- Check: localStorage usage in dev tools

**Issue: QR not scanning**
- Solution: Increase QR size, check contrast
- Test: Use multiple devices

**Issue: Excel export empty**
- Solution: Check data presence in store
- Debug: console.log data before export

**Issue: Class data not persisting**
- Solution: Check localStorage keys
- Debug: Verify Zustand persist middleware