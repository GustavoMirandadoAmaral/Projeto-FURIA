import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/StyleCadastro.css';
import Header from "../components/Header";
import { useForm } from "../context/FormContext";

function Cadastro() {
  const navigate = useNavigate();
  const { formulario, atualizarFormulario } = useForm();

  const [formData, setFormData] = useState({
    nome: formulario.nome || '',
    endereco: formulario.endereco || '',
    cpf: formulario.cpf || '',
    interesses: formulario.interesses || '',
    atividades: formulario.atividades || '',
    aceitarOfertas: formulario.aceitarOfertas || false,
    jogosFuria: formulario.jogosFuria || [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        jogosFuria: checked
          ? [...prevData.jogosFuria, value]
          : prevData.jogosFuria.filter((jogo) => jogo !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    atualizarFormulario(formData);
    navigate('/documentos');
  };

  return (
    <motion.div
      className="cadastro_container"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <Header rotaAnterior="/" />
      <h2 className="titulo_cadastro">Dados pessoais</h2>
      
      <form className="cadastro_form" onSubmit={handleSubmit}>
        <label htmlFor="nome" className="cadastro_label">Nome completo</label>
        <input
          type="text"
          id="nome"
          name="nome"
          className="cadastro_input"
          placeholder="Nome completo"
          value={formData.nome}
          onChange={handleChange}
          required
        />

        <label htmlFor="endereco" className="cadastro_label">Endereço</label>
        <input
          type="text"
          id="endereco"
          name="endereco"
          className="cadastro_input"
          placeholder="Endereço"
          value={formData.endereco}
          onChange={handleChange}
          required
        />

        <label htmlFor="cpf" className="cadastro_label">CPF</label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          className="cadastro_input"
          placeholder="CPF"
          value={formData.cpf}
          onChange={handleChange}
          required
        />

        <label htmlFor="atividades" className="cadastro_label">Atividades, eventos ou compras recentes</label>
        <textarea
          id="atividades"
          name="atividades"
          className="cadastro_textarea"
          placeholder="Conte um pouco sobre suas atividades no último ano"
          value={formData.atividades}
          onChange={handleChange}
        />

        <label className="cadastro_label">Quais jogos você acompanha a FURIA?</label>
        <div className="jogos_options">
          <label>
            <input
              className='options'
              type="checkbox"
              name="jogosFuria"
              value="Valorant"
              checked={formData.jogosFuria.includes("Valorant")}
              onChange={handleChange}
            />
            Valorant
          </label>
          <label>
            <input
              className='options'
              type="checkbox"
              name="jogosFuria"
              value="CS2"
              checked={formData.jogosFuria.includes("CS2")}
              onChange={handleChange}
            />
            CS2
          </label>
          <label>
            <input
              className='options'
              type="checkbox"
              name="jogosFuria"
              value="LOL"
              checked={formData.jogosFuria.includes("LOL")}
              onChange={handleChange}
            />
            LOL
          </label>
          <label>
            <input
              className='options'
              type="checkbox"
              name="jogosFuria"
              value="R6"
              checked={formData.jogosFuria.includes("R6")}
              onChange={handleChange}
            />
            R6
          </label>
        </div>

        <div className="cadastro_checkbox_container">
          <input
            type="checkbox"
            id="aceitarOfertas"
            name="aceitarOfertas"
            className="cadastro_checkbox"
            checked={formData.aceitarOfertas}
            onChange={handleChange}
          />
          <label htmlFor="aceitarOfertas" className="cadastro_label_checkbox">
            <strong>Comunicações e ofertas exclusivas</strong><br />
            Desejo receber atualizações sobre produtos e eventos relacionados à FURIA.
          </label>
        </div>

        <button type="submit" className="confirmar_button">Salvar</button>

        <p className="cadastro_privacy_text">
          Suas definições de privacidade se aplicam apenas ao projeto FURIA. Para gerenciar suas preferências, consulte as configurações da sua conta.
        </p>
      </form>
    </motion.div>
  );
}

export default Cadastro;
