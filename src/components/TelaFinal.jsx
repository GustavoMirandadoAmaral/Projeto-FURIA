import React, { useEffect, useState } from 'react';
import { useForm } from "../context/FormContext";
import Header from "../components/Header";
import '../styles/StyleTelaFinal.css';

const TelaFinal = () => {
  const { formulario } = useForm();
  const jogosSelecionados = formulario.jogosFuria || [];

  const [recomendacoes, setRecomendacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarRecomendacoes = async () => {
      try {
        const response = await fetch("http://localhost:8000/recomendar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jogos: jogosSelecionados }),
        });

        const data = await response.json();
        console.log(data); 
        
        if (Array.isArray(data.recomendacoes)) {
          setRecomendacoes(data.recomendacoes);
        } else {
          setRecomendacoes([]);  
        }
      } catch (error) {
        console.error("Erro ao buscar recomendações:", error);
        setRecomendacoes([]);  
      } finally {
        setCarregando(false);
      }
    };

    if (jogosSelecionados.length > 0) {
      buscarRecomendacoes();
    } else {
      setRecomendacoes("Você não selecionou nenhum jogo.");
      setCarregando(false);
    }
  }, [jogosSelecionados]);

  return (
    <div className="tela_final_container">
      <Header rotaAnterior="/redes" />
      <h2 className="titulo_final">Obrigado por se conectar com a FURIA!</h2>

      {carregando ? (
        <p className="texto_final">Carregando recomendações da IA...</p>
      ) : (
        <div className="texto_final">
          {typeof recomendacoes === "string" ? (
            <p className="mensagem_nenhum">{recomendacoes}</p>
          ) : (
            <ul className="recomendacoes_lista">
              {recomendacoes.length > 0 ? (
                recomendacoes.map((rec, i) => (
                  <li key={i}>
                    <strong>{rec.nome}</strong> – {rec.tipo} ({rec.jogo})
                  </li>
                ))
              ) : (
                <p className="mensagem_nenhum">Não há recomendações disponíveis.</p>
              )}
            </ul>
          )}
        </div>
      )}

      <button className="final_button" onClick={() => window.location.href = '/'}>
        Voltar para a página inicial
      </button>
    </div>
  );
};

export default TelaFinal;
