import { useState, useEffect } from "react";
import Header from "./components/Header";
import Table from "./components/Table";
import Form from "./components/Form";
import { useFormContext } from "./context/FormContext";
import useFetchUsers from "./hooks/useFetchUser";
import { useUserContext } from "./context/UserContext";
import Loading from "./components/Loading";

function App() {
  const { isFormVisible } = useFormContext();
  const { loading } = useFetchUsers();

  return (
    <div className="container">
      <Header />
      {loading ? <Loading /> : <Table />}
      {isFormVisible && <Form />}
    </div>
  );
}

export default App;
