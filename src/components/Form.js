import { useEffect, useState } from "react";
import { useFormContext } from "../context/FormContext";
import { useUserContext } from "../context/UserContext";

const Form = () => {
  const { toggleFormVisibility } = useFormContext();
  const { selectedUser, selectUserForUpdate, setUsers, addUser } =
    useUserContext();

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    umur: "",
    status: "",
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        nama: selectedUser.nama,
        email: selectedUser.email,
        umur: selectedUser.umur,
        status: selectedUser.status,
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Menggunakan name sesuai dengan properti formData
    }));
  };

  const validate = () => {
    // Validasi nama tidak boleh kosong
    if (!formData.nama.trim()) {
      alert("Nama tidak boleh kosong");
      return false;
    }

    // Validasi email harus sesuai format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      alert("Email tidak boleh kosong");
      return false;
    } else if (!emailRegex.test(formData.email)) {
      alert("Email tidak valid");
      return false;
    }

    // Validasi umur harus angka positif
    if (!formData.umur) {
      alert("Umur tidak boleh kosong");
      return false;
    } else if (isNaN(formData.umur) || formData.umur <= 0) {
      alert("Umur tidak valid");
      return false;
    }

    // Validasi status keanggotaan tidak boleh kosong
    if (!formData.status) {
      alert("Status keanggotaan harus dipilih");
      return false;
    }

    return true;
  };

  const handleCloseForm = () => {
    toggleFormVisibility();
    if (selectedUser) {
      selectUserForUpdate(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (selectedUser) {
        // Update user yang sudah ada
        const updatedUser = {
          ...selectedUser,
          nama: formData.nama,
          email: formData.email,
          umur: formData.umur,
          status: formData.status,
        };

        // Memperbarui user dan menyimpan ke localStorage
        setUsers((prevUsers) => {
          const updatedUsers = prevUsers.map((user) =>
            user.id === selectedUser.id ? updatedUser : user
          );
          localStorage.setItem("users", JSON.stringify(updatedUsers)); // Update localStorage
          return updatedUsers;
        });

        selectUserForUpdate(null); // Reset selectedUser
      } else {
        addUser(formData); // Menambahkan pengguna baru
      }
      toggleFormVisibility();
    }
  };

  return (
    <div className="box-form">
      <div className="form-container">
        <button onClick={handleCloseForm} className="close">
          X
        </button>
        <h2>{selectedUser ? "Update User" : "Add User"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nama">Nama</label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Masukkan nama Anda"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan email Anda"
            />
          </div>

          <div className="form-group">
            <label htmlFor="umur">Umur</label>
            <input
              type="number"
              id="umur"
              name="umur"
              value={formData.umur}
              onChange={handleChange}
              placeholder="Masukkan umur Anda"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status Keanggotaan</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="">Pilih Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Tidak Aktif">Tidak Aktif</option>
            </select>
          </div>

          <button className="submit" type="submit">
            {selectedUser ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
