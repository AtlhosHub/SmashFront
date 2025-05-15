import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import breadcrumb from "../../../assets/breadcrumb.png";
import { useNavigate } from "react-router-dom";

export const DefaultBreadcrumb = ({ rotas, altura = 150 }) => {
  const navigate = useNavigate();

  return (
    <Box className="breadcrumb-container">
      <Box
        sx={{
          height: `${altura}px`,
          padding: "20px 24px",
          backgroundImage: `url(${breadcrumb})`,
          backgroundSize: "cover",
          boxSizing: "border-box",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" sx={{ color: "#0D3C53" }}>
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate("/telaInicial")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              cursor: "pointer"
            }}
          >
            <KeyboardBackspaceIcon sx={{ marginTop: "1px" }} />
            Menu Principal
          </Link>
          {rotas.map((rota, index) => {
            const ultimoItem = index === rotas.length - 1;

            return ultimoItem ? (
              <Typography sx={{ fontWeight: "600" }}>{rota.description}</Typography>
            ) : (
              <Link
                underline="hover"
                color="inherit"
                onClick={() => navigate(rota.route)}
                sx={{ cursor: "pointer" }}
              >
                {rota.description}
              </Link>
            )
          })};
        </Breadcrumbs>
      </Box>
    </Box>
  );
};
