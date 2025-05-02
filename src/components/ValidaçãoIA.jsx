import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../context/FormContext";
import "../styles/ValidacaoIA.css";

const ValidacaoIA = () => {
  const { formulario } = useContext(FormContext);
  const navigate = useNavigate();

  const [status, setStatus] = useState("validando"); // validando | sucesso | erro

  useEffect(() => {
    const validar = async () => {
      const formData = new FormData();
      formData.append("tipoDocumento", formulario.documentos.tipoDocumento);
      formData.append("frente", formulario.documentos.frente);
      if (formulario.documentos.verso) {
        formData.append("verso", formulario.documentos.verso);
      }

      try {
        const response = await fetch("http://localhost:8000/upload/", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        console.log("Resultado IA:", data);

        if (data.resultado_frente?.valido) {
          setStatus("sucesso");
          setTimeout(() => {
            navigate("/validacao-ia");
          }, 4000);
        } else {
          setStatus("erro");
        }
      } catch (err) {
        console.error("Erro na validação:", err);
        setStatus("erro");
      }
    };

    validar();
  }, [formulario, navigate]);

  return (
    <div className="validacao_container">
      <Header rotaAnterior="/documentos"/>
      {status === "validando" && (
        <>
          <h2 className="validacao_titulo">Validando seus documentos com IA...</h2>
          <div className="spinner" />
        </>
      )}
      {status === "sucesso" && (
        <div className="validacao_sucesso">
          <h2>Documentos validados com sucesso!</h2>
          <p>Redirecionando para o próximo passo...</p>
        </div>
      )}
      {status === "erro" && (
        <div className="validacao_erro">
          <h2>Não foi possível validar os documentos</h2>
          <p>Verifique se as imagens estão legíveis e tente novamente.</p>
          <button onClick={() => navigate("/upload-documentos")}>
            Voltar e reenviar
          </button>
        </div>
      )}
    </div>
  );
};

export default ValidacaoIA;
