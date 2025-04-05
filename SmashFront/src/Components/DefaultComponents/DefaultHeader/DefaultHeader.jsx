import { Person } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, Toolbar, Typography } from "@mui/material";

export const DefaultHeader = ({ pageTitle, userInfo }) => {
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
          <Box sx={{display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px"}}>
            <span
              style={{
                fontSize: "26px",
                lineHeight: 0,
                marginBottom: "5px",
              }}
            >
              |
            </span>
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                lineHeight: "10px",
                marginTop: "3px",
              }}
            >
              {pageTitle}
            </span>
          </Box>
        </Box>
        <Box sx={{display: "flex", alignItems: "center", gap: "10px"}}>
              <span><b>Bem-vindo(a)</b>, {userInfo?.name ?? "carregando..."}</span>
              <Avatar sx={{backgroundColor: "white"}}>{userInfo?.charAt(0) ?? <Person sx={{color: "black", fontSize: "30px"}} />}</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
