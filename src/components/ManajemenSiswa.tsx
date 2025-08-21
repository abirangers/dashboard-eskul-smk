import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useEskulStore } from '../stores/eskulStore';

const ManajemenSiswa = () => {
  const kelasAktif = useEskulStore((s) => s.kelasAktif);
  const tambahSiswa = useEskulStore((s) => s.tambahSiswa);
  const siswaKelas = useEskulStore((s) =>
    Object.values(s.siswa).filter((si) => si.kelasId === kelasAktif)
  );
  const [nama, setNama] = useState('');
  const [jurusan, setJurusan] = useState('');

  const handleAdd = () => {
    if (!nama || !kelasAktif) return;
    tambahSiswa({
      id: Date.now().toString(),
      nama,
      kelasId: kelasAktif,
      jurusan,
      nomorInduk: '',
      aktif: true,
    });
    setNama('');
    setJurusan('');
  };

  if (!kelasAktif) return null;

  return (
    <Card className="p-4 space-y-2">
      <div className="flex gap-2">
        <Input placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)} />
        <Input placeholder="Jurusan" value={jurusan} onChange={(e) => setJurusan(e.target.value)} />
        <Button onClick={handleAdd}>Tambah</Button>
      </div>
      <ul className="text-sm list-disc pl-4">
        {siswaKelas.map((s) => (
          <li key={s.id}>{s.nama}</li>
        ))}
      </ul>
    </Card>
  );
};

export default ManajemenSiswa;
