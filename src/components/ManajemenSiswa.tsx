import { useState } from 'react';
import { useEskulStore } from '../stores/eskulStore';
import type { Siswa } from '../types/eskul.types';

const ManajemenSiswa = () => {
  const [nama, setNama] = useState('');
  const kelasAktif = useEskulStore((s) => s.kelasAktif);
  const tambahSiswa = useEskulStore((s) => s.tambahSiswa);
  const siswaList = useEskulStore((s) =>
    Object.values(s.siswa).filter((si) => si.kelasId === kelasAktif)
  );

  const handleTambah = () => {
    if (!nama) return;
    const id = Date.now().toString();
    const siswa: Siswa = {
      id,
      nama,
      kelasId: kelasAktif,
      jurusan: kelasAktif.split('-')[1],
      nomorInduk: id,
      aktif: true,
    };
    tambahSiswa(siswa);
    setNama('');
  };

  return (
    <div className="my-4">
      <h2 className="text-lg font-semibold mb-2">Manajemen Siswa</h2>
      <div className="flex gap-2 mb-2">
        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama siswa"
          className="border p-2 flex-1"
        />
        <button onClick={handleTambah} className="bg-blue-500 text-white px-3 py-2 rounded">
          Tambah
        </button>
      </div>
      <ul>
        {siswaList.map((s) => (
          <li key={s.id}>{s.nama}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManajemenSiswa;
