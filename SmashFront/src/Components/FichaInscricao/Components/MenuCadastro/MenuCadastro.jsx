import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import { Badge, Box } from '@mui/material';
import './MenuCadastro.css';
import { Check } from '@mui/icons-material';
import HistoryIcon from '@mui/icons-material/History';

export const MenuCadastro = ({
    infoConcluido,
    enderecoConcluido,
    respConcluido,
    tabAtiva,
    setTabAtiva,
    maiorIdade,
    operacao
}) => {

    const getMenuItemClass = ({ operacao, tabAtiva, idTab, tabAnteriorConcluida, tabAtualConcluida }) => {
        if (operacao === "cadastro") {
            if (tabAtualConcluida && tabAnteriorConcluida) {
                return "menu-cadastro-item concluido";
            }
            if (tabAtiva === idTab) {
                return "menu-cadastro-item ativo-cadastro";
            }
            if (tabAnteriorConcluida) {
                return "menu-cadastro-item";
            }
            return "menu-cadastro-item desativado";
        }

        if (operacao === "visualizacao") {
            return tabAtiva === idTab
                ? "menu-cadastro-item ativo-visu"
                : "menu-cadastro-item ocioso";
        }

        return "menu-cadastro-item";
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "row", pl: "30px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "5px", pt: "35px" }}>
                <Box
                    className={getMenuItemClass({
                        operacao,
                        tabAtiva,
                        idTab: "info",
                        tabAnteriorConcluida: infoConcluido,
                        tabAtualConcluida: infoConcluido
                    })}
                    onClick={() => setTabAtiva("info")}
                >
                    {operacao === "cadastro" && infoConcluido ? (
                        <Badge badgeContent={<Check />}>
                            <AccountCircleOutlinedIcon />
                        </Badge>
                    ) : (
                        <AccountCircleOutlinedIcon />
                    )}
                    <span>Informações</span>
                </Box>
                <Box
                    className={getMenuItemClass({
                        operacao,
                        tabAtiva,
                        idTab: "ende",
                        tabAnteriorConcluida: infoConcluido,
                        tabAtualConcluida: enderecoConcluido
                    })}
                    onClick={() => {
                        operacao === "cadastro"
                            ? infoConcluido && setTabAtiva("ende")
                            : setTabAtiva("ende")
                    }}
                >
                    {operacao === "cadastro" && enderecoConcluido && infoConcluido ? (
                        <Badge badgeContent={<Check />}>
                            <FmdGoodOutlinedIcon />
                        </Badge>
                    ) : (
                        <FmdGoodOutlinedIcon />
                    )}
                    <span>Endereço</span>
                </Box>
                <Box
                    className={getMenuItemClass({
                        operacao,
                        tabAtiva,
                        idTab: "resp",
                        tabAnteriorConcluida: enderecoConcluido,
                        tabAtualConcluida: respConcluido
                    })}
                    sx={{ display: maiorIdade ? "none" : "flex" }}
                    onClick={() => {
                        operacao === "cadastro"
                            ? infoConcluido && enderecoConcluido && setTabAtiva("resp")
                            : setTabAtiva("resp")
                    }}
                >
                    {operacao === "cadastro" && respConcluido && enderecoConcluido && infoConcluido ? (
                        <Badge badgeContent={<Check />}>
                            <FamilyRestroomIcon />
                        </Badge>
                    ) : (
                        <FamilyRestroomIcon />
                    )}
                    <span>Responsável</span>
                </Box>
                {operacao !== "cadastro" && (
                    <Box
                        className={getMenuItemClass({
                            operacao,
                            tabAtiva,
                            idTab: "paga",
                            tabAnteriorConcluida: infoConcluido,
                            tabAtualConcluida: true
                        })}
                        onClick={() => setTabAtiva("paga")}
                    >
                        <HistoryIcon />
                        <span>Histórico de Pagamento</span>
                    </Box>
                )}
            </Box>
            <Box sx={{ width: "1px", backgroundColor: "#00000070", marginInline: "30px" }} />
        </Box>
    );
}