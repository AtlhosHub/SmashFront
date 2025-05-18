import { DefaultHeader } from "../DefaultComponents/DefaultHeader/DefaultHeader";
import React from 'react';
import { DefaultCardMenu } from '../DefaultComponents/DefaultCardMenu/DefaultCardMenu';
import mensalidadeIcon from '../../assets/mensalidade.svg';
import registrationIcon from '../../assets/registration.svg';
import waitingListIcon from '../../assets/waitinglist.svg';
import settingsIcon from '../../assets/settings.svg';
import dashIcon from '../../assets/chart.svg';
import team from '../../assets/Team Management.svg';
import { tokenValidationFunction } from "../../utils/tokenValidationFunction";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from "@mui/material";


export const TelaInicial = () => {
    const cards = [
        {
            label: "MENSALIDADE",
            sidebarcolor: "#FFAE03",
            rota: "/alunos",
            icon: <img src={mensalidadeIcon} width={70} height={70} alt="Mensalidade" />
        },
        {
            label: "FICHA DE INSCRIÇÃO",
            sidebarcolor: "#17778D",
            rota: "/fichaInscricao",
            icon: <img src={registrationIcon} width={70} height={68} alt="Ficha de Inscrição" />
        },
        {
            label: "LISTA DE ESPERA",
            sidebarcolor: "#FFAE03",
            rota: "/listaEspera",
            icon: <img src={waitingListIcon} width={70} height={70} alt="Lista de Espera" />
        },
        {
            label: "DASHBOARD",
            sidebarcolor: "#17778D",
            rota: "/dashboard",
            icon: <img src={dashIcon} width={65} height={70} alt="Dashboard" />
        },
        {
            label: "CONTROLE DE USUÁRIOS",
            sidebarcolor: "#FFAE03",
            rota: "/controleUsuarios",
            icon: <img src={team} width={70} height={70} alt="Controle de Usuários" />
        },
        {
            label: "CONFIGURAÇÕES DO SISTEMA",
            sidebarcolor: "#17778D",
            rota: "/config",
            icon: <img src={settingsIcon} width={70} height={70} alt="Config" />
        },
    ];

    const navigate = useNavigate();
    useEffect(() => {
        const validateToken = async () => {
            const isValid = await tokenValidationFunction();
            if (!isValid) {
                navigate("/", { state: { tokenLogout: true } });
            }
        };

        validateToken();
    }, []);

    return (
        <Box style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 64px)",
            padding: "24px",
            boxSizing: "border-box",
        }}>
            <Box style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
                justifyContent: "center",
            }}>
                {cards.map((card, index) => (
                    <DefaultCardMenu
                        key={index}
                        label={card.label}
                        sidebarcolor={card.sidebarcolor}
                        rota={card.rota}
                        icon={card.icon}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default TelaInicial;