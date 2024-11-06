import { createContext, useContext, useState } from "react";

// Membuat context
const UserContext = createContext();

// Membuat Provider untuk menyediakan context
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Menambahkan user baru
  const addUser = (newUser) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers)); // Simpan pembaruan ke localStorage
      return updatedUsers;
    });
  };

  // Function untuk memilih user yang akan diupdate
  const selectUserForUpdate = (user) => {
    setSelectedUser(user);
  };

  // funtion untuk menghapus data user berdasarkan id
  const removeUser = (userId) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.filter((user) => user.id !== userId);
      localStorage.setItem("users", JSON.stringify(updatedUsers)); // Simpan ke localStorage
      return updatedUsers;
    });
  };

  return (
    <UserContext.Provider
      value={{
        users,
        addUser,
        setUsers,
        selectedUser,
        selectUserForUpdate,
        removeUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook untuk menggunakan context di komponen lain
export const useUserContext = () => useContext(UserContext);
