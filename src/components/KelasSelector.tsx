import { KELOMPOK_KELAS } from '../config/kelas';
import { useEskulStore } from '../stores/eskulStore';

const KelasSelector = () => {
  const kelasAktif = useEskulStore((s) => s.kelasAktif);
  const setKelasAktif = useEskulStore((s) => s.setKelasAktif);

  return (
    <div>
      <label htmlFor="kelas" className="block mb-1">Pilih Kelas</label>
      <select
        id="kelas"
        value={kelasAktif}
        onChange={(e) => setKelasAktif(e.target.value)}
        className="border p-2 rounded"
      >
        {Object.entries(KELOMPOK_KELAS).map(([id, data]) => (
          <option key={id} value={id}>
            {data.nama}
          </option>
        ))}
      </select>
    </div>
  );
};

export default KelasSelector;
