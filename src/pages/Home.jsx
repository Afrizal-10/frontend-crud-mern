import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {IoIosAddCircle} from "react-icons/io";
import {MdDelete} from "react-icons/md";
import {FaEdit} from "react-icons/fa";
import {FaEye} from "react-icons/fa";
import {
  alertDeleteSuccess,
  alertError,
  alertLogoutSuccess,
  confirmDelete,
  confirmLogout,
} from "../utils/SweetAlert";

function Home() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/mahasiswa`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMahasiswa(data);
        else setMahasiswa([]);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  const handleDelete = async (id, nama = "data ini") => {
    try {
      const confirmed = await confirmDelete(nama);
      if (!confirmed) return;

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/mahasiswa/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setMahasiswa((prev) => prev.filter((m) => m._id !== id));
        alertDeleteSuccess();
      } else {
        alertError(data.message || "Gagal menghapus data!");
      }
    } catch (err) {
      console.error(err);
      alertError(err.message || "Terjadi kesalahan pada server!");
    }
  };

  const filteredMahasiswa = mahasiswa.filter((mhs) =>
    mhs.nama.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/profile`,
          {
            headers: {Authorization: `Bearer ${token}`},
          }
        );
        const data = await res.json();
        if (res.ok) setUserName(data.name || "User");
      } catch (err) {
        console.error("Gagal memuat profil:", err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const confirmed = await confirmLogout();
      if (!confirmed) return;

      localStorage.removeItem("token");
      alertLogoutSuccess();

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      alertError("Gagal logout. Coba lagi.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <motion.div
        initial={{opacity: 0, y: 30}}
        animate={{opacity: 1, y: 0}}
        className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-lg"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              📚 Daftar Mahasiswa
            </h1>
            <p className="text-gray-600 mt-1">Selamat datang, {userName}</p>
          </div>
          <div className="flex flex-col gap-3 items-stretch">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Cari nama mahasiswa..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00224D]"
              />
              <button
                onClick={() => navigate("/add")}
                className="bg-[#0C1844] text-white px-5 py-2 rounded-lg hover:bg-[#00224D] transition-all duration-200 shadow-md flex items-center justify-center gap-2"
              >
                <IoIosAddCircle className="w-5 h-5" /> Tambah
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="self-end w-fit bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md flex items-center justify-center gap-2"
            >
              <MdDelete className="w-5 h-5" /> Logout
            </button>
          </div>
        </div>
        {filteredMahasiswa.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="bg-[#0C1844] text-white">
                <tr>
                  <th className="px-4 py-3">No</th>
                  <th className="px-4 py-3">Nama</th>
                  <th className="px-4 py-3">NPM</th>
                  <th className="px-4 py-3">Fakultas</th>
                  <th className="px-4 py-3">Prodi</th>
                  <th className="px-4 py-3">No HP</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredMahasiswa.map((mhs, index) => (
                  <motion.tr
                    key={mhs._id}
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: index * 0.05}}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium">{index + 1} .</td>
                    <td className="px-4 py-3">{mhs.nama}</td>
                    <td className="px-4 py-3">{mhs.npm}</td>
                    <td className="px-4 py-3">{mhs.fakultas}</td>
                    <td className="px-4 py-3">{mhs.prodi}</td>
                    <td className="px-4 py-3">{mhs.no_hp}</td>
                    <td className="px-4 py-3">{mhs.email}</td>
                    <td className="px-4 py-3 text-center space-x-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/view/${mhs._id}`)}
                          className="flex items-center justify-center gap-1 cursor-pointer bg-[#0C1844] text-white px-3 py-1 rounded-md hover:bg-[#0b237c] transition"
                        >
                          <FaEye className="w-4 h-4" /> View
                        </button>
                        <button
                          onClick={() => navigate(`/edit/${mhs._id}`)}
                          className="flex items-center justify-center gap-1 cursor-pointer bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500 transition"
                        >
                          <FaEdit className="w-4 h-4" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(mhs._id)}
                          className="flex items-center justify-center gap-1 cursor-pointer bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                        >
                          <MdDelete className="w-4 h-4" /> Hapus
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">
            Tidak ada data mahasiswa.
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default Home;
