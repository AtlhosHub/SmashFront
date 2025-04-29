import './App.css'
import { Route, Routes } from 'react-router-dom';
import { ListaAlunos } from './Components/ListaAlunos/ListaAlunos';
import { TelaInicial } from './Components/TelaInicial/TelaInicial';
import { TelaLogin } from './Components/TelaLogin/TelaLogin';
import { FichaInscricao } from './Components/FichaInscricao/FichaInscricao';
import { ControleUsuarios } from './Components/ControleUsuarios/ControleUsuarios';
import { CadastroUsuarios } from './Components/ControleUsuarios/CadastroUsuarios';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TelaLogin />} />
        <Route path="/telaInicial" element={<TelaInicial />} />
        <Route path="/alunos" element={<ListaAlunos />} />
        <Route path="/cadastrarAluno" element={<FichaInscricao />} />
        <Route path="/controleUsuarios" element={<ControleUsuarios />} />
        <Route path="/cadastroUsuarios" element={<CadastroUsuarios />} />
      </Routes>
    </>
  )
}

export default App
