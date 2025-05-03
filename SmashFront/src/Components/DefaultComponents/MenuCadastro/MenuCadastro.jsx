import { Badge, Box } from '@mui/material';
import { Check } from '@mui/icons-material';
import './MenuCadastro.css';

export const MenuCadastro = ({ operacao, tabAtiva, setTabAtiva, etapas }) => {
    const getMenuItemClass = ({ operacao, tabAtiva, idTab, tabAnteriorConcluida, tabAtualConcluida }) => {
        if (operacao === "cadastro") {
            if (tabAtualConcluida && tabAnteriorConcluida) return "menu-cadastro-item concluido";
            if (tabAtiva === idTab) return "menu-cadastro-item ativo-cadastro";
            if (tabAnteriorConcluida) return "menu-cadastro-item";
            return "menu-cadastro-item desativado";
        }

        if (operacao === "visualizacao" || operacao === "edicao") {
            return tabAtiva === idTab
                ? "menu-cadastro-item ativo-visu"
                : "menu-cadastro-item ocioso";
        }

        return "menu-cadastro-item";
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "row", pl: "30px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "5px", pt: "35px" }}>
                {etapas.map((etapa, index) => {
                    const {
                        id,
                        nome,
                        Icone,
                        visivel = true,
                        concluido,
                        podeAtivar = () => true,
                    } = etapa;

                    const tabAnteriorConcluida = index === 0 ? true : etapas[index - 1].concluido;
                    const classe = getMenuItemClass({
                        operacao,
                        tabAtiva,
                        idTab: id,
                        tabAnteriorConcluida,
                        tabAtualConcluida: concluido
                    });

                    if (!visivel) return null;

                    return (
                        <Box
                            key={id}
                            className={classe}
                            onClick={() => {
                                if (operacao === "cadastro" && !podeAtivar(etapas)) return;
                                setTabAtiva(id);
                            }}
                        >
                            {operacao === "cadastro" && concluido && tabAnteriorConcluida ? (
                                <Badge badgeContent={<Check />}>
                                    <Icone />
                                </Badge>
                            ) : (
                                <Icone />
                            )}
                            <span>{nome}</span>
                        </Box>
                    );
                })}
            </Box>
            <Box sx={{ width: "1px", backgroundColor: "#00000070", marginInline: "30px" }} />
        </Box>
    );
};
