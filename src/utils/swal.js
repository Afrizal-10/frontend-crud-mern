import Swal from "sweetalert2";

export const confirmDelete = async () => {
  return await Swal.fire({
    title: "Yakin ingin menghapus?",
    text: "Data yang dihapus tidak dapat dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
    reverseButtons: true,
  });
};

export const successDeleteAlert = () => {
  return Swal.fire({
    icon: "success",
    title: "Berhasil dihapus!",
    text: "Data berhasil dihapus dari sistem.",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const successAlert = (message = "Berhasil!") => {
  return Swal.fire({
    icon: "success",
    title: "Sukses",
    text: message,
    timer: 1500,
    showConfirmButton: false,
  });
};

export const errorAlert = (message = "Terjadi kesalahan!") => {
  return Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
};
