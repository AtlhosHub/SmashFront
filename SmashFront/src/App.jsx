import './App.css'
import { Route, Routes } from 'react-router-dom';
import { ListaAlunos } from './Components/ListaAlunos/ListaAlunos';
import { TelaInicial } from './Components/TelaInicial/TelaInicial';
import { TelaLogin } from './Components/TelaLogin/TelaLogin';
import { FichaInscricao } from './Components/FichaInscricao/FichaInscricao';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TelaLogin />} />
        <Route path="/telaInicial" element={<TelaInicial />} />
        <Route path="/alunos" element={<ListaAlunos />} />
        <Route path="/cadastrarAluno" element={<FichaInscricao />} />
      </Routes>
    </>
  )
}

export default App
