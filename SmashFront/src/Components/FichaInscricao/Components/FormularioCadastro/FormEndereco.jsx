import { Box, FormControl, TextField, } from "@mui/material"
import { DefaultButton } from "../../../DefaultComponents/DefaultButton/DefaultButton";
import { useRef } from "react";
import { toasterMsg } from "../../../../utils/toasterService";
import { ToastContainer } from "react-toastify";

export const FormEndereco = ({ userInfo, setUserInfo, handleConfirmar }) => {
    const messagemErroCEP = useRef();

    const formatarCep = (valor) => {
        if (!valor) return;
        console.log("bananae")
        const apenasNumeros = valor.replace(/\D/g, "").slice(0, 8);

        if (apenasNumeros.length <= 5) {
            return apenasNumeros;
        }

        return apenasNumeros.slice(0, 5) + '-' + apenasNumeros.slice(5);
    };

    const handleCepChange = async (e) => {
        const valorFormatado = formatarCep(e.target.value);

        const cepNumerico = valorFormatado.replace(/\D/g, "");

        setUserInfo((prev) => ({
            ...prev,
            endereco: {
                cep: valorFormatado,
                logradouro: "",
                numLogradouro: "",
                bairro: "",
                cidade: "",
                estado: ""
            }
        }));

        if (cepNumerico.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cepNumerico}/json/`);
                const data = await response.json();

                if (!data.erro) {
                    setUserInfo({
                        ...userInfo,
                        endereco: {
                            cep: data.cep,
                            logradouro: data.logradouro,
                            numLogradouro: null,
                            bairro: data.bairro,
                            cidade: data.localidade,
                            estado: data.uf
                        }
                    })
                } else {
                    toasterMsg("error", "CEP não encontrado!");
                }
            } catch (error) {
                console.error("Erro ao buscar CEP:", error);
            }
        }
    };

    return (
        <FormControl sx={{ paddingBlock: "30px", pr: "30px", display: "flex", flex: 1, flexDirection: "column" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "20px", width: "100%", color: "black" }}>
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    flexDirection: "row",
                    columnGap: "15px",
                    rowGap: "10px",
                    flex: 1.3,
                    height: "fit-content"
                }}>
                    <Box>
                        <label>CEP <span style={{ color: "red" }}>*</span></label>
                        <TextField
                            required
                            value={formatarCep(userInfo.endereco.cep)}
                            onChange={(e) => {
                                handleCepChange(e)
                            }}
                            maxLength={9}
                            variant="outlined"
                            size="small"
                            sx={{ '& .MuiInputBase-root': {}, width: '100%' }}
                        />
                        <span>{messagemErroCEP.current}</span>
                    </Box>
                    <Box>
                        <label>Número <span style={{ color: "red" }}>*</span></label>
                        <TextField
                            required
                            value={userInfo.endereco.numLogradouro}
                            onChange={(e) => setUserInfo({ ...userInfo, endereco: {...userInfo.endereco, numLogradouro: e.target.value }})}
                            variant="outlined"
                            size="small"
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: '8px'
                                }, width: '100%'
                            }}
                        />
                    </Box>
                    <Box>
                        <label>Rua <span style={{ color: "red" }}>*</span></label>
                        <TextField
                            required
                            disabled
                            value={userInfo.endereco.logradouro}
                            onChange={(e) => setUserInfo({ ...userInfo, rua: e.target.value })}
                            variant="outlined"
                            size="small"
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: '8px',
                                    backgroundColor: "#00000015"
                                }, width: '100%'
                            }}
                        />
                    </Box>
                    <Box>
                        <label>Bairro</label>
                        <TextField
                            disabled
                            value={userInfo.endereco.bairro}
                            onChange={(e) => setUserInfo({ ...userInfo, bairro: e.target.value })}
                            variant="outlined"
                            size="small"
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: '8px',
                                    backgroundColor: "#00000015"
                                }, width: '100%'
                            }}
                        />
                    </Box>
                    <Box>
                        <label>Estado</label>
                        <TextField
                            disabled
                            value={userInfo.endereco.estado}
                            onChange={(e) => setUserInfo({ ...userInfo, estado: e.target.value })}
                            variant="outlined"
                            size="small"
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: '8px',
                                    backgroundColor: "#00000015"
                                }, width: '100%'
                            }}
                        />
                    </Box>
                    <Box>
                        <label>Cidade</label>
                        <TextField
                            disabled
                            value={userInfo.endereco.cidade}
                            onChange={(e) => setUserInfo({ ...userInfo, cidade: e.target.value })}
                            variant="outlined"
                            size="small"
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: '8px',
                                    backgroundColor: "#00000015"
                                }, width: '100%'
                            }}
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: "10px", justifyContent: "end", alignItems: "end", flex: 1 }}>
                    <DefaultButton variant="outlined" label="Cancelar" />
                    <DefaultButton variant="contained" label="Concluir" onClick={handleConfirmar} />
                </Box>
            </Box>
            <ToastContainer></ToastContainer>
        </FormControl>
    )
}