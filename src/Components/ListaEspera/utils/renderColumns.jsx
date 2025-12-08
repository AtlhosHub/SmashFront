import ActionMenu from '../../DefaultComponents/IconButton';

import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const renderAcoes = ({
    row,
    navigate,
    idToDelete,
    setIsModalDeleteOpen,
}) => (
    <ActionMenu
        menuOptions={[
            {
                label: 'Visualizar',
                icon: <VisibilityIcon fontSize="small" />,
                onClickFunc: () => {
                    navigate('/cadastroInteressado', {
                        state: {
                            idPessoa: row.id,
                            operacao: 'visualizacao'
                        }
                    });
                }
            },
            {
                label: 'Editar',
                icon: <EditIcon fontSize="small" />,
                onClickFunc: () => {
                    navigate('/cadastroInteressado', {
                        state: {
                            idPessoa: row.id,
                            operacao: 'edicao'
                        }
                    });
                }
            },
            {
                label: 'Excluir',
                icon: <DeleteIcon fontSize="small" />,
                onClickFunc: () => {
                    idToDelete.current = row.id;
                    setIsModalDeleteOpen(true);
                }
            },
        ]}
    />
);