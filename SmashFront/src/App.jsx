import './App.css'
import { Route, Routes } from 'react-router-dom';
import { ListaAlunos } from './Components/ListaAlunos/ListaAlunos';
import { TelaInicial } from './Components/TelaInicial/TelaInicial';
import { TelaLogin } from './Components/TelaLogin/TelaLogin';
import { FichaInscricao } from './Components/FichaInscricao/FichaInscricao';
import { TelaEsqueciSenha } from './Components/TelaEsqueciSenha/TelaEsqueciSenha';
import {TelaEsqueciSenha2} from './Components/TelaEsqueciSenha/TelaEsqueciSenha2';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TelaLogin />} />
        <Route path="/esqueciSenha2" element={<TelaEsqueciSenha2/>} />
        <Route path="/telaInicial" element={<TelaInicial />} />
        <Route path="/alunos" element={<ListaAlunos />} />
        <Route path="/cadastrarAluno" element={<FichaInscricao />} />
        <Route path="/esqueciSenha" element={<TelaEsqueciSenha />} />
      </Routes>
    </>
  )
}

export default App
