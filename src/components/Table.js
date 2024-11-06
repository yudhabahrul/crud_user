import React, { useState } from "react";
import { useFormContext } from "../context/FormContext";
import { useUserContext } from "../context/UserContext";

const Tabel = () => {
  // State untuk pengurutan dan filter status keanggotaan
  const [sortBy, setSortBy] = useState(""); // Untuk sorting berdasarkan nama, email, atau umur
  const [statusFilter, setStatusFilter] = useState({
    aktif: false, // Untuk filter status "Aktif"
    tidakAktif: false, // Untuk filter status "Tidak Aktif"
  });

  // Mengambil fungsi dari context untuk menampilkan form dan mengelola pengguna
  const { toggleFormVisibility } = useFormContext();
  const { users, selectUserForUpdate, removeUser } = useUserContext();

  // Fungsi untuk menangani perubahan pilihan urutan data
  const handleSortChange = (e) => {
    setSortBy(e.target.value); // Mengubah nilai state sortBy sesuai pilihan
  };

  // Fungsi untuk menangani perubahan filter status keanggotaan
  const handleStatusChange = (e) => {
    const { name, checked } = e.target;
    setStatusFilter((prevState) => ({
      ...prevState,
      [name]: checked, // Mengubah status filter berdasarkan pilihan checkbox
    }));
  };

  // Fungsi untuk mendapatkan data pengguna yang sudah diurutkan dan difilter
  const getSortedUsers = () => {
    let sortedUsers = [...users]; // Membuat salinan data pengguna

    // Penyortiran berdasarkan pilihan urutan
    if (sortBy === "nama") {
      sortedUsers.sort((a, b) => a.nama.localeCompare(b.nama)); // Mengurutkan berdasarkan nama
    } else if (sortBy === "email") {
      sortedUsers.sort((a, b) => a.email.localeCompare(b.email)); // Mengurutkan berdasarkan email
    } else if (sortBy === "umur") {
      sortedUsers.sort((a, b) => a.umur - b.umur); // Mengurutkan berdasarkan umur
    }

    // Filter berdasarkan status keanggotaan
    if (statusFilter.aktif) {
      sortedUsers = sortedUsers.filter((user) => user.status === "Aktif");
    }

    if (statusFilter.tidakAktif) {
      sortedUsers = sortedUsers.filter((user) => user.status === "Tidak Aktif");
    }

    return sortedUsers;
  };

  // Fungsi untuk menangani pembaruan data pengguna
  const handleUpdateUser = (user) => {
    selectUserForUpdate(user); // Memilih pengguna untuk diupdate
    toggleFormVisibility(); // Menampilkan form untuk update pengguna
  };

  // Mendapatkan daftar pengguna yang sudah diurutkan dan difilter
  const sortedUsers = getSortedUsers();

  return (
    <div className="box-table">
      <div className="top-table">
        <div>
          <span>Urutkan</span>{" "}
          <div className="dropdown">
            <button className="dropdown-button">Urutkan berdasarkan</button>
            <div className="dropdown-content">
              {/* Pilihan urutan berdasarkan nama, email, atau umur */}
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="nama"
                  onChange={handleSortChange}
                />{" "}
                Nama
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="email"
                  onChange={handleSortChange}
                />{" "}
                Email
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="umur"
                  onChange={handleSortChange}
                />{" "}
                Umur
              </label>
              <hr />
              Status Keanggotaan
              {/* Filter berdasarkan status "Aktif" atau "Tidak Aktif" */}
              <label>
                Aktif{" "}
                <input
                  type="checkbox"
                  name="aktif"
                  checked={statusFilter.aktif}
                  onChange={handleStatusChange}
                />
              </label>
              <label>
                Tidak Aktif{" "}
                <input
                  type="checkbox"
                  name="tidakAktif"
                  checked={statusFilter.tidakAktif}
                  onChange={handleStatusChange}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Tombol untuk menampilkan form tambah pengguna */}
        <button onClick={toggleFormVisibility}>Add User</button>
      </div>

      <div className="container-table">
        <table className="userTable">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Umur</th>
              <th>Status Keanggotaan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {/* Menampilkan data pengguna yang sudah diurutkan dan difilter */}
            {sortedUsers.length < 1 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  Tidak ada data
                </td>
              </tr>
            ) : (
              sortedUsers.map((user, idx) => (
                <tr key={user.id}>
                  <td>{idx + 1}</td>
                  <td>{user.nama}</td>
                  <td>{user.email}</td>
                  <td>{user.umur}</td>
                  <td>{user.status}</td>
                  <td>
                    <div className="aksi">
                      {/* Tombol untuk memperbarui dan menghapus pengguna */}
                      <button onClick={() => handleUpdateUser(user)}>
                        Update
                      </button>
                      <button onClick={() => removeUser(user.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tabel;
