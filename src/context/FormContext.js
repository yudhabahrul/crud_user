import React, { createContext, useState, useContext } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [isFormVisible, setFormVisible] = useState(false);

  // Fungsi untuk menampilkan atau menyembunyikan form
  const toggleFormVisibility = () => {
    setFormVisible((prev) => !prev);
  };

  return (
    <FormContext.Provider value={{ isFormVisible, toggleFormVisibility }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hook untuk menggunakan FormContext
export const useFormContext = () => useContext(FormContext);
