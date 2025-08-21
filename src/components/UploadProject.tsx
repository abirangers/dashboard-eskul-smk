import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useEskulStore } from '../stores/eskulStore';

const UploadProject = () => {
  const kelasAktif = useEskulStore((s) => s.kelasAktif);
  const uploadProject = useEskulStore((s) => s.uploadProject);
  const projectKelas = useEskulStore((s) => s.projects[kelasAktif] || []);
  const [siswaId, setSiswaId] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [nilai, setNilai] = useState('');

  const handleAdd = () => {
    if (!kelasAktif || !siswaId) return;
    uploadProject({
      id: Date.now().toString(),
      siswaId,
      kelasId: kelasAktif,
      namaProject: siswaId,
      fileUrl,
      nilai: Number(nilai) || 0,
      tanggalUpload: new Date().toISOString(),
    });
    setSiswaId('');
    setFileUrl('');
    setNilai('');
  };

  if (!kelasAktif) return null;

  return (
    <Card className="p-4 space-y-2">
      <div className="flex flex-col md:flex-row gap-2">
        <Input placeholder="Nama Siswa" value={siswaId} onChange={(e) => setSiswaId(e.target.value)} />
        <Input placeholder="Link File" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} />
        <Input type="number" placeholder="Nilai" value={nilai} onChange={(e) => setNilai(e.target.value)} />
        <Button onClick={handleAdd}>Upload</Button>
      </div>
      <ul className="text-sm list-disc pl-4">
        {projectKelas.map((p) => (
          <li key={p.id}>{p.siswaId} - {p.nilai}</li>
        ))}
      </ul>
    </Card>
  );
};

export default UploadProject;
