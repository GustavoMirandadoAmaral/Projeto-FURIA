import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EnviarLinksEsports() {
  const navigate = useNavigate();
  const [links, setLinks] = useState(['']);

  const handleLinkChange = (index, value) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const addLink = () => {
    setLinks([...links, '']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/quiz'); // Ou /tela-final se quiser pular o quiz
  };

  return (
    <div className="container">
      <h2>Enviar Links de Sites de e-Sports</h2>
      <form onSubmit={handleSubmit}>
        {links.map((link, index) => (
          <input
            key={index}
            type="url"
            placeholder="Link de perfil (ex: Faceit, Liquipedia...)"
            value={link}
            onChange={(e) => handleLinkChange(index, e.target.value)}
            required
          />
        ))}
        <button type="button" onClick={addLink}>Adicionar outro link</button>
        <button type="submit">Finalizar Cadastro</button>
      </form>
    </div>
  );
}

export default EnviarLinksEsports;
