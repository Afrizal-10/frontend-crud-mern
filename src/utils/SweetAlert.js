import Swal from "sweetalert2";

/* =====================================================
   ✅ ALERT KONFIRMASI
===================================================== */

// Konfirmasi logout
export const confirmLogout = async () => {
  const result = await Swal.fire({
    title: "Yakin ingin logout?",
    text: "Sesi kamu akan berakhir dan kamu harus login ulang.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, Logout",
    cancelButtonText: "Batal",
  });
  return result.isConfirmed;
};

// Konfirmasi hapus data
export const confirmDelete = async (nama = "data ini") => {
  const result = await Swal.fire({
    text: "Data ini akan dihapus permanen!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, hapus",
    cancelButtonText: "Batal",
  });
  return result.isConfirmed;
};

/* =====================================================
   ✅ ALERT SUKSES
===================================================== */

export const alertLoginSuccess = () => {
  Swal.fire({
    icon: "success",
    title: "Login Berhasil!",
    text: "Selamat datang kembali 👋",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const alertRegisterSuccess = () => {
  Swal.fire({
    icon: "success",
    title: "Registrasi Berhasil!",
    text: "Akun kamu sudah dibuat 🎉",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const alertAddSuccess = () => {
  Swal.fire({
    icon: "success",
    title: "Data berhasil ditambahkan!",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const alertEditSuccess = () => {
  Swal.fire({
    icon: "success",
    title: "Perubahan berhasil disimpan!",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const alertDeleteSuccess = () => {
  Swal.fire({
    icon: "success",
    title: "Data berhasil dihapus!",
    showConfirmButton: false,
    timer: 1500,
  });
};

/* =====================================================
   ❌ ALERT GAGAL
===================================================== */

export const alertError = (message = "Terjadi kesalahan, coba lagi nanti.") => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
};

export const alertLogoutSuccess = () => {
  Swal.fire({
    icon: "success",
    title: "Logout berhasil!",
    showConfirmButton: false,
    timer: 1200,
  });
};
