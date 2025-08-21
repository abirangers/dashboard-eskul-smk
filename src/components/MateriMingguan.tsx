import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useEskulStore } from '../stores/eskulStore';

const MateriMingguan = () => {
  const kelasAktif = useEskulStore((s) => s.kelasAktif);
  const tambahMateri = useEskulStore((s) => s.tambahMateri);
  const materiKelas = useEskulStore((s) => s.materi[kelasAktif] || []);
  const [judul, setJudul] = useState('');
  const [link, setLink] = useState('');

  const handleAdd = () => {
    if (!kelasAktif || !judul) return;
    tambahMateri({
      id: Date.now().toString(),
      kelasId: kelasAktif,
      minggu: materiKelas.length + 1,
      judul,
      deskripsi: '',
      linkVideo: link,
    });
    setJudul('');
    setLink('');
  };

  if (!kelasAktif) return null;

  return (
    <Card className="p-4 space-y-2">
      <div className="flex gap-2">
        <Input placeholder="Judul" value={judul} onChange={(e) => setJudul(e.target.value)} />
        <Input placeholder="Link" value={link} onChange={(e) => setLink(e.target.value)} />
        <Button onClick={handleAdd}>Tambah</Button>
      </div>
      <ul className="text-sm list-disc pl-4">
        {materiKelas.map((m) => (
          <li key={m.id}>{m.minggu}. {m.judul}</li>
        ))}
      </ul>
    </Card>
  );
};

export default MateriMingguan;
