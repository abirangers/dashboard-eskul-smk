import { useEffect } from 'react';
import { useEskulStore } from '../stores/eskulStore';
import { useQRGenerator } from '../hooks/useQRGenerator';

const AbsensiQR = () => {
  const kelasAktif = useEskulStore((s) => s.kelasAktif);
  const siswaKelas = useEskulStore((s) =>
    Object.values(s.siswa).filter((si) => si.kelasId === kelasAktif)
  );
  const absensiKelas = useEskulStore((s) => s.absensi[kelasAktif] || []);
  const absenSiswa = useEskulStore((s) => s.absenSiswa);
  const { qrData, generate } = useQRGenerator();

  useEffect(() => {
    generate(kelasAktif, new Date().toISOString().slice(0, 10));
  }, [kelasAktif, generate]);

  const markHadir = (siswaId: string) => {
    const tanggal = new Date().toISOString().slice(0, 10);
    absenSiswa({
      id: `${siswaId}-${Date.now()}`,
      siswaId,
      kelasId: kelasAktif,
      tanggal,
      status: 'hadir',
      waktu: new Date().toISOString(),
    });
  };

  return (
    <div className="my-4">
      <h2 className="text-lg font-semibold mb-2">Absensi QR</h2>
      {qrData && <img src={qrData} alt="QR Code" className="mb-4" />}
      <ul>
        {siswaKelas.map((s) => {
          const hadir = absensiKelas.some((a) => a.siswaId === s.id);
          return (
            <li key={s.id} className="mb-1">
              {hadir ? '✅' : '⬜'} {s.nama}
              {!hadir && (
                <button
                  className="ml-2 text-sm text-blue-600"
                  onClick={() => markHadir(s.id)}
                >
                  Tandai Hadir
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AbsensiQR;
