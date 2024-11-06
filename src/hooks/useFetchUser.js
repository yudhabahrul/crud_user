import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";

const useFetchUsers = () => {
  const [loading, setLoading] = useState(true);
  const { setUsers } = useUserContext();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Cek data di localStorage
        const storedUsers = localStorage.getItem("users");

        if (storedUsers) {
          // Jika data ada di localStorage, gunakan data tersebut
          setUsers(JSON.parse(storedUsers));
          setLoading(false);
          return; // Stop fetching dari API
        }

        // Jika tidak ada di localStorage, fetch data dari API
        const response = await fetch("https://api.github.com/users");

        if (!response.ok) {
          throw new Error("Gagal mengambil data pengguna");
        }

        const data = await response.json();
        const formattedUsers = data.map((user) => ({
          id: user.id,
          nama: user.login,
          email: `${user.login}@example.com`,
          umur: Math.floor(Math.random() * 30) + 20, // Random umur antara 20-50
          status: Math.random() > 0.5 ? "Aktif" : "Tidak Aktif", // Random status
        }));

        // Simpan data ke context dan localStorage
        setUsers(formattedUsers);
        localStorage.setItem("users", JSON.stringify(formattedUsers));
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [setUsers]);

  return { loading };
};

export default useFetchUsers;
