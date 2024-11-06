import Header from "./components/Header";
import Table from "./components/Table";
import Form from "./components/Form";
import { useFormContext } from "./context/FormContext";
import useFetchUsers from "./hooks/useFetchUser";
import Loading from "./components/Loading";

function App() {
  const { isFormVisible } = useFormContext(); // Mengakses status visibilitas form
  const { loading } = useFetchUsers(); // Mengakses status loading saat fetching data

  return (
    <div className="container">
      <Header /> {/* Menampilkan header */}
      {loading ? <Loading /> : <Table />} {/* Menampilkan loading atau tabel */}
      {isFormVisible && <Form />}{" "}
      {/* Menampilkan form jika isFormVisible true */}
    </div>
  );
}

export default App;
