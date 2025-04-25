import React from "react";
import { motion } from "framer-motion";
import "../styles/Style.css";
import simboloFuria from '../assets/images/furiaLogo.png';

const BemVindo = ({ onStart }) => {
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
        Bem-vindo(a) ao <span className="furia-text">FURIA Fan Quiz</span>!
      </h1>
      <p>
        Descubra que tipo de fã da FURIA você é!!{" "}
        <span role="img" aria-label="fogo">🔥</span>
      </p>
      <button onClick={onStart} className="start-button">Começar Quiz</button>
    </motion.div>
  );
};

export default BemVindo;