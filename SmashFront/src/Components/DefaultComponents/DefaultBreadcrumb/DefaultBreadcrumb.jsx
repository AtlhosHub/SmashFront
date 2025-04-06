import { Box } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import breadcrumb from "../../../assets/breadcrumb.png";

export const DefaultBreadcrumb = ({
  actualPage,
  previousPages = [],
  routePreviousPages = [],
}) => {
  return (
    <Box className="breadcrumb-container">
      <Box
        sx={{
          padding: "20px 24px",
          height: "150px",
          gap: "5px",
          color: "#0D3C53",
          display: "flex",
          backgroundImage: `url(${breadcrumb})`,
          backgroundSize: "cover",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "5px",
            cursor: "pointer",
          }}
          onClick={() => {
            window.location.href = "/mainPage";
          }}
        >
          <KeyboardBackspaceIcon sx={{ marginTop: "1px" }} />
          Menu Principal
        </Box>
        {previousPages?.map((page, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                gap: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                window.location.href = routePreviousPages[index];
              }}
            >
              <Box sx={{ marginBottom: "2px" }}>|</Box>
              {page}
            </Box>
          );
        })}
        <Box sx={{ display: "flex", gap: "5px" }}>
          <Box sx={{ marginBottom: "2px" }}>|</Box>
          <Box
            sx={{
              fontWeight: "bold",
            }}
          >
            {actualPage}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
