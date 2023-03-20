import { Box } from "@mui/material";

export default function Header() {
  return (
    <Box
      sx={{
        minHeight: "10%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "primary.main",
        color: "custom.main",
        fontWeight: "bold",
        fontSize: 25,
      }}
    >
      Header
    </Box>
  );
}
