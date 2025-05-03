import React from "react";
import {
  Box,
  FormControl,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HelpIcon from "@mui/icons-material/Help";
import { DefaultButton } from "../../../src/Components/DefaultComponents/DefaultButton/DefaultButton";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export const FormPerfilInteressado = ({
  perfil,
  setPerfil,
  operacao,
  botaoLiberado,
  setConcluido,
  setBotaoLiberado,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChange = (field) => (e) => setPerfil({ ...perfil, [field]: e.target.value });
  const handleDateChange = (field) => (newValue) => setPerfil({ ...perfil, [field]: newValue });
  const nomeSocialTooltip = "Nome social é o nome pelo qual o interessado prefere ser chamado, diferente do nome legal.";

  return (
    <Box sx={{ display: 'flex', flex: 1, backgroundColor: theme.palette.background.default }}>
      {/* Navegação lateral */}
      <Box sx={{ width: 200, backgroundColor: theme.palette.grey[100], p: 2, borderRight: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: theme.palette.text.primary }}>
          <PersonOutlineIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1">Informações</Typography>
        </Box>
      </Box>

      {/* Formulário */}
      <FormControl
        sx={{
          flex: 1,
          p: 4,
          display: "flex",
          flexDirection: "column",
          pl: 6 // aumenta espaçamento interno à esquerda para equalizar distâncias
        }}
      >
        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {/* Coluna 1 */}
          <Box sx={{ flex: 1.3, display: "flex", flexDirection: "column", gap: 1 }}>
            {/* aumento de gap entre label e campo */}
            <Typography variant="body2" component="label" color="text.primary" sx={{ mb: 1 }}>
              Nome<span style={{ color: theme.palette.error.main, marginLeft: 4, visibility: operacao === 'visualizacao' ? 'hidden' : 'visible' }}>*</span>
            </Typography>
            <TextField
              size="small"
              disabled={operacao === "visualizacao"}
              value={perfil.nome || ""}
              onChange={handleChange("nome")}
            />

            <Typography variant="body2" component="label" color="text.primary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              Nome Social
              <Tooltip title={<Typography sx={{ fontSize: 14 }}>{nomeSocialTooltip}</Typography>} arrow>
                <HelpIcon fontSize="small" color="primary" sx={{ ml: 0.5 }} />
              </Tooltip>
            </Typography>
            <TextField
              size="small"
              disabled={operacao === "visualizacao"}
              value={perfil.nomeSocial || ""}
              onChange={handleChange("nomeSocial")}
            />

            <Typography variant="body2" component="label" color="text.primary" sx={{ mb: 1 }}>
              Telefone
            </Typography>
            <TextField
              size="small"
              disabled={operacao === "visualizacao"}
              value={perfil.telefone || ""}
              onChange={handleChange("telefone")}
            />
          </Box>

          {/* Coluna 2 */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body2" component="label" color="text.primary" sx={{ mb: 1 }}>
              Gênero
            </Typography>
            <TextField
              size="small"
              disabled={operacao === "visualizacao"}
              value={perfil.genero || ""}
              onChange={handleChange("genero")}
            />

            <Typography variant="body2" component="label" color="text.primary" sx={{ mb: 1 }}>
              Data de Nascimento
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                slotProps={{ textField: { size: "small", placeholder: "DD/MM/AAAA" } }}
                disabled={operacao === "visualizacao"}
                value={perfil.dataNascimento ? dayjs(perfil.dataNascimento) : null}
                onChange={handleDateChange("dataNascimento")}
                format="DD/MM/YYYY"
              />
            </LocalizationProvider>

            <Typography variant="body2" component="label" color="text.primary" sx={{ mb: 1 }}>
              Email
            </Typography>
            <TextField
              size="small"
              type="email"
              disabled={operacao === "visualizacao"}
              value={perfil.email || ""}
              onChange={handleChange("email")}
            />
          </Box>

          {/* Coluna 3 */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body2" component="label" color="text.primary" sx={{ mb: 1 }}>
              Data de Contato<span style={{ color: theme.palette.error.main, marginLeft: 4, visibility: operacao === 'visualizacao' ? 'hidden' : 'visible' }}>*</span>
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                slotProps={{ textField: { size: "small", placeholder: "DD/MM/AAAA" } }}
                disabled={operacao === "visualizacao"}
                value={perfil.dataContato ? dayjs(perfil.dataContato) : null}
                onChange={handleDateChange("dataContato")}
                format="DD/MM/YYYY"
              />
            </LocalizationProvider>

            <Typography variant="body2" component="label" color="text.primary" sx={{ mb: 1 }}>
              Celular
            </Typography>
            <TextField
              size="small"
              disabled={operacao === "visualizacao"}
              value={perfil.celular || ""}
              onChange={handleChange("celular")}
            />

            <Typography variant="body2" component="label" color="text.primary" sx={{ mb: 1 }}>
              Horário de Preferência<span style={{ color: theme.palette.error.main, marginLeft: 4, visibility: operacao === 'visualizacao' ? 'hidden' : 'visible' }}>*</span>
            </Typography>
            <TextField
              size="small"
              disabled={operacao === "visualizacao"}
              value={perfil.horarioPreferencia || ""}
              onChange={handleChange("horarioPreferencia")}
            />
          </Box>
        </Box>

        {/* Botões */}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <DefaultButton variant="outlined" label="Cancelar" onClick={() => navigate(-1)} />
          <DefaultButton
            variant="contained"
            label="Concluir"
            disabled={!botaoLiberado}
            onClick={() => setConcluido(true)}
          />
        </Box>
      </FormControl>
    </Box>
  );
};
