import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import BemVindo from './components/BemVindo';
import Cadastro from './components/Cadastro';
import UploadDocumentos from './components/UploadDocumentos';
import ConectarRedesSociais from './components/ConectarRedesSociais';
import EnviarLinksEsports from './components/EnviarLinksEsports';
import TelaFinal from './components/TelaFinal';
import './styles/Style.css';

function App() {
  const [etapa, setEtapa] = useState(0);
  const [formulario, setFormulario] = useState({
    nome: '',
    cpf: '',
    endereco: '',
    interesses: '',
    atividades: '',
    aceitarOfertas: false,
    documentos: [],
    redesSociais: [],
    linksEsports: []
  });

  const proximaEtapa = () => setEtapa((prev) => prev + 1);
  const etapaAnterior = () => setEtapa((prev) => prev - 1);

  const atualizarFormulario = (novosDados) => {
    setFormulario((prev) => ({
      ...prev,
      ...novosDados
    }));
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {etapa === 0 && (
          <BemVindo
            key="bemvindo"
            proximaEtapa={proximaEtapa}
          />
        )}
        {etapa === 1 && (
          <Cadastro
            key="cadastro"
            formulario={formulario}
            atualizarFormulario={atualizarFormulario}
            proximaEtapa={proximaEtapa}
          />
        )}
        {etapa === 2 && (
          <UploadDocumentos
            key="uploaddocumentos"
            formulario={formulario}
            atualizarFormulario={atualizarFormulario}
            proximaEtapa={proximaEtapa}
            etapaAnterior={etapaAnterior}
          />
        )}
        {etapa === 3 && (
          <ConectarRedesSociais
            key="conectarredes"
            formulario={formulario}
            atualizarFormulario={atualizarFormulario}
            proximaEtapa={proximaEtapa}
            etapaAnterior={etapaAnterior}
          />
        )}
        {etapa === 4 && (
          <EnviarLinksEsports
            key="enviarlinks"
            formulario={formulario}
            atualizarFormulario={atualizarFormulario}
            proximaEtapa={proximaEtapa}
            etapaAnterior={etapaAnterior}
          />
        )}
        {etapa === 5 && (
          <TelaFinal
            key="telafinal"
            formulario={formulario}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
