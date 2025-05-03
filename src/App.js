import { Routes, Route } from "react-router-dom";
import { FormProvider } from './context/FormContext'; 
import BemVindo from './components/BemVindo';
import Cadastro from './components/Cadastro';
import UploadDocumentos from './components/UploadDocumentos';
import ConectarRedesSociais from './components/ConectarRedesSociais';
import TelaFinal from './components/TelaFinal';
import ValidacaoIA from './components/ValidacaoIA';

function App() {
  return (
    <FormProvider>
      <Routes>
        <Route path="/" element={<BemVindo />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/documentos" element={<UploadDocumentos />} />
        <Route path="/validacao-ia" element={<ValidacaoIA />} />
        <Route path="/redes" element={<ConectarRedesSociais />} />
        <Route path="/final" element={<TelaFinal />} />
      </Routes>
    </FormProvider>
  );
}

export default App;
