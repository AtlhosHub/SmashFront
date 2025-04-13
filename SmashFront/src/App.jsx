import './App.css'
import { ToastContainer } from 'react-toastify';
import { DefaultBreadcrumb } from './Components/DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb';
import { DefaultHeader } from './Components/DefaultComponents/DefaultHeader/DefaultHeader';
import { DefaultTable } from './Components/DefaultComponents/DefaultTable/DefaultTable';
import { Description } from '@mui/icons-material';
import { DefaultCardMenu } from './Components/DefaultComponents/DefaultCardMenu/DefaultCardMenu';
import team from './assets/Team Management.svg';


function App() {
  // const [dateRange, setDateRange] = useState([
  //   dayjs().subtract(2, "day"),
  //   dayjs()
  // ])

  // const handleDelete = () => {
  //   toasterMsg("sucess", "Usuário excluído com sucesso!");
  //   setIsModalDeleteOpen(false);
  // }
  const headCells = [
    {
      name: "nomeAluno",
      description: "Nome do Aluno"
    },
    {
      name: "dtEnvio",
      description: "Data de Envio"
    }
  ]

  const rowData = [
    {
      statusAluno: true,
      nomeAluno: "Carolina Timoteo Teixeira de Camargo",
      dtEnvio: "02/03/25 - 15:59",
      statusComprovante: "Enviado"
    },
    {
      statusAluno: false,
      nomeAluno: "Cauã Gouvea do Nascimento",
      dtEnvio: "02/03/25 - 15:59",
      statusComprovante: "Pendente"
    },
    {
      statusAluno: false,
      nomeAluno: "Juliana Murakami Oshikawa",
      dtEnvio: "02/03/25 - 15:59",
      statusComprovante: "Atrasado"
    }
  ]

  return (
    <>
      <DefaultTable
        headCells={headCells}
        rowData={rowData}
        withStatus={true}
      />
      <ToastContainer />
      <DefaultCardMenu label={'CONTROLE DE\nUSUÁRIOS'}
        icon = {<img src={team}
          width={100} 
          height={100}/>}
      sidebarcolor='#17778D'/>
    </>
  )
}

export default App
