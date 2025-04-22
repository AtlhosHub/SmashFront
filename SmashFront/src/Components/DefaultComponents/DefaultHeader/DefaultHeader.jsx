import { Person } from "@mui/icons-material";
import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";
import { getUserInicial, getUserName } from "../../FichaInscricao/utils/getUserData";

export const DefaultHeader = ({ pageTitle }) => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#286DA8 !important",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <Typography
            className="header-title"
            variant="h6"
            sx={{
              fontFamily: "'Mohave', sans-serif ",
              color: "#F3F9F9",
              fontSize: "40px",
              textTransform: "uppercase",
              fontWeight: "700",
              lineHeight: "0px",
            }}
          >
            SMASH
          </Typography>
          <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "5px",
            fontFamily: "'Poppins', sans-serif",
          }}>
            <span style={{ fontSize: "26px", lineHeight: 0 }}>
              |
            </span>
            <span style={{ lineHeight: "10px" }}>
              {pageTitle}
            </span>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "'Poppins', sans-serif", fontSize: "16px", color: "#F3F9F9" }}>
          <span><span style={{ fontWeight: 600 }}>Bem-vindo(a)</span>, {getUserName() || "carregando..."}</span>
          <Avatar sx={{ backgroundColor: "white" }}>
            {<span style={{color: "black"}}>{getUserInicial()}</span> || <Person sx={{ color: "black", fontSize: "30px" }} />}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
