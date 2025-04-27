import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/Style.css";

function UploadDocumentos({ proximaEtapa, etapaAnterior }) {
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [frente, setFrente] = useState(null);
  const [verso, setVerso] = useState(null);

  const handleDocumentoChange = (e) => {
    setTipoDocumento(e.target.value);
    // Limpa os arquivos ao mudar o tipo
    setFrente(null);
    setVerso(null);
  };

  const handleFrenteUpload = (e) => {
    setFrente(e.target.files[0]);
  };

  const handleVersoUpload = (e) => {
    setVerso(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você poderia validar se os arquivos foram enviados
    proximaEtapa();
  };

  const documentosComFrenteVerso = ["Identidade", "RG"]; // Documentos que precisam de frente e verso

  return (
    <motion.div
      className="upload-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="titulo-upload">Envio de Documentos</h2>
      <p>Escolha o tipo de documento que você enviará para que nossa Inteligência Artificial identifique seus dados</p>
      <form className="form-upload" onSubmit={handleSubmit}>
        <label htmlFor="tipoDocumento">Tipo de Documento</label>
        <select id="tipoDocumento" value={tipoDocumento} onChange={handleDocumentoChange} required>
          <option value="">Selecione o tipo</option>
          <option value="Identidade">Identidade (RG)</option>
          <option value="CNH">CNH</option>
          <option value="Passaporte">Passaporte</option>
        </select>

        {tipoDocumento && (
          <>
            <label>Upload da frente</label>
            <input type="file" accept="image/*,.pdf" onChange={handleFrenteUpload} required />

            {documentosComFrenteVerso.includes(tipoDocumento) && (
              <>
                <label>Upload do verso</label>
                <input type="file" accept="image/*,.pdf" onChange={handleVersoUpload} required />
              </>
            )}
          </>
        )}

        <div className="botoes-upload">
          <button type="button" onClick={etapaAnterior} className="botao-voltar">
            Voltar
          </button>
          <button type="submit" className="botao-confirmar">
            Confirmar e Continuar
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default UploadDocumentos;
