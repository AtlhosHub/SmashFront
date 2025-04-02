import './App.css'
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { ModalDelete } from './Components/Modals/ModalDelete/ModalDelete';
import { DefaultButton } from './Components/DefaultComponents/DefaultButton/DefaultButton';
import { toasterMsg } from './utils/toasterService';
import { ModalQuit } from './Components/Modals/ModalQuit/ModalQuit';
import DefaultFilter from './Components/DefaultComponents/DefaultFilter/DefaultFilter';
import { Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';

function App() {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalSaveOpen, setIsModalSaveOpen] = useState(false);
  const [statusPagamento, setStatusPagamento] = useState("")
  const [statusPresenca, setStatusPresenca] = useState("")
  const [horarioPref, setHorarioPref] = useState([])
  const [data, setData] = useState("")

  const handleDelete = () => {
    toasterMsg("sucess", "Usuário excluído com sucesso!");
    setIsModalDeleteOpen(false);
  }

  const handleSave = () => {
    toasterMsg("sucess", "Ficha cadastrado com sucesso!");
    setIsModalSaveOpen(false);
  }

  return (
    <>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <DefaultButton
          label="excluir"
          onClick={() => { setIsModalDeleteOpen(true) }}
          variant='contained'
        />
        <DefaultButton
          label="sair"
          onClick={() => { setIsModalSaveOpen(true) }}
          variant='contained'
        />
        <DefaultFilter
          setStatusPagamento={setStatusPagamento}
          setStatusPresenca={setStatusPresenca}
          setHorarioPref={setHorarioPref}
          setData={setData}
        />
        <DefaultButton
          label="exportar"
          variant='contained'
          endIcon={<DownloadIcon />}
        />
        <DefaultButton
          label="novo cadastro"
          variant='contained'
          endIcon={<AddIcon />}
        />
      </Box>

      <ModalDelete
        isModalOpen={isModalDeleteOpen}
        setIsModalOpen={setIsModalDeleteOpen}
        handleDelete={handleDelete}
      />
      <ModalQuit
        isModalOpen={isModalSaveOpen}
        setIsModalOpen={setIsModalSaveOpen}
        handleQuit={() => { setIsModalSaveOpen(false) }}
      />
      <ToastContainer />
    </>
  )
}

export default App
