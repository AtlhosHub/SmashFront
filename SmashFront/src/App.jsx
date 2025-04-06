import './App.css'
import { ToastContainer } from 'react-toastify';
import { DefaultBreadcrumb } from './Components/DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb';
import { DefaultHeader } from './Components/DefaultComponents/DefaultHeader/DefaultHeader';

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
      <ToastContainer />
    </>
  )
}

export default App
