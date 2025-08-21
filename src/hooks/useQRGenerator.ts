import { useState, useEffect } from 'react';
import QRCode from 'qrcode';

interface QRData {
  kelasId: string;
  tanggal: string;
  timestamp: number;
}

export const useQRGenerator = (data: QRData | null) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!data) {
      setQrCodeUrl('');
      return;
    }

    const generateQrCode = () => {
      const jsonString = JSON.stringify(data);
      const options: QRCode.QRCodeToDataURLOptions = {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        margin: 1,
        width: 256,
      };

      QRCode.toDataURL(jsonString, options, (err, url) => {
        if (err) {
          console.error('Failed to generate QR code:', err);
          setError(err.message);
          setQrCodeUrl('');
          return;
        }
        setQrCodeUrl(url);
        setError(null);
      });
    };

    generateQrCode();
  }, [data]);

  return { qrCodeUrl, error };
};
