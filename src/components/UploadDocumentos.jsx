import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/StyleUpload.css';
import Header from './Header';
import Documento from "../assets/images/documento.png";
import { FormContext } from '../context/FormContext';

const UploadDocumentos = () => {
  const navigate = useNavigate();
  const { formulario, atualizarFormulario } = useContext(FormContext);

  const [tipoDocumento, setTipoDocumento] = useState(formulario.documentos?.tipoDocumento || '');
  const [frente, setFrente] = useState(formulario.documentos?.frente || null);
  const [verso, setVerso] = useState(formulario.documentos?.verso || null);
  const [frenteNome, setFrenteNome] = useState(formulario.documentos?.frente?.name || 'Nenhum arquivo selecionado');
  const [versoNome, setVersoNome] = useState(formulario.documentos?.verso?.name || 'Nenhum arquivo selecionado');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const documentos = [
    { valor: 'identidade', label: 'Identidade (RG)' },
    { valor: 'cnh', label: 'CNH (Carteira de Motorista)' },
    { valor: 'passaporte', label: 'Passaporte' },
  ];

  const handleDocumentoChange = (e) => {
    setTipoDocumento(e.target.value);
    setFrente(null);
    setVerso(null);
    setFrenteNome('Nenhum arquivo selecionado');
    setVersoNome('Nenhum arquivo selecionado');
  };

  const handleFrenteChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFrente(file);
      setFrenteNome(file.name);
    }
  };

  const handleVersoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVerso(file);
      setVersoNome(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro(null);
  
    const dadosDocumentos = { tipoDocumento, frente, verso };
    atualizarFormulario({ ...formulario, documentos: dadosDocumentos });
  
    const formData = new FormData();
    formData.append("tipoDocumento", tipoDocumento);
    formData.append("frente", frente);
    if (verso) {
      formData.append("verso", verso);
    }
  
    try {
      const response = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Falha ao enviar documento para o servidor");
      }
  
      const resultado = await response.json();
      console.log("Documentos enviados com sucesso:", resultado);
      navigate("/redes");
    } catch (error) {
      console.error("Erro ao enviar documentos:", error);
      setErro("Não foi possível enviar os documentos. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };  

  return (
    <motion.div
      className="upload_container"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <Header rotaAnterior="/cadastro" />
      <h2 className="titulo_upload">Upload de Documentos</h2>
      <form className="upload_form" onSubmit={handleSubmit}>
        <label htmlFor="tipoDocumento" className="upload_label">Tipo de Documento</label>
        <select
          id="tipoDocumento"
          value={tipoDocumento}
          onChange={handleDocumentoChange}
          className="upload_select"
          required
        >
          <option value="">Selecione o documento</option>
          {documentos.map((doc) => (
            <option key={doc.valor} value={doc.valor}>
              {doc.label}
            </option>
          ))}
        </select>

        {tipoDocumento && (
          <>
            <label htmlFor="frenteInput" className="upload_label">
              {tipoDocumento === 'identidade' ? 'Frente do Documento' : 'Foto do Documento'}
            </label>
            <div className="upload_input_container">
              <img src={Documento} alt="Documento" className="documento_icone" />
              <div className="upload_file_section">
                <label htmlFor="frenteInput" className="custom_file_button">Escolher Arquivo</label>
                <span className="upload_file_name">{frenteNome}</span>
                <input
                  type="file"
                  id="frenteInput"
                  accept="image/*,application/pdf"
                  onChange={handleFrenteChange}
                  className="hidden_file_input"
                  required
                />
              </div>
            </div>

            {tipoDocumento === 'identidade' && (
              <>
                <label htmlFor="versoInput" className="upload_label">Verso do Documento</label>
                <div className="upload_input_container">
                  <img src={Documento} alt="Documento" className="documento_icone" />
                  <div className="upload_file_section">
                    <label htmlFor="versoInput" className="custom_file_button">Escolher Arquivo</label>
                    <span className="upload_file_name">{versoNome}</span>
                    <input
                      type="file"
                      id="versoInput"
                      accept="image/*,application/pdf"
                      onChange={handleVersoChange}
                      className="hidden_file_input"
                      required
                    />
                  </div>
                </div>
              </>
            )}
          </>
        )}

        <button
          type="submit"
          className="upload_button"
          disabled={!tipoDocumento || !frente || (tipoDocumento === 'identidade' && !verso) || carregando}
        >
          {carregando ? 'Enviando...' : 'Salvar e Continuar'}
        </button>

        {erro && <p className="upload_erro_text">{erro}</p>}

        <p className="upload_privacy_text">
          As imagens serão utilizadas apenas para fins de verificação no projeto FURIA.
        </p>
      </form>
    </motion.div>
  );
};

export default UploadDocumentos;
