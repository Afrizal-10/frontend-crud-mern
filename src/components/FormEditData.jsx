import {MdOutlineSaveAlt} from "react-icons/md";
import {useNavigate, useParams} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";
import axios from "axios";
import {useState, useEffect, use} from "react";
import {errorAlert, successAlert} from "../utils/swal";
// import {errorAlert, successAlert} from "../utils/swal";

const FormEditData = () => {
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const [npm, setNpm] = useState("");
  const [nama, setNama] = useState("");
  const [fakultas, setFakultas] = useState("");
  const [prodi, setProdi] = useState("");

  const {id} = useParams();

  // Get Data By Id
  const getDataById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/mahasiswa/getData/${id}`
      );
      console.log(response);
      setNpm(response.data.data.npm);
      setNama(response.data.data.nama);
      setFakultas(response.data.data.fakultas);
      setProdi(response.data.data.prodi);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getDataById();
  }, [id]);

  // Update Data
  const updateData = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/mahasiswa/editData/${id}`, {
        npm,
        nama,
        fakultas,
        prodi,
      });
      successAlert("Data berhasil diedit!");
      navigate("/");
    } catch (error) {
      errorAlert("Terjadi Kesalahan");
      console.log("error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-gray-100 shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Edit Data Mahasiswa
        </h2>
        <form className="space-y-4" onSubmit={updateData}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">NPM</label>
            <input
              type="text"
              placeholder="Masukkan NPM"
              disabled
              required
              value={npm}
              onChange={(e) => setNpm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Nama</label>
            <input
              type="text"
              placeholder="Masukkan Nama"
              required
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Fakultas
            </label>
            <input
              type="text"
              placeholder="Masukkan Fakultas"
              required
              value={fakultas}
              onChange={(e) => setFakultas(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Program Studi
            </label>
            <input
              type="text"
              placeholder="Masukkan Prodi"
              required
              value={prodi}
              onChange={(e) => setProdi(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="flex gap-4 pt-2">
            <button
              onClick={handleBack}
              className="w-1/2 bg-gray-300 text-gray-800 font-semibold py-2 rounded hover:bg-gray-400 transition flex items-center justify-center"
            >
              <FaArrowLeft className="mr-2 text-xl" />
              Kembali
            </button>
            <button
              type="submit"
              className="w-1/2 bg-gray-900 text-white cursor-pointer font-semibold py-2 rounded hover:bg-gray-800 transition flex items-center justify-center"
            >
              <MdOutlineSaveAlt className="mr-2 text-xl" />
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormEditData;
