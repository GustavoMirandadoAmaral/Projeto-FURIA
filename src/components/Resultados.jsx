import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid   
} from 'recharts';
import { motion } from "framer-motion";


const Resultados = ({ respostas }) => {
  // Mapeia as perguntas e textos para exibição mais legível
  const perguntasTexto = {
    jogo: 'Qual lineup da FURIA você mais acompanha?',
    redesSociais: 'Você segue algum jogador da FURIA nas redes sociais?',
    frequencia: 'Com que frequência você assiste os jogos da FURIA?',
    kingsleague: 'Você está acompanhando a Furia FC na Kings League?',
    furiaAdidas: 'Você compraria algum produto da nova parceria FURIA x Adidas?',
    motivoNaoAdidas: 'Por que você marcou a opção "Não"?'
  };

  // Conta respostas por pergunta
  const agruparRespostas = () => {
    const agrupadas = {};

    for (const [idPergunta, resposta] of Object.entries(respostas)) {
      if (!agrupadas[idPergunta]) {
        agrupadas[idPergunta] = {};
      }
      agrupadas[idPergunta][resposta] = (agrupadas[idPergunta][resposta] || 0) + 1;
    }

    return agrupadas;
  };

  const dadosAgrupados = agruparRespostas();

  return (
    <motion.div
      className="bem-vindo-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
    <div className="resultados-container">
      <h2>Resultados do Quiz</h2>

      {Object.entries(dadosAgrupados).map(([idPergunta, contagemRespostas]) => {
        const dadosGrafico = Object.entries(contagemRespostas).map(([resposta, Votos]) => ({
          resposta,
          Votos
        }));

        return (
          <div key={idPergunta} style={{ marginBottom: '40px' }}>
            <h3>{perguntasTexto[idPergunta]}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dadosGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
          dataKey="resposta" 
          stroke="#ffffff" 
          tick={{ fill: '#ffffff', fontSize: 14 }} 
        />
                <YAxis 
                allowDecimals={false}
          stroke="#ffffff" 
          tick={{ fill: '#ffffff', fontSize: 14 }} 
        />
                <Tooltip />
                <Bar dataKey="Votos" fill="#817d4e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      })}
      <button>Retornar para o início</button>
    </div>
        </motion.div>
  );
};

export default Resultados;