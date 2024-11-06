import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FormProvider } from "./context/FormContext";
import { UserProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Membungkus aplikasi dengan context pengguna */}
    <UserProvider>
      {/* Membungkus aplikasi dengan context form */}
      <FormProvider>
        <App /> {/* Komponen utama aplikasi */}
      </FormProvider>
    </UserProvider>
  </React.StrictMode>
);
