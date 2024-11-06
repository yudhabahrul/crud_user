import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FormProvider } from "./context/FormContext";
import { UserProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <FormProvider>
        <App />
      </FormProvider>
    </UserProvider>
  </React.StrictMode>
);
