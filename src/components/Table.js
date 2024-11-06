import React, { useState } from "react";
import { useFormContext } from "../context/FormContext";
import { useUserContext } from "../context/UserContext";

const Tabel = () => {
  const [sortBy, setSortBy] = useState(""); // Untuk sorting
  const [statusFilter, setStatusFilter] = useState({
    aktif: false,
    tidakAktif: false,
  });
  const { toggleFormVisibility } = useFormContext();
  const { users, selectUserForUpdate, removeUser } = useUserContext();

  // function untuk memilih mengurutkan data user berdasarkan pilihan
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleStatusChange = (e) => {
    const { name, checked } = e.target;
    setStatusFilter((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  // function untuk memproses pengurutan data user
  const getSortedUsers = () => {
    let sortedUsers = [...users];

    // Penyortiran berdasarkan pilihan
    if (sortBy === "nama") {
      sortedUsers.sort((a, b) => a.nama.localeCompare(b.nama));
    } else if (sortBy === "email") {
      sortedUsers.sort((a, b) => a.email.localeCompare(b.email));
    } else if (sortBy === "umur") {
      sortedUsers.sort((a, b) => a.umur - b.umur);
    }

    // Filter berdasarkan status
    if (statusFilter.aktif) {
      sortedUsers = sortedUsers.filter((user) => user.status === "Aktif");
    }

    if (statusFilter.tidakAktif) {
      sortedUsers = sortedUsers.filter((user) => user.status === "Tidak Aktif");
    }

    return sortedUsers;
  };

  //function untuk menghadle pembaruan user
  const handleUpdateUser = (user) => {
    selectUserForUpdate(user);
    toggleFormVisibility();
  };

  // Inisialisasi nilai yang dikembalikan oleh function getSortedUsers
  const sortedUsers = getSortedUsers();

  return (
    <div className="box-table">
      <div className="top-table">
        <div>
          <span>Urutkan</span>{" "}
          <div className="dropdown">
            <button className="dropdown-button">Urutkan berdasarkan</button>
            <div className="dropdown-content">
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
