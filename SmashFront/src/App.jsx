import './App.css'
import { ToastContainer } from 'react-toastify';
import { DefaultBreadcrumb } from './Components/DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb';
import { DefaultHeader } from './Components/DefaultComponents/DefaultHeader/DefaultHeader';
import { DefaultTable } from './Components/DefaultComponents/DefaultTable/DefaultTable';
import { Description } from '@mui/icons-material';
import { DefaultCardMenu } from './Components/DefaultComponents/DefaultCardMenu/DefaultCardMenu';
import team from './assets/Team Management.svg';

import { ListaAlunos } from './Components/ListaAlunos/ListaAlunos';

function App() {
  // const [dateRange, setDateRange] = useState([
  //   dayjs().subtract(2, "day"),
  //   dayjs()
  // ])

  // const handleDelete = () => {
  //   toasterMsg("sucess", "Usuário excluído com sucesso!");
  //   setIsModalDeleteOpen(false);
  // }

  return (
    <>
      <ListaAlunos />
      <DefaultCardMenu label={'CONTROLE DE\nUSUÁRIOS'}
        icon = {<img src={team}
          width={100} 
          height={100}/>}
      sidebarcolor='#17778D'/>
    </>
  )
}

export default App
