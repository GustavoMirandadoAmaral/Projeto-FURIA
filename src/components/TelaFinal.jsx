import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/StyleTelaFinal.css';
import Header from './Header';

const TelaFinal = ({ linksRecomendados = [] }) => {
  const [erro, setErro] = useState(false); // Estado para erro de carregamento
  const carregando = linksRecomendados.length === 0;

  // Função para simular um erro (substitua por lógica real de erro)
  const simularErro = () => {
    setErro(true); // Simula um erro de carregamento
  };

  return (
    <motion.div
      className="final_container"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <Header rotaAnterior="/redes" />
      <h2 className="final_title">Cadastro Finalizado!</h2>
      <p className="final_text">
        Com base no seu perfil, estamos gerando recomendações de plataformas de e-sports para você.
      </p>

      {erro ? (
        <p className="error_message">
          Ocorreu um erro ao gerar suas recomendações. Tente novamente mais tarde.
        </p>
      ) : (
        carregando ? (
          <div className="loading_container" aria-live="polite">
            <div className="spinner"></div>
            <p className="loading_text">Gerando recomendações com base em seu perfil...</p>
          </div>
        ) : (
          <ul className="link_list">
            {linksRecomendados.map((link, index) => (
              <li key={index} className="link_item">
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        )
      )}

      <p className="success_message" style={{ marginTop: '20px' }}>
        Obrigado por participar do projeto FURIA! Entraremos em contato em breve.
      </p>

      <button onClick={simularErro} className="simular_erro_button">
        Simular Erro
      </button>
    </motion.div>
  );
};

export default TelaFinal;
