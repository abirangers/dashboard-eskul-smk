import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export const useQRGenerator = (kelasId: string, tanggal: string) => {
  const [qr, setQr] = useState('');

  useEffect(() => {
    const data = `${kelasId}|${tanggal}|${Date.now()}`;
    QRCode.toDataURL(data).then(setQr);
  }, [kelasId, tanggal]);

  return qr;
};
