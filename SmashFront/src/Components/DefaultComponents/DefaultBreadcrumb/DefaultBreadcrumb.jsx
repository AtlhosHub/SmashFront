import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import breadcrumb from "../../../assets/breadcrumb.png";

export const DefaultBreadcrumb = ({ rotas }) => {
  return (
    <Box className="breadcrumb-container">
      <Box
        sx={{
          height: "150px",
          padding: "20px 24px",
          backgroundImage: `url(${breadcrumb})`,
          backgroundSize: "cover",
          boxSizing: "border-box",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" sx={{color: "#0D3C53"}}>
          <Link underline="hover" color="inherit" href="/mainPage" sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
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
                href={rota.route}
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
