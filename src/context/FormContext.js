import React, { createContext, useState, useContext, useReducer } from "react";

const ATUALIZAR_FORMULARIO = "ATUALIZAR_FORMULARIO";

const formularioReducer = (state, action) => {
  switch (action.type) {
    case ATUALIZAR_FORMULARIO:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formulario, dispatch] = useReducer(formularioReducer, {
    nome: "",
    cpf: "",
    endereco: "",
    interesses: "",
    atividades: "",
    aceitarOfertas: false,
    documentos: {
      verso: null,
      tipoDocumento: "",
    },
    redesSociais: [],
    linksEsports: [],
  });

  const atualizarFormulario = (novosDados) => {
    dispatch({ type: ATUALIZAR_FORMULARIO, payload: novosDados });
  };

  return (
    <FormContext.Provider value={{ formulario, atualizarFormulario }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);

export { FormContext };
