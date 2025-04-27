import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ConectarRedesSociais() {
  const navigate = useNavigate();
  const [links, setLinks] = useState({
    instagram: '',
    twitter: '',
    tiktok: '',
  });

  const handleChange = (e) => {
    setLinks({ ...links, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/enviar-links-esports');
  };

  return (
    <div className="container">
      <h2>Conectar Redes Sociais</h2>
      <form onSubmit={handleSubmit}>
        <input type="url" name="instagram" placeholder="Link do Instagram" onChange={handleChange} />
        <input type="url" name="twitter" placeholder="Link do Twitter/X" onChange={handleChange} />
        <input type="url" name="tiktok" placeholder="Link do TikTok" onChange={handleChange} />
        <button type="submit">Próximo</button>
      </form>
    </div>
  );
}

export default ConectarRedesSociais;
