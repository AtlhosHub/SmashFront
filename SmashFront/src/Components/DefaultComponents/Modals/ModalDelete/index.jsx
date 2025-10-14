import React from 'react';
import { DefaultButton } from '../../DefaultButton';
import { DefaultModal } from '../../DefaultModal';
import { Box } from '@mui/material';

export const ModalDelete = ({
    isModalOpen,
    setIsModalOpen,
    handleDelete,
    textoModal
}) => {
    return (
        <DefaultModal modalTitle={'Tem certeza dessa ação?'} isModalOpen={isModalOpen}>
            <p style={{ marginBottom: '15px' }}>Você está prestes a <b>excluir</b> {textoModal}. Os dados serão <b>permanentemente excluídos</b>.</p>
            <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'end' }}>
                <DefaultButton variant="contained" label="Excluir" onClick={handleDelete} />
                <DefaultButton label="Cancelar" onClick={() => { setIsModalOpen(false); }} />
            </Box>
        </DefaultModal>
    );
};