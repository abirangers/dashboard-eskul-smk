import { useState } from 'react';
import QRCode from 'qrcode';

export const useQRGenerator = () => {
  const [qrData, setQrData] = useState<string>('');

  const generate = async (kelasId: string, tanggal: string) => {
    const data = `${kelasId}|${tanggal}|${Date.now()}`;
    const url = await QRCode.toDataURL(data);
    setQrData(url);
  };

  return { qrData, generate };
};
