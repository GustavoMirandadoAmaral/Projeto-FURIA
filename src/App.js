import { Routes, Route } from "react-router-dom";
import { FormProvider } from './context/FormContext'; // importe o provider
import BemVindo from './components/BemVindo';
import Cadastro from './components/Cadastro';
import UploadDocumentos from './components/UploadDocumentos';
import ConectarRedesSociais from './components/ConectarRedesSociais';
import TelaFinal from './components/TelaFinal';

function App() {
  return (
    <FormProvider>
      <Routes>
        <Route path="/" element={<BemVindo />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/documentos" element={<UploadDocumentos />} />
        <Route path="/redes" element={<ConectarRedesSociais />} />
        <Route path="/final" element={<TelaFinal />} />
      </Routes>
    </FormProvider>
  );
}

export default App;
