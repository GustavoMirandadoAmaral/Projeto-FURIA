import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/StyleRedesSociais.css';
import Header from './Header';
import Instagram from "../assets/images/instagramLogo.png";
import X from "../assets/images/xLogo.png";
import Facebook from "../assets/images/facebookLogo.png";

const VincularRedesSociais = ({ formulario, atualizarFormulario, proximaEtapa }) => {
  const [redesVinculadas, setRedesVinculadas] = useState({
    instagram: false,
    x: false,
    facebook: false,
  });

  const handleVincular = (rede) => {
    let novaJanela;
    if (rede === 'instagram') {
      novaJanela = window.open('https://www.instagram.com/accounts/login/', '_blank');
    } else if (rede === 'x') {
      novaJanela = window.open('https://twitter.com/i/flow/login', '_blank');
    } else if (rede === 'facebook') {
      novaJanela = window.open('https://www.facebook.com/login/', '_blank');
    }

    if (novaJanela) {
      setRedesVinculadas((prev) => ({ ...prev, [rede]: true }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    atualizarFormulario({ ...formulario, redesSociais: redesVinculadas });
    proximaEtapa();
  };

  return (
    <motion.div
      className="vincular_container"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <h2 className="titulo_vincular">Vincular Redes Sociais</h2>

      <form className="vincular_form" onSubmit={handleSubmit}>

        <button
          type="button"
          className={`vincular_button ${redesVinculadas.instagram ? 'vinculada' : ''}`}
          onClick={() => handleVincular('instagram')}
        >
          <span className="vincular_text">Vincular Instagram</span>
          <img src={Instagram} alt="Instagram" className="vincular_icon" />
        </button>

        <button
          type="button"
          className={`vincular_button ${redesVinculadas.x ? 'vinculada' : ''}`}
          onClick={() => handleVincular('x')}
        >
          <span className="vincular_text">Vincular X (Twitter)</span>
          <img src={X} alt="X (Twitter)" className="vincular_icon" />
        </button>

        <button
          type="button"
          className={`vincular_button ${redesVinculadas.facebook ? 'vinculada' : ''}`}
          onClick={() => handleVincular('facebook')}
        >
          <span className="vincular_text">Vincular Facebook</span>
          <img src={Facebook} alt="Facebook" className="vincular_icon" />
        </button>

        <button type="submit" className="confirmar_vincular_button" style={{ marginTop: '30px' }}>
          <span className="vincular_text">Salvar e Continuar</span>
        </button>

        <p className="vincular_privacy_text">
          As informações das redes sociais serão utilizadas apenas para fins de verificação no projeto FURIA.
        </p>
      </form>
    </motion.div>
  );
};

export default VincularRedesSociais;
