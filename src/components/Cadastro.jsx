import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/StyleCadastro.css';

function Cadastro({ formulario, atualizarFormulario, proximaEtapa }) {
  const [formData, setFormData] = useState({
    nome: formulario.nome || '',
    endereco: formulario.endereco || '',
    cpf: formulario.cpf || '',
    interesses: formulario.interesses || '',
    atividades: formulario.atividades || '',
    aceitarOfertas: formulario.aceitarOfertas || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    atualizarFormulario(formData); // Atualiza o formulário geral
    proximaEtapa(); // Vai para UploadDocumentos.jsx
  };

  return (
    <motion.div
      className="cadastro_container"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="titulo_cadastro">Dados pessoais</h2>
      <form className="cadastro_form" onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome completo</label>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Nome completo"
          value={formData.nome}
          onChange={handleChange}
          required
        />

        <label htmlFor="endereco">Endereço</label>
        <input
          type="text"
          id="endereco"
          name="endereco"
          placeholder="Endereço"
          value={formData.endereco}
          onChange={handleChange}
          required
        />

        <label htmlFor="cpf">CPF</label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          placeholder="CPF"
          value={formData.cpf}
          onChange={handleChange}
          required
        />

        <label htmlFor="interesses">Interesses</label>
        <input
          type="text"
          id="interesses"
          name="interesses"
          placeholder="Seus interesses"
          value={formData.interesses}
          onChange={handleChange}
        />

        <label htmlFor="atividades">Atividades, eventos ou compras recentes</label>
        <textarea
          id="atividades"
          name="atividades"
          placeholder="Conte um pouco sobre suas atividades no último ano"
          value={formData.atividades}
          onChange={handleChange}
        />

        <div className="checkbox_container">
          <input
            type="checkbox"
            id="aceitarOfertas"
            name="aceitarOfertas"
            checked={formData.aceitarOfertas}
            onChange={handleChange}
          />
          <label htmlFor="aceitarOfertas">
            <strong>Comunicações e ofertas exclusivas</strong><br />
            Desejo receber atualizações sobre produtos e eventos relacionados à FURIA.
          </label>
        </div>

        <button type="submit" className="confirmar_button">Salvar</button>

        <p className="privacy_text">
          Suas definições de privacidade se aplicam apenas ao projeto FURIA. Para gerenciar suas preferências, consulte as configurações da sua conta.
        </p>
      </form>
    </motion.div>
  );
}

export default Cadastro;
