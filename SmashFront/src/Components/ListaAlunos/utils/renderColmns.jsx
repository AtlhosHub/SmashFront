import { Tooltip } from '@mui/material';
import ActionMenu from '../../DefaultComponents/IconButton';

import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const renderValor = (row) => (
    row.desconto ? (
        <Tooltip title="Pago com desconto" arrow placement="top">
            <span style={{ color: '#286DA8' }}>{row.valor}</span>
        </Tooltip>
    ) : (
        <span>{row.valor}</span>
    )
);

export const renderAcoes = ({
    row,
    navigate,
    idToDelete,
    setStatusInfoModal,
    setIsModalStatusOpen,
    setIsModalDeleteOpen,
}) => (
    <ActionMenu
        menuOptions={[
            {
                label: 'Visualizar',
                icon: <VisibilityIcon fontSize="small" />,
                onClickFunc: () => navigate('/fichaInscricao', {
                    state: { idAluno: row.id, operacao: 'visualizacao' }
                })
            },
            {
                label: 'Alterar Status',
                icon: <CurrencyExchangeIcon fontSize="small" />,
                onClickFunc: () => {
                    setIsModalStatusOpen(true);
                    setStatusInfoModal({
                        idAluno: row.id,
                        idMensalidade: row.idMensalidade,
                        dataVencimento: row.dataVencimento,
                        nome: row.nome,
                        status: row.status,
                        dataPagamento: row.dataEnvioOriginal,
                        formaPagamento: row.formaPagamento,
                        valor: row.valor,
                    });
                },
                disabled: row.automatico === true,
                disabledLabel: 'Não é possível alterar o status de Pagamentos Automáticos',
            },
            {
                label: 'Editar',
                icon: <EditIcon fontSize="small" />,
                onClickFunc: () => navigate('/fichaInscricao', {
                    state: { idAluno: row.id, operacao: 'edicao' }
                })
            },
            {
                label: 'Excluir',
                icon: <DeleteIcon fontSize="small" />,
                onClickFunc: () => {
                    idToDelete.current = row.id;
                    setIsModalDeleteOpen(true);
                }
            }
        ]}
    />
);