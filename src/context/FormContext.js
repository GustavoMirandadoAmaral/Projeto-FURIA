// src/context/FormContext.js
import React, { createContext, useState, useContext } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formulario, setFormulario] = useState({
    nome: '',
    cpf: '',
    endereco: '',
    interesses: '',
    atividades: '',
    aceitarOfertas: false,
    documentos: [],
    redesSociais: [],
    linksEsports: [],
  });

  const atualizarFormulario = (novosDados) => {
    setFormulario((prev) => ({
      ...prev,
      ...novosDados
    }));
  };

  return (
    <FormContext.Provider value={{ formulario, atualizarFormulario }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);

export { FormContext };
