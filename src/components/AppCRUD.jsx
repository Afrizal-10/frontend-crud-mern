import {Link} from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa";
import {useState, useEffect} from "react";
import axios from "axios";
import {confirmDelete, successDeleteAlert} from "../utils/swal";

function AppCRUD() {
  const [dataMahasiswa, setDataMahasiswa] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  // Get Data
  const getData = async () => {
    try {
      const {data} = await axios.get(`${API_URL}mahasiswa/getData`);
      console.log(data);
      setDataMahasiswa(data.data);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Delete Data
  const deleteData = async (id) => {
    const result = await confirmDelete();
    if (!result.isConfirmed) return;

    try {
      const res = await axios.delete(`${API_URL}mahasiswa/deleteData/${id}`);
      console.log(res.data);
      setDataMahasiswa((prev) => prev.filter((item) => item._id !== id));
      await successDeleteAlert();
    } catch (error) {
      console.error("Gagal menghapus:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex justify-center items-start mt-6">
        <div className="w-[70%] flex flex-col items-center pb-24">
          <Link
            to="/addData"
            className="bg-gray-900 text-white hover:bg-gray-800 cursor-pointer px-2 py-1 mb-4 font-semibold shadow rounded"
          >
            Add Data
          </Link>
          <table className="border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">No</th>
                <th className="border px-4 py-2">Npm</th>
                <th className="border px-4 py-2">Nama</th>
                <th className="border px-4 py-2">Fakultas</th>
                <th className="border px-4 py-2">Program Studi</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {dataMahasiswa.map((data, index) => (
                <tr key={data._id}>
                  <td className="border px-4 py-2 text-center font-bold">
                    {index + 1}.
                  </td>
                  <td className="border px-4 py-2">{data.npm}</td>
                  <td className="border px-4 py-2">{data.nama}</td>
                  <td className="border px-4 py-2">{data.fakultas}</td>
                  <td className="border px-4 py-2">{data.prodi}</td>
                  <td className="border px-4 py-2">
                    <div className="flex items-center space-x-2 justify-center">
                      <Link to={`/editData/${data._id}`} title="Edit">
                        <FaEdit className="text-green-600 hover:text-green-800" />
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                        onClick={() => deleteData(data._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AppCRUD;
