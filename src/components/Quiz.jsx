import React, { useState, useEffect } from 'react';
import "../styles/Style.css";
import { motion } from "framer-motion";
import lineUp from '../assets/images/lineUp.png';
import fallen from '../assets/images/fallen.png';
import timeFuria from '../assets/images/timeFuria.png';
import kingsLeague from '../assets/images/kingsLeague.png';
import furiaAdidas1 from '../assets/images/furiaAdidas1.png';
import furiaAdidas2 from '../assets/images/furiaAdidas2.png';


const Quiz = ({ onFinalizar }) => {
  const [respostas, setRespostas] = useState({});
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [perguntasExtras, setPerguntasExtras] = useState([]);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);

  const perguntas = [
    {
      id: 'jogo',
      texto: 'Qual lineup da FURIA você mais acompanha?',
      opcoes: ['CS2', 'League of Legends', 'Valorant', 'Rainbow Six Siege']
    },
    {
      id: 'redesSociais',
      texto: 'Você segue algum jogador que está atuando na FURIA nas redes sociais?',
      opcoes: ['Sim', 'Não']
    },
    {
      id: 'frequencia',
      texto: 'Com que frequência você assiste os jogos da FURIA?',
      opcoes: ['Sempre', 'Frequentemente', 'Às vezes', 'Raramente']
    },
    {
      id: 'kingsleague',
      texto: 'Você está acompanhando a Furia FC na Kings League?',
      opcoes: ['Sim', 'Não']
    },
    {
      id: 'furiaAdidas',
      texto: 'Você compraria algum produto da nova parceria FURIA x Adidas?',
      opcoes: ['Sim', 'Não']
    }
  ];

  const perguntaCondicional = {
    id: 'motivoNaoAdidas',
    texto: 'Por que você marcou a opção "Não"?',
    opcoes: ['Preço alto', 'Não curti os produtos', 'Não sou fã da Adidas', 'Outro motivo']
  };

  const imagensPorPergunta = {
    jogo: lineUp,
    redesSociais: fallen,
    frequencia: timeFuria,
    kingsleague: kingsLeague,
    furiaAdidas: furiaAdidas1,
    motivoNaoAdidas: furiaAdidas2
  };
  

  const todasPerguntas = [...perguntas, ...perguntasExtras];
  const pergunta = todasPerguntas[perguntaAtual];
  const imagemAtual = imagensPorPergunta[pergunta?.id] || "../assets/Images/default.png";

  useEffect(() => {
    if (
      perguntasExtras.length === 1 &&
      perguntaAtual === perguntas.length - 1
    ) {
      setPerguntaAtual(perguntaAtual + 1);
    }
  }, [perguntasExtras]);

  const confirmarResposta = () => {
    const novasRespostas = { ...respostas, [pergunta.id]: respostaSelecionada };
    setRespostas(novasRespostas);

    if (pergunta.id === 'furiaAdidas' && respostaSelecionada === 'Não') {
      setPerguntasExtras([perguntaCondicional]);
    } else if (perguntaAtual + 1 < todasPerguntas.length) {
      setPerguntaAtual(perguntaAtual + 1);
    } else {
      onFinalizar(novasRespostas);
    }

    setRespostaSelecionada(null);
  };

  return (
    <motion.div
      className="quiz-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <div className="quiz-container">
        <h2 className="titulo-quiz">{pergunta.texto}</h2>

        <img
  src={imagensPorPergunta[pergunta.id]}
  alt="Imagem da pergunta"
  className="imagem-pergunta"
/>


        <div className="opcoes">
          {pergunta.opcoes.map((opcao, index) => (
            <button
              key={index}
              onClick={() => setRespostaSelecionada(opcao)}
              className={`quiz-button ${respostaSelecionada === opcao ? 'selecionada' : ''}`}
            >
              {opcao}
            </button>
          ))}
        </div>

        <button
          className="confirmar-button"
          onClick={confirmarResposta}
          disabled={!respostaSelecionada}
        >
          Confirmar
        </button>
      </div>
    </motion.div>
  );
};

export default Quiz;
