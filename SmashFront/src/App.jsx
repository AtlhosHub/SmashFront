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
import { TelaEsqueciSenha2 } from './Components/TelaEsqueciSenha/TelaEsqueciSenha2';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TelaLogin />} />
        <Route path="/esqueciSenha2" element={<TelaEsqueciSenha2/>} />
        <Route path="/telaInicial" element={<TelaInicial />} />
        <Route path="/alunos" element={<ListaAlunos />} />
        <Route path="/listaEspera" element={<ListaEspera />} />
        <Route path="/controleUsuarios" element={<ControleUsuarios />} />
        <Route path="/cadastroUsuarios" element={<CadastroUsuarios />} />
        <Route path="/fichaInscricao" element={<FichaInscricao />} />
        <Route path="/esqueciSenha" element={<TelaEsqueciSenha />} />
      </Routes>
    </>
  )
}

export default App
