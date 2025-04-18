import { Box, FormControl, TextField, Tooltip, Typography } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers-pro"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import HelpIcon from '@mui/icons-material/Help';
import dayjs from "dayjs";

export const FormularioCadastro = ({ userInfo, setUserInfo, setMaiorIdade }) => {

    const nomeSocialText = "Nome social é o nome em que o(a) aluno(a) prefere ser chamado, diferente do seu nome legal."

    const isMaiorDeIdade = (dataNascimento) => {
        const hoje = new Date();
        const nascimento = dayjs(dataNascimento).toDate();
        const idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        const dia = hoje.getDate() - nascimento.getDate();

        if (mes < 0 || (mes === 0 && dia < 0)) {
            return idade - 1 >= 18;
        }

        setMaiorIdade(idade >= 18);
    }

    const formatarTelefone = (valor) => {
        const numeros = valor.replace(/\D/g, '');

        if (numeros.length <= 10) {
            return numeros.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else {
            return numeros.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
        }
    };

    return (
        <FormControl sx={{ paddingBlock: "30px", pr: "30px", display: "flex", flex: 1, flexDirection: "column" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "20px", width: "100%", color: "black" }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1.3, height: "fit-content" }}>
                    <Box>
                        <label>Nome do Aluno <span style={{ color: "red" }}>*</span></label>
                        <TextField
                            required
                            value={userInfo.nome}
                            onChange={(e) => setUserInfo({ ...userInfo, nome: e.target.value })}
                            variant="outlined"
                            size="small"
                            sx={{ '& .MuiInputBase-root': { borderRadius: '8px' }, width: '100%' }}
                        />
                    </Box>

                    <Box>
                        <label
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px"
                            }}
                        >
                            Nome Social
                            <Tooltip
                                title={<Typography sx={{ fontSize: '14px' }}>{nomeSocialText}</Typography>}
                                placement="right"
                                arrow
                            >
                                <HelpIcon
                                    sx={{
                                        marginTop: "1px",
                                        color: "#286DA8",
                                        fontSize: "18px"
                                    }}
                                />
                            </Tooltip>
                        </label>
                        <TextField
                            value={userInfo.nomeSocial}
                            onChange={(e) => setUserInfo({ ...userInfo, nomeSocial: e.target.value })}
                            variant="outlined"
                            size="small"
                            sx={{ '& .MuiInputBase-root': { borderRadius: '8px' }, width: '100%' }}
                        />
                    </Box>

                    <Box display={"flex"} gap={2}>
                        <Box sx={{ width: '100%' }}>
                            <label>Data de Nascimento <span style={{ color: "red" }}>*</span></label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    size="small"
                                    value={userInfo.dtNascimento ? dayjs(userInfo.dtNascimento) : null}
                                    onChange={(newValue) => {
                                        isMaiorDeIdade(newValue)
                                        setUserInfo({ ...userInfo, dtNascimento: newValue });
                                    }}
                                    slotProps={{ textField: { size: 'small', placeholder: 'DD/MM/AAAA' } }}
                                    sx={{
                                        width: "100%",
                                        '& .MuiInputBase-root': { borderRadius: '8px' },
                                    }}
                                />
                            </LocalizationProvider>
                        </Box>

                        <Box sx={{ width: '100%' }}>
                            <label>Gênero</label>
                            <TextField
                                value={userInfo.genero}
                                onChange={(e) => setUserInfo({ ...userInfo, genero: e.target.value })}
                                variant="outlined"
                                size="small"
                                sx={{ '& .MuiInputBase-root': { borderRadius: '8px' }, width: '100%' }}
                            />
                        </Box>
                    </Box>

                    <Box>
                        <label>Profissão</label>
                        <TextField
                            value={userInfo.profissao}
                            onChange={(e) => setUserInfo({ ...userInfo, profissao: e.target.value })}
                            variant="outlined"
                            size="small"
                            sx={{ '& .MuiInputBase-root': { borderRadius: '8px' }, width: '100%' }}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1, height: "fit-content" }}>
                    <Box>
                        <label>Nacionalidade</label>
                        <TextField
                            value={userInfo.nacionalidade}
                            onChange={(e) => setUserInfo({ ...userInfo, nacionalidade: e.target.value })}
                            variant="outlined"
                            size="small"
                            sx={{ '& .MuiInputBase-root': { borderRadius: '8px' }, width: '100%' }}
                        />
                    </Box>

                    <Box>
                        <label>RG <span style={{ color: "red" }}>*</span></label>
                        <TextField
                            required
                            value={userInfo.rg}
                            onChange={(e) => setUserInfo({ ...userInfo, rg: e.target.value })}
                            variant="outlined"
                            size="small"
                            sx={{ '& .MuiInputBase-root': { borderRadius: '8px' }, width: '100%' }}
                        />
                    </Box>

                    <Box>
                        <label>Telefone</label>
                        <TextField
                            value={formatarTelefone(userInfo.telefone)}
                            onChange={(e) => setUserInfo({ ...userInfo, telefone: e.target.value })}
                            variant="outlined"
                            size="small"
                            type="tel"
                            placeholder="(00) 00000-0000"
                            sx={{ '& .MuiInputBase-root': { borderRadius: '8px' }, width: '100%' }}
                        />
                    </Box>

                    <Box>
                        <label>Email <span style={{ color: "red" }}>*</span></label>
                        <TextField
                            required
                            value={userInfo.email}
                            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                            variant="outlined"
                            size="small"
                            type="email"
                            sx={{ '& .MuiInputBase-root': { borderRadius: '8px' }, width: '100%' }}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1, height: "fit-content" }}>
                    <Box>
                        <label>Naturalidade</label>
                        <TextField
                            value={userInfo.naturalidade}
                            onChange={(e) => setUserInfo({ ...userInfo, naturalidade: e.target.value })}
                            variant="outlined"
                            size="small"
                            sx={{ '& .MuiInputBase-root': { borderRadius: '8px' }, width: '100%' }}
                        />
                    </Box>

                    <Box>
                        <label>CPF <span style={{ color: "red" }}>*</span></label>
                        <TextField
                            required
                            value={userInfo.cpf}
                            onChange={(e) => setUserInfo({ ...userInfo, cpf: e.target.value })}
                            variant="outlined"
                            size="small"
                            sx={{ '& .MuiInputBase-root': { borderRadius: '8px' }, width: '100%' }}
                        />
                    </Box>

                    <Box>
                        <label>Celular</label>
                        <TextField
                            value={formatarTelefone(userInfo.celular)}
                            onChange={(e) => setUserInfo({ ...userInfo, celular: e.target.value })}
                            variant="outlined"
                            size="small"
                            type="tel"
                            placeholder="(00) 00000-0000"
                            sx={{ '& .MuiInputBase-root': { borderRadius: '8px' }, width: '100%' }}
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{marginTop: "20px"}}>
                <Box sx={{color: "black"}}>
                    Status de Presença
                </Box>
            </Box>
        </FormControl>
    )
}