import React from "react";
import { motion } from "framer-motion";
import "../styles/Style.css";
import simboloFuria from '../assets/images/furiaLogo.png';

const BemVindo = ({ proximaEtapa }) => {
  return (
    <motion.div
      className="bem-vindo-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <img className="logo-furia" src={simboloFuria} alt="Logo" />
      <h1>
        Bem-vindo(a) à <span className="furia-text">pesquisa de campo da FURIA</span>!
      </h1>
      <button onClick={proximaEtapa} className="start-button">
        Começar
      </button>
    </motion.div>
  );
};

export default BemVindo;
