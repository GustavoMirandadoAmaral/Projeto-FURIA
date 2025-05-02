import React from 'react';
import { motion } from 'framer-motion';
import '../styles/StyleTelaFinal.css';
import Header from './Header';

const TelaFinal = ({ linksRecomendados = [] }) => {
  const carregando = linksRecomendados.length === 0;

  return (
    <motion.div
      className="final_container"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <Header rotaAnterior="/redes"/>
      <h2 className="final_title">Cadastro Finalizado!</h2>
      <p className="final_text">
        Com base no seu perfil, estamos gerando recomendações de plataformas de e-sports para você.
      </p>

      {carregando ? (
        <div className="loading_container">
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
      )}

      <p className="success_message" style={{ marginTop: '20px' }}>
        Obrigado por participar do projeto FURIA! Entraremos em contato em breve.
      </p>
    </motion.div>
  );
};

export default TelaFinal;
