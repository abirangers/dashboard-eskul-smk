import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useQRGenerator } from '../hooks/useQRGenerator';
import { useEskulStore } from '../stores/eskulStore';

const AbsensiQR = () => {
  const kelasAktif = useEskulStore((s) => s.kelasAktif);
  const absenSiswa = useEskulStore((s) => s.absenSiswa);
  const absensiKelas = useEskulStore((s) => s.absensi[kelasAktif] || []);
  const generate = useQRGenerator();
  const [qr, setQr] = useState('');
  const [nama, setNama] = useState('');

  useEffect(() => {
    if (kelasAktif) {
      generate({
        kelasId: kelasAktif,
        tanggal: format(new Date(), 'yyyy-MM-dd'),
        timestamp: Date.now(),
        type: 'absensi',
      }).then(setQr);
    }
  }, [kelasAktif, generate]);

  const handleManual = () => {
    if (!nama || !kelasAktif) return;
    const id = Date.now().toString();
    absenSiswa({
      id,
      siswaId: nama,
      kelasId: kelasAktif,
      tanggal: format(new Date(), 'yyyy-MM-dd'),
      status: 'hadir',
      waktu: new Date().toISOString(),
    });
    setNama('');
  };

  if (!kelasAktif) return null;

  return (
    <Card className="p-4 space-y-4">
      {qr && <img src={qr} alt="QR Absensi" className="w-40 h-40" />}
      <div className="flex gap-2">
        <Input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama siswa" />
        <Button onClick={handleManual}>Absen Manual</Button>
      </div>
      <ul className="text-sm list-disc pl-4">
        {absensiKelas.map((a) => (
          <li key={a.id}>{a.siswaId} - {a.status}</li>
        ))}
      </ul>
    </Card>
  );
};

export default AbsensiQR;
