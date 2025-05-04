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

  const [verso, setVerso] = useState(formulario.documentos?.verso || null);
  const [versoNome, setVersoNome] = useState(formulario.documentos?.verso?.name || 'Nenhum arquivo selecionado');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const handleVersoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVerso(file);
      setVersoNome(file.name);  // Aqui estamos garantindo que o nome do arquivo seja uma string
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro(null);
  
    const dadosDocumentos = { verso };
    atualizarFormulario({ ...formulario, documentos: dadosDocumentos });
  
    const formData = new FormData();
    formData.append("verso", verso);
  
    try {
      const response = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formData,
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Falha ao enviar documento para o servidor");
      }
    
      const resultado = await response.json();
      const { nome, cpf } = resultado.resultado_verso || {};
      
      atualizarFormulario({
        ...formulario,
        documentos: dadosDocumentos,
        nomeDocumento: nome,
        cpfDocumento: cpf
      });
      
      console.log("Documentos enviados com sucesso:", resultado);
      navigate("/redes");
    } catch (error) {
      console.error("Erro ao enviar documentos:", error);
      setErro(error.message);
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
      <p className='identificacao'> Os arquivos que são aceitos pelo sistema são:</p>
      <p className='identificacao'>- RG</p>
      <p className='identificacao'>- CNH</p>
      <p className='identificacao'  >- Passaporte</p>
      <p className='aviso'>Envie arquivos do tipo .pdf para que o sistema faça a validação corretamente.</p>
      <form className="upload_form" onSubmit={handleSubmit}>
        
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

        <button
          type="submit"
          className="upload_button"
          disabled={!verso || carregando}
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
