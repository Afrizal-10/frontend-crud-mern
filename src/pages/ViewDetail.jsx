import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";

const ViewDetail = () => {
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
        alert(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <p>Memuat data mahasiswa...</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white p-8 rounded-2xl shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        Detail Data Mahasiswa
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Nama</label>
          <input
            type="text"
            value={formData.nama}
            readOnly
            className="w-full bg-transparent border-b border-gray-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">NPM</label>
          <input
            type="text"
            value={formData.npm}
            readOnly
            className="w-full bg-transparent border-b border-gray-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Fakultas</label>
          <input
            type="text"
            value={formData.fakultas}
            readOnly
            className="w-full bg-transparent border-b border-gray-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Program Studi
          </label>
          <input
            type="text"
            value={formData.prodi}
            readOnly
            className="w-full bg-transparent border-b border-gray-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">No. HP</label>
          <input
            type="text"
            value={formData.no_hp}
            readOnly
            className="w-full bg-transparent border-b border-gray-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="text"
            value={formData.email}
            readOnly
            className="w-full bg-transparent border-b border-gray-500 focus:outline-none"
          />
        </div>
      </div>

      <button
        onClick={() => navigate("/home")}
        className="mt-6 w-full bg-cyan-500 text-white py-2 rounded-lg font-semibold hover:bg-cyan-600 transition-all"
      >
        Kembali
      </button>
    </div>
  );
};

export default ViewDetail;
