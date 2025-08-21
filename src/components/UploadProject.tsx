import { useState } from 'react';
import { useEskulStore } from '../stores/eskulStore';
import type { Project } from '../types/eskul.types';

const UploadProject = () => {
  const [namaProject, setNamaProject] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [nilai, setNilai] = useState(0);
  const kelasAktif = useEskulStore((s) => s.kelasAktif);
  const siswaKelas = useEskulStore((s) =>
    Object.values(s.siswa).filter((si) => si.kelasId === kelasAktif)
  );
  const uploadProject = useEskulStore((s) => s.uploadProject);
  const [siswaId, setSiswaId] = useState('');

  const handleUpload = () => {
    if (!namaProject || !fileUrl || !siswaId) return;
    const project: Project = {
      id: Date.now().toString(),
      siswaId,
      kelasId: kelasAktif,
      namaProject,
      fileUrl,
      nilai,
      tanggalUpload: new Date().toISOString(),
    };
    uploadProject(project);
    setNamaProject('');
    setFileUrl('');
    setNilai(0);
    setSiswaId('');
  };

  return (
    <div className="my-4">
      <h2 className="text-lg font-semibold mb-2">Upload Project</h2>
      <div className="flex flex-col gap-2 mb-2">
        <select
          value={siswaId}
          onChange={(e) => setSiswaId(e.target.value)}
          className="border p-2"
        >
          <option value="">Pilih siswa</option>
          {siswaKelas.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nama}
            </option>
          ))}
        </select>
        <input
          value={namaProject}
          onChange={(e) => setNamaProject(e.target.value)}
          placeholder="Nama project"
          className="border p-2"
        />
        <input
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          placeholder="Link file"
          className="border p-2"
        />
        <input
          type="number"
          value={nilai}
          onChange={(e) => setNilai(Number(e.target.value))}
          placeholder="Nilai"
          className="border p-2"
        />
        <button onClick={handleUpload} className="bg-green-500 text-white px-3 py-2 rounded">
          Simpan
        </button>
      </div>
    </div>
  );
};

export default UploadProject;
