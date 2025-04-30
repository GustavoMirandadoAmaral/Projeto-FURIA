import React from "react";
import { useNavigate } from "react-router-dom";
import FuriaEsportsLogo from "../assets/images/furiaEsportsLogo.png";
import Voltar from "../assets/images/voltar.png";
import "../styles/Style.css";

const Header = () => {
  const navigate = useNavigate();

  const voltar = () => {
    if (document.referrer && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/cadastro"); // Substitua pela rota inicial do seu fluxo
    }
  };

  return (
    <div className="header_cadastro">
      <button type="button" className="voltar_button" onClick={voltar}>
        <img src={Voltar} alt="Voltar" />
      </button>
      <img className="icone_topo_tela" src={FuriaEsportsLogo} alt="Logo Furia" />
    </div>
  );
};

export default Header;
