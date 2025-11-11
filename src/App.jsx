import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddForm from "./pages/AddForm";
import EditForm from "./pages/EditForm";
import ViewDetail from "./pages/ViewDetail";
// import AddMahasiswa from "./pages/AddMahasiswa";
// import EditMahasiswa from "./pages/EditMahasiswa";
// import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/edit/:id" element={<EditForm />} />
        <Route path="/view/:id" element={<ViewDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
