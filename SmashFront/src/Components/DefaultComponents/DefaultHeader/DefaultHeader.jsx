import { Logout, Person } from "@mui/icons-material";
import { AppBar, Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { getUserInicial, getUserName } from "../../FichaInscricao/utils/getUserData";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const DefaultHeader = ({ pageTitle }) => {
  const navigation = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl);

  const sairSessao = () => {
    sessionStorage.clear();
    navigation("/");
  }

  return (
    <>
      <Box>
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
              <Tooltip title="Opções">
                <IconButton
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  <Avatar sx={{ backgroundColor: "white" }}>
                    {<span style={{ color: "black" }}>{getUserInicial()}</span> || <Person sx={{ color: "black", fontSize: "30px" }} />}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={() => setAnchorEl(null)}
          onClick={() => setAnchorEl(null)}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 0.5,
                width: 150,
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 23,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => setAnchorEl(null)} disabled>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            Perfil
          </MenuItem>
          <Divider sx={{ my: "4px !important" }} />
          <MenuItem onClick={sairSessao}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
      <Outlet />
    </>
  );
};
