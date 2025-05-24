import './App.css'
import { Route, Routes } from 'react-router-dom';
import { ListaAlunos } from './Components/ListaAlunos/ListaAlunos';
import { TelaInicial } from './Components/TelaInicial/TelaInicial';
import { TelaLogin } from './Components/TelaLogin/TelaLogin';
import { FichaInscricao } from './Components/FichaInscricao/FichaInscricao';
import { ListaEspera } from './Components/ListaEspera/ListaEspera';
import { ControleUsuarios } from './Components/ControleUsuarios/ControleUsuarios';
import { CadastroUsuarios } from './Components/ControleUsuarios/CadastroUsuarios';
import { TelaEsqueciSenha } from './Components/TelaEsqueciSenha/TelaEsqueciSenha';
import { RecuperarSenha } from './Components/TelaEsqueciSenha/RecuperarSenha';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { DefaultHeader } from './Components/DefaultComponents/DefaultHeader/DefaultHeader';
import { CadastrarInteressado } from './Components/ListaEspera/CadastrarInteressado';
import ConfigSistema from './pages/ConfigSistema/ConfigSistema';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TelaLogin />} />
      <Route path="/esqueciSenha" element={<TelaEsqueciSenha />} />
      <Route path="/recuperarSenha" element={<RecuperarSenha />} />
      <Route element={<DefaultHeader />}>
        <Route path="/telaInicial" element={<TelaInicial />} />
        <Route path="/alunos" element={<ListaAlunos />} />
        <Route path="/listaEspera" element={<ListaEspera />} />
        <Route path="/controleUsuarios" element={<ControleUsuarios />} />
        <Route path="/cadastroUsuarios" element={<CadastroUsuarios />} />
        <Route path="/fichaInscricao" element={<FichaInscricao />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cadastrarListaEspera" element={<CadastrarInteressado />} />
        <Route path="/config" element={<ConfigSistema />} />
      </Route>
    </Routes>
  )
}

export default App
