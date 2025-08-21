import { useCallback } from 'react';
import QRCode from 'qrcode';
import type { QRData } from '../types/eskul.types';

export const useQRGenerator = () => {
  return useCallback(async (data: QRData) => {
    const text = `${data.kelasId}|${data.tanggal}|${data.timestamp}`;
    return QRCode.toDataURL(text);
  }, []);
};
