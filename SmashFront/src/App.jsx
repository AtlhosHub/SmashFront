import './App.css'
import { useState } from 'react';
import { ModalDelete } from './Components/Modals/ModalDelete/ModalDelete';
import { DefaultButton } from './Components/DefaultComponents/DefaultButton/DefaultButton';
import { toasterMsg } from './utils/toasterService';
import { ToastContainer } from 'react-toastify';
import { Box } from '@mui/material';
import { ModalQuit } from './Components/Modals/ModalQuit/ModalQuit';

function App() {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalSaveOpen, setIsModalSaveOpen] = useState(false);

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
      </Box>

      <ModalDelete
        isModalOpen={isModalDeleteOpen}
        setIsModalOpen={setIsModalDeleteOpen}
        handleDelete={handleDelete}
      />
      <ModalQuit
        isModalOpen={isModalSaveOpen}
        setIsModalOpen={setIsModalSaveOpen}
        handleQuit={() => {setIsModalSaveOpen(false)}}
      />
      <ToastContainer />
    </>
  )
}

export default App
