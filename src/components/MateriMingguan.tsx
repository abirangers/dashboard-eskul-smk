import { useState } from 'react';
import { useEskulStore } from '../stores/eskulStore';
import type { Materi } from '../types/eskul.types';

const MateriMingguan = () => {
  const kelasAktif = useEskulStore((s) => s.kelasAktif);
  const tambahMateri = useEskulStore((s) => s.tambahMateri);
  const materiList = useEskulStore((s) => s.materi[kelasAktif] || []);
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [linkVideo, setLinkVideo] = useState('');

  const handleTambah = () => {
    if (!judul) return;
    const materi: Materi = {
      id: Date.now().toString(),
      kelasId: kelasAktif,
      minggu: materiList.length + 1,
      judul,
      deskripsi,
      linkVideo,
    };
    tambahMateri(materi);
    setJudul('');
    setDeskripsi('');
    setLinkVideo('');
  };

  return (
    <div className="my-4">
      <h2 className="text-lg font-semibold mb-2">Materi Mingguan</h2>
      <div className="flex flex-col gap-2 mb-2">
        <input
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          placeholder="Judul materi"
          className="border p-2"
        />
        <textarea
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Deskripsi"
          className="border p-2"
        />
        <input
          value={linkVideo}
          onChange={(e) => setLinkVideo(e.target.value)}
          placeholder="Link video"
          className="border p-2"
        />
        <button onClick={handleTambah} className="bg-purple-500 text-white px-3 py-2 rounded">
          Simpan
        </button>
      </div>
      <ul>
        {materiList.map((m) => (
          <li key={m.id}>
            Minggu {m.minggu}: {m.judul}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MateriMingguan;
