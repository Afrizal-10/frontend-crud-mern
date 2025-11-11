import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {alertEditSuccess, alertError} from "../utils/SweetAlert";

const EditForm = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    npm: "",
    fakultas: "",
    prodi: "",
    no_hp: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/mahasiswa/${id}`,
          {
            headers: {Authorization: `Bearer ${token}`},
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Gagal memuat data.");

        setFormData({
          nama: data.nama || "",
          npm: data.npm || "",
          fakultas: data.fakultas || "",
          prodi: data.prodi || "",
          no_hp: data.no_hp || "",
          email: data.email || "",
        });

        setLoading(false);
      } catch (err) {
        alertError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/mahasiswa/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal memperbarui data.");

      alertEditSuccess("Data mahasiswa berhasil diperbarui!");
      navigate("/home");
    } catch (err) {
      alertError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <p>Memuat data mahasiswa...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <div className="relative w-[380px] overflow-hidden rounded-lg shadow-[0_0_10px_rgba(0,255,255,0.2)] bg-[#111] p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Edit Data Mahasiswa
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative w-full">
            <input
              type="text"
              value={formData.nama}
              onChange={(e) => setFormData({...formData, nama: e.target.value})}
              required
              className="w-full bg-transparent border-b border-gray-600 focus:border-cyan-400 text-sm py-2 outline-none peer placeholder-transparent"
            />
            <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-focus:-translate-y-5 peer-focus:text-cyan-400 peer-valid:-translate-y-5">
              Nama
            </label>
          </div>
          <div className="relative w-full">
            <input
              type="text"
              value={formData.npm}
              onChange={(e) => setFormData({...formData, npm: e.target.value})}
              required
              className="w-full bg-transparent border-b border-gray-600 focus:border-cyan-400 text-sm py-2 outline-none peer placeholder-transparent"
            />
            <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-focus:-translate-y-5 peer-focus:text-cyan-400 peer-valid:-translate-y-5">
              NPM
            </label>
          </div>
          <div className="relative w-full">
            <input
              type="text"
              value={formData.fakultas}
              onChange={(e) =>
                setFormData({...formData, fakultas: e.target.value})
              }
              required
              className="w-full bg-transparent border-b border-gray-600 focus:border-cyan-400 text-sm py-2 outline-none peer placeholder-transparent"
            />
            <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-focus:-translate-y-5 peer-focus:text-cyan-400 peer-valid:-translate-y-5">
              Fakultas
            </label>
          </div>
          <div className="relative w-full">
            <input
              type="text"
              value={formData.prodi}
              onChange={(e) =>
                setFormData({...formData, prodi: e.target.value})
              }
              required
              className="w-full bg-transparent border-b border-gray-600 focus:border-cyan-400 text-sm py-2 outline-none peer placeholder-transparent"
            />
            <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-focus:-translate-y-5 peer-focus:text-cyan-400 peer-valid:-translate-y-5">
              Program Studi
            </label>
          </div>
          <div className="relative w-full">
            <input
              type="text"
              value={formData.no_hp}
              onChange={(e) =>
                setFormData({...formData, no_hp: e.target.value})
              }
              required
              className="w-full bg-transparent border-b border-gray-600 focus:border-cyan-400 text-sm py-2 outline-none peer placeholder-transparent"
            />
            <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-focus:-translate-y-5 peer-focus:text-cyan-400 peer-valid:-translate-y-5">
              Nomor HP
            </label>
          </div>
          <div className="relative w-full">
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({...formData, email: e.target.value})
              }
              required
              className="w-full bg-transparent border-b border-gray-600 focus:border-cyan-400 text-sm py-2 outline-none peer placeholder-transparent"
            />
            <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-focus:-translate-y-5 peer-focus:text-cyan-400 peer-valid:-translate-y-5">
              Email
            </label>
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold py-2 rounded transition"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
