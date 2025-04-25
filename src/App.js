  import React, { useState } from "react";
  import BemVindo from "./components/BemVindo";
  import Quiz from "./components/Quiz";
  import Resultados from "./components/Resultados";
  import { AnimatePresence } from "framer-motion";

  const App = () => {
    const [telaAtual, setTelaAtual] = useState('bemVindo');
    const [respostas, setRespostas] = useState(null); // <-- isso aqui tem que vir antes do uso de 'respostas'

    const iniciarQuiz = () => {
      setTelaAtual('quiz');
    };

    const finalizarQuiz = (respostasFinais) => {
      setRespostas(respostasFinais);
      setTelaAtual('resultado');
    };
    
    return (
      <>
        <AnimatePresence mode="wait">
          {telaAtual === "bemVindo" && (
            <BemVindo key="bemVindo" onStart={iniciarQuiz} />
          )}

          {telaAtual === "quiz" && (
            <Quiz key="quiz" onFinalizar={finalizarQuiz} />
          )}

          {telaAtual === "resultado" && (
            <Resultados
              key="resultado"
              respostas={respostas} // <-- agora vai funcionar
              onReiniciar={() => setTelaAtual("bemVindo")}
            />
          )}
        </AnimatePresence>
      </>
    );
  };


  export default App;