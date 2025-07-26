import {MdOutlineSaveAlt} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";
import axios from "axios";
import {useState, useEffect} from "react";
import {errorAlert, successAlert} from "../utils/swal";

const FormAddData = () => {
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const [npm, setNpm] = useState("");
  const [nama, setNama] = useState("");
  const [fakultas, setFakultas] = useState("");
  const [prodi, setProdi] = useState("");

  const [dataMahasiswa, setDataMahasiswa] = useState([]);

  // Get Data
  const getData = async () => {
    try {
      const {data} = await axios.get("http://localhost:3000/mahasiswa/getData");
      console.log(data);
      setDataMahasiswa(data.data);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Add Data
  const addData = async (e) => {
    e.preventDefault();
    try {
      // Data Exists
      await dataMahasiswa.find((data) => {
        if (data.npm == npm) {
          return errorAlert("Data sudah ada!");
        }
      });

      await axios.post("http://localhost:3000/mahasiswa/addData", {
        npm,
        nama,
        fakultas,
        prodi,
      });
      successAlert("Data berhasil ditambahkan!");
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
          Tambah Data Mahasiswa
        </h2>
        <form className="space-y-4" onSubmit={addData}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">NPM</label>
            <input
              type="text"
              placeholder="Masukkan NPM"
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
              className="w-1/2 bg-gray-900 text-white font-semibold py-2 rounded hover:bg-gray-800 transition flex items-center justify-center cursor-pointer"
            >
              <MdOutlineSaveAlt className="mr-2 text-xl" />
              Add Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAddData;
