import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import { Badge, Box } from '@mui/material';
import './MenuCadastro.css';
import { Check } from '@mui/icons-material';

export const MenuCadastro = ({ infoConcluido, enderecoConcluido, tabAtiva, setTabAtiva, maiorIdade }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "row", pl: "30px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "5px", pt: "35px" }}>
                <Box
                    className={infoConcluido
                        ? "menu-cadastro-item concluido"
                        : tabAtiva === "info"
                            ? "menu-cadastro-item ativo"
                            : "menu-cadastro-item"
                    }
                    onClick={() => setTabAtiva("info")}
                >
                    {infoConcluido ? (
                        <Badge badgeContent={<Check />}>
                            <AccountCircleOutlinedIcon />
                        </Badge>
                    ) : (
                        <AccountCircleOutlinedIcon />
                    )}
                    <span>Informações</span>
                </Box>
                <Box
                    className={enderecoConcluido
                        ? "menu-cadastro-item concluido"
                        : tabAtiva === "ende"
                            ? "menu-cadastro-item ativo"
                            : infoConcluido
                                ? "menu-cadastro-item"
                                : "menu-cadastro-item desativado"}
                    onClick={() => infoConcluido && setTabAtiva("ende")}
                >
                    {enderecoConcluido ? (
                        <Badge badgeContent={<Check />}>
                            <FmdGoodOutlinedIcon />
                        </Badge>
                    ) : (
                        <FmdGoodOutlinedIcon />
                    )}
                    <span>Endereço</span>
                </Box>
                <Box
                    className={maiorIdade ? "menu-cadastro-item desativado" : tabAtiva === "resp" ? "menu-cadastro-item ativo" : "menu-cadastro-item"}
                    onClick={() => { if (!maiorIdade) setTabAtiva("resp") }}
                >
                    <FamilyRestroomIcon />
                    <span>Responsável</span>
                </Box>
            </Box>
            <Box sx={{ width: "1px", backgroundColor: "#00000070", marginInline: "30px" }} />
        </Box>
    );
}