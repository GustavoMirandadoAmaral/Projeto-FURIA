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
  const perguntasTexto = {
    jogo: 'Qual lineup da FURIA você mais acompanha?',
    redesSociais: 'Você segue algum jogador da FURIA nas redes sociais?',
    frequencia: 'Com que frequência você assiste os jogos da FURIA?',
    kingsleague: 'Você está acompanhando a Furia FC na Kings League?',
    furiaAdidas: 'Você compraria algum produto da nova parceria FURIA x Adidas?',
    motivoNaoAdidas: 'Por que você marcou a opção "Não"?'
  };

  const agruparRespostas = () => {
    const agrupadas = {};

    for (const [idPergunta, resposta] of Object.entries(respostas)) {
      if (!agrupadas[idPergunta]) {
        agrupadas[idPergunta] = {};
      }
      agrupadas[idPergunta][resposta] = (agrupadas[idPergunta][resposta] || 0) + 1;
    }

    const dadosFicticios = {
      jogo: { 'CS2': 4, 'League of Legends': 5, 'Valorant': 3, 'Rainbow Six Siege': 3 },
      redesSociais: { 'Sim': 2, 'Não': 1 },
      frequencia: { 'Sempre': 2, 'Frequentemente': 5, 'Às vezes': 6, 'Raramente': 4 },
      kingsleague: { 'Sim': 2, 'Não': 2 },
      furiaAdidas: { 'Sim': 3, 'Não': 1 },
      motivoNaoAdidas: { 'Preço alto': 1, 'Não curti os produtos': 2, 'Não sou fã da Adidas': 1, 'Outro motivo': 4 }
    };

    for (const [idPergunta, respostasFalsas] of Object.entries(dadosFicticios)) {
      if (!agrupadas[idPergunta]) {
        agrupadas[idPergunta] = {};
      }

      for (const [resposta, votos] of Object.entries(respostasFalsas)) {
        agrupadas[idPergunta][resposta] = (agrupadas[idPergunta][resposta] || 0) + votos;
      }
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
            <div
              key={idPergunta}
              style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <h3>{perguntasTexto[idPergunta]}</h3>
              <div style={{ width: 700, height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
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
            </div>
          );
        })}
        <button>Retornar para o início</button>
      </div>
    </motion.div>
  );
};

export default Resultados;
