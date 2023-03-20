import { Box } from "@mui/material";
import Content from "../component/content";
import Header from "../component/header";
import Sidebar from "../component/sidebar";

export default function MainPage() {
  return (
    <>
      <Header />

      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "90%",
        }}
      >
        <Sidebar />

        <Content />
      </Box>
    </>
  );
}
