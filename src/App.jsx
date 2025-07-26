import {Route, Routes} from "react-router-dom";
import AppCRUD from "./components/AppCRUD";
import FormAddData from "./components/FormAddData";
import FormEditData from "./components/FormEditData";
import Footer from "./components/Footer";
import {FaInstagram, FaFacebook, FaGithub, FaLinkedin} from "react-icons/fa";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-gray-900 text-4xl font-semibold text-center pt-8">
        CRUD MERN
      </h1>

      {/* Media Sosial */}
      <div className="flex justify-center mt-4">
        <div className="bg-white shadow-md px-6 py-3 rounded-xl flex space-x-4">
          <a
            href="https://www.instagram.com/izall10_?utm_source=qr&igsh=d294OTM1cGtlYzh6"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-pink-600 text-2xl hover:scale-110 transition" />
          </a>
          <a
            href="https://github.com/Afrizal-10"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-gray-800 text-2xl hover:scale-110 transition" />
          </a>
          <a
            href="https://www.linkedin.com/in/afrizal-b8242431b"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-blue-600 text-2xl hover:scale-110 transition" />
          </a>
        </div>
      </div>

      <div className="flex-grow px-4 mt-6">
        <Routes>
          <Route path="/" Component={AppCRUD} />
          <Route path="/addData" Component={FormAddData} />
          <Route path="/editData/:id" Component={FormEditData} title="Edit" />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
