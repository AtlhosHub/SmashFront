import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ListaAlunos } from './Components/ListaAlunos';
import { TelaInicial } from './Components/TelaInicial';
import { TelaLogin } from './Components/TelaLogin';
import { FichaInscricao } from './Components/FichaInscricao';
import { ListaEspera } from './Components/ListaEspera';
import { ControleUsuarios } from './Components/ControleUsuarios';
import { CadastroUsuarios } from './Components/ControleUsuarios/Components/CadastroUsuarios';
import { TelaEsqueciSenha } from './Components/TelaEsqueciSenha';
import { RecuperarSenha } from './Components/TelaEsqueciSenha/RecuperarSenha';
import { Dashboard } from './Components/Dashboard';
import { DefaultHeader } from './Components/DefaultComponents/DefaultHeader';
import { ConfigSistema } from './Components/ConfigSistema';
import { FichaInscricaoProvider } from './Components/FichaInscricao/Components/FichaInscricaoContext';
import { CadastroUsuarioProvider } from './Components/ControleUsuarios/Components/CadastroUsuarioContext';
import { CadastrarInteressado } from './Components/ListaEspera/Components/CadastroInteressado';
import { CadastroInteressadoProvider } from './Components/ListaEspera/Components/CadastroInteressadoContext';

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
                <Route
                    path="/cadastroUsuarios"
                    element={
                        <CadastroUsuarioProvider>
                            <CadastroUsuarios />
                        </CadastroUsuarioProvider>
                    }
                />
                <Route
                    path="/fichaInscricao"
                    element={
                        <FichaInscricaoProvider>
                            <FichaInscricao />
                        </FichaInscricaoProvider>
                    }
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/cadastroInteressado" element={
                    <CadastroInteressadoProvider>
                        <CadastrarInteressado />
                    </CadastroInteressadoProvider>
                }
                />
                <Route path="/config" element={<ConfigSistema />} />
            </Route >
        </Routes >
    );
}

export default App;
