import './App.css'
import { Route, Routes } from 'react-router-dom';
import { ListaAlunos } from './Components/ListaAlunos/ListaAlunos';
import { TelaInicial } from './Components/TelaInicial/TelaInicial';
import { TelaLogin } from './Components/TelaLogin/TelaLogin';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/login" element={<TelaLogin />} />
        <Route path="/alunos" element={<ListaAlunos />} />
      </Routes>
    </>
  )
}

export default App
