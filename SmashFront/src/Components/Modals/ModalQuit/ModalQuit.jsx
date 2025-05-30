import { DefaultButton } from "../../DefaultComponents/DefaultButton/DefaultButton"
import { DefaultModal } from "../../DefaultComponents/DefaultModal/DefaultModal"
import { Box } from "@mui/material"

export const ModalQuit = ({
    isModalOpen,
    setIsModalOpen,
    handleQuit
}) => {
    return (
        <DefaultModal modalTitle={"Tem certeza dessa ação?"} isModalOpen={isModalOpen}>
            <p style={{ marginBottom: "10px" }}>Se você sair agora as alterações <b>não serão salvas</b>.</p>
            <Box sx={{ display: "flex", gap: "10px", justifyContent: "end" }}>
                <DefaultButton variant="contained" label="Sair" onClick={handleQuit} />
                <DefaultButton label="Cancelar" onClick={() => { setIsModalOpen(false) }} />
            </Box>
        </DefaultModal>
    )
}